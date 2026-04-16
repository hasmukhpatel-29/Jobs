import {StyleSheet} from 'react-native';
import {fontFamily, fontSize} from '@config/theme';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
const GetStyles = () => {
  const {color} = useThemeContext();
  return StyleSheet.create({
    container: {
      marginBottom: 15,
    },
    requiredIcon: {
      fontSize: fontSize.tiny,
      color: color.red,
      marginLeft: 2,
    },
    dropdown: {
      borderWidth: 1,
      height: 45,
      borderRadius: 5,
      borderColor: color.customBlack(0.3),
      paddingLeft: size.moderateScale(10),
    },
    dropdownItem: {
      paddingVertical: 10,
      backgroundColor: color.backgroundColor,
    },
    dropdownItemText: selected => ({
      color: selected ? color.primary : color.gray900,
      fontFamily: fontFamily.regular,
      paddingLeft: 10,
    }),
    placeholderStyle: {
      color: color.placeholderText,
      paddingLeft: 5,
      fontFamily: fontFamily.regular,
    },
    selectedTextStyle: {
      paddingLeft: 5,
      color: color.black,
    },
    iconStyle: {
      width: 20,
      height: 20,
      marginRight: 15,
    },
    inputSearchStyle: {
      borderRadius: 4,
      height: 40,
      color: color.black,
      lineHeight: 20,
      padding: 0,
      fontFamily: fontFamily.regular,
    },
    labelContainer: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    label: {
      marginBottom: 10,
    },
    listContainer: {
      borderRadius: 6,
      borderWidth: 1,
    },
    listText: {
      color: color.black,
      fontFamily: fontFamily?.regular,
      fontSize: fontSize.littleMedium,
    },

    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      backgroundColor: 'white',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: color.customBlack(0.3),
    },
    textSelectedStyle: {
      marginRight: 5,
      fontSize: fontSize.littleMedium,
    },
    errorMessageText: {
      color: color.red,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.verySmall,
      marginTop: size.moderateScale(5),
    },
  });
};
export default GetStyles;
