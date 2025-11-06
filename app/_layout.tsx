// app/_layout.tsx
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
          // ...tus otras opciones de header...
          headerTitle: 'Humberto Martín de la Torre',
          headerStyle: { backgroundColor: 'rgb(36, 35, 35)' },
          headerTintColor: 'rgb(255, 251, 251)',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Formulario de Componentes', 
          }}
        />
        <Drawer.Screen
          name="modal"
          options={{
            title: 'Formulario de Perfil', 
          }}
        />

        <Drawer.Screen
          name="Forms/explore" // <-- El nombre de la ruta
          options={{
            drawerItemStyle: { display: 'none' }, // <-- Lo oculta del menú
          }}
        />
        
      </Drawer>
    </GluestackUIProvider>
  );
}