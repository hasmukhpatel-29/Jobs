import {StyleSheet, Dimensions} from 'react-native';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: color.white,
      zIndex: -9999,
    },
    contentContainer: {
      paddingTop: 60,
      marginHorizontal: 20,
      maxWidth: 200,
    },
    root: {
      flex: 1,
      backgroundColor: color.white,
      overflow: 'hidden',
    },
    drawerTabText: {
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.smallMedium,
      paddingTop: 14,
    },
    drawerList: {
      marginTop: 10,
      height: Dimensions.get('screen').height / 1.8,
    },
    screenRoot: {
      backgroundColor: color.white,
      borderRadius: 20,
      flex: 1,
    },
    screenHeader: {
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    fullNameText: {
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.middleSmallMedium,
      marginTop: 10,
    },
    logoutMainCont: {
      height: Dimensions.get('screen').height / 8,
    },
    logoutContainer: {
      backgroundColor: color.primary,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      width: '60%',
    },
    logout: {
      color: color.white,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.littleMedium,
    },
    backgroundStyle: {
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
    },
    gredientStyle: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    profileStyle: {
      height: 70,
      width: 70,
      borderRadius: 35,
      borderWidth: 1,
      borderColor: color.white,
    },
    textReturn: {
      color: color.white,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.littleMedium,
    },
    animatedStyle: {
      flexGrow: 1,
      position: 'absolute',
      backgroundColor: color.white,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    profileImageAndCloseIconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },
    drawerCloseIconBtn: {
      left: 40,
      alignItems: 'flex-end',
    },
    textContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteAccountText: {
      fontSize: fontSize.middleSmallMedium,
      color: color.black,
      fontFamily: fontFamily.semiBold,
      marginTop: 10,
      marginBottom: 20,
    },
    modalCont: {padding: 20, backgroundColor: color.white, borderRadius: 10},
    deleteIcon: {
      padding: 10,
      borderWidth: 1,
      borderColor: color.red,
      borderRadius: 10,
    },
    titleText: {
      fontSize: fontSize.smallMedium,
      color: color.black,
      fontFamily: fontFamily.regular,
      marginBottom: 25,
      lineHeight: 30,
      textAlign: 'center',
      width: '80%',
    },
    btnContainer: {
      flwx: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btn: {
      width: '48.5%',
    },
  });
};
export default GetStyles;
