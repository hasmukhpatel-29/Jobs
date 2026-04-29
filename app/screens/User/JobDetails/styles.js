import {StyleSheet} from 'react-native';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: color.white,
    },
    card: {
      borderRadius: 12,
      padding: 14,
      marginVertical: 8,
      marginHorizontal: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: color.borderColor,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
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
      fontSize: fontSize.smallerMedium,
      color: color.gray900,
      fontFamily: fontFamily.semiBold,
    },
    jobStatus: {
      fontSize: fontSize.smallerMedium,
      color: color.gray900,
      fontFamily: fontFamily.light,
    },
    dot: {
      color: color.gray900,
    },
    jobTitle: {
      fontSize: fontSize.middleMedium,
      fontFamily: fontFamily.bold,
      color: color.black,
      marginVertical: 6,
    },
    infoRow: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 6,
      flexWrap: 'wrap',
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    infoText: {
      fontSize: fontSize.verySmall,
      color: color.gray900,
      fontFamily: fontFamily.regular,
    },
    divider: {
      height: 1,
      backgroundColor: color.borderColor,
      marginVertical: 10,
    },
    footerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 15,
    },
    footerText: {
      fontSize: fontSize.verySmall,
      color: color.gray900,
      fontFamily: fontFamily.regular,
    },
    sectionTitle: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
      color: color.black,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridItem: {
      width: '48%',
      marginBottom: 12,
    },
    label: {
      fontSize: fontSize.verySmall,
      color: color.black,
      letterSpacing: 1,
      fontFamily: fontFamily.light,
    },
    value: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
      marginTop: 2,
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
    descriptionText: {
      fontSize: fontSize.smallerMedium,
      color: color.gray900,
      fontFamily: fontFamily.regular,
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: 8,
    },
    bullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: color.black,
      marginRight: 8,
    },
    benefitText: {
      fontSize: fontSize.smallerMedium,
      color: color.textColor,
      fontFamily: fontFamily.regular,
    },
    companyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 2,
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: color.gray,
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyBtn: {marginTop: 15, paddingVertical: 10},
    saveBtn: {
      marginVertical: 10,
      paddingVertical: 10,
    },

    row1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 3,
    },
  });
};

export default GetStyles;
