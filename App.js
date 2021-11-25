import * as React from 'react';
import Main from './views/Main';
import Login from './views/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from "@react-navigation/compat";
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeBaseProvider } from 'native-base';

const SwitchNavigator = createSwitchNavigator({
  login: Login,
  home: Main,
}, {
  initialRouteName: 'login',
  backBehavior: 'none'
});

export default function App() {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <QueryClientProvider client={queryClient}>
          <SwitchNavigator />
        </QueryClientProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
