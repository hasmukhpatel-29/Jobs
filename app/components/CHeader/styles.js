import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    headerContainer: {
      backgroundColor: color.background,
      justifyContent: 'space-between',
      paddingRight: size.moderateScale(15),
      paddingLeft: size.moderateScale(10),
      paddingBottom: size.moderateScale(10),
      boxShadow: '1 5 10 -1 rgba(0, 0, 0, 0.04)',
      flexDirection: 'row',
      paddingTop: size.moderateScale(10),
      bottom: 0,
      marginBottom: size.moderateScale(0),
      borderBottomLeftRadius: size.moderateScale(10),
      borderBottomRightRadius: size.moderateScale(10),
      borderBottomWidth: 0.5,
      borderBottomColor: color.customBlack(0.1),
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowAlign: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(10),
    },
    backButton: {
      marginRight: size.moderateScale(4),
      height: size.moderateScale(32),
      width: size.moderateScale(32),
      backgroundColor: color.headerButtonColor,
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '1 5 10 5 rgba(0, 0, 0, 0.04)',
      borderRadius: size.moderateScale(8),
      alignSelf: 'center',
    },
    title: {
      fontSize: fontSize.smallMedium,
      fontFamily: fontFamily.medium,
      maxWidth: size.deviceWidth * 0.6,
    },
    headerLeftText: {
      fontSize: fontSize.smallMedium,
      fontFamily: fontFamily.medium,
      marginLeft: size.moderateScale(8),
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.middleLargeMedium,
      color: color.black,
    },
    profileImg: {
      height: size.moderateScale(25),
      width: size.moderateScale(25),
      borderRadius: size.moderateScale(25),
      backgroundColor: 'white',
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(10),
    },
  });
};

export default GetStyles;
