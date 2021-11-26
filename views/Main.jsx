import * as React from 'react';
import QrReader2 from '../views/QrReader2';
import Detail from '../views/Detail';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
} from 'native-base';
const Drawer = createDrawerNavigator();
function Component(props) {
  console.log(props);
  const { token, user } = props.route.params;
  return (
    <Center>
      <Text mt="12" fontSize="18">This is {props.route.name} page.</Text>
      <Text mt="12" fontSize="18">Token: {token}</Text>
      <Text mt="12" fontSize="18">User: {user}</Text>
    </Center>
  );
}

const mainViews = [
  { name: 'Caja', icon: 'cart', component: Component },
  { name: 'Product', icon: 'medical-bag', component: Component },
  { name: 'ReadQR', icon: 'qrcode', component: QrReader2 },
  { name: 'Product Detail', icon: 'card', component: Detail },
];

const ItemMenu = ({ name, index, navigation, state, icon }) => {
  return (<Pressable
    px="5"
    py="3"
    // rounded="md"
    bg={
      index === state.index
        ? 'rgba(6, 182, 212, 0.1)'
        : 'transparent'
    }
    onPress={_ => {
      navigation.navigate(name);
    }}>
    <HStack space="7" alignItems="center">
      <Icon
        color={
          index === state.index ? 'tertiary.500' : 'gray.500'
        }
        size="5"
        as={<MaterialCommunityIcons name={icon} />}
      />
      <Text
        fontWeight="500"
        color={
          index === state.index ? 'tertiary.500' : 'gray.700'
        }
      >
        {name}
      </Text>
    </HStack>
  </Pressable>)
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="0">
        <Box px="4">
          <Text bold color="gray.700">
            Pharma App
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {props.user}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => <ItemMenu {...props} icon={Object.fromEntries(mainViews.map(x => [x.name, x.icon]))[name]} name={name} index={index} />)}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

const MyDrawer = ({ navigation }) => {
  const params = navigation.state.params;
  console.log(params);
  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent user={params.user} {...props} />}>
        {mainViews.map(v => (<Drawer.Screen
          name={v.name}
          initialParams={{ mainNavigation: navigation, ...params }}
          component={v.component}
        />))}
      </Drawer.Navigator>
    </Box>
  );
}
export default function(props) {
  return (
    <NavigationContainer independent={true}>
      <NativeBaseProvider>
        <MyDrawer {...props} />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
