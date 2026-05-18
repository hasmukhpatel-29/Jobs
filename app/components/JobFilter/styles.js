import {StyleSheet, Dimensions} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';

const {width} = Dimensions.get('window');

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: color.cardColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: color.borderColor,
      backgroundColor: color.cardColor,
    },
    headerTitle: {
      fontSize: fontSize.middleLargeMedium,
      fontFamily: fontFamily.bold,
      color: color.black,
    },
    clearAllText: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.semiBold,
      color: color.primary,
    },
    mainContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    sidebar: {
      width: width * 0.28,
      backgroundColor: color.sheetColor,
      borderRightWidth: 1,
      borderRightColor: color.borderColor,
    },
    sidebarItem: {
      paddingVertical: 22,
      justifyContent: 'center',
      position: 'relative',
    },
    activeSidebarItem: {
      backgroundColor: color.cardColor,
    },
    sidebarIndicator: {
      position: 'absolute',
      left: 0,
      width: 4,
      height: 30,
      backgroundColor: color.primary,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    sidebarLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 10,
      width: '100%',
    },
    sidebarLabel: {
      fontSize: 10,
      fontFamily: fontFamily.semiBold,
      color: color.black,
      flex: 1,
    },
    activeSidebarLabel: {
      color: color.primary,
      fontFamily: fontFamily.bold,
    },
    badge: {
      backgroundColor: color.primary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
      minWidth: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: color.commonWhite,
      fontSize: 9,
      fontFamily: fontFamily.bold,
    },
    contentArea: {
      flex: 1,
      backgroundColor: color.cardColor,
    },
    sectionContent: {
      padding: 15,
      paddingTop: 20,
    },
    sectionTitle: {
      fontSize: 12,
      fontFamily: fontFamily.bold,
      color: color.primary,
      marginBottom: 20,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      backgroundColor: color.cardColor,
      borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: 100,
      paddingVertical: 11,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      marginRight: 8,
    },
    activeChip: {
      borderColor: color.primary,
      borderWidth: 1.5,
      backgroundColor:
        color.theme === 'dark'
          ? 'rgba(0, 145, 253, 0.12)'
          : 'rgba(0, 145, 253, 0.04)',
    },
    chipLabel: {
      fontSize: 13,
      fontFamily: fontFamily.medium,
      color: color.black,
      textAlign: 'center',
    },
    activeChipLabel: {
      fontFamily: fontFamily.bold,
      color: color.primary,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 35,
      borderTopWidth: 1,
      borderTopColor: color.borderColor,
      backgroundColor: color.cardColor,
    },
    closeButton: {
      flex: 1,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
      color: color.primary,
    },
    applyButton: {
      flex: 1.5,
    },
    applyButtonText: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
      color: color.commonWhite,
    },
    // Location Styles
    locationSearchContainer: {
      marginBottom: 20,
    },
    locationInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.sheetColor,
      borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 48,
    },
    locationInput: {
      flex: 1,
      height: 48,
      color: color.black,
      fontFamily: fontFamily.medium,
      fontSize: 14,
      marginLeft: 8,
    },
    currentLocationBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.sheetColor,
      borderWidth: 1,
      borderColor: color.borderColor,
      borderRadius: 12,
      padding: 12,
      marginBottom: 25,
    },
    currentLocationIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    currentLocationContent: {
      flex: 1,
    },
    currentLocationTitle: {
      fontSize: 14,
      fontFamily: fontFamily.bold,
      color: '#22C55E',
    },
    currentLocationText: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: color.gray200,
      marginTop: 2,
    },
    locationResultItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: color.borderColor,
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationResultText: {
      fontSize: 14,
      fontFamily: fontFamily.medium,
      color: color.black,
      marginLeft: 10,
    },
  });
};

export default GetStyles;
