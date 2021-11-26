import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation } from 'react-query';
import TicketResult from './TicketResult';
const axios = require('axios');
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from "@react-navigation/compat";
import {
  View,
  Button,
  Box,
  VStack,
  Spinner,
  Text,
  IconButton,
  Center,
  HStack,
  Divider,
  ScrollView
} from 'native-base';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Item = ({ id, name, count, setList, list }) => {
  const delThisItem = _ => {
    setList([...list.filter(x => x.id !== id)]);
  };
  return (<Box w='98%' borderRadius={9} mx={1} h={75} p='1.5%' bg='muted.200' mt={2} flexDirection='row' justifyContent='space-between'>
    <View w='10%' justifyContent='center' alignItems='center'>
      <Text fontSize='20px'>{count}</Text>
    </View>
    <View w='90%' justifyContent='space-between' flexDirection='row' alignItems='center'>
      <Text fontSize='20px' bold color='muted.800' isTruncated maxW="85%">{name}</Text>
      <View w='15%'>
        <ButtonIco name='delete' color='muted.500' onPress={delThisItem} />
      </View>
    </View>
  </Box>);
};

const ButtonIco = ({
  name = 'menu',
  color = 'tertiary.600',
  size = 'md',
  onPress = _ => { }
}) => {
  return (<IconButton
    borderRadius="full"
    _icon={{
      color: color,
      size: size,
      as: MaterialCommunityIcons,
      name: name,
    }}
    onPress={_ => onPress()}
  />
  )
}

const DialogScannQR = ({ list, setList, isFetching, scanned, obj, setScanned }) => {
  const [cant, setCant] = useState(1);
  const addProduct = _ => {
    setList([...list.filter(x => x.id !== obj.id), { ...obj, count: cant }]);
    setScanned(false);
    setCant(1);
  };
  return (
    <Box width='100%' flex={1}>
      {isFetching && <HStack alignItems="center" p='auto' w='100%' h='100%'>
        <Center w='100%'>
          <Spinner color='tertiary.600' size='lg' />
        </Center>
      </HStack>}
      {obj && scanned && !isFetching && <VStack p='5' bg='rgba(0,0,0,0.5)' spaces={3} w='100%' h='100%'>
        <VStack flex={0.33}>
          <Text color='#fff' fontSize='28px' bold>{obj.name}</Text>
          <Text color='tertiary.600'>{obj.id}</Text>
        </VStack>
        <HStack w='100%' flex={0.53} px='25%' alignItems='center' justifyContent='space-between'>
          <ButtonIco name={'minus-circle'} onPress={_ => { setCant(cant - 1 > 1 ? cant - 1 : 1) }} />
          <Text color='#fff' fontSize='35px'>{cant}</Text>
          <ButtonIco name={'plus-circle'} onPress={_ => { setCant(cant + 1 <= obj.stock ? cant + 1 : obj.stock) }} />
        </HStack>
        <HStack flex={0.20} w='100%' alignItems='center' justifyContent='space-between'>
          <Text color='#fff' fontSize='25px' bold>${(obj.price * cant).toFixed(2)}</Text>
          <HStack w='155' justifyContent='space-between'>
            <Button borderRadius={50} colorScheme="error" onPress={_ => setScanned(false)}>Cancelar</Button>
            <Button borderRadius={50} colorScheme="tertiary" onPress={_ => addProduct()}>Agregar</Button>
          </HStack>
        </HStack>
      </VStack>}
      {!scanned && !isFetching && <HStack bg='rgba(0,0,0,0)' alignItems="center" p='auto' w='100%' h='100%'>
        <Center w='100%'>
          <Divider h={2} opacity={0.5} bg='error.600' />
        </Center>
      </HStack>}
      {!obj && scanned && !isFetching && <HStack bg='rgba(0,0,0,0.5)' alignItems="center" p='auto' w='100%' h='100%'>
        <Center w='100%'>
          <MaterialCommunityIcons size={50} color='#991b1b' name='alert-circle-outline' />
          <Text bold fontSize='20' color='#991b1b'>No Encontrado</Text>
          <Button mt='15' colorScheme='tertiary' onPress={_ => setScanned(false)}>Volver</Button>
        </Center>
      </HStack>}
    </Box>
  )
};

const QRScreen = (props) => {
  const { screenProps, navigation } = props;
  const { token, user } = screenProps;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(_ => {
    setTotal(listItems.map(x => x.price * x.count).reduce((a, b) => { return a + b }, 0));
  }, [listItems]);
  const { mutate: searchProduct, isFetching, isLoading } = useMutation(id => axios.get(`https://api.fgdev.ar/pharma/product/${id}`), {
    onSuccess: rep => {
      if (rep.data.success) {
        setCurrentProduct(rep.data.data);
      } else {
        setCurrentProduct(false);
      }
    }
  });
  const { mutate: getTicket } = useMutation(_ => axios.post('https://api.fgdev.ar/pharma/ticket/', {
    items: listItems
  }, { headers: { Authorization: token } }), {
    onSuccess: async res => {
      navigation.navigate('result', res.data);
    }
  });
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setTimeout(_ => {
      searchProduct(data);
    }, 50);
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.qr}>
        <Camera
          style={StyleSheet.absoluteFillObject}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.qr, BarCodeScanner.Constants.BarCodeType.code128],
          }}
          onBarCodeScanned={scanned ? _ => { } : handleBarCodeScanned}
          ratio={1.33}
          type={Camera.Constants.Type.back}>
          <View style={styles.buttonContainer}>
          </View>
        </Camera>
        <DialogScannQR
          isFetching={isFetching || isLoading}
          list={listItems}
          setList={setListItems}
          scanned={scanned}
          setScanned={setScanned}
          obj={currentProduct}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.mt}>
          <ScrollView w='100%' flex={0.85}>
            {listItems.length > 0 ? <>
              {listItems.map((x, i) => <Item key={i} list={listItems} setList={setListItems} {...x} />)}
              <Button flex={1} borderRadius={50} p={2} _text={{ fontSize: '19px' }} m={5} colorScheme='error' onPress={_ => setListItems([])}>Cancelar compra</Button>
            </> :
              <HStack height='100%' flex={1} justifyContent='center' alignItems="center" py='45%' alignItems="center">
                <Center w='100%'>
                  <MaterialCommunityIcons size={50} color='#D4D4D4' name='store' />
                  <Text bold fontSize='20' color='#D4D4D4'>No hay productos</Text>
                </Center>

              </HStack>
            }
          </ScrollView>
          <Box shadow={0.5} p='3' flex={0.15} alignItems='center' flexDirection='row'>
            <Text bold fontSize='22px' mr='15px' color='muted.800'>Total: ${total.toFixed(2)}</Text>
            <Button disabled={listItems.length === 0} onPress={_ => { getTicket() }} flex={1} borderRadius={50} p={2} _text={{ fontSize: '19px' }} colorScheme={listItems.length === 0 ? 'muted' : 'tertiary'}>Finalizar</Button>
          </Box>
        </View>
      </View>
    </View >
  );
}
const SwitchNavigator = createSwitchNavigator({
  tienda: QRScreen,
  result: TicketResult,
}, {
  initialRouteName: 'tienda',
  // backBehavior: 'none'
});
export default function(props) {
  return (
    <NavigationContainer independent={true}>
      <SwitchNavigator screenProps={props.route.params} />
    </NavigationContainer>
  )
};
const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  qr: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 0.67,
  },
  mt: {
    flex: 1,
  }
});
