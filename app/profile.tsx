import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonIcon,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack
} from '@gluestack-ui/themed';
import React from 'react';
// Importamos iconos directamente de lucide-react-native
import { Camera, MessageCircle, User } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box flex={1} bg="$white" p="$4">
        <VStack space="2xl" alignItems="center" mt="$4">
    
          {/* --- FOTO DE PERFIL --- */}
          <Avatar size="2xl" bg="$blue600">
            <AvatarFallbackText>HM</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: 'https://avatars.githubusercontent.com/u/197788118?v=4',
              }}
              alt="Foto de perfil de Humberto"
            />
          </Avatar>

          {/* --- INFORMACIÓN --- */}
          <VStack alignItems="center" space="xs" mt="$2">
            <Heading size="xl">Humberto Martín</Heading>
            <Text size="md" color="$coolGray500">humberto@gmail.com</Text>
            <Text size="sm" color="$coolGray400">HPE IT Support • México</Text>
          </VStack>

          {/* --- ESTADÍSTICAS --- */}
          <HStack space="2xl" justifyContent="center" alignItems="center" mt="$2">
            <VStack alignItems="center">
              <Heading size="lg">89</Heading>
              <Text size="sm" color="$coolGray500">Following</Text>
            </VStack>
            <Box w={1} h={30} bg="$coolGray300" />
            <VStack alignItems="center">
              <Heading size="lg">8.5k</Heading>
              <Text size="sm" color="$coolGray500">Followers</Text>
            </VStack>
            <Box w={1} h={30} bg="$coolGray300" />
            <VStack alignItems="center">
              <Heading size="lg">324</Heading>
              <Text size="sm" color="$coolGray500">Likes</Text>
            </VStack>
          </HStack>

          {/* --- BOTONES DE ACCIÓN --- */}
          <HStack space="lg" mt="$4">
            <Button size="xl" variant="solid" action="primary" rounded="$full" p="$4">
              {/* Usamos los iconos importados de lucide */}
              <ButtonIcon as={User} color="$white" />
            </Button>
            <Button size="xl" variant="solid" bg="$coolGray100" rounded="$full" p="$4">
              <ButtonIcon as={MessageCircle} color="$coolGray800" />
            </Button>
            <Button size="xl" variant="solid" bg="$coolGray100" rounded="$full" p="$4">
              <ButtonIcon as={Camera} color="$coolGray800" />
            </Button>
          </HStack>

          {/* --- GALERÍA --- */}
          <VStack w="$full" mt="$6" space="md">
            <Heading size="md">Gallery</Heading>
            <Box w="$full" h={200} rounded="$lg" overflow="hidden">
              <Image
                source={{ uri: 'data:image/png;base64,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' }}
                alt="Gallery Main"
                w="$full" h="$full" resizeMode="cover"
              />
            </Box>
            <HStack space="md" w="$full">
              <Box flex={1} h={100} rounded="$lg" overflow="hidden">
                <Image
                  source={{ uri: 'data:image/jpeg;base64,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f0DxUWXLFIdHg8C3ItufpQDJeASYhVGee7oWP1yOd+0fx0fn1dqr4qd9u6Xc6hy6cbF8LH7XMBbcFc08lMzL1ZEEwbZtFTVbKoVEjnRyF+ksaAb34nvVq3Lm1O1p2p2qn5boVmrZ7FX1JqHVD4yWNZpaxrhuVvFypx11DWa7S+jgEcbIwbiNjWXPPYW/BVpncyz6cTOOVmYlGyN8rohHIX3a0OvutzqXDmnHM6YtG2fKWX24fT+TtkdIOUdJqcA077bt3YtcuT4k7lmsadtRstPE8PhqYnQzsEkbxYtN+4gjgesLalprO4YmNoHU7IqQuvHUTsbf0SGP7gbBXK8+35hr2JXlTLMOHROiifI8PfrcZCD51rbgALcAq2bNbLO5bRDuKJlGczZHoq93KSNdHNa3KxENc7o1Agg+6+5T4uTfH4hrNYlGhsfp7/SprfYZdWP19o/DXsSPK2RqTD5DLE6Z8hYWapHgjSSCbBoHQFBm5FsnttFdJQq7ZHM25Uhr2X/u52jzZAOb6rukeCjyYovC/wALn5ONO49Kw/tHB5v1o7n7UEg8D4jqVT58b0X9Nz6+faYYVtPhcAKmJ0bud0fns7bcR8VNXkR/c5ebomSJ+Sdw78WecMcLipA6nMkafi1SfGp+6lPS+VH9n/GCr2g4awbpXSHojjff3kAfFYnPT921Ok8mf7dIjju0qaQFlKzkGndrdZ0ncODfiob59/S6vG6NWnzZZ3/hqZbyVU1r+WqS+OJx1Fz7maTsvw7T8VimK153ZvyupYsFezF5lbOH0UcEbYomhjGCwaFciNPMZMlstu6zaCzLR6gICAgICAgICAgICAgICDxGP4EZYqmnZI0skY17Xbi1wDge4pLal7VndZ8oniWzmglN2CSAn9267fc69h2WUFsFZdLF1fkV8TO3Hk2VC/m1hA64NR+DwtP03+VyOvTH9n/rLT7K4h/eVUjh/BG2PxLlmOPDS/Xbz6rr/aTYRlChpSHRwhzx+vJ+kd2i+4dylrirX052fn58v1Wd5SKc+SybBGHqMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIP/Z' }}
                  alt="Gallery 1"
                  w="$full" h="$full" resizeMode="cover"
                />
              </Box>
              <Box flex={1} h={100} rounded="$lg" overflow="hidden">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop' }}
                  alt="Gallery 2"
                  w="$full" h="$full" resizeMode="cover"
                />
              </Box>
              <Box flex={1} h={100} rounded="$lg" overflow="hidden">
                 <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop' }}
                  alt="Gallery 3"
                  w="$full" h="$full" resizeMode="cover"
                />
              </Box>
            </HStack>
          </VStack>

        </VStack>
      </Box>
    </ScrollView>
  );
}