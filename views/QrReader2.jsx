import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation } from 'react-query';
const axios = require('axios');
import {
  View,
  Button,
  Box,
  VStack,
  Spinner,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
} from 'native-base';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
const Item = _ => { };
const DialogAddProduct = _ => {
};

function QR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [currentProduct, setCurrentProduct] = useState({});
  const { mutate: searchProduct, isFetching, isLoading } = useMutation(_ => axios.get(`https://api.fgdev.ar/pharma/product/${currentId}`, {
    onSuccess: (rep) => {
      if (rep.data.success) {
        setCurrentProduct(rep.data.data);
        console.log(currentProduct);
      }
      console.log(rep.data, currentProduct);
    }
  }))
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCurrentId(data);
    searchProduct();
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
          onBarCodeScanned={scanned ? _ => { console.log('noo') } : handleBarCodeScanned}
          ratio={1.33}
          type={Camera.Constants.Type.back}>
          <View style={styles.buttonContainer}>
          </View>
        </Camera>
      </View>
      <View style={styles.content}>
        {scanned ?
          <Box style={styles.mt}>
            <VStack>
              <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>
              <Text>{currentId}</Text>
              {isFetching || isLoading ? <Spinner /> : <Text>IN</Text>}
            </VStack>
          </Box> :
          <View style={styles.mt}>
            <Text>Waiting...</Text>
          </View>}
      </View>
    </View >
  );
}

export default QR;
const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  qr: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 0.67,
    backgroundColor: 'red'
  },
  mt: {
    flex: 1,
    backgroundColor: '#c0c0c0'
  }
});
// {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
