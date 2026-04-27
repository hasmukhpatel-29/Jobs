import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

export const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.backgroundColor,
    },
    imgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    imgStyle: {
      width: '70%',
      height: size.moderateScale(200),
    },
    loginContainer: {
      flex: 1,
      backgroundColor: color.white,
      padding: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: {width: 0, height: -4},
      elevation: 5,
      marginTop: size.moderateScale(20),
    },
    title: {
      fontSize: size.moderateScale(20),
      color: color.black,
      fontFamily: fontFamily.bold,
      textAlign: 'center',
    },
    title1: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.regular,
      color: color.gray900,
      textAlign: 'center',
      marginTop: size.moderateScale(8),
    },
    tabStyle: {
      marginHorizontal: size.moderateScale(20),
      marginBottom: size.moderateScale(20),
      marginTop: size.moderateScale(20),
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: color.customBlack(0.3),
    },
    login: {
      fontSize: size.moderateScale(16),
      color: color.black,
      fontFamily: fontFamily.regular,
      marginHorizontal: 10,
    },
    button: {
      marginVertical: size.moderateScale(10),
    },
    termsContainer: {
      marginTop: 'auto',
      alignItems: 'center',
      paddingBottom: 20,
    },
    termsLinkContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    continueText: {
      fontSize: fontSize.mediumSmall,
      fontFamily: fontFamily.regular,
      color: color.gray900,
      textAlign: 'center',
      marginBottom: size.moderateScale(4),
    },
    termLinkText: {
      fontSize: fontSize.mediumSmall,
      fontFamily: fontFamily.regular,
      color: color.blue,
      textDecorationLine: 'underline',
    },
    skipCont: {
      position: 'absolute',
      right: 30,
      top: 20,
      backgroundColor: color.black,
      borderRadius: 30,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    skipText: {
      color: color.white,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.small,
    },
  });
};
