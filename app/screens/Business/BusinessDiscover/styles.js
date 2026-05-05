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
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: size.moderateScale(16),
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: size.moderateScale(5),
    },
    cardShadowWrapper: {
      width: '48%',
      marginBottom: size.moderateScale(16),
      borderRadius: 16,
      backgroundColor: color.white,
      shadowColor: color.black,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
    cardInnerContent: {
      borderRadius: 16,
      overflow: 'hidden',
      padding: size.moderateScale(16),
    },
    cardInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(10),
      flex: 1,
    },
    iconWrapper: {
      width: size.moderateScale(40),
      height: size.moderateScale(40),
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: size.moderateScale(12),
    },
    cardValue: {
      fontSize: fontSize.medium,
      color: color.black,
      fontFamily: fontFamily.bold,
      marginBottom: size.moderateScale(4),
      flex: 1,
    },
    cardTitle: {
      fontSize: fontSize.verySmall,
      color: color.gray200,
      fontFamily: fontFamily.regular,
    },
    chartCard: {
      backgroundColor: color.white,
      borderRadius: 16,
      padding: size.moderateScale(20),
      shadowColor: color.black,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 12,

      // Android Shadow
      elevation: 4,
      marginBottom: size.moderateScale(16),
    },
    chartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: size.moderateScale(20),
    },
    chartTitle: {
      fontSize: fontSize.littleMedium,
      fontFamily: fontFamily.bold,
      color: color.black,
      marginBottom: size.moderateScale(4),
    },
    chartSubtitle: {
      fontSize: fontSize.verySmall,
      color: color.gray900,
      fontFamily: fontFamily.regular,
    },
    chartTotal: {
      fontSize: fontSize.middleSmallMedium,
      fontFamily: fontFamily.bold,
      color: color.black,
    },
    barsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 160,
    },
    barColumn: {
      alignItems: 'center',
      width: '10%',
    },
    barBackground: {
      width: '100%',
      height: size.moderateScale(120),
      backgroundColor: color.gray,
      borderRadius: 8,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    barFill: {
      width: '100%',
      backgroundColor: color.primary,
      borderRadius: 8,
    },
    barLabel: {
      marginTop: size.moderateScale(12),
      fontSize: fontSize.verySmall,
      color: color.gray200,
      fontFamily: fontFamily.regular,
    },
    chartHiringContainer: {
      gap: 6,
      marginBottom: size.moderateScale(10),
    },
    chartHiring: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    hiringTitle: {
      fontSize: fontSize.small,
      color: color.gray900,
      fontFamily: fontFamily.medium,
    },
    progressBarBg: {
      width: '100%',
      height: 8,
      backgroundColor: color.gray,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 4,
    },
    jobsListContainer: {
      paddingTop: 4,
      gap: 10,
    },
    jobRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rankBadge: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: color.gray,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    rankText: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.bold,
      color: color.gray900,
    },
    jobTitleText: {
      flex: 1,
      fontSize: fontSize.small,
      color: color.gray900,
      fontFamily: fontFamily.medium,
      paddingRight: 10,
    },
    jobCountText: {
      fontSize: fontSize.small,
      color: color.gray900,
      fontFamily: fontFamily.medium,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    avatarText: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.semiBold,
      color: color.white,
      letterSpacing: 0.5,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    actionText: {
      fontSize: fontSize.smallerMedium,
      color: color.gray900,
      fontFamily: fontFamily.regular,
      lineHeight: 22,
      marginBottom: 4,
    },
    nameText: {
      color: color.gray900,
      fontFamily: fontFamily.bold,
    },
    timeText: {
      fontSize: fontSize.verySmall,
      color: color.gray200,
      fontFamily: fontFamily.regular,
    },
  });
};
export default GetStyles;
