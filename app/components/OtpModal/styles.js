import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.customTransparent(0.5),
    },
    modalContainer: {
      width: size.deviceWidth * 0.84,
      maxWidth: 400,
      padding: size.moderateScale(30),
      borderRadius: size.moderateScale(15),
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      backgroundColor: color.cardSheetColor,
    },
    title: {
      fontSize: fontSize.middleSmallMedium,
      fontFamily: fontFamily.bold,
      marginBottom: size.moderateScale(10),
      textAlign: 'center',
      color: color.black,
    },
    subTitle: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
      textAlign: 'center',
      marginBottom: size.moderateScale(5),
    },
    userNumber: {
      fontSize: fontSize.littleMedium,
      fontFamily: fontFamily.bold,
      color: color.black,
      textAlign: 'center',
      marginBottom: size.moderateScale(10),
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
    btnCont: {width: '100%', marginTop: size.moderateScale(20)},
    tabStyle: {
      width: '100%',
      marginTop: 10,
    },
    resendOtpText: {
      color: color.red,
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.regular,
      textAlign: 'center',
      textDecorationLine: 'underline',
      paddingVertical: size.moderateScale(10),
    },
    timerText: {
      color: color.red,
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.medium,
      paddingVertical: size.moderateScale(10),
    },
    closeBtn: {
      width: '100%',
    },
  });
};

export default GetStyles;
