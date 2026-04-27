import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {StyleSheet} from 'react-native';

const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: color.backgroundColor,
    },
    imgStyle: {
      width: '100%',
      height: size.moderateScale(194),
      alignSelf: 'center',
      borderRadius: 0,
    },
    editCont: {
      position: 'absolute',
      top: size.moderateScale(6),
      right: size.moderateScale(10),
      zIndex: 1,
      backgroundColor: color.semiTransBlack,
      borderRadius: size.moderateScale(6),
      padding: 10,
    },
    headerLeftView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      gap: size.moderateScale(10),
    },
    headerImg: {
      height: size.moderateScale(40),
      width: size.moderateScale(40),
      borderRadius: size.moderateScale(50),
    },
    headerBusiness: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    textCont: {flex: 1, paddingRight: 10, justifyContent: 'flex-end'},
    businessName: {
      color: color.black,
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    imgCont: {
      width: size.moderateScale(40),
      height: size.moderateScale(40),
      borderRadius: 8,
      backgroundColor: color.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconImage: {
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmallMedium,
    },
    address: {
      color: color.black,
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.regular,
    },
    profileView: {
      marginTop: -size.moderateScale(18),
      paddingHorizontal: size.moderateScale(10),
    },
    businessImgCont: {
      flexDirection: 'row',
      gap: size.moderateScale(10),
    },
    businessImgView: {
      height: size.moderateScale(60),
      width: size.moderateScale(60),
      borderRadius: size.moderateScale(6),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.blue,
      overflow: 'hidden',
    },
    businessIconImage: {
      color: color.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.middleMedium,
    },
    editContainer: {justifyContent: 'flex-end'},
    sectionTitle: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.bold,
      color: color.black,
      marginBottom: size.moderateScale(10),
    },
    sectionContainer: {
      marginBottom: size.moderateScale(5),
    },
    detailLabel: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.regular,
      color: color.customBlack(0.6),
      marginBottom: size.moderateScale(4),
    },
    detailValue: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.regular,
      color: color.black,
    },
    sectionHeaderWithEdit: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      marginBottom: size.moderateScale(12),
    },
    seactionHeaderTitle: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.bold,
      color: color.black,
    },
    contactLogo: {
      height: size.moderateScale(32),
      width: size.moderateScale(32),
      borderRadius: size.moderateScale(6),
    },
    contactItem: {
      backgroundColor: color.customBlack(0.2),
      flexDirection: 'row',
      alignItems: 'center',
      padding: size.moderateScale(12),
      borderRadius: size.moderateScale(8),
      marginBottom: size.moderateScale(8),
      gap: size.moderateScale(12),
    },
    contactText: {
      flex: 1,
      fontSize: fontSize.small,
      fontFamily: fontFamily.regular,
      color: color.black,
    },
  });
};
export default GetStyles;
