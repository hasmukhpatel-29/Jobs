import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';

const GetStyle = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      backgroundColor: color.backgroundColor,
      paddingHorizontal: size.moderateScale(15),
    },
    cityInputStyle: {
      flexDirection: 'row',
      gap: size.moderateScale(10),
    },
    inputStyle: {
      flex: 1,
    },
  });
};
export default GetStyle;
