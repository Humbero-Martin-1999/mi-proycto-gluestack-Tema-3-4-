import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Building, Edit, Home, Mail, Phone, Trash2, User } from 'lucide-react-native';
import React from 'react';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// RUTA CORREGIDA: Acceso a la subcarpeta config/ dentro de app/
import { deleteContact } from './config/firestoreService';

const ContactDetailScreen = () => {
    const params = useLocalSearchParams();
    const contact = params.contact ? JSON.parse(params.contact) : null;
    const navigation = useNavigation();

    if (!contact) {
        return <Text className="text-center mt-10">Contacto no encontrado.</Text>;
    }

    const handleEdit = () => {
        // Navegar a CRUD para editar, pasando el contacto actual
        router.push({ pathname: '/ContactCRUDScreen', params: { contact: JSON.stringify(contact) } });
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirmar Eliminación",
            `¿Estás seguro de que quieres eliminar a ${contact.firstName}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    onPress: async () => {
                        await deleteContact(contact.id);
                        navigation.goBack(); // Volver a la lista después de eliminar
                    }
                }
            ]
        );
    };

    const DetailRow = ({ icon: IconComponent, label, value, onPress }) => (
        <TouchableOpacity onPress={onPress} className="flex-row items-center py-3 border-b border-gray-100">
            <View className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center mr-4">
                <IconComponent size={18} color="#4f46e5" />
            </View>
            <View className="flex-1">
                <Text className="text-xs text-gray-500">{label}</Text>
                <Text className="text-base text-gray-800">{value}</Text>
            </View>
        </TouchableOpacity>
    );

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: `${contact.firstName} ${contact.lastName}`,
            headerRight: () => (
                <View className="flex-row mr-2">
                    <TouchableOpacity onPress={handleEdit} className="p-2">
                        <Edit size={24} color="#3b82f6" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} className="p-2">
                        <Trash2 size={24} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, contact]);

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <View className="items-center mb-8">
                <View className="w-24 h-24 rounded-full bg-indigo-500 justify-center items-center mb-2">
                    <User size={50} color="white" />
                </View>
                <Text className="text-2xl font-bold">{contact.firstName} {contact.lastName}</Text>
                <Text className="text-base text-gray-500">{contact.company}</Text>
            </View>

            <View className="mb-4">
                <Text className="text-lg font-semibold mb-2">Información de Contacto</Text>
                
                <DetailRow
                    icon={Phone}
                    label="Teléfono"
                    value={contact.phone}
                    onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                />
                <DetailRow
                    icon={Mail}
                    label="Correo Electrónico"
                    value={contact.email}
                    onPress={() => Linking.openURL(`mailto:${contact.email}`)}
                />
                <DetailRow
                    icon={Home}
                    label="Dirección"
                    value={`${contact.address}, ${contact.city} ${contact.zip}`}
                />
                <DetailRow
                    icon={Building}
                    label="Compañía"
                    value={contact.company}
                />
            </View>
        </ScrollView>
    );
};

export default ContactDetailScreen;