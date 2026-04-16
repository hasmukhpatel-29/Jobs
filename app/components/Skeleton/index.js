import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const Skeleton = ({height = 20, width = '100%', borderRadius = 8}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, width],
  });

  return (
    <View
      style={[
        styles.container,
        {height, width, borderRadius},
      ]}>
      <Animated.View
        style={[
          styles.shimmer,
          {transform: [{translateX}]},
        ]}>
        <LinearGradient
          colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

export default React.memo(Skeleton);