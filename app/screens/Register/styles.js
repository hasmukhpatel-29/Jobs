import {StyleSheet} from 'react-native';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      paddingBottom: 15,
      backgroundColor: color.backgroundColor,
      flex: 1,
      paddingHorizontal: size.moderateScale(20),
    },
    innerMainView: {
      flexGrow: 1,
      backgroundColor: color.backgroundColor,
      borderTopLeftRadius: size.moderateScale(24),
      overflow: 'hidden',
      borderTopRightRadius: size.moderateScale(24),
    },
    logoCont: {
      height: size.moderateScale(140),
      alignSelf: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    logoImage: {
      height: size.moderateScale(100),
      width: size.deviceWidth * 0.6,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    registerTextCont: {
      gap: size.moderateScale(20),
      paddingBottom: size.moderateScale(10),
    },
    title: {
      color: color.black,
      textAlign: 'center',
      fontSize: fontSize.middleSmallMedium,
      fontFamily: fontFamily.bold,
    },
    subTitle: {
      color: color.secondary,
      textAlign: 'center',
      fontSize: fontSize.verySmallMedium,
      fontFamily: fontFamily.regular,
    },
    imageCont: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainImage: {
      height: size.moderateScale(100),
      width: size.moderateScale(100),
      borderRadius: size.moderateScale(50),
      alignItems: 'center',
      backgroundColor: 'white',
    },
    cameraCont: {
      position: 'absolute',
      bottom: size.moderateScale(2),
      right: size.moderateScale(2),
      height: size.moderateScale(35),
      width: size.moderateScale(35),
      borderRadius: size.moderateScale(20),
      backgroundColor: color.black,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorMessageText: {
      color: color.red,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      marginTop: size.moderateScale(5),
    },
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: size.moderateScale(10),
    },
    termsText: {
      color: color.gray900,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.mediumSmall,
      maxWidth: '92%',
    },
    termsTextLink: {
      color: color.blue,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.mediumSmall,
    },
  });
};
export default GetStyles;
