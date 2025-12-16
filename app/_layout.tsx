// app/_layout.tsx
import 'react-native-gesture-handler';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Drawer
        screenOptions={{
          headerTitle: 'Humberto Martín de la Torre',
          headerStyle: { backgroundColor: 'rgb(36, 35, 35)' },
          headerTintColor: 'rgb(255, 251, 251)',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* --- 1. Pantalla de Componentes (Tabs) --- */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Formulario de Componentes',
          }}
        />
        
        {/* === MÓDULO DE CONTACTOS (Stack Navigator Plano) === */}
        {/* Usamos el archivo de layout plano 'contact-stack.tsx' */}
        <Drawer.Screen
          name="contact-stack" // <-- ¡Ruta Corregida!
          options={{
            title: 'Gestión de Contactos (CRUD)', 
            headerShown: false, // El Stack interno gestionará el encabezado
          }}
        />
        {/* ================================================= */}

        {/* --- 2. Pantalla de Perfil --- */}
        <Drawer.Screen name="profile" options={{ title: 'Perfil de Usuario' }} />

        {/* --- 3. Display --- */}
        <Drawer.Screen name="display" options={{ title: 'Display' }} />
        
        {/* --- Pantalla de Registro en Firebase --- */}
        <Drawer.Screen
          name="PantallaRegistroFirebase"
          options={{
            title: 'Registro en Firebase',
          }}
        />

        {/* --- 4. El Modal de ejemplo --- */}
        <Drawer.Screen name="modal" options={{ title: '' }} />

        {/* --- 5. Pantallas ocultas del menú --- */}
        <Drawer.Screen
          name="Forms/explore"
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="index" 
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GluestackUIProvider>
  );
}