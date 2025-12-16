// app/ContactDetailScreen.jsx

import { Building, Edit, Home, Mail, MapPin, MessageSquare, Phone, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { deleteContact } from '../firestoreService';

const DetailItem = ({ icon: IconComponent, label, value }) => (
    <View className="flex-row items-center py-3 border-b border-gray-100">
        <IconComponent size={24} color="#4f46e5" className="w-6 mr-4" />
        <View className="flex-1">
            <Text className="text-xs text-gray-500">{label}</Text>
            <Text className="text-base font-medium">{value}</Text>
        </View>
    </View>
);

// Componente para los botones de acción (Punto d)
const ActionButton = ({ icon: IconComponent, label, onPress }) => (
    <TouchableOpacity onPress={onPress} className="items-center mx-4">
        <View className="w-12 h-12 rounded-full bg-indigo-100 justify-center items-center mb-1">
            <IconComponent size={24} color="#4f46e5" />
        </View>
        <Text className="text-sm text-indigo-600">{label}</Text>
    </TouchableOpacity>
);

const ContactDetailScreen = ({ route, navigation }) => {
    const { contact } = route.params;

    const handleDelete = async () => {
        Alert.alert(
            "Confirmar Eliminación",
            `¿Estás seguro de que quieres eliminar a ${contact.firstName} ${contact.lastName}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        await deleteContact(contact.id);
                        navigation.goBack();
                    },
                },
            ]
        );
    };
    
    // Funciones simuladas/con intención (Punto d)
    const handleAction = (type, value) => {
        let url;
        if (type === 'Call') {
            url = `tel:${value}`;
        } else if (type === 'Mail') {
            url = `mailto:${value}`;
        } else if (type === 'Message') {
            url = `sms:${value}`;
        }
        
        // La implementación real requiere manejo de errores,
        // pero esta simulación cubre el requisito de la UI.
        Linking.openURL(url).catch(err => console.log(`Error al abrir ${type}: ${err}`));
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View className="flex-row space-x-4">
                {/* Icono de Lápiz para Editar (Figura 2) */}
                <TouchableOpacity onPress={() => navigation.navigate('ContactCRUD', { contact })}>
                    <Edit size={24} color="#4f46e5" />
                </TouchableOpacity>
                {/* Icono de Papelera para Borrar (Figura 2) */}
                <TouchableOpacity onPress={handleDelete}>
                    <Trash2 size={24} color="#dc2626" /> 
                </TouchableOpacity>
            </View>
          ),
        });
    }, [navigation, contact]);


    return (
        <ScrollView className="flex-1 bg-white">
            <View className="bg-indigo-50 items-center py-8">
                <View className="w-24 h-24 rounded-full bg-indigo-600 justify-center items-center">
                    <Text className="text-white text-3xl font-bold">
                        {contact.firstName?.[0] || ''}{contact.lastName?.[0] || ''}
                    </Text>
                </View>
                <Text className="text-2xl font-bold mt-2 text-indigo-900">
                    {contact.firstName} {contact.lastName}
                </Text>
            </View>

            <View className="p-4">
                <View className="flex-row justify-around py-4 border-b border-gray-100 mb-4">
                    <ActionButton icon={MessageSquare} label="Message" onPress={() => handleAction('Message', contact.phone)} />
                    <ActionButton icon={Phone} label="Call" onPress={() => handleAction('Call', contact.phone)} />
                    <ActionButton icon={Mail} label="Mail" onPress={() => handleAction('Mail', contact.email)} />
                </View>

                {/* Detalles del contacto */}
                <DetailItem icon={Phone} label="Phone" value={contact.phone} />
                <DetailItem icon={Mail} label="Email" value={contact.email} />
                <DetailItem icon={Building} label="Company" value={contact.company} />
                <DetailItem icon={MapPin} label="City" value={contact.city} />
                <DetailItem icon={Home} label="Address" value={contact.address} />
                <DetailItem icon={Mail} label="Zip" value={contact.zip} />
            </View>
        </ScrollView>
    );
};

export default ContactDetailScreen;