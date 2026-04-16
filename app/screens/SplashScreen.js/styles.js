import {StyleSheet} from 'react-native';
import {useThemeContext} from 'app/contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgStyle: {
      width: '90%',
      resizeMode: 'contain',
    },
    animationCont: {
      backgroundColor: color.white,
      position: 'absolute',
      height: '100%',
      zIndex: 1,
      width: '100%',
    },
  });
};
export default GetStyles;
