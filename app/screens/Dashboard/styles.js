import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      backgroundColor: color.white,
      flex: 1,
    },
  });
};
export default GetStyles;
