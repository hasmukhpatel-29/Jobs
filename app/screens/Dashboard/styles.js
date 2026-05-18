import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.white,
    },
    contentContainerStyle: {paddingBottom: 100},
    menuContainer: {
      padding: size.moderateScale(20),
    },
    columnContStyle: {justifyContent: 'space-between', gap: 20},
    card: {
      alignItems: 'center',
      gap: size.moderateScale(8),
    },
    iconContainer: {
      color: color.black,
      fontSize: size.moderateScale(26),
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: color.gray,
    },

    title: {
      fontSize: fontSize.verySmall,
      textAlign: 'center',
      fontFamily: fontFamily.regular,
      color: color.textColor,
    },
    searchModalContainer: {
      flex: 1,
      backgroundColor: color.white,
    },
    searchHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 60,
      paddingBottom: 15,
      backgroundColor: color.white,
      borderBottomWidth: 1,
      borderBottomColor: color.borderColor,
      gap: 12,
    },
    searchBackBtn: {
      padding: 4,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.gray,
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 44,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 44,
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.smallerMedium,
      paddingVertical: 0,
    },
    searchContentContainer: {
      paddingBottom: 40,
      paddingTop: 10,
    },
    emptySearchCont: {
      marginTop: 40,
      alignItems: 'center',
    },
    emptySearchText: {
      color: color.gray900,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.smallerMedium,
    },
    emptyStateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
      marginTop: 60,
    },
    emptyStateIconCont: {
      width: 80,
      height: 80,
      backgroundColor: color.primary,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    emptyStateTitle: {
      fontSize: fontSize.medium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
      marginBottom: 10,
    },
    emptyStateDesc: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.regular,
      color: color.gray900,
      textAlign: 'center',
      marginBottom: 25,
      lineHeight: 20,
    },
    emptyStateBtn: {
      backgroundColor: color.black,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    emptyStateBtnText: {
      color: color.white,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.verySmall,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    closeIcon: {
      backgroundColor: '#333',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    filterBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingLeft: 12,
      borderBottomWidth: 1,
      borderBottomColor: color.borderColor,
      backgroundColor: color.white,
    },
    filterIconBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: color.borderColor,
      backgroundColor: color.white,
      marginRight: 8,
    },
    filterIconBtnActive: {
      borderColor: color.primary,
      backgroundColor: `${color.primary}20`,
    },
    filterIconText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.verySmall,
      color: color.black,
    },
    filterIconTextActive: {
      color: color.primary,
    },
    filterChipsContent: {
      gap: 8,
      paddingRight: 12,
    },
    filterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingVertical: 5,
      paddingHorizontal: 13,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: color.borderColor,
      backgroundColor: color.white,
    },
    filterChipActive: {
      borderColor: color.primary,
      backgroundColor: `${color.primary}20`,
    },
    filterChipText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.verySmall,
      color: color.black,
    },
    filterChipTextActive: {
      color: color.primary,
    },
    headerLocationBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15,
      marginTop: 2,
    },
    headerCityText: {
      marginLeft: 4,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.small,
      color: color.black,
    },
    headerCityPlaceholder: {
      marginLeft: 4,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.small,
      color: color.placeholderText,
    },
    headerSearchBtn: {
      marginRight: 5,
    },
    headerFilterBtn: {
      marginRight: 10,
    },
    searchModal: {
      margin: 0,
      justifyContent: 'flex-start',
    },
    filterModal: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    filterSheet: {
      height: '90%',
      width: '100%',
    },
    filterCloseRow: {
      alignItems: 'center',
      marginBottom: 10,
    },
    itemSeparator: {
      paddingTop: 20,
    },
  });
};
export default GetStyles;
