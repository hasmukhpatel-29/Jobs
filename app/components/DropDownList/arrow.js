import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {CustomIcon} from '@config/LoadIcons';
import { useThemeContext } from '@contexts/themeContext';

const Arrow = ({isOpen}) => {
  const {color} = useThemeContext();

  const progress = useDerivedValue(() =>
    isOpen ? withTiming(1) : withTiming(0),
  );
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * -180}deg`}],
  }));

  return (
    <Animated.View style={iconStyle}>
      <CustomIcon
        name="arrowDown"
        size={12}
        color={color.placeholderText}
      />
    </Animated.View>
  );
};

export default Arrow;
