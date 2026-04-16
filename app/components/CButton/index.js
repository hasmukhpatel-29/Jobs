/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useCallback} from 'react';
import {
  ActivityIndicator,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GetTypography} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import GetStyles from './styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const CButton = ({
  label,
  onPress,
  buttonLabelStyle,
  buttonStyle,
  activeOpacity = 0.8,
  loading = false,
  disabled = false,
  animateScale = false,
  outLineBtn = false,
  linkBtn = false,
  iconName,
}) => {
  const {color} = useThemeContext();
  const styles = GetStyles();
  const Typography = GetTypography();

  const isDisabled = disabled || loading;

  const scale = useRef(new Animated.Value(0.96)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  return (
    <>
      {outLineBtn ? (
        <AnimatedTouchable
          onPress={onPress}
          onPressIn={!isDisabled ? handlePressIn : undefined}
          onPressOut={!isDisabled ? handlePressOut : undefined}
          activeOpacity={isDisabled ? 1 : activeOpacity}
          disabled={isDisabled}
          style={[
            styles.outLineBtnContainer,
            {
              opacity: isDisabled ? 0.5 : 1,
            },
            buttonStyle,
            animateScale && {transform: [{scale}]},
          ]}>
          <View style={styles.contentRow}>
            {iconName && (
              <CustomIcon
                name={iconName}
                size={size.moderateScale(15)}
                color={color?.black}
              />
            )}
            <Text
              style={[
                Typography.buttomLabel,
                buttonLabelStyle,
                styles.outLineLabel,
              ]}>
              {label}
            </Text>

            {loading && <ActivityIndicator size="small" color={color?.black} />}
          </View>
        </AnimatedTouchable>
      ) : linkBtn ? (
        <AnimatedTouchable
          onPress={onPress}
          onPressIn={!isDisabled ? handlePressIn : undefined}
          onPressOut={!isDisabled ? handlePressOut : undefined}
          activeOpacity={isDisabled ? 1 : activeOpacity}
          disabled={isDisabled}
          style={[
            styles.linkBtnContainer,
            {
              opacity: isDisabled ? 0.5 : 1,
            },
            buttonStyle,
            animateScale && {transform: [{scale}]},
          ]}>
          <View style={styles.contentRow}>
            <Text
              style={[
                Typography.buttomLabel,
                styles.linkLabel,
                buttonLabelStyle,
              ]}>
              {label}
            </Text>

            {loading && <ActivityIndicator size="small" color={color?.black} />}
          </View>
        </AnimatedTouchable>
      ) : (
        <AnimatedTouchable
          onPress={onPress}
          onPressIn={!isDisabled ? handlePressIn : undefined}
          onPressOut={!isDisabled ? handlePressOut : undefined}
          activeOpacity={isDisabled ? 1 : activeOpacity}
          disabled={isDisabled}
          style={[
            styles.staticContainer,
            {
              opacity: isDisabled ? 0.5 : 1,
            },
            buttonStyle,
            animateScale && {transform: [{scale}]},
          ]}>
          <View style={styles.contentRow}>
            <Text
              style={[Typography.buttomLabel, buttonLabelStyle, styles.label]}>
              {label}
            </Text>

            {loading && <ActivityIndicator size="small" color={color?.white} />}
          </View>
        </AnimatedTouchable>
      )}
    </>
  );
};
