import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@screens/SplashScreen.js';
import Login from '@screens/Login.js';
import OtpVerify from '@screens/OtpVerify';
import Register from '@screens/Register';
import Dashboard from '@screens/Dashboard';
const Stack = createStackNavigator();

export const navigationRef = React.createRef();

export const MainStackNavigation = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OtpVerify" component={OtpVerify} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
