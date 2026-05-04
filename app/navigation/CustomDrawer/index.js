/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
// DrawerNavigator.js
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '@navigation/BottomTab';
import {userTabConfig} from '@navigation/userTabConfig';
import {loginModalRef} from '@navigation/mainStackNavigation';
import {businessTabConfig} from '@navigation/businessTabConfig';
import Profile from '@screens/Profile';
import Dashboard from '@screens/Dashboard';
import Favourites from '@screens/Favourites';
import BusinessDiscover from '@screens/Business/BusinessDiscover';
import BusinessProfile from '@screens/Business/BusinessProfile';
import CImage from '@components/CImage';
import {CButton} from '@components/CButton';
import CommonModal from '@components/CModal/CommonModal';
import {busDashboardList, dashboardList} from '@config/staticData';
import {Images} from '@config/Images';
import {CustomIcon} from '@config/LoadIcons';
import {useThemeContext} from '@contexts/themeContext';
import useGlobalStore from '@zustand/store';
import {getImageUrl} from '@utils/commonFunction';
import Icon, {Icons} from '@config/Icons';
import {logoutApi} from '@apis/ApiRoutes/LoginApi';
import Overlay from './overlay';
import GetStyles from './styles';

const CustomDrawer = ({route, navigation}) => {
  const {color} = useThemeContext();
  const IOS = Platform.OS === 'ios';
  const styles = GetStyles();

  const Tab = createBottomTabNavigator();

  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });
  const userMeData = useGlobalStore(s => s.userMeData);
  const userRole = useGlobalStore.getState().userRole;
  const isBusiness = userRole?.toUpperCase() === 'BUSINESS';
  const currentTabConfig = isBusiness ? businessTabConfig : userTabConfig;

  // State Variables
  const [show, setShow] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [visible, setVisible] = useState(false);

  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {}, [show]);

  const config = {
    animation: 'timing',
    config: {
      stiffness: 750,
      damping: 300,
      mass: 2,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  let navOptions = {headerShown: false};
  if (!IOS) {
    navOptions = {
      headerShown: false,
      transitionSpec: {
        open: config,
        close: config,
      },
    };
  }

  const active = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => {
    const duration = 250;
    return {
      transform: [
        {perspective: 500},
        {
          scale: active.value
            ? withTiming(0.8, {
                duration: duration,
              })
            : withTiming(1, {
                duration: duration,
              }),
        },
        {
          translateX: active.value
            ? withTiming(screenWidth / 1.3, {
                duration: duration,
              })
            : withTiming(0, {
                duration: duration,
              }),
        },
      ],
      borderRadius: active.value
        ? withTiming(32, {
            duration: duration,
          })
        : withTiming(0, {
            duration: duration,
          }),
    };
  });

  const closeDrawer = () => {
    setShow(false);
    active.value = false;
  };
  const openDrawer = () => {
    setShow(true);
    active.value = true;
  };

  useEffect(() => {
    if (route?.params?.screen) {
      navigation.navigate(route?.params?.screen);
    }
  }, [route?.params?.screen]);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Images.background}
        resizeMode="cover"
        style={styles.container}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.27)', 'rgba(0, 0, 0, 0.87)']}
          style={styles.gredientStyle}
        />
        <View style={styles.contentContainer}>
          <View style={styles.profileImageAndCloseIconContainer}>
            <CImage
              src={getImageUrl(userMeData?.profile_photo)}
              style={styles.profileStyle}
            />
            <TouchableOpacity
              style={styles.drawerCloseIconBtn}
              onPress={() => {
                closeDrawer();
              }}
              activeOpacity={0.8}>
              <CustomIcon name="close" size={20} color={color.white} />
              <Text style={styles.textReturn}>Close</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.fullNameText}>
            {isAuthenticated ? userMeData?.full_name : 'Guest'}
          </Text>
          <FlatList
            data={isBusiness ? busDashboardList : dashboardList}
            style={styles.drawerList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    closeDrawer();
                    if (isAuthenticated) {
                      navigation.navigate(item?.navigate);
                    } else {
                      loginModalRef.current?.open();
                    }
                  }}
                  key={index}>
                  <Text style={styles.drawerTabText}>{item?.title}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item?.id}
          />

          <View style={styles.logoutMainCont}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (isAuthenticated) {
                  closeDrawer();
                  setTimeout(() => setVisible(true), 300);
                } else {
                  navigation.navigate('Login');
                }
              }}
              style={styles.logoutContainer}>
              <Text style={styles.logout}>
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Animated.View style={[styles.root, animatedStyle]}>
        <Tab.Navigator
          screenOptions={navOptions}
          tabBar={props => (
            <BottomTabBar {...props} config={currentTabConfig} />
          )}>
          {isBusiness ? (
            <>
              <Tab.Screen name="BusinessDiscover">
                {props => (
                  <BusinessDiscover {...props} openDrawer={openDrawer} />
                )}
              </Tab.Screen>
              <Tab.Screen name="BusinessProfile">
                {props => (
                  <BusinessProfile {...props} openDrawer={openDrawer} />
                )}
              </Tab.Screen>
            </>
          ) : (
            <>
              <Tab.Screen name="Dashboard">
                {props => <Dashboard {...props} openDrawer={openDrawer} />}
              </Tab.Screen>
              <Tab.Screen name="Favourites">
                {props => <Favourites {...props} openDrawer={openDrawer} />}
              </Tab.Screen>
              <Tab.Screen name="Profile">
                {props => <Profile {...props} openDrawer={openDrawer} />}
              </Tab.Screen>
            </>
          )}
        </Tab.Navigator>
      </Animated.View>
      <Overlay active={active} onPress={closeDrawer} />
      <CommonModal
        isVisible={visible}
        childrenViewStyle={styles.modalCont}
        onReject={() => setVisible(false)}>
        <View style={styles.textContainer}>
          <View style={styles.deleteIcon}>
            <Icon type={Icons.MaterialIcons} name="logout" color={color.red} />
          </View>
          <Text style={styles.deleteAccountText}>Logout</Text>
          <Text style={styles.titleText}>Are you sure you want to logout?</Text>
        </View>
        <View style={styles.btnContainer}>
          <CButton
            outLineBtn
            label="Cancel"
            buttonStyle={styles.btn}
            disabled={btnLoader}
            onPress={() => setVisible(false)}
          />
          <CButton
            label="Yes, Logout"
            buttonStyle={styles.btn}
            loading={btnLoader}
            disabled={btnLoader}
            onPress={() => {
              logoutApi();
              setVisible(false);
              setBtnLoader(true);
            }}
          />
        </View>
      </CommonModal>
    </View>
  );
};

export default CustomDrawer;
