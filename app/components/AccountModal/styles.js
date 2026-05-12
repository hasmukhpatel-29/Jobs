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
  });
};
export default GetStyles;
