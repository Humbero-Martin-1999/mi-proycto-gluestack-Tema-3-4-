import { router } from 'expo-router';
import { Edit, Plus, Trash2, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';

// RUTA CORREGIDA: Acceso a la subcarpeta config/ dentro de app/
import { deleteContact, getContactsStream } from './config/firestoreService';

// Componente para cada fila de contacto
const ContactListItem = ({ contact, onDelete, onEdit, onDetail }) => (
    <TouchableOpacity onPress={() => onDetail(contact)} className="p-4 border-b border-gray-200 bg-white">
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-indigo-500 justify-center items-center mr-4">
                    <User size={24} color="white" />
                </View>
                <View>
                    <Text className="text-lg font-bold">{contact.firstName} {contact.lastName}</Text>
                    <Text className="text-sm text-gray-500">{contact.phone}</Text>
                </View>
            </View>
            
            <View className="flex-row">
                <TouchableOpacity onPress={() => onEdit(contact)} className="p-2 mr-2">
                    <Edit size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(contact.id, contact.firstName)} className="p-2">
                    <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
);

const ContactListScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Suscribirse a los cambios en tiempo real
        const unsubscribe = getContactsStream((newContacts) => {
            setContacts(newContacts);
            setLoading(false);
        });
        // Desuscribirse al desmontar el componente
        return () => unsubscribe(); 
    }, []);

    const handleDelete = (id, name) => {
        Alert.alert(
            "Confirmar Eliminación",
            `¿Estás seguro de que quieres eliminar a ${name}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", onPress: () => deleteContact(id).catch(e => Alert.alert("Error", "No se pudo eliminar el contacto.")) }
            ]
        );
    };

    const handleEdit = (contact) => {
        // Navegar a la pantalla CRUD, pasando el contacto como parámetro
        // La ruta es el nombre del archivo: /ContactCRUDScreen
        router.push({ pathname: '/ContactCRUDScreen', params: { contact: JSON.stringify(contact) } });
    };

    const handleDetail = (contact) => {
        // Navegar a la pantalla de detalle, pasando el contacto como parámetro
        // La ruta es el nombre del archivo: /ContactDetailScreen
        router.push({ pathname: '/ContactDetailScreen', params: { contact: JSON.stringify(contact) } });
    };

    if (loading) {
        return <Text className="text-center mt-10">Cargando contactos...</Text>;
    }

    return (
        <View className="flex-1 bg-gray-50">
            {contacts.length === 0 ? (
                <Text className="text-center mt-10 text-gray-500">No hay contactos. ¡Añade uno!</Text>
            ) : (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ContactListItem
                            contact={item}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onDetail={handleDetail}
                        />
                    )}
                />
            )}
            
            {/* Botón Flotante para Añadir */}
            <TouchableOpacity
                onPress={() => router.push('/ContactCRUDScreen')}
                className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full justify-center items-center shadow-lg"
            >
                <Plus size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default ContactListScreen;