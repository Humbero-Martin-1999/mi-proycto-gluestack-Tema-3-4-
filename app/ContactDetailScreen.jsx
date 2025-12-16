import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Building, Edit, Home, Mail, Phone, Trash2, User } from 'lucide-react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importamos la nueva función
import { deleteContact, getContactById } from '../config/firestoreService';

const ContactDetailScreen = () => {
    const { contactId } = useLocalSearchParams(); // Recibimos SOLO el ID
    const navigation = useNavigation();
    
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. SUSCRIPCIÓN EN TIEMPO REAL (Live Data)
    useEffect(() => {
        if (!contactId) return;

        const unsubscribe = getContactById(contactId, (data) => {
            setContact(data);
            setLoading(false);
        });

        return () => unsubscribe(); // Limpieza al salir
    }, [contactId]);

    // 2. CONFIGURACIÓN DEL HEADER
    useLayoutEffect(() => {
        // Solo mostramos botones si el contacto ya cargó
        if (contact) {
            navigation.setOptions({
                title: `${contact.firstName} ${contact.lastName}`,
                headerRight: () => (
                    <View style={styles.headerButtons}>
                        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
                            <Edit size={24} color="#3b82f6" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
                            <Trash2 size={24} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                ),
            });
        }
    }, [navigation, contact]);

    const handleEdit = () => {
        // Al editar, pasamos el objeto actual (para rellenar el formulario)
        // Ojo: ContactCRUDScreen debe estar preparado para recibir esto
        router.push({ pathname: '/ContactCRUDScreen', params: { contact: JSON.stringify(contact) } });
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    onPress: async () => {
                        await deleteContact(contact.id);
                        navigation.goBack(); 
                    }
                }
            ]
        );
    };

    // 3. ESTADOS DE CARGA Y ERROR
    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    if (!contact) {
        return (
            <View style={styles.container}>
                <Text style={styles.notFoundText}>El contacto no existe o fue eliminado.</Text>
            </View>
        );
    }

    // Componente auxiliar para filas
    const DetailRow = ({ icon: IconComponent, label, value, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.row} disabled={!onPress}>
            <View style={styles.iconContainer}>
                <IconComponent size={18} color="#4f46e5" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value || 'No especificado'}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <User size={50} color="white" />
                </View>
                <Text style={styles.name}>{contact.firstName} {contact.lastName}</Text>
                <Text style={styles.company}>{contact.company}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información de Contacto</Text>
                
                <DetailRow
                    icon={Phone}
                    label="Teléfono"
                    value={contact.phone}
                    onPress={() => contact.phone && Linking.openURL(`tel:${contact.phone}`)}
                />
                <DetailRow
                    icon={Mail}
                    label="Correo Electrónico"
                    value={contact.email}
                    onPress={() => contact.email && Linking.openURL(`mailto:${contact.email}`)}
                />
                <DetailRow
                    icon={Home}
                    label="Dirección"
                    value={contact.address ? `${contact.address}, ${contact.city || ''}` : ''}
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
    notFoundText: { textAlign: 'center', marginTop: 40, fontSize: 18, color: '#666' },
    headerButtons: { flexDirection: 'row', marginRight: 8 },
    iconButton: { padding: 8 },
    header: { alignItems: 'center', marginBottom: 32 },
    avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', textAlign: 'center' },
    company: { fontSize: 16, color: '#6b7280', marginTop: 4 },
    section: { marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#111' },
    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
    iconContainer: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    textContainer: { flex: 1 },
    label: { fontSize: 12, color: '#6b7280' },
    value: { fontSize: 16, color: '#1f2937' },
});

export default ContactDetailScreen;