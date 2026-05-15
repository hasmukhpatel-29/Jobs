import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: size.moderateScale(15),
      paddingBottom: size.moderateScale(140),
      flexShrink: 1,
    },
    flexStyle: {
      flex: 1,
    },
    mainCont: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: size.moderateScale(20),
      gap: size.moderateScale(10),
      marginLeft: size.moderateScale(10),
    },
    imgCont: {
      width: size.moderateScale(40),
      height: size.moderateScale(40),
      borderRadius: 8,
      backgroundColor: color.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgStyle: {
      width: size.moderateScale(40),
      height: size.moderateScale(40),
      borderRadius: 8,
    },
    iconImage: {
      color: color.customBlack(0.9),
    },
    businessName: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.smallerMedium,
      color: color.black,
    },
    address: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      color: color.black,
    },
    sectionHeader: {
      paddingBottom: 10,
      color: color.black,
      fontFamily: fontFamily.bold,
    },
    closeCont: {
      position: 'absolute',
      right: size.moderateScale(5),
      top: size.moderateScale(5),
      padding: size.moderateScale(15),
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheetContainer: {
      backgroundColor: color.background || color.white,
      borderTopLeftRadius: size.moderateScale(24),
      borderTopRightRadius: size.moderateScale(24),
      maxHeight: '85%',
      paddingBottom: size.moderateScale(10),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -3},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 15,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: size.moderateScale(10),
    },
    modalTitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.middleSmallMedium,
      color: color.black,
    },
    modalIconBtn: {
      width: size.moderateScale(40),
      height: size.moderateScale(40),
      borderRadius: size.moderateScale(20),
      backgroundColor: color.white,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    footerContainer: {
      position: 'absolute',
      bottom: size.moderateScale(15),
      left: size.moderateScale(15),
      right: size.moderateScale(15),
      gap: size.moderateScale(10),
      zIndex: 10,
    },
    registerNewBusinessBtn: {
      backgroundColor: color.white,
      flexDirection: 'row',
      alignItems: 'center',
      padding: size.moderateScale(12),
      borderRadius: size.moderateScale(12),
      borderWidth: 1,
      borderColor: color.blue,
      borderStyle: 'dashed',
      gap: size.moderateScale(12),
    },
    switchDashboardBtn: {
      backgroundColor: color.blue,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: size.moderateScale(12),
      borderRadius: size.moderateScale(12),
      gap: size.moderateScale(12),
    },
    switchDashboardText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.smallerMedium,
      color: color.commonWhite,
    },
    plusIconCont: {
      width: size.moderateScale(32),
      height: size.moderateScale(32),
      borderRadius: size.moderateScale(16),
      backgroundColor: color.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    registerNewBusinessText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.smallerMedium,
      color: color.blue,
    },
    paymentTag: {
      backgroundColor: color.red + '20',
      paddingHorizontal: size.moderateScale(8),
      paddingVertical: size.moderateScale(2),
      borderRadius: size.moderateScale(4),
      marginTop: size.moderateScale(4),
      alignSelf: 'flex-start',
    },
    paymentTagText: {
      color: color.red,
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.medium,
    },
  });
};
export default GetStyles;
