import React, {useEffect, useRef} from 'react';
import {Dimensions, View, Animated, Easing, Image} from 'react-native';
import {Images} from '@config/Images';
import GetStyles from './styles';

const SplashScreen = ({navigation}) => {
  const styles = GetStyles();

  const {width: screenWidth} = Dimensions.get('window');

  const textPosition = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.timing(textPosition, {
      toValue: screenWidth,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.reset({
        routes: [{name: 'UserTab'}],
      });
    }, 1500);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.imgStyle}
          source={Images.darkLogo}
        />

        <Animated.View
          style={[
            styles.animationCont,
            {
              transform: [{translateX: textPosition}],
            },
          ]}
        />
      </View>
    </>
  );
};

export default SplashScreen;
