import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
import {fontFamily, fontSize} from '@config/theme';

const GetStyles = errorMsg => {
  const {color} = useThemeContext();

  return useMemo(() => {
    return StyleSheet.create({
      container: {
        marginBottom: 15,
      },
      labelMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        gap: 5,
      },
      labelText: {
        marginBottom: 10,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.small,
        color: color.black,
      },
      requiredText: {
        color: color.red,
      },
      inputWrapper: {
        borderRadius: size.moderateScale(5),
        borderWidth: 1,
        borderColor: errorMsg ? color.red : color.customBlack(0.3),
        paddingRight: 15,
      },
      inputView: {
        flexDirection: 'row',
        borderRadius: 5,
      },
      multilineIOS: {
        minHeight: 110,
        marginBottom: 10,
        alignItems: 'flex-start',
      },
      multilineAndroid: {
        alignItems: 'flex-start',
        height: 110,
        marginBottom: 10,
      },
      singleLine: {
        alignItems: 'center',
        height: size.moderateScale(45),
      },
      countryPickerView: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: size.moderateScale(5),
        borderBottomLeftRadius: size.moderateScale(5),
        paddingHorizontal: size.moderateScale(5),
        borderRightWidth: 1,
        borderColor: errorMsg ? color.red : color.customBlack(0.3),
      },
      phoneCodeText: {
        fontSize: size.moderateScale(17),
        color: color.black,
        marginRight: 5,
      },
      searchIconView: {
        paddingLeft: size.moderateScale(14),
      },
      input: {
        flex: 1,
        marginEnd: 10,
        color: color.black,
        fontSize: size.moderateScale(17),
        paddingLeft: 15,
      },
      disabledInput: {
        backgroundColor: color.grey,
        color: color.black,
      },
      enterButton: {
        fontSize: size.moderateScale(16),
        color: color.black,
      },
      errorMessageText: {
        color: color.red,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.verySmall,
        marginTop: size.moderateScale(5),
      },
    });
  }, [color, errorMsg]);
};

export default GetStyles;
