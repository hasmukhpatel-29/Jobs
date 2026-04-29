import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '@screens/SplashScreen.js';
import Login from '@screens/Login.js';
import OtpVerify from '@screens/OtpVerify';
import Register from '@screens/Register';
import EditProfile from '@screens/EditProfile';
import BusinessForm from '@screens/AddBusiness/BusinessForm';
import useGlobalStore from '@zustand/store';
import CustomDrawer from '@navigation/CustomDrawer';
import {businessTabConfig} from '@navigation/businessTabConfig';
import EditGallery from '@screens/Business/EditGallery';
import EditBusiness from '@screens/Business/EditBusiness';
import BottomTabBar from '@navigation/BottomTab';
import BusinessProfile from '@screens/Business/BusinessProfile';
import BusinessDiscover from '@screens/Business/BusinessDiscover';
import JobDetails from '@screens/User/JobDetails';
import MyApplication from '@screens/User/MyApplication';
import CLoginModal from '@components/CLoginModal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const navigationRef = React.createRef();
export const loginModalRef = React.createRef();

export const BusinessBottomTab = () => {
  const renderBusinessTab = props => (
    <BottomTabBar {...props} config={businessTabConfig} />
  );
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={renderBusinessTab}>
      <Tab.Screen name="BusinessDiscover" component={BusinessDiscover} />
      <Tab.Screen name="BusinessProfile" component={BusinessProfile} />
    </Tab.Navigator>
  );
};

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
          <Stack.Screen name="BusinessTab" component={BusinessBottomTab} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OtpVerify" component={OtpVerify} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="BusinessForm" component={BusinessForm} />
          <Stack.Screen name="EditGallery" component={EditGallery} />
          <Stack.Screen name="EditBusiness" component={EditBusiness} />
          <Stack.Screen name="JobDetails" component={JobDetails} />
          <Stack.Screen name="MyApplication" component={MyApplication} />
        </Stack.Navigator>
        <CLoginModal ref={loginModalRef} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
