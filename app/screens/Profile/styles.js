import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      flexGrow: 1,
      backgroundColor: color.background,
    },
    profileMainCont: {
      paddingVertical: size.moderateScale(15),
      paddingHorizontal: size.moderateScale(15),
    },
    profileCont: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: size.moderateScale(10),
    },
    imageStyle: {
      height: size.moderateScale(70),
      width: size.moderateScale(70),
      borderRadius: size.moderateScale(50),
      objectFit: 'cover',
      backgroundColor: 'white',
    },
    userDetailCont: {
      justifyContent: 'space-evenly',
      flex: 1,
      paddingHorizontal: size.moderateScale(10),
      gap: size.moderateScale(4),
    },
    userText: {
      fontSize: fontSize.small,
      color: color.black,
      fontFamily: fontFamily.regular,
      maxWidth: '90%',
    },
  });
};

export default GetStyles;
