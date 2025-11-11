// app/display.tsx
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text, // Importante para el Toast
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
// Importa los iconos que necesitas (asegúrate de tener lucide-react-native)
import { CheckCircle, ShoppingCart, XCircle } from 'lucide-react-native';

export default function DisplayScreen() {
  const toast = useToast();

// app/display.tsx


  const showSuccessToast = () => {
    toast.show({
      placement: 'bottom',
      render: ({ id }) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid" mb="$10">
            <HStack space="sm" alignItems="center">
              <Icon as={CheckCircle} size="lg" color="$white" />
              <VStack>
                <ToastTitle color="$Black">Success</ToastTitle>
                <ToastDescription color="$Black">
                  Your Order was placed Successfully, Thanks for 
                  shopping with us!
                </ToastDescription>
              </VStack>
            </HStack>
          </Toast>
        );
      },
    });
  };


  return (
    <ScrollView>
      <VStack space="md" p="$4" bg="$coolGray100">
        
        <Card w="$full" variant="elevated">
          {/* Requerimiento: Image */}
          <Image
            w="$full"
            h={300} 
            resizeMode="cover"
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            alt="Cotton Kurta"
          />
          <VStack p="$4" space="sm">
            <Text size="xs" color="$coolGray500">
              HPE Server 
                          </Text>
            <Heading size="lg">DL360 Gen 11</Heading>
            <Text size="sm">
                Aprovecha todo el valor de tus datos con una solución escalable con alta densidad de computación y numerosas opciones de almacenamiento. 
            </Text>

            {/* Botones */}
            <Button
              mt="$4"
              action="primary"
              variant="solid"
              onPress={showSuccessToast} // <-- Llama al Toast aquí
            >
              <ButtonText>Add to cart</ButtonText>
            </Button>
            <Button action="secondary" variant="outline">
              <ButtonText>Wishlist</ButtonText>
            </Button>
          </VStack>
        </Card>

        {/* --- TARJETA DE LA TABLA DE INVENTARIO --- */}
        {/* Requerimiento: Table + Card */}
        <Card w="$full" variant="elevated">
          <VStack p="$4" space="md">
            
            {/* Cabecera de la Tabla */}
            <HStack>
              <Text flex={2} size="sm" fontWeight="$bold">Pro</Text>
              <Text flex={2} size="sm" fontWeight="$bold">Size</Text>
              <Text flex={1} size="sm" fontWeight="$bold">Ava</Text>
              <Text flex={2} size="sm" fontWeight="$bold" textAlign="center">ST</Text>
            </HStack>

            {/* Fila 1 de la Tabla */}
            <HStack alignItems="center">
              <Text flex={2}>Dress</Text>
              <Text flex={2}>Medium</Text>
              <Text flex={1}>12</Text>
              {/* Requerimiento f) Badge + icon */}
              <Box flex={2} alignItems="center">
                <Badge size="sm" action="error" variant="solid" rounded="$full">
                  <BadgeText>Soldout</BadgeText>
                  <BadgeIcon as={XCircle} ml="$1" />
                </Badge>
              </Box>
            </HStack>

            {/* Fila 2 de la Tabla */}
            <HStack alignItems="center">
              <Text flex={2}>Earring</Text>
              <Text flex={2}>Large</Text>
              <Text flex={1}>90</Text>
              {/* Requerimiento f) Ícono de carrito */}
              <Box flex={2} alignItems="center">
                <Icon as={ShoppingCart} size="md" color="$primary500" />
              </Box>
            </HStack>
            
            <Text size="xs" color="$coolGray400" mt="$4">
              Showing recent inventory
            </Text>
          </VStack>
        </Card>
      </VStack>
    </ScrollView>
  );
}