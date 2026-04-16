import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';
import {size} from '@config/Sizes';

const GetStyles = () => {
  // Access theme colors using useTheme hook
  const {color} = useThemeContext();

  return StyleSheet.create({
    disabledOptionStyle: {
      color: color.gray,
    },
    radioBtnContainer: {flexDirection: 'row', alignItems: 'center'},
    indicatorContainer: disabled => ({
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: disabled ? color.gray : color.blue,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    indicator: disabled => ({
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: disabled ? color.gray : color.blue,
    }),
    labelText: {
      marginLeft: 10,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.small,
      color: color.black,
    },
    errorMessageText: {
      color: color.red,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      marginTop: size.moderateScale(5),
    },
  });
};
export default GetStyles;
