import {Dimensions, StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: color.customWhite(0.7),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelView: {
      position: 'absolute',
      top: size.moderateScale(40),
      right: size.moderateScale(20),
      height: size.moderateScale(30),
      width: size.moderateScale(30),
      backgroundColor: color.black,
      zIndex: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageView: {
      width: size.deviceWidth,
      height: size.deviceWidth,
    },
    imageContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
};
export default GetStyles;
