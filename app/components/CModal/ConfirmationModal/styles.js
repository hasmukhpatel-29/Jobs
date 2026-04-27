import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    modalContainer: {
      backgroundColor: color.buttonColor || 'white',
      borderRadius: size.moderateScale(12),
      alignItems: 'center',
    },
    messageWrapper: {
      paddingVertical: size.moderateScale(30),
    },
    messageText: {
      color: color.black,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.small,
      textAlign: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      width: '100%',
      borderTopWidth: 1,
      borderColor: color.gray,
    },
    leftButton: {
      flex: 1,
      paddingVertical: size.moderateScale(20),
      borderRightWidth: 1,
      borderColor: color.gray,
      alignItems: 'center',
    },
    rightButton: {
      flex: 1,
      paddingVertical: size.moderateScale(20),
      alignItems: 'center',
    },
    btnLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.small,
    },
    reportContainer: {
      backgroundColor: color.buttonColor,
      borderRadius: size.moderateScale(16),
      padding: size.moderateScale(24),
    },
    closeBtn: {
      position: 'absolute',
      right: size.moderateScale(15),
      top: size.moderateScale(15),
    },
    reportTitle: {
      color: color.black,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.middleLargeMedium,
      textAlign: 'center',
      marginBottom: size.moderateScale(8),
    },
    reportSubtitle: {
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
    appImage: {
      height: size.moderateScale(70),
      width: size.moderateScale(70),
      borderRadius: size.moderateScale(35),
      marginBottom: size.moderateScale(30),
      alignSelf: 'center',
    },
    closeCont: {
      position: 'absolute',
      right: size.moderateScale(15),
      top: size.moderateScale(15),
    },
  });
};

export default GetStyles;
