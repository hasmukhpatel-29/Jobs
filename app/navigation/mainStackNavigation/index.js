import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@screens/SplashScreen.js';
import Login from '@screens/Login.js';
import OtpVerify from '@screens/OtpVerify';
import Register from '@screens/Register';
import EditProfile from '@screens/EditProfile';
import useGlobalStore from '@zustand/store';
import CustomDrawer from '@navigation/CustomDrawer';
const Stack = createStackNavigator();

export const navigationRef = React.createRef();

export const MainStackNavigation = () => {
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isAuthenticated ? 'UserTab' : 'SplashScreen'}>
          <Stack.Screen name="UserTab" component={CustomDrawer} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OtpVerify" component={OtpVerify} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
