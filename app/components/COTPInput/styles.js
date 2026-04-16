import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';
import {size} from '@config/Sizes';

const GetStyles = () => {
  // Access theme colors using useTheme hook
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainContainerStyles: {
      marginBottom: 25,
    },
    codeFieldRoot: {
      marginTop: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignSelf: 'center',
      gap: 20,
    },
    cell: {
      width: size.moderateScale(45),
      height: size.moderateScale(55),
      borderWidth: 1,
      borderRadius: size.moderateScale(8),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: color.customBlack(0.3),
    },
    focusCell: {
      borderColor: color.secondary,
    },
    cellText: {
      fontSize: fontSize.middleSmallMedium,
      textAlign: 'center',
      color: color.black,
    },
    errorMessageText: {
      color: color.red,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.smallerMedium,
      marginTop: size.moderateScale(10),
      textAlign: 'center',
    },
    submitButton: {
      marginTop: size.moderateScale(20),
    },
    resendContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    resendText: {
      fontSize: fontSize.littleMedium,
      marginRight: 10,
      fontFamily: fontFamily.medium,
      color: color.red,
    },
    resendBtnContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      gap: 5,
      paddingVertical: 15,
      alignItems: 'center',
    },
    reloadIcon: {
      fontSize: fontSize.smallMedium,
      color: color.red,
    },
    tabStyle: {
      marginTop: size.moderateScale(20),
    },
    resendButton: {
      color: color.red,
    },
  });
};
export default GetStyles;
