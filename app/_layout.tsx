// app/_layout.tsx
import 'react-native-gesture-handler';

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

import 'react-native-gesture-handler';


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
        {/* --- 1. Pantalla de Componentes --- */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Formulario de Componentes',
          }}
        />
        
        {/* === NUEVO MÓDULO DE CONTACTOS (Stack Navigator) === */}
        <Drawer.Screen
          name="contacts" // Nombre de la carpeta que contendrá la lista de contactos
          options={{
            title: 'Gestión de Contactos (CRUD)', // Título en el menú Drawer
            headerShown: false, // Ocultamos el header del Drawer, el Stack interno lo manejará
          }}
        />
        {/* ================================================= */}

        {/* --- 2. Pantalla de Perfil --- */}
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Perfil de Usuario',
          }}
        />

        {/* --- 3. NUEVA PANTALLA AÑADIDA --- */}
        <Drawer.Screen
          name="display"
          options={{
            title: 'Display',
          }}
        />
        {/* --- Pantalla de Registro en Firebase --- */}
        <Drawer.Screen
          name="PantallaRegistroFirebase"
          options={{
            title: 'Registro en Firebase',
          }}
        />

        {/* --- 4. El Modal de ejemplo --- */}
        <Drawer.Screen
          name="modal"
          options={{
            title: '',
          }}
        />

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