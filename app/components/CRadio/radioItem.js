import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';

const RadioItem = ({
  option,
  selected,
  onPress,
  styles,
  disabled,
  singleStyle,
  txtStyle,
}) => {
  const scale = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.radioBtnContainer,
        singleStyle,
        disabled && styles.disabledOptionStyle,
      ]}
      disabled={disabled}
    >
      <View style={styles.indicatorContainer(disabled)}>
        <Animated.View
          style={[
            styles.indicator(disabled),
            {
              transform: [{ scale }],
              opacity: scale,
            },
          ]}
        />
      </View>

      <Text style={[styles.labelText, txtStyle]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(RadioItem);