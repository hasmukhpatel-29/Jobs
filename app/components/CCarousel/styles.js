import {size} from '@config/Sizes';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    container: {
      height: size.moderateScale(194),
    },
    editContainer: {
      position: 'absolute',
      top: size.moderateScale(6),
      right: size.moderateScale(10),
      zIndex: 1,
      backgroundColor: color.semiTransBlack,
      borderRadius: size.moderateScale(6),
      padding: 10,
    },
    flatListMainView: cardWidth => ({
      width: cardWidth,
      borderRadius: size.moderateScale(10),
    }),
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
      position: 'absolute',
      bottom: 10,
      zIndex: 100,
      right: 20,
    },
    dotStyle: ({width, borderRadius, backgroundColor}) => ({
      width,
      height: 8,
      borderRadius,
      backgroundColor,
    }),
  });
};
export default GetStyles;
