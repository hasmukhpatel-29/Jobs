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
      backgroundColor: '#F8FAFC',
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    emptyStateTitle: {
      fontSize: fontSize.medium,
      fontFamily: fontFamily.semiBold,
      color: '#1E293B',
      marginBottom: 10,
    },
    emptyStateDesc: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.regular,
      color: '#94A3B8',
      textAlign: 'center',
      marginBottom: 25,
      lineHeight: 20,
    },
    emptyStateBtn: {
      backgroundColor: '#1E293B',
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
  });
};
export default GetStyles;
