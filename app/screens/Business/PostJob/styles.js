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
    bpWrapper: {
      marginBottom: size.moderateScale(12),
    },
    bpLabel: {
      fontSize: fontSize.verySmallMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
      marginBottom: size.moderateScale(6),
    },
    bpRequired: {
      color: color.red,
    },
    bpSelectedCard: {
      borderWidth: 1,
      borderRadius: size.moderateScale(10),
      paddingHorizontal: size.moderateScale(14),
      paddingVertical: size.moderateScale(12),
      backgroundColor: color.white,
      borderColor: color.customBlack(0.15),
    },
    bpSelectedCardOpen: {
      borderColor: color.blue,
    },
    bpBranchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(10),
    },
    bpPlaceholderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bpPlaceholderText: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.regular,
      color: color.gray900,
      flex: 1,
    },
    bpAvatar: {
      width: size.moderateScale(38),
      height: size.moderateScale(38),
      borderRadius: size.moderateScale(8),
    },
    bpAvatarPlaceholder: {
      width: size.moderateScale(38),
      height: size.moderateScale(38),
      borderRadius: size.moderateScale(8),
      backgroundColor: color.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bpAvatarText: {
      color: color.commonWhite,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.smallerMedium,
    },
    bpBranchInfo: {
      flex: 1,
    },
    bpBranchName: {
      fontSize: fontSize.smallerMedium,
      fontFamily: fontFamily.semiBold,
      color: color.black,
    },
    bpLocationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size.moderateScale(3),
      marginTop: size.moderateScale(2),
    },
    bpLocationText: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.regular,
      color: color.gray900,
      flex: 1,
    },
    bpDropdownList: {
      borderWidth: 1,
      borderColor: color.customBlack(0.12),
      borderRadius: size.moderateScale(10),
      marginTop: size.moderateScale(6),
      backgroundColor: color.white,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    bpDropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: size.moderateScale(14),
      paddingVertical: size.moderateScale(12),
      gap: size.moderateScale(10),
    },
    bpDropdownItemSelected: {
      backgroundColor: color.lightBlue,
    },
    bpItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: color.customBlack(0.07),
    },
    aiHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: size.moderateScale(6),
    },
    aiLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    aiLabelText: {
      fontSize: fontSize.verySmallMedium,
      fontFamily: fontFamily.medium,
      color: color.black,
    },
    aiRequiredStar: {
      color: color.red,
    },
    aiBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.customBlack(0.04),
      paddingHorizontal: size.moderateScale(10),
      paddingVertical: size.moderateScale(5),
      borderRadius: size.moderateScale(15),
      gap: size.moderateScale(4),
      borderWidth: 0.5,
      borderColor: color.customBlack(0.08),
    },
    aiBtnActive: {
      backgroundColor: color.lightBlue,
      borderColor: color.blue,
    },
    aiBtnText: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.medium,
      color: color.gray900,
    },
    aiBtnTextActive: {
      color: color.blue,
    },
    aiHelpRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: size.moderateScale(-8),
      marginBottom: size.moderateScale(12),
      gap: size.moderateScale(6),
      paddingHorizontal: size.moderateScale(2),
    },
    aiHelpText: {
      fontSize: fontSize.verySmall,
      fontFamily: fontFamily.regular,
      color: color.gray900,
      flex: 1,
      lineHeight: size.moderateScale(15),
    },
    aiHelpIcon: {
      marginTop: size.moderateScale(1),
    },
  });
};
export default GetStyles;
