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
    dataCont: {flex: 1, paddingRight: 12},
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
      fontSize: fontSize.littleMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
      marginVertical: 10,
    },
    btnContainer: {flexDirection: 'row', gap: 10, margin: 20},
    floatingBtn: {width: '98%'},
    row: {
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'space-between',
    },
    halfWidth: {
      flex: 1,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
      gap: 8,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: color.customBlack(0.3),
      backgroundColor: color.gray,
    },
    chipText: {
      fontSize: fontSize.verySmallMedium,
      color: color.black,
      fontFamily: fontFamily.regular,
      marginRight: 5,
    },
  });
};
export default GetStyles;
