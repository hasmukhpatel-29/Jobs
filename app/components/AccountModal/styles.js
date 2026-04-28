import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      position: 'absolute',
      bottom: 0,
      top: 80,
      width: '100%',
      backgroundColor: color.customWhite(0.6),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: size.moderateScale(20),
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
    },
    closeCont: {
      position: 'absolute',
      right: size.moderateScale(15),
      top: size.moderateScale(15),
      padding: size.moderateScale(5),
    },
  });
};
export default GetStyles;
