import React, {useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';
import Icon, {Icons} from '@config/Icons';
import {CustomIcon} from '@config/LoadIcons';
import {fontFamily} from '@config/theme';

export default function BottomTabBar({state, descriptors, navigation}) {
  const {color} = useThemeContext();
  const styles = GetStyles();

  const homeTabRef = useRef(null);
  const favouritesTabRef = useRef(null);
  const profileTabRef = useRef(null);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  // Hide tab if needed
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  // Animation
  const iconAnimation = index => {
    if (index === 0) {
      homeTabRef?.current?.tada?.(800);
    } else if (index === 1) {
      favouritesTabRef?.current?.tada?.(800);
    } else if (index === 2) {
      profileTabRef?.current?.tada?.(800);
    }
  };

  // Icons
  const getIcons = (routeName, isFocused) => {
    const tabIconColor = isFocused ? color.primary : color.black;
    const tabText = isFocused ? fontFamily.bold : fontFamily.regular;

    switch (routeName) {
      case 'Dashboard':
        return (
          <>
            <Animatable.View style={styles.iconContainer} ref={homeTabRef}>
              <Icon
                type={Icons.Ionicons}
                name={isFocused ? 'home' : 'home-outline'}
                style={[styles.bottomTabIcons, {color: tabIconColor}]}
              />
            </Animatable.View>

            <Text
              style={[
                styles.bottomTabLabels,
                {color: tabIconColor, fontFamily: tabText},
              ]}>
              Home
            </Text>
          </>
        );
      case 'Favourites':
        return (
          <>
            <Animatable.View style={styles.iconContainer} ref={favouritesTabRef}>
              <CustomIcon
                name={isFocused ? 'likeFilled' : 'like'}
                style={[styles.bottomTabIcons, {color: tabIconColor}]}
              />
            </Animatable.View>

            <Text
              style={[
                styles.bottomTabLabels,
                {color: tabIconColor, fontFamily: tabText},
              ]}>
              Favourites
            </Text>
          </>
        );

      case 'Profile':
        return (
          <>
            <Animatable.View style={styles.iconContainer} ref={profileTabRef}>
              <CustomIcon
                name={isFocused ? 'user' : 'userProfile'}
                style={[styles.bottomTabIcons, {color: tabIconColor}]}
              />
            </Animatable.View>

            <Text
              style={[
                styles.bottomTabLabels,
                {color: tabIconColor, fontFamily: tabText},
              ]}>
              Profile
            </Text>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            iconAnimation(index);

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}>
              {getIcons(route.name, isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
