import {StyleSheet, Dimensions} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';

const {width} = Dimensions.get('window');

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: color.background,
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
      backgroundColor: color.white,
    },
    headerTitle: {
      fontSize: fontSize.middleLargeMedium,
      fontFamily: fontFamily.bold,
      color: color.secondary,
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
      backgroundColor: color.white,
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
      // textTransform: 'uppercase',
      // letterSpacing: 0.5,
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
      backgroundColor: color.white,
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
      backgroundColor: color.white,
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
      backgroundColor: color.white,
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
      // backgroundColor: color.primary,
      // paddingVertical: 14,
      // borderRadius: 10,
      // alignItems: 'center',
      // justifyContent: 'center',
      // elevation: 4,
      // shadowColor: color.primary,
      // shadowOffset: {width: 0, height: 4},
      // shadowOpacity: 0.3,
      // shadowRadius: 6,
    },
    applyButtonText: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
      color: color.commonWhite,
    },
  });
};

export default GetStyles;
