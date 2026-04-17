import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';

const GetStyle = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: color.backgroundColor,
      paddingHorizontal: size.moderateScale(15),
    },
    imgStyle: {
      height: '100%',
      width: '100%',
      marginBottom: size.moderateScale(10),
    },
  });
};
export default GetStyle;
