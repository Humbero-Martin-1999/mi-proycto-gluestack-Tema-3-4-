import { router } from 'expo-router';
import { Edit, Plus, Trash2, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// VERIFICA QUE ESTA RUTA SEA LA CORRECTA EN TU PROYECTO
import { deleteContact, getContactsStream } from '../config/firestoreService';

const ContactListScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = getContactsStream((newContacts) => {
            setContacts(newContacts);
            setLoading(false);
        });
        return () => unsubscribe(); 
    }, []);

    const handleDelete = (id, name) => {
        Alert.alert(
            "Eliminar Contacto",
            `¿Deseas eliminar a ${name}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", style: 'destructive', onPress: () => deleteContact(id) }
            ]
        );
    };

    const handleEdit = (contact) => {
        router.push({ pathname: '/ContactCRUDScreen', params: { contact: JSON.stringify(contact) } });
    };

    const handleDetail = (contact) => {
        router.push({ pathname: '/ContactDetailScreen', params: { contactId: contact.id } });
    };

    // --- RENDERIZADO DE CADA ÍTEM (DISEÑO TARJETA) ---
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleDetail(item)}
            activeOpacity={0.7}
        >
            <View style={styles.cardContent}>
                {/* 1. Avatar */}
                <View style={styles.avatarContainer}>
                    <User size={24} color="#6366f1" />
                </View>

                {/* 2. Información (Ocupa el espacio restante) */}
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText} numberOfLines={1}>
                        {item.firstName} {item.lastName}
                    </Text>
                    <Text style={styles.phoneText}>
                        {item.phone}
                    </Text>
                </View>

                {/* 3. Botones de Acción */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.editButton]} 
                        onPress={() => handleEdit(item)}
                    >
                        <Edit size={18} color="#3b82f6" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteButton]} 
                        onPress={() => handleDelete(item.id, item.firstName)}
                    >
                        <Trash2 size={18} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366f1" />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {contacts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <User size={64} color="#d1d5db" />
                    <Text style={styles.emptyText}>Sin contactos</Text>
                    <Text style={styles.emptySubtext}>Agrega uno nuevo con el botón (+)</Text>
                </View>
            ) : (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
            
            {/* Botón Flotante (FAB) */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/ContactCRUDScreen')}
                activeOpacity={0.8}
            >
                <Plus size={32} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// --- ESTILOS DEFINITIVOS (Sin depender de Tailwind/NativeWind) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Gris muy suave de fondo
    },
    listContent: {
        padding: 16,
        paddingBottom: 100, // Espacio para el botón flotante
    },
    // Estilos de la Tarjeta
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        // Sombras suaves (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Sombras (Android)
        elevation: 3,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    // Avatar
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EEF2FF', // Indigo muy claro
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    // Información de texto
    infoContainer: {
        flex: 1, // Esto fuerza al texto a usar todo el ancho disponible
        marginRight: 10,
    },
    nameText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1F2937', // Gris oscuro
        marginBottom: 4,
    },
    phoneText: {
        fontSize: 14,
        color: '#6B7280', // Gris medio
    },
    // Botones
    actionsContainer: {
        flexDirection: 'row',
        gap: 8, // Espacio entre botones
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20, // Círculo perfecto
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#EFF6FF', // Azul muy claro
    },
    deleteButton: {
        backgroundColor: '#FEF2F2', // Rojo muy claro
    },
    // Botón Flotante (FAB)
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4F46E5', // Indigo principal
        justifyContent: 'center',
        alignItems: 'center',
        // Sombra fuerte para que flote
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    // Estados de carga y vacío
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
    },
    loadingText: {
        marginTop: 10,
        color: '#6B7280',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9CA3AF',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 8,
    }
});

export default ContactListScreen;