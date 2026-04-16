import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      // marginBottom: 15,
    },
    labelContainer: {
      flexDirection: 'row',
      marginBottom: 2,
      gap:5,
    },
    labelText: {
      marginBottom: 10,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.small,
      color: color.black,
    },
    inputWrapper: {
      height: size.moderateScale(45),
      borderRadius: 5,
      borderWidth: 1,
      borderColor: color.customBlack(0.3),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    placeholder: {
      fontFamily: fontFamily.regular,
      color: color.placeholderText,
    },
    disabled: {
      opacity: 0.7,
      backgroundColor: color.gray200,
    },
    input: {
      flex: 1,
      marginEnd: 10,
      color: color.black,
      fontSize: size.moderateScale(17),
      paddingLeft: 15,
    },
    iconBox: {
      paddingRight: 15,
    },
    calenderIcon: {
      fontSize: 18,
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
