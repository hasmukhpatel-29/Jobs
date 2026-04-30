import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainContainer: {
      borderRadius: 5,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: color.customBlack(0.3),
      maxHeight: 200,
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: '#ffffff', // Or use your theme color e.g., color.white
      zIndex: 9999,
    },
    item: {
      padding: 12,
    },
    text: {
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmallMedium,
    },
    separator: {
      height: 1,
      backgroundColor: color.customBlack(0.3),
      marginHorizontal: 10,
    },
    emptyText: {
      padding: 12,
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmallMedium,
      textAlign: 'center',
    },
  });
};
export default GetStyles;
