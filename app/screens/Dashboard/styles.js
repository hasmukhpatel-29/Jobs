import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    contentContainerStyle: {paddingBottom: 100},
    menuContainer: {
      padding: size.moderateScale(20),
    },
    columnContStyle: {justifyContent: 'space-between', gap: 20},
    card: {
      alignItems: 'center',
      gap: size.moderateScale(8),
    },
    iconContainer: {
      color: color.black,
      fontSize: size.moderateScale(26),
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: color.gray,
    },

    title: {
      fontSize: fontSize.verySmall,
      textAlign: 'center',
      fontFamily: fontFamily.regular,
      color: color.textColor,
    },
  });
};
export default GetStyles;
