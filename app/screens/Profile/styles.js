import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      flexGrow: 1,
      backgroundColor: color.background,
    },
    profileMainCont: {
      paddingVertical: size.moderateScale(15),
      paddingHorizontal: size.moderateScale(15),
    },
    profileCont: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: size.moderateScale(10),
    },
    imageStyle: {
      height: size.moderateScale(70),
      width: size.moderateScale(70),
      borderRadius: size.moderateScale(50),
      objectFit: 'cover',
      backgroundColor: 'white',
    },
    userDetailCont: {
      justifyContent: 'space-evenly',
      flex: 1,
      paddingHorizontal: size.moderateScale(10),
      gap: size.moderateScale(4),
    },
    userText: {
      fontSize: fontSize.small,
      color: color.black,
      fontFamily: fontFamily.regular,
      maxWidth: '90%',
    },
    card: {
      borderRadius: 12,
      padding: 14,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
      borderWidth: 1,
      borderColor: color.borderColor,
      marginTop: 10,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: color.borderColor,
      paddingBottom: 12,
    },
    title: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
    },
    sectionTitle2: {
      fontSize: fontSize.mediumSmall,
      fontFamily: fontFamily.light,
      color: color.gray900,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: `${color.primary}10`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      gap: 4,
      borderColor: color.primary,
      borderWidth: 1,
    },
    editText: {
      fontSize: fontSize.mediumSmall,
      fontFamily: fontFamily.regular,
      color: color.primary,
    },
    dataRow: {
      marginBottom: 10,
      alignItems: 'flex-start',
      // flex: 1,
    },
    rowLabel: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.light,
      color: color.gray900,
      marginBottom: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    rowValue: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
    },
    educationCard: {
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: color.borderColor,
      backgroundColor: `${color.primary}10`,
      marginBottom: 10,
    },
    tagText: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
      marginBottom: 2,
    },
  });
};

export default GetStyles;
