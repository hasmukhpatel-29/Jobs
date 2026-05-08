import {StyleSheet} from 'react-native';
import {useThemeContext} from 'app/contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = () => {
  const {color} = useThemeContext();

  return StyleSheet.create({
    card: {
      width: '48%',
      backgroundColor: color.white,
      padding: size.moderateScale(12),
      marginBottom: size.moderateScale(12),
      borderRadius: size.moderateScale(12),
      borderWidth: 1,
      borderColor: color.borderColor,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: size.moderateScale(10),
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    value: {
      fontSize: fontSize.medium,
      color: color.black,
      fontFamily: fontFamily.bold,
      flex: 1,
    },
    label: {
      fontSize: fontSize.verySmall,
      color: color.gray900,
      fontFamily: fontFamily.regular,
    },
  });
};

export default GetStyles;
