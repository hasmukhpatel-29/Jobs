import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';
import {size} from '@config/Sizes';

const GetStyle = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      flex: 1,
      paddingHorizontal: size.moderateScale(15),
      marginTop: 10,
    },
    legalTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(5),
      marginBottom: size.moderateScale(20),
    },
    titleText: {
      color: color.black,
      fontSize: fontSize.small,
      fontFamily: fontFamily.medium,
    },
    optionalText: {
      color: color.customBlack(0.5),
      fontSize: fontSize.small,
      fontFamily: fontFamily.medium,
    },
    infoCircle: {
      fontSize: size.moderateScale(15),
      color: color.customBlack(0.5),
    },
    radioStyle: {
      fontSize: fontSize.littleMedium,
      flexDirection: 'row',
      gap: 10,
      marginBottom: size.moderateScale(20),
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
    errorMessageText: {
      color: color.red,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
    },
  });
};
export default GetStyle;
