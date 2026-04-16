import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import GetStyles from './styles';

const CTab = props => {
  const styles = GetStyles();
  const {
    data,
    valueProp = 'type',
    labelProp = 'name',
    onPress = () => {},
    selectedTab,
    style,
  } = props;

  const [dimensions, setDimensions] = useState({height: 20, width: 100});
  const buttonWidth = dimensions.width / data.length;

  const onTabBarLayout = e => {
    const {height, width} = e.nativeEvent?.layout;
    setDimensions({height, width});
  };

  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabPositionX.value}],
    };
  });

  return (
    <View style={[styles.wrapper, style]}>
      <Animated.View
        style={[
          animatedStyle,
          styles.selectedTab(dimensions.height, buttonWidth),
        ]}
      />
      <View onLayout={onTabBarLayout} style={{flexDirection: 'row'}}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                tabPositionX.value = withTiming(buttonWidth * index);
                onPress(item[valueProp]);
              }}
              style={styles.tab}>
              <Text
                style={[styles.text(selectedTab === item[valueProp])]}
                numberOfLines={1}
                adjustsFontSizeToFit>
                {item[labelProp]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default CTab;
