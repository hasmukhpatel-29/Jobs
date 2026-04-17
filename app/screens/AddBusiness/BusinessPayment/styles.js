import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.backgroundColor,
      padding: 16,
    },

    title: {
      fontSize: fontSize.middleMedium,
      fontFamily: fontFamily.regular,
      color: color.black,
    },

    subtitle: {
      fontSize: fontSize.littleMedium,
      fontFamily: fontFamily.regular,
      color: color.black,
      paddingBottom: size.moderateScale(16),
    },

    card: {
      backgroundColor: color.cardSheetColor,
      borderRadius: size.moderateScale(12),
      overflow: 'hidden',
      elevation: 2,
      borderWidth:1,
      borderColor: color.borderColor
    },

    cardHeader: {
      padding: 16,
      gap: size.moderateScale(6),
    },

    cardTitle: {
      fontSize: fontSize.smallerMedium,
      color: color.black,
    },

    cardSub: {
      fontSize: fontSize.littleSmall,
      fontFamily: fontFamily.regular,
      color: color.black,
    },

    divider: {
      height: 1,
      backgroundColor: color.gray200,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    label: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.regular,
      color: color.black,
    },

    value: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
    },

    totalBox: {
      backgroundColor: color.semiTransBlack,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: size.moderateScale(16),
    },

    totalText: {
      fontSize: fontSize.littleMedium,
      fontFamily: fontFamily.regular,
      color: color.black,
    },

    totalAmount: {
      fontSize: fontSize.littleMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
    },

    infoBox: {
      marginVertical: 16,
      padding: 12,
      borderRadius: 8,
      backgroundColor: color.gray,
    },

    infoText: {
      fontSize: fontSize.mediumSmall,
      fontFamily: fontFamily.regular,
      color: color.black,
    },
    btnStyle: {marginTop: 15},
  });
};
export default GetStyles;
