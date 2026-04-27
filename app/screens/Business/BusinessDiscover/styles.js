import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    headerLeftView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      gap: size.moderateScale(10),
    },
    headerImg: {
      height: size.moderateScale(40),
      width: size.moderateScale(40),
      borderRadius: size.moderateScale(50),
    },
    headerBusiness: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    textCont: {flex: 1, paddingRight: 10, justifyContent: 'flex-end'},
    businessName: {
      color: color.black,
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    imgCont: {
      width: size.moderateScale(40),
      height: size.moderateScale(40),
      borderRadius: 8,
      backgroundColor: color.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconImage: {
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmallMedium,
    },
    address: {
      color: color.black,
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.regular,
    },
  });
};
export default GetStyles;
