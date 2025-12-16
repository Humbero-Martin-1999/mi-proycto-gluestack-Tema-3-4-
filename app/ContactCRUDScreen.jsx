// app/ContactCRUDScreen.jsx

import { Building, Check, Home, Mail, MapPin, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createContact, updateContact } from '../firestoreService';

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

const FieldInput = ({ label, value, onChangeText, icon: IconComponent, keyboardType = 'default' }) => (
    <View className="mb-4">
        <View className="flex-row items-center border-b border-gray-300 py-2">
            {IconComponent && <IconComponent size={20} color="#4f46e5" className="mr-3" />}
            <TextInput
                className="flex-1 text-base"
                placeholder={label}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
        <Text className="text-xs text-gray-500 mt-1 ml-6">{label}</Text>
    </View>
);

const ContactCRUDScreen = ({ route, navigation }) => {
  const existingContact = route.params?.contact;
  const isEditing = !!existingContact;

  const [contactData, setContactData] = useState(
    isEditing ? existingContact : INITIAL_STATE
  );

  const handleChange = (name, value) => {
    setContactData({ ...contactData, [name]: value });
  };

  const handleSave = async () => {
    if (!contactData.firstName || !contactData.phone) {
        Alert.alert('Error', 'Nombre y Teléfono son obligatorios.');
        return;
    }
    
    if (isEditing) {
      await updateContact(existingContact.id, contactData);
    } else {
      await createContact(contactData);
    }
    navigation.goBack();
  };

  const fields = [
    { name: 'firstName', label: 'First Name', icon: User },
    { name: 'lastName', label: 'Last Name', icon: User },
    { name: 'phone', label: 'Phone', icon: Phone, keyboardType: 'phone-pad' },
    { name: 'email', label: 'Email', icon: Mail, keyboardType: 'email-address' },
    { name: 'company', label: 'Company', icon: Building },
    { name: 'city', label: 'City', icon: MapPin },
    { name: 'address', label: 'Street/Address', icon: Home },
    { name: 'zip', label: 'Zip', icon: Mail, keyboardType: 'numeric' },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit contact' : 'Add new contact',
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Check size={24} color="#4f46e5" /> {/* Icono de check (Figura 1) */}
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing, contactData]);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-gray-300 justify-center items-center">
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

export default ContactCRUDScreen;