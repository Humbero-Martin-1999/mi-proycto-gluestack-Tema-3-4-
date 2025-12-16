// app/contact-stack.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function ContactStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(36, 35, 35)' },
        headerTintColor: 'rgb(255, 251, 251)',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
        {/* Las rutas se refieren directamente a los archivos en la carpeta app/ */}
        <Stack.Screen name="ContactListScreen" options={{ title: 'Lista de Contactos' }} />
        <Stack.Screen name="ContactCRUDScreen" options={{ 
            title: 'Añadir/Editar Contacto',
            presentation: 'modal', 
        }} />
        <Stack.Screen name="ContactDetailScreen" options={{ title: 'Detalle de Contacto' }} />
        
        {/* Ocultar las otras rutas para que no aparezcan en el stack secundario */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="display" options={{ headerShown: false }} />
        <Stack.Screen name="PantallaRegistroFirebase" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} /> 
        <Stack.Screen name="Forms/explore" options={{ headerShown: false }} /> 
        
    </Stack>
  );
}