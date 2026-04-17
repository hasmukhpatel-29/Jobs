import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {fontFamily, fontSize} from '@config/theme';
import {size} from '@config/Sizes';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();

  return useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        maxWidth: '95%',
        marginTop: 4,
      },
      label: {
        marginLeft: 5,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small,
        color: color.black,
      },
      color: color.red,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      marginTop: size.moderateScale(5),
    });
  }, [color]);
};
export default GetStyles;
