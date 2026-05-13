import {StyleSheet} from 'react-native';
import {useThemeContext} from '@contexts/themeContext';
import {fontFamily, fontSize} from '@config/theme';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    container: {paddingVertical: size.moderateScale(10)},
    headerText: {
      color: color.black,
      fontSize: fontSize.verySmallMedium,
      fontFamily: fontFamily.semiBold,
      letterSpacing: 1.2,
      marginBottom: size.moderateScale(3),
    },
    trackContainer: {height: 30, justifyContent: 'center'},
    trackBackground: {
      height: 8,
      backgroundColor: `${color.primary}30`,
      borderRadius: 4,
      width: '100%',
      position: 'absolute',
    },
    thumb: {
      width: 20,
      height: 20,
      backgroundColor: color.primary,
      borderRadius: 10,
      position: 'absolute',
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    labelText: {
      flex: 1,
      fontSize: fontSize.verySmall,
      color: color.gray900,
      fontFamily: fontFamily.regular,
    },
    alignLeft: {textAlign: 'left'},
    alignCenter: {textAlign: 'center'},
    alignRight: {textAlign: 'right'},
  });
};
export default GetStyles;
