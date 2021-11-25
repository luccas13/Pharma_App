import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './views/Main';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  // Button,
  Box,
  // HamburgerIcon,
  Pressable,
  // Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
} from 'native-base';
const Drawer = createDrawerNavigator();
function Component(props) {
  return (
    <Center>
      <Text mt="12" fontSize="18">This is {props.route.name} page.</Text>
    </Center>
  );
}

const getIcon = (screenName) => {
  switch (screenName) {
    case 'Inbox':
      return 'email';
    case 'Outbox':
      return 'send';
    case 'Favorites':
      return 'heart';
    case 'Archive':
      return 'archive';
    case 'Trash':
      return 'trash-can';
    case 'Spam':
      return 'alert-circle';
    default:
      return undefined;
  }
};

const mainViews = [
  { name: 'Inbox', icon: 'email', component: Component },
  { name: 'Outbox', icon: 'send', component: Component },
  { name: 'Favorites', icon: 'heart', component: Component },
  { name: 'Archive', icon: 'alert-circle', component: Component },
];

const ItemMenu = ({ name, index, navigation, state }) => {
  return (<Pressable
    px="5"
    py="3"
    rounded="md"
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
          index === state.index ? 'primary.500' : 'gray.500'
        }
        size="5"
        as={<MaterialCommunityIcons name={getIcon(name)} />}
      />
      <Text
        fontWeight="500"
        color={
          index === state.index ? 'primary.500' : 'gray.700'
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
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            john_doe@gmail.com
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => <ItemMenu {...props} name={name} index={index} />)}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Inbox" component={Component} />
        <Drawer.Screen name="Outbox" component={Component} />
        <Drawer.Screen name="Favorites" component={Component} />
        <Drawer.Screen name="Archive" component={Component} />
        <Drawer.Screen name="Main" component={Main} />
      </Drawer.Navigator>
    </Box>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyDrawer />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

// <Drawer.Screen name="Spam" component={Component} />
