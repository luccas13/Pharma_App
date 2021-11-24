import * as React from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
const axios = require('axios');
import { Alert } from 'react-native';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from 'native-base';
const alertLogin = (msj) =>
  Alert.alert(
    "Authentication failed",
    msj,
    [
      {
        text: "Ok",
        style: "cancel"
      }
    ]
  );
export default function Login({ navigation }) {
  const [formData, setFormData] = useState({ user: '', password: '' });
  const { mutate: auth } = useMutation(
    _ => axios.post('https:api.fgdev.ar/pharma/auth', formData)
    , {
      onSuccess: ret => {
        if (ret.data.success) {
          let token = ret.data.data.token || null;
          console.log(ret.data, token);
          if (token) navigation.navigate('home', { token, user: formData.user });
        } else {
          if (ret.data.msj) { alertLogin(ret.data.msj) }
        }
      }
    });
  return (
    <Center flex={1} px="3">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome to Pharma App!
          </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
          </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input onChangeText={t => { setFormData({ ...formData, user: t }); }} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={t => { setFormData({ ...formData, password: t }); }} />
          </FormControl>
          <Button mt="2" onPress={auth} colorScheme="tertiary">
            Sign in
            </Button>
        </VStack>
      </Box>
    </Center>
  )
}
