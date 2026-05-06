import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.white,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatListContent: {
      paddingHorizontal: size.moderateScale(20),
      paddingTop: size.moderateScale(10),
    },
    cardContainer: {
      backgroundColor: color.white,
      borderRadius: size.moderateScale(12),
      borderWidth: 1,
      borderColor: color.borderColor,
      padding: size.moderateScale(16),
      marginVertical: size.moderateScale(10),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerLeft: {
      flex: 1,
      paddingRight: size.moderateScale(10),
    },
    titleText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.small,
      color: color.text,
      marginBottom: size.moderateScale(4),
    },
    metaText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      color: color.placeholderText,
    },
    menuIconContainer: {
      padding: size.moderateScale(2),
    },
    footerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: size.moderateScale(10),
    },
    statusMetricsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(16),
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(6),
    },
    statusDot: isActive => ({
      width: size.moderateScale(8),
      height: size.moderateScale(8),
      borderRadius: size.moderateScale(4),
      backgroundColor: isActive ? color.green : color.red,
    }),
    statusText: isActive => ({
      fontFamily: fontFamily.medium,
      fontSize: fontSize.verySmall,
      color: isActive ? color.green : color.red,
    }),
    metricsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(6),
    },
    metricsText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      color: color.placeholderText,
    },
    viewButton: {
      borderWidth: 1,
      borderColor: color.primary,
      borderRadius: size.moderateScale(20),
      paddingVertical: size.moderateScale(6),
      paddingHorizontal: size.moderateScale(16),
      backgroundColor: color.transparent,
    },
    viewButtonText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.verySmall,
      color: color.primary,
    },
    popoverStyle: {
      backgroundColor: color.cardColor,
      borderRadius: size.moderateScale(12),
      paddingVertical: size.moderateScale(8),
      width: size.moderateScale(160),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
      marginRight: size.moderateScale(10),
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: size.moderateScale(12),
      paddingHorizontal: size.moderateScale(16),
      gap: size.moderateScale(12),
    },
    menuText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.smallerMedium,
    },
  });
};
export default GetStyles;
