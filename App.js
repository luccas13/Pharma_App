import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { MaterialCommunityIcons } from "@expo/vector-icons"; // https://materialdesignicons.com/
// import { Icon } from "react-native-elements";

// views
import Home from "./views/Home";
import Productos from './views/Productos';
import Detail from './views/Detail';
// contexts
import { UserProvider } from './contexts/UsersContext';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='PRODUCTS' >
          <Stack.Screen name='PRODUCTS' component={Home} 
            options={({navigation}) => ({ 
              title: "Productos",
              // headerRight: () => (
              //   <Icon 
              //   style={{paddingRight: 10}}
              //   color="green"
              //   name="plus" 
              //   type="material-community" 
              //   size={35}
              //   onPress={()=> navigation.navigate('ADD-EDIT', {create: true})}/>
              //   ),
            })}
          />
          <Stack.Screen name='ADD-EDIT' component={Productos} options={{ title: "Agregar/Editar Producto" }}/>
          <Stack.Screen name='DETAIL' component={Detail} options={{ title: "Detalle del producto" }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
