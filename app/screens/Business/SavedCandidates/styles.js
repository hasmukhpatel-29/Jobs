import {StyleSheet} from 'react-native';
import {useThemeContext} from 'app/contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.background2,
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
      paddingBottom: size.moderateScale(80),
    },
    card: {
      backgroundColor: color.white,
      borderRadius: size.moderateScale(12),
      padding: size.moderateScale(16),
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
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: size.moderateScale(8),
      paddingVertical: size.moderateScale(4),
      borderRadius: size.moderateScale(6),
      borderWidth: 1,
    },
    badgeUsage: {
      backgroundColor: `${color.orange}30`,
      borderColor: color.orange,
    },
    badgePurchase: {
      backgroundColor: `${color.green}30`,
      borderColor: color.green,
    },
    badgeText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.verySmall,
      marginLeft: size.moderateScale(4),
    },
    textUsage: {
      color: color.orange,
    },
    textPurchase: {
      color: color.green,
    },
    creditText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.smallMedium,
    },

    infoSection: {
      marginBottom: size.moderateScale(16),
    },
    title: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.small,
      color: color.black,
      marginBottom: size.moderateScale(4),
    },
    refText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmallMedium,
      color: color.gray200,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: size.moderateScale(8),
      borderTopWidth: 1,
      borderTopColor: color.borderColor,
    },
    dateText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      color: color.gray200,
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    amountText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.small,
      color: color.black,
      marginRight: size.moderateScale(12),
    },
    dashText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.small,
      color: color.gray200,
      marginRight: size.moderateScale(10),
    },
    invoiceBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.background,
      paddingHorizontal: size.moderateScale(10),
      paddingVertical: size.moderateScale(6),
      borderRadius: size.moderateScale(6),
      borderWidth: 1,
      borderColor: color.borderColor,
    },
    invoiceText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.verySmallMedium,
      color: color.black,
      marginLeft: size.moderateScale(6),
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
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: size.moderateScale(16),
      paddingTop: size.moderateScale(16),
    },
    applicantCard: {
      backgroundColor: color.cardColor2,
      borderRadius: size.moderateScale(16),
      padding: size.moderateScale(10),
      marginBottom: size.moderateScale(16),
      borderWidth: 1,
      borderColor: color.borderColor,
    },
    // cardHeader: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'flex-start',
    // },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: size.moderateScale(35),
      height: size.moderateScale(35),
      borderRadius: size.moderateScale(20),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: color.blue,
    },
    avatarText: {
      color: color.white,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.small,
    },
    bookmarkBadge: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      backgroundColor: color.white,
      padding: 4,
      borderRadius: 10,
      elevation: 2,
    },
    nameContainer: {
      marginLeft: size.moderateScale(8),
      flex: 1,
    },
    fullName: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.small,
      color: color.black,
      flex: 1,
    },
    headline: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      color: color.gray200,
    },
    statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: color.white,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 6,
    },
    statusText: {
      fontSize: fontSize.mediumSmall,
      fontFamily: fontFamily.semiBold,
      marginRight: 4,
    },
    activityBox: {
      backgroundColor: `${color.gray200}30`,
      borderRadius: 12,
      padding: size.moderateScale(10),
      marginTop: size.moderateScale(10),
    },
    activityLabel: {
      fontSize: 10,
      fontFamily: fontFamily.bold,
      color: color.gray900,
      marginBottom: 8,
    },
    activityContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    statusDotSmall: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginTop: 4,
      marginRight: 10,
    },
    activityMessage: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
    },
    activityTime: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.light,
      color: color.black,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 12,
    },
    skillTag: {
      backgroundColor: `${color.gray200}30`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
    },
    skillText: {
      fontSize: fontSize.verySmall,
      color: color.black,
      fontFamily: fontFamily.regular,
    },
    jobInfo: {
      flex: 1,
      marginRight: size.moderateScale(12),
    },
    footerJobText: {
      fontFamily: fontFamily.light,
      fontSize: fontSize.mediumSmall,
      color: color.gray900,
    },
    footerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    updateBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    updateText: {
      color: color.blue,
      marginLeft: 4,
      fontSize: fontSize.small,
      fontFamily: fontFamily.medium,
    },
    viewProfileBtn: {
      borderWidth: 1.5,
      borderColor: color.blue,
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    viewProfileText: {
      color: color.blue,
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
    },
    statusMenuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: size.moderateScale(8),
      paddingHorizontal: size.moderateScale(14),
    },
    statusMenuText: {
      fontSize: fontSize.verySmallMedium,
      fontFamily: fontFamily.regular,
      color: color.black,
      paddingLeft: size.moderateScale(10),
    },
  });
};

export default GetStyles;
