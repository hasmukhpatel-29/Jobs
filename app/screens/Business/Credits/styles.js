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
      paddingVertical: size.moderateScale(20),
    },
    screenTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.middleMedium,
      color: color.black,
      marginBottom: size.moderateScale(4),
    },
    screenSubtitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      color: color.gray200,
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
      fontSize: fontSize.small,
      color: color.black,
      marginRight: size.moderateScale(8),
    },

    // --- List & Cards ---
    listContent: {
      paddingHorizontal: size.moderateScale(16),
      paddingBottom: size.moderateScale(40),
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
      marginBottom: size.moderateScale(12),
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
      paddingVertical: size.moderateScale(8),
      minWidth: size.moderateScale(160),
    },
    popoverRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: size.moderateScale(5),
      paddingHorizontal: size.moderateScale(15),
    },
    popoverIconContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    popoverText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.middleMedium,
      color: color.black,
    },
    popoverTextActive: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.middleMedium,
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
    summaryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: color.white,
      marginHorizontal: size.moderateScale(16),
      marginTop: size.moderateScale(16),
      padding: size.moderateScale(15),
      borderRadius: size.moderateScale(12),
      borderWidth: 1,
      borderColor: color.borderColor,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
    },
    balanceInfo: {
      flexDirection: 'column',
    },
    balanceLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.littleMedium,
      color: color.black,
    },
    balanceValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.littleMedium,
      color: color.black,
    },
  });
};

export default GetStyles;
