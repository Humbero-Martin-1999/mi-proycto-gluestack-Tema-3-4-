import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Building, Check, Home, Mail, MapPin, Phone, User, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// RUTA CORREGIDA: Acceso a la subcarpeta config/ dentro de app/
// Asumiendo que has movido la carpeta config/ dentro de app/
import { createContact, updateContact } from './config/firestoreService';

// **********************************************
// **** DEFINICIONES GLOBALES (FUERA DEL COMPONENTE) ****
// **********************************************

// ¡CORRECCIÓN! DEFINIR INITIAL_STATE AQUÍ
const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    address: '',
    zip: '',
};

// La lista de campos con iconos
const fields = [
    { name: 'firstName', label: 'First Name', icon: User, keyboardType: 'default' },
    { name: 'lastName', label: 'Last Name', icon: User, keyboardType: 'default' },
    { name: 'phone', label: 'Phone', icon: Phone, keyboardType: 'phone-pad' },
    { name: 'email', label: 'Email', icon: Mail, keyboardType: 'email-address' },
    { name: 'company', label: 'Company', icon: Building, keyboardType: 'default' },
    { name: 'city', label: 'City', icon: MapPin, keyboardType: 'default' },
    { name: 'address', label: 'Street/Address', icon: Home, keyboardType: 'default' },
    { name: 'zip', label: 'Zip Code', icon: Mail, keyboardType: 'numeric' },
];

// **********************************************
// ********* COMPONENTE DE ENTRADA MEJORADO *********
// **********************************************

const FieldInput = ({ label, value, onChangeText, icon: IconComponent, keyboardType = 'default' }) => (
    <View style={styles.inputGroup}>
        {/* Icono a la izquierda */}
        {IconComponent && <IconComponent size={20} color="#6B7280" style={styles.inputIcon} />}
        
        <View style={styles.inputContainer}>
            {/* Etiqueta flotante (Small label on top) */}
            <Text style={styles.inputLabel}>{label}</Text> 
            
            {/* Campo de texto principal */}
            <TextInput
                style={styles.textInput}
                placeholder={`Ingresa ${label}`} // Placeholder más descriptivo
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    </View>
);

// **********************************************
// ********* COMPONENTE PRINCIPAL *****************
// **********************************************

const ContactCRUDScreen = () => {
    const params = useLocalSearchParams();
    const existingContact = params.contact ? JSON.parse(params.contact) : null;
    const isEditing = !!existingContact;

    const navigation = useNavigation();

    // Estado para manejar el contacto, si estás editando, inicializa con los datos existentes
    const [contactData, setContactData] = useState(
        isEditing ? existingContact : INITIAL_STATE
    );
    
    // Función para manejar el cambio de texto
    const handleChange = (name, value) => {
        setContactData({ ...contactData, [name]: value });
    };

    // Función para guardar (Crear o Actualizar)
    const handleSave = async () => {
        if (!contactData.firstName || !contactData.phone) {
            Alert.alert('Error', 'Nombre y Teléfono son obligatorios.');
            return;
        }
        
        try {
            if (isEditing) {
                // Actualizar
                await updateContact(existingContact.id, contactData);
            } else {
                // Crear
                await createContact(contactData);
            }
            navigation.goBack(); // Volver a la lista
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar el contacto.');
            console.error(error);
        }
    };
    
    // Configuración del encabezado (Guardar y Cancelar)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar Contacto' : 'Añadir Contacto',
            headerRight: () => (
                <TouchableOpacity onPress={handleSave}>
                    <Check size={24} color="#FFFFFF" style={{ marginRight: 10 }} /> 
                </TouchableOpacity>
            ),
             headerLeft: () => ( // Añadir botón de cancelar/cerrar
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X size={24} color="#FFFFFF" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isEditing, contactData]); // Dependencias

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarSection}>
                <View style={styles.avatarPlaceholder}>
                    <User size={40} color="white" />
                </View>
            </View>
            
            {fields.map((field) => (
                <FieldInput
                    key={field.name}
                    label={field.label}
                    value={contactData[field.name]}
                    onChangeText={(text) => handleChange(field.name, text)}
                    icon={field.icon}
                    keyboardType={field.keyboardType}
                />
            ))}
        </ScrollView>
    );
};

// **********************************************
// *************** ESTILOS CSS ******************
// **********************************************

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Fondo gris claro
        padding: 16,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#D1D5DB', // Gris medio
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    
    // Estilos del Input
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Fondo blanco para el campo
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        elevation: 1, // Sombra ligera en Android
        shadowColor: '#000', // Sombra ligera en iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    inputIcon: {
        marginRight: 10,
    },
    inputContainer: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 10,
        color: '#6B7280', // Gris oscuro
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    textInput: {
        fontSize: 16,
        color: '#1F2937', // Texto principal negro
        paddingVertical: 2,
    }
});


export default ContactCRUDScreen;