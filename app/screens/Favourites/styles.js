import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      backgroundColor: color.background2,
      flex: 1,
    },
    contentContainerStyle: {paddingBottom: 100},
    emptyText: {
      textAlign: 'center',
      marginTop: '60%',
      fontFamily: fontFamily.regular,
      fontSize: fontSize.littleMedium,
      color: color.black,
    },
  });
};
export default GetStyles;
