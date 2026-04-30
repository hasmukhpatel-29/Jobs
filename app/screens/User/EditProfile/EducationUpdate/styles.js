import {StyleSheet} from 'react-native';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      backgroundColor: color.white,
      flex: 1,
    },
    mainView: {
      padding: size.moderateScale(20),
    },
    educationCard: {
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: color.borderColor,
      backgroundColor: `${color.primary}10`,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tagText: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
      marginBottom: 2,
    },
    rowLabel: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.light,
      color: color.gray900,
      marginBottom: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    sectionTitle2: {
      fontSize: fontSize.mediumSmall,
      fontFamily: fontFamily.light,
      color: color.gray900,
    },
    title: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
      marginBottom: 10,
    },
    floatingBtn: {margin: 15, alignSelf: 'center', width: '90%'},
  });
};
export default GetStyles;
