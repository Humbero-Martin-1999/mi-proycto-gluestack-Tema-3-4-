// app/index.tsx
import {
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  ChevronDownIcon,
  CircleIcon,
  FormControl,
  FormControlLabel,
  Heading,
  HStack,
  Icon,
  Link,
  LinkText,
  Pressable,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  Textarea,
  TextareaInput,
  VStack
} from '@gluestack-ui/themed';


import React, { useState } from 'react';

// Este es el componente principal del formulario
export default function FormScreen() {
  // --- Estados para los componentes ---

  // Checkbox (5) + CheckboxGroup (10)
  const [checkboxValues, setCheckboxValues] = useState(['frontend']);

  // Pressable (5) + Cambiar color (10)
  const [isPressed, setIsPressed] = useState(false);

  // Radio (3) + RadioGroup + FormControl (10)
  const [radioValue, setRadioValue] = useState('react');

  // Select (3) + Select FormControlled (10)
  const [selectValue, setSelectValue] = useState('js');

  // Slider (3) + Max y Min (10)
  const [sliderValue, setSliderValue] = useState(50);

  // Switch (3) + Checked State (10)
  const [switchValue, setSwitchValue] = useState(false);

  // TextArea (5) + FormControl (10)
  const [textAreaValue, setTextAreaValue] = useState('');

  return (
    <ScrollView>
      <Box p="$4" bg="$white" flex={1}>
        <VStack space="lg">
          {/* --- 1. Checkbox --- */}
          <FormControl>
            <Heading size="md" mb="$2">
              1. Checkbox + CheckboxGroup
            </Heading>
            <CheckboxGroup
              value={checkboxValues}
              onChange={(keys: string[]) => {
                setCheckboxValues(keys);
              }}
            >
              <VStack space="sm">
                <Checkbox value="frontend">
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Frontend</CheckboxLabel>
                </Checkbox>
                <Checkbox value="backend">
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Backend</CheckboxLabel>
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </FormControl>

          {/* --- 2. Link + Icon --- */}
          <FormControl>
            <Heading size="md" mb="$2">
              2. Link + Icon
            </Heading>
            <Link href="https://gluestack.io/" isExternal>
              <LinkText size="md" color="$blue600">
                Visitar Gluestack UI
              </LinkText>
              <Icon as={ChevronDownIcon} size="sm" ml="$1" color="$blue600" />
            </Link>
          </FormControl>

          {/* --- 3. Pressable --- */}
          <FormControl>
            <Heading size="md" mb="$2">
              3. Pressable + Cambio de Color
            </Heading>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              p="$3"
              bg={isPressed ? '$red600' : '$gray300'}
            >
              <Text color={isPressed ? '$white' : '$black'}>
                ¡Presióname!
              </Text>
            </Pressable>
          </FormControl>

          {/* --- 4. RadioGroup + FormControl --- */}
          <FormControl>
            <FormControlLabel mb="$2">
              <Heading size="md">4. RadioGroup + Form Control</Heading>
            </FormControlLabel>
            <RadioGroup
              value={radioValue}
              onChange={(nextValue: string) => {
                setRadioValue(nextValue);
              }}
            >
              <VStack space="sm">
                <Radio value="react">
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>React Native</RadioLabel>
                </Radio>
                <Radio value="flutter">
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>Flutter</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </FormControl>

          {/* --- 5. Select (FormControlled) --- */}
          <FormControl>
            <FormControlLabel mb="$2">
              <Heading size="md">5. Select (FormControlled)</Heading>
            </FormControlLabel>
            <Select
              selectedValue={selectValue}
              onValueChange={(value: string) => setSelectValue(value)}
            >
              <SelectTrigger>
                <SelectInput placeholder="Selecciona un lenguaje" />
                <SelectIcon as={ChevronDownIcon} mr="$3" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="JavaScript" value="js" />
                  <SelectItem label="Python" value="py" />
                  <SelectItem label="Java" value="java" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

         {/* --- 6. Slider + Max y Min --- */}
          <FormControl>
            <FormControlLabel mb="$2">
              <Heading size="md">
                6. Slider (Valor: {sliderValue.toFixed(0)})
              </Heading>
            </FormControlLabel>
            <Slider
              step={1}
              value={sliderValue}
              onChange={(value: number) => {
                setSliderValue(value);
              }}
              minValue={0}
              maxValue={100}
            >
              <SliderTrack 
                h="$1.5" // <-- Dale una altura
                rounded="$full" // <-- Redondea las esquinas
                bg="$gray300" // <-- Dale un color de fondo
              >
                <SliderFilledTrack 
                  h="$1.5" // <-- Misma altura
                  rounded="$full" // <-- Misma redondez
                  bg="$blue500" // <-- Color de relleno que combina con el punto
                />
              </SliderTrack>
              
              <SliderThumb />
            </Slider>
          </FormControl>

          {/* --- 7. Switch + Checked State --- */}
          <FormControl>
            <Heading size="md" mb="$2">
              7. Switch + Checked State
            </Heading>
            <HStack space="md" alignItems="center">
              <Switch
                value={switchValue}
                onToggle={() => setSwitchValue(!switchValue)}
              />
              <Text>{switchValue ? 'Activado' : 'Desactivado'}</Text>
            </HStack>
          </FormControl>

          {/* --- 8. TextArea + FormControl --- */}
          <FormControl>
            <FormControlLabel mb="$2">
              <Heading size="md">8. TextArea + Form Control</Heading>
            </FormControlLabel>
            <Textarea h={100}>
              <TextareaInput
                placeholder="Escribe tus comentarios aquí..."
                value={textAreaValue}
                onChangeText={(text: string) => setTextAreaValue(text)}
              />
            </Textarea>
          </FormControl>
        </VStack>
      </Box>
    </ScrollView>
  );
}