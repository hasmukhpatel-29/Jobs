import {StyleSheet} from 'react-native';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      backgroundColor: color.white,
      flex: 1,
    },
    mainView: {
      padding: size.moderateScale(20),
    },
    cityInputStyle: {
      flexDirection: 'row',
      gap: size.moderateScale(10),
    },
    inputStyle: {
      flex: 1,
    },
    title: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
      marginBottom: 10,
    },
    floatingBtn: {margin: 15, alignSelf: 'center', width: '90%'},
  });
};
export default GetStyles;
