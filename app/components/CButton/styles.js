import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    outLineBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: size.moderateScale(5),
      paddingVertical: size.moderateScale(10),
      borderWidth: 1,
      backgroundColor: 'transparent',
      borderColor: color?.black,
    },
    outLineLabel: {
      color: color?.black,
    },
    linkBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.transparent,
      borderRadius: size.moderateScale(5),
      paddingVertical: size.moderateScale(10),
    },
    linkLabel: {
      color: color.black,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    staticContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: size.moderateScale(5),
      paddingVertical: size.moderateScale(10),
      backgroundColor: color?.secondary,
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(10),
    },
    contentCenter: {
      alignItems: 'center',
      gap: size.moderateScale(10),
    },
    label: {
      color: color?.white,
    },
  });
};
export default GetStyles;
