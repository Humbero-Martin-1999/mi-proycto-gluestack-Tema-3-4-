// app/_layout.tsx
import 'react-native-gesture-handler'; // <-- IMPORTANTE: Siempre debe ser la primera línea
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
        {/* --- 1. Pantalla de Componentes --- */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Formulario de Componentes',
          }}
        />

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
         {/* Ocultamos index si estás usando (tabs) como principal para evitar duplicados */}
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