import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    modalContainer: {
      backgroundColor: color.buttonColor,
      borderRadius: size.moderateScale(16),
      padding: size.moderateScale(24),
    },
    appImage: {
      height: size.moderateScale(70),
      width: size.moderateScale(70),
      borderRadius: size.moderateScale(35),
      marginBottom: size.moderateScale(30),
      alignSelf: 'center',
    },
    closeBtn: {
      position: 'absolute',
      right: size.moderateScale(15),
      top: size.moderateScale(15),
    },
    loginTitle: {
      color: color.black,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.middleLargeMedium,
      textAlign: 'center',
      marginBottom: size.moderateScale(8),
    },
    loginSubtitle: {
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.smallerMedium,
      textAlign: 'center',
      marginBottom: size.moderateScale(24),
    },
    charCount: {
      color: color.black,
      textAlign: 'right',
      marginTop: size.moderateScale(8),
      marginBottom: size.moderateScale(24),
      fontSize: fontSize.verySmall,
    },
    closeCont: {
      position: 'absolute',
      right: size.moderateScale(15),
      top: size.moderateScale(15),
    },
  });
};

export default GetStyles;
