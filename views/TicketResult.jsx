import * as React from 'react';
import {
  Box,
  VStack,
  Text,
  Pressable,
  ZStack,
  Center,
  Button,
  HStack,
  Divider,
  Icon,
} from 'native-base';
import { Linking } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function({ navigation }) {
  const { id, items, msj, author, total, type, date } = navigation.state.params.data;
  // const [id, items, msj] = ['619edee8251f5831730a8841', [], 'Stock Error at 0x00001 not point init to products on bloc e5yrfff-ert6853-sdfg'];
  let success = true;
  return (
    <ZStack bg='#fff' flex={1} justifyContent='space-between' alignItems='center'>
      <Box w='100%' h='50%' bg={success ? 'success.500' : 'error.500'} zIndex={0}></Box>
      <Box mt={0} h={'125px'} bg='rgba(0,0,0,0)' w='100%' justifyContent='center' alignItems='center'>
        <Icon
          as={MaterialCommunityIcons}
          name={success ? 'check-circle-outline' : 'alert-circle-outline'}
          size={'30px'}
          color="#fff"
          _dark={{
            color: "warmGray.50",
          }}
        />
        <Text bold fontSize='25' color='#fff' ml={3}>{success ? 'Operacion Exitosa' : 'Operacion Fallida'}</Text>
      </Box>
      <Box maxW='90%' mt='125px' h='70%' shadow={9} w='100%' px='5%' py='5%' mx='auto' bg='muted.100' borderRadius={'15px'}>
        <Box flex={1} p={[0, 0, '5%', 0]} bg='rgba(0,0,0,0.00)'>
          {success ?
            <VStack>
              <Text fontSize={'18px'} bold>Codigo de operacion:</Text>
              <Text fontSize={'18px'}>{id}</Text>
              <Text fontSize={'18px'} bold>Usuario:</Text>
              <Text fontSize={'18px'}>{author}</Text>
              <Text fontSize={'18px'} bold>Tipo:</Text>
              <Text fontSize={'18px'}>{type === 1 ? 'Factura' : 'Nota de credito'}</Text>
              <Text fontSize={'18px'} bold>Fecha:</Text>
              <Text fontSize={'18px'}>{date}</Text>
              <Text fontSize={'18px'} bold>Importe:</Text>
              <Text fontSize={'18px'}> ${total.toFixed(2)}</Text>
              <Divider h={0.8} />
              <Pressable py='30px' justifyContent='center' alignItems='center' onPress={_ => Linking.openURL(`https://api.fgdev.ar/pharma/ticket/${id}/view`)}>
                <QRCode value={`https://api.fgdev.ar/pharma/ticket/${id}/view`} size={180} />
                <Text italic mt='5px' color='#1B171F'> Click en el codigo QR para ver los detalles</Text>
              </Pressable>
            </VStack>
            :
            <Center flex={1}>
              <Icon
                as={MaterialCommunityIcons}
                name='alert-decagram-outline'
                size={150}
                color="#fff"
              />
              <Text textAlign="center">Error: {msj}</Text>
            </Center>
          }
        </Box>
      </Box>
      <Button p='4%' m='5%' w='90%' position={'absolute'} bottom={0} borderRadius={50} colorScheme={success ? 'success' : 'error'} _text={{ fontSize: 20, bold: true }} onPress={_ => { console.log('click'); navigation.goBack() }}>Volver</Button>
    </ZStack >)
}
