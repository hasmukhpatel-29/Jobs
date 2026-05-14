import React, {useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, useColorScheme} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {BlurView} from '@react-native-community/blur';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily} from '@config/theme';
import GetStyles from './styles';

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
  config = [],
}) {
  const {color} = useThemeContext();
  const styles = GetStyles();
  const colorScheme = useColorScheme();

  const tabRefs = useRef([]);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const iconAnimation = index => {
    tabRefs.current[index]?.tada?.(700);
  };

  const renderTab = (route, isFocused, index) => {
    const tab = config.find(t => t.name === route.name);
    if (!tab) return null;

    const tabIconColor = isFocused ? color.primary : color.black;
    const tabText = isFocused ? fontFamily.bold : fontFamily.regular;

    return (
      <>
        <Animatable.View
          ref={ref => (tabRefs.current[index] = ref)}
          style={styles.iconContainer}>
          {tab.icon(isFocused, tabIconColor)}
        </Animatable.View>

        <Text
          style={[
            styles.bottomTabLabels,
            {color: tabIconColor, fontFamily: tabText},
          ]}>
          {tab.label}
        </Text>
      </>
    );
  };

  return (
    <View style={styles.tabContainer}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={colorScheme === 'light' ? "light" : "dark"}
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
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

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={onPress}
              onLongPress={() => {
                const event = navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!event.defaultPrevented) {
                }
              }}
              style={styles.tab}>
              {renderTab(route, isFocused, index)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
