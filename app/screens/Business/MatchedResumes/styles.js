import {StyleSheet} from 'react-native';
import {useThemeContext} from 'app/contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.white,
    },
    screenHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: size.moderateScale(16),
      marginVertical: size.moderateScale(10),
      gap: 10,
    },
    filterBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: size.moderateScale(8),
      paddingHorizontal: size.moderateScale(12),
      paddingVertical: size.moderateScale(8),
      backgroundColor: color.white,
    },
    filterText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.verySmall,
      color: color.black,
      marginRight: size.moderateScale(8),
    },
    listContent: {
      paddingHorizontal: size.moderateScale(16),
      paddingBottom: size.moderateScale(40),
    },
    card: {
      backgroundColor: color.white,
      borderRadius: size.moderateScale(12),
      padding: size.moderateScale(10),
      marginBottom: size.moderateScale(12),
      borderWidth: 1,
      borderColor: color.borderColor,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },

    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    popoverStyle: {
      backgroundColor: color.sheetColor,
      borderRadius: size.moderateScale(12),
    },
    popoverInnerContainer: {
      minWidth: size.moderateScale(160),
      paddingVertical: size.moderateScale(8),
    },
    popoverRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: size.moderateScale(5),
      paddingHorizontal: size.moderateScale(15),
    },
    popoverIconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    popoverText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.littleMedium,
      color: color.black,
    },
    popoverTextActive: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.littleMedium,
      color: color.blue,
    },
    emptyComponent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: size.moderateScale(250),
    },
    emptyText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.middleLargeMedium,
      color: color.gray900,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      paddingVertical: size.moderateScale(4),
      paddingHorizontal: size.moderateScale(8),
      borderWidth: 1,
      borderColor: color.customBlack(0.3),
      backgroundColor: color.gray,
    },
    chipText: {
      fontSize: fontSize.verySmall,
      color: color.black,
      fontFamily: fontFamily.regular,
      marginRight: 5,
    },

    avatar: {
      width: size.moderateScale(46),
      height: size.moderateScale(46),
      borderRadius: size.moderateScale(23),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: size.moderateScale(12),
    },
    avatarText: {
      color: color.white,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.smallerMedium,
    },
    headerInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: size.moderateScale(4),
    },
    nameText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.small,
      color: color.black,
      marginRight: size.moderateScale(8),
      flexShrink: 1,
    },
    topMatchBadge: {
      backgroundColor: color.lightGreen,
      paddingHorizontal: size.moderateScale(6),
      paddingVertical: size.moderateScale(2),
      borderRadius: size.moderateScale(4),
    },
    topMatchText: {
      color: color.green,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.tiny,
      textTransform: 'uppercase',
    },
    subtitleText: {
      fontFamily: fontFamily.light,
      fontSize: fontSize.verySmall,
      color: color.black,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(8),
    },
    progressContainer: {
      width: size.moderateScale(42),
      height: size.moderateScale(42),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    progressTextContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    scoreCircleText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.mediumSmall,
      color: color.black,
    },
    expandedContent: {
      marginTop: size.moderateScale(16),
      borderTopWidth: 1,
      borderTopColor: color.borderColor,
      paddingTop: size.moderateScale(16),
    },
    darkCard: {
      backgroundColor: color.cardSheetColor,
      borderRadius: size.moderateScale(8),
      padding: size.moderateScale(16),
    },
    darkCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: size.moderateScale(12),
    },
    darkCardTitle: {
      color: color.black,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.verySmall,
    },
    darkCardScore: {
      color: color.black,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.middleLargeMedium,
    },
    progressBarBg: {
      height: size.moderateScale(6),
      backgroundColor: color.customWhite(0.2),
      borderRadius: size.moderateScale(3),
      marginBottom: size.moderateScale(12),
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: color.green,
      borderRadius: size.moderateScale(3),
    },
    matchStatsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: size.moderateScale(20),
      gap: size.moderateScale(16),
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(6),
    },
    dot: {
      width: size.moderateScale(8),
      height: size.moderateScale(8),
      borderRadius: size.moderateScale(4),
    },
    statText: {
      color: color.black,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.verySmall,
    },
    sectionHeader: {
      color: color.black,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.small,
      marginBottom: size.moderateScale(6),
      marginTop: size.moderateScale(12),
    },
    contactCard: {
      backgroundColor: color.buttonColor,
      borderRadius: size.moderateScale(8),
      padding: size.moderateScale(16),
      gap: size.moderateScale(12),
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: size.moderateScale(12),
    },
    contactInfo: {
      flex: 1,
    },
    contactLabel: {
      color: color.gray900,
      fontFamily: fontFamily.light,
      fontSize: fontSize.verySmall,
      marginBottom: size.moderateScale(2),
    },
    contactValue: {
      color: color.black,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.smallerMedium,
    },
    detailsSectionTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.verySmall,
      color: color.gray200,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: size.moderateScale(12),
    },
    skillCategory: {
      marginBottom: size.moderateScale(16),
    },
    skillCategoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: size.moderateScale(8),
      gap: size.moderateScale(6),
    },
    skillCategoryTitle: textColor => ({
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.smallerMedium,
      color: textColor,
    }),
    pillContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: size.moderateScale(8),
    },
    pill: textColor => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: size.moderateScale(8),
      paddingVertical: size.moderateScale(3),
      borderRadius: size.moderateScale(3),
      borderWidth: 1,
      gap: size.moderateScale(6),
      borderColor: textColor,
      backgroundColor: `${textColor}10`,
    }),
    pillText: textColor => ({
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      color: textColor,
    }),

    experienceItem: {
      flexDirection: 'row',
      paddingBottom: size.moderateScale(15),
    },
    timelineLeftColumn: {
      alignItems: 'center',
      width: size.moderateScale(12),
      marginRight: size.moderateScale(14),
    },
    timelineBullet: {
      width: size.moderateScale(12),
      height: size.moderateScale(12),
      borderRadius: size.moderateScale(6),
      borderWidth: 2,
      borderColor: color.primary,
      backgroundColor: color.white,
      marginTop: size.moderateScale(4),
      zIndex: 2,
    },
    timelineLine: {
      width: 1,
      flex: 1,
      backgroundColor: color.borderColor,
      marginTop: size.moderateScale(-2),
      marginBottom: size.moderateScale(-16),
      zIndex: 1,
    },
    experienceContent: {
      flex: 1,
    },
    experienceRole: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.smallerMedium,
      color: color.black,
      marginBottom: size.moderateScale(3),
    },
    experienceCompany: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmallMedium,
      color: color.black,
      marginBottom: size.moderateScale(2),
    },
    experienceMeta: {
      fontFamily: fontFamily.light,
      fontSize: fontSize.verySmall,
      color: color.black,
    },
    educationCard: {
      backgroundColor: color.cardSheetColor,
      borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: size.moderateScale(8),
      padding: size.moderateScale(10),
      marginBottom: size.moderateScale(8),
    },
    educationDegree: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.smallerMedium,
      color: color.black,
      marginBottom: size.moderateScale(2),
    },
    educationCollege: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmallMedium,
      color: color.black,
      marginBottom: size.moderateScale(2),
    },
    educationMeta: {
      fontFamily: fontFamily.light,
      fontSize: fontSize.verySmall,
      color: color.black,
    },
  });
};

export default GetStyles;
