import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    card: {
      borderRadius: 12,
      padding: 14,
      marginVertical: 8,
      marginHorizontal: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: color.borderColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: fontSize.small,
      color: color.black,
      fontFamily: fontFamily.bold,
    },
    headerCont: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
      paddingVertical: 10,
    },
    headerView: {flexDirection: 'row', alignItems: 'center', gap: 4},

    company: {
      fontSize: fontSize.verySmall,
      color: color.gray900,
      marginTop: 2,
      fontFamily: fontFamily.light,
    },
    description: {
      fontSize: fontSize.smallerMedium,
      color: color.textColor,
      fontFamily: fontFamily.regular,
    },
    tagsContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    tag: {
      backgroundColor: color.gray,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginRight: 6,
    },
    tagText: {
      fontSize: fontSize.verySmall,
      color: color.gray900,
      fontFamily: fontFamily.regular,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      borderTopWidth: 1,
      borderColor: color.borderColor,
      paddingTop: 10,
      gap: 10,
    },
    businessCont: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    imgContainer: {
      width: size.moderateScale(30),
      height: size.moderateScale(30),
      borderRadius: size.moderateScale(5),
      overflow: 'hidden',
    },
    companyLogo: {
      width: size.moderateScale(30),
      height: size.moderateScale(30),
      borderRadius: size.moderateScale(5),
      backgroundColor: color.gray,
    },
    companyName: {
      fontSize: fontSize.small,
      color: color.black,
      fontFamily: fontFamily.regular,
    },
    cityName: {
      fontSize: fontSize.verySmall,
      color: color.gray900,
      fontFamily: fontFamily.light,
    },
    btnStyle: {paddingHorizontal: 12, paddingVertical: 8},
  });
};

export default GetStyles;
