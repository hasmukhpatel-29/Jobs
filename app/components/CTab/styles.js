import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: color.buttonColor,
      padding: 3,
      color: color.primary,
      borderRadius: 5,
      borderColor: color.primary,
      marginBottom: size.moderateScale(10),
    },
    selectedTab: (height, width) => ({
      position: 'absolute',
      backgroundColor: color.primary,
      borderRadius: 6,
      marginHorizontal: 4,
      height: height,
      width: width,
    }),
    slider: {
      position: 'absolute',
      top: 1,
      bottom: 1,
      left: 1,
      backgroundColor: color.gray200,
      color: color.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      // borderWidth: 1,
      borderColor: color.primary,
    },
    tab: {
      flex: 1,
      paddingVertical: 6,
    },
    text: isSelected => ({
      fontSize: fontSize.small,
      fontFamily: isSelected ? fontFamily.bold : fontFamily.regular,
      color: isSelected ? color.white : color.black,
      alignSelf: 'center',
      padding: 3,
    }),
  });
};
export default GetStyles;
