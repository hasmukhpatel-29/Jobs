import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {useThemeContext} from '@contexts/themeContext';
import {GetTypography} from '@config/theme';
import Icon, {Icons} from '@config/Icons';
import Arrow from './arrow';
import GetStyles from './styles';

const DropDownList = forwardRef((props, ref) => {
  const styles = GetStyles();
  const Typography = GetTypography();
  const {color} = useThemeContext();
  const {
    data = [],
    onChange = () => null,
    labelProp = 'name',
    value = '',
    placeholder = '',
    isSearch = false,
    multiSelection = false,
    errorMsg = '',
    valueProp = 'id',
    label = '',
    required = false,
    disabled = false,
    dropdownPosition = '',
    placeholderStyle = {},
    loading = false,
    maxHeight = 300,
  } = props;
  const dropdownRef = useRef();
  const [filterData, setFilterData] = useState(data);
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  // Custom hook for handling imperative logic with refs
  useImperativeHandle(ref, () => ({
    close() {
      dropdownRef?.current?.close();
    },
    open() {
      dropdownRef?.current?.open();
    },
  }));

  const renderLabel = () => {
    if (value || !value) {
      return (
        <View style={styles.labelContainer}>
          <Text style={[Typography.formLabel, styles.label]}>{label}</Text>
          {required && (
            <Icon
              type={Icons.MaterialCommunityIcons}
              name="asterisk"
              style={styles.requiredIcon}
            />
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {label ? renderLabel() : null}
      {multiSelection ? (
        <MultiSelect
          ref={ref}
          style={[
            styles.dropdown,
            disabled && {
              backgroundColor: color.gray,
              opacity: 0.7,
            },
          ]}
          placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
          selectedTextStyle={[Typography.CInputText, styles.selectedTextStyle]}
          inputSearchStyle={[Typography.CInputText, styles.inputSearchStyle]}
          iconStyle={styles.iconStyle}
          iconColor={'#6B7280'}
          search={isSearch}
          activeColor={'#E6E6E6'}
          itemTextStyle={[Typography.CInputText, styles.listText]}
          data={data}
          dropdownPosition={dropdownPosition || 'bottom'}
          labelField={labelProp || 'title'}
          valueField={valueProp || 'id'}
          placeholder={placeholder || ''}
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            onChange(item);
          }}
          selectedStyle={{backgroundColor: '#E5E7EB', borderRadius: 3}}
        />
      ) : (
        <Dropdown
          ref={dropdownRef}
          style={[
            styles.dropdown,
            disabled && {
              backgroundColor: color.customBlack(0.2),
            },
          ]}
          disable={disabled}
          placeholderStyle={[
            Typography.CInputText,
            styles.placeholderStyle,
            placeholderStyle,
          ]}
          renderItem={(item, selected) => {
            return (
              <TouchableOpacity
                style={styles.dropdownItem}
                activeOpacity={0.7}
                onPress={() => {
                  dropdownRef?.current?.close();
                  onChange(item[valueProp]);
                }}>
                <Text
                  style={[
                    Typography.CInputText,
                    styles.dropdownItemText(selected),
                  ]}>
                  {item[labelProp]}
                </Text>
              </TouchableOpacity>
            );
          }}
          autoScroll={false}
          selectedTextStyle={[Typography.CInputText, styles.selectedTextStyle]}
          inputSearchStyle={[Typography.CInputText, styles.inputSearchStyle]}
          iconStyle={styles.iconStyle}
          iconColor={color.borderColor}
          itemTextStyle={[Typography.CInputText, styles.listText]}
          containerStyle={styles.listContainer}
          data={filterData}
          search={isSearch ? true : false}
          maxHeight={maxHeight}
          dropdownPosition={dropdownPosition || 'bottom'}
          labelField={labelProp || 'name'}
          valueField={valueProp || 'id'}
          placeholder={placeholder || ''}
          searchPlaceholder="Search..."
          searchQuery={(val, item) =>
            item?.toLowerCase().startsWith(val?.toLowerCase())
          }
          value={value}
          renderRightIcon={isOpen => {
            return (
              <View style={{marginRight: 10}}>
                {loading ? (
                  <ActivityIndicator size={20} color={color.primary} />
                ) : (
                  <Arrow isOpen={isOpen} />
                )}
              </View>
            );
          }}
          onChange={item => {
            onChange(item[valueProp]);
          }}
        />
      )}
      {!!errorMsg && <Text style={styles.errorMessageText}>{errorMsg}</Text>}
    </View>
  );
});

export default DropDownList;
