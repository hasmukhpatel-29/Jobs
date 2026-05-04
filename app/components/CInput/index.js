/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
import {CustomIcon} from '@config/LoadIcons';
import GetStyles from './styles';

// Remove font scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const IOS = Platform.OS === 'ios';

const CInput = React.forwardRef((props, ref) => {
  const {color} = useThemeContext();

  const {
    onSubmitEditing = () => {},
    placeholder = '',
    label = '',
    onChangeText = () => {},
    isLastInput,
    returnKeyType,
    textInputWrapper = {},
    autoCapitalize = 'sentences',
    editable = true,
    value = '',
    keyboardType = 'default',
    placeholderTextColor = color.placeholderText,
    phoneInput = false,
    maxLength = 500,
    onPressIn = () => {},
    onBlur = () => {},
    onFocus = () => {},
    inputStyle = {},
    multiline = false,
    countryCode = 'IN',
    phoneCode = '+91',
    onSelect = () => {},
    errorMsg = '',
    inputViewStyle = {},
    mainLabelContainerStyle = {},
    blurOnSubmit = false,
    numberOfLines = 100,
    required = false,
    mainContainerStyle = {},
    onVerify = () => {},
    showUpdate = false,
    verifiedIcon = false,
    loading = false,
    targetIcon = false,
    calendarIcon = false,
    disabled = false,
    onCalendar = () => {},
    searchIcon = false,
    leftText = '',
    selection = selection,
    iconName = 'calendar',
    ...rest
  } = props;

  // Memoized styles (created only when theme or error changes)
  const styles = GetStyles(errorMsg);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={[styles.container, mainContainerStyle]}>
      {!!label && (
        <View style={[styles.labelMainContainer, mainLabelContainerStyle]}>
          <View style={styles.row}>
            <Text style={styles.labelText}>{label}</Text>
            {required && <Text style={styles.requiredText}>*</Text>}
          </View>
        </View>
      )}

      <View style={[styles.inputWrapper, textInputWrapper]}>
        <View
          style={[
            multiline
              ? IOS
                ? styles.multilineIOS
                : styles.multilineAndroid
              : styles.singleLine,
            styles.inputView,
            inputViewStyle,
          ]}>
          {leftText && (
            <View style={styles.countryPickerView}>
              <Text style={styles.phoneCodeText}>{leftText}</Text>
            </View>
          )}
          {phoneInput && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.countryPickerView}
              onPress={() => setShowPicker(true)}>
              <CountryPicker
                countryCode={countryCode}
                withFlag
                withFilter
                withCallingCode
                withModal
                excludeCountries={['AQ']}
                visible={showPicker}
                closeButtonImage={require('@assets/images/close.png')}
                onClose={() => setShowPicker(false)}
                onSelect={country => {
                  onSelect(country);
                  setShowPicker(false);
                }}
              />
              <Text style={styles.phoneCodeText}>{phoneCode}</Text>
              <CustomIcon
                name="arrowDown"
                size={size.moderateScale(8)}
                color={color.black}
              />
            </TouchableOpacity>
          )}
          {searchIcon && (
            <View style={styles.searchIconView}>
              <CustomIcon
                name="search"
                size={size.moderateScale(20)}
                color={color.black}
              />
            </View>
          )}

          <TextInput
            {...rest}
            selection={selection}
            ref={ref}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            placeholderTextColor={placeholderTextColor}
            onFocus={onFocus}
            style={[
              styles.input,
              !editable && styles.disabledInput,
              inputStyle,
            ]}
            scrollEnabled={false}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onPressIn={onPressIn}
            blurOnSubmit={blurOnSubmit}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType || (isLastInput ? 'go' : 'next')}
            editable={editable}
            value={value}
            maxLength={maxLength}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />

          {loading ? (
            <ActivityIndicator size="small" color={color.black} />
          ) : showUpdate ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => value?.length > 0 && onVerify(value)}>
              <Text style={styles.enterButton}>Verify</Text>
            </TouchableOpacity>
          ) : verifiedIcon ? (
            <CustomIcon
              name="badge"
              size={size.moderateScale(20)}
              color={color.green}
            />
          ) : targetIcon ? (
            <TouchableOpacity activeOpacity={0.7} onPress={onVerify}>
              <CustomIcon
                name="focus"
                size={size.moderateScale(20)}
                color={color.blue}
              />
            </TouchableOpacity>
          ) : calendarIcon ? (
            <TouchableOpacity
              disabled={disabled}
              activeOpacity={0.7}
              onPress={onCalendar}>
              <CustomIcon
                name={iconName}
                size={size.moderateScale(20)}
                color={disabled ? color.placeholderText : color.blue}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {!!errorMsg && <Text style={styles.errorMessageText}>{errorMsg}</Text>}
    </View>
  );
});

export default CInput;
