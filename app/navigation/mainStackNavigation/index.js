import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@screens/SplashScreen.js';
import Login from '@screens/Login.js';
import OtpVerify from '@screens/OtpVerify';
import Register from '@screens/Register';
import EditProfile from '@screens/User/EditProfile';
import BusinessForm from '@screens/AddBusiness/BusinessForm';
import useGlobalStore from '@zustand/store';
import CustomDrawer from '@navigation/CustomDrawer';
import EditGallery from '@screens/Business/EditGallery';
import EditBusiness from '@screens/Business/EditBusiness';
import JobDetails from '@screens/User/JobDetails';
import MyApplication from '@screens/User/MyApplication';
import AddressUpdate from '@screens/User/EditProfile/AddressUpdate';
import EducationUpdate from '@screens/User/EditProfile/EducationUpdate';
import ExperienceUpdate from '@screens/User/EditProfile/ExperienceUpdate';
import SkillUpdate from '@screens/User/EditProfile/SkillUpdate';
import PostJob from '@screens/Business/PostJob';
import ManageJob from '@screens/Business/ManageJob';
import Credits from '@screens/Business/Credits';
import Applicants from '@screens/Business/Applicants';
import ApplicantProfile from '@screens/Business/ApplicantProfile';
import MatchedResumes from '@screens/Business/MatchedResumes';
import JobEmployerDetails from '@screens/Business/JobEmployerDetails';
import CLoginModal from '@components/CLoginModal';

const Stack = createStackNavigator();

export const navigationRef = React.createRef();
export const loginModalRef = React.createRef();

export const MainStackNavigation = () => {
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  const linking = {
    prefixes: ['https://jobs.seaneb.com', 'https://jobs.seaneb.app'],
    config: {
      screens: {
        JobDetails: {
          path: 'jobs/company/:location/:slug',
        },
      },
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isAuthenticated ? 'UserTab' : 'SplashScreen'}>
          <Stack.Screen name="UserTab" component={CustomDrawer} />
          <Stack.Screen name="BusinessTab" component={CustomDrawer} />
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
          <Stack.Screen name="AddressUpdate" component={AddressUpdate} />
          <Stack.Screen name="EducationUpdate" component={EducationUpdate} />
          <Stack.Screen name="ExperienceUpdate" component={ExperienceUpdate} />
          <Stack.Screen name="SkillUpdate" component={SkillUpdate} />
          <Stack.Screen name="PostJob" component={PostJob} />
          <Stack.Screen name="ManageJob" component={ManageJob} />
          <Stack.Screen name="Credits" component={Credits} />
          <Stack.Screen name="Applicants" component={Applicants} />
          <Stack.Screen name="ApplicantProfile" component={ApplicantProfile} />
          <Stack.Screen name="MatchedResumes" component={MatchedResumes} />
          <Stack.Screen
            name="JobEmployerDetails"
            component={JobEmployerDetails}
          />
        </Stack.Navigator>
        <CLoginModal ref={loginModalRef} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
