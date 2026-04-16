import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.backgroundColor,
      paddingHorizontal: size.moderateScale(20),
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
    mobileNumberLabelText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.middleSmallMedium,
      textAlign: 'center',
      includeFontPadding: false,
      color: color.black,
      letterSpacing: size.moderateScale(1.2),
    },
    weWillSentYouCodeText: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.regular,
      color: color.gray900,
      textAlign: 'center',
      marginTop: size.moderateScale(8),
    },
    enterOtpText: {
      color: color.black,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.smallMedium,
      textAlign: 'center',
      marginTop: size.moderateScale(10),
    },
    imgEdit: {
    fontSize: size.moderateScale(18),
      marginLeft: size.moderateScale(5),
    },
  });
};

export default GetStyles;
