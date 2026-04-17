import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon, {Icons} from '@config/Icons';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';

const CheckBox = ({
  checked = false,
  onChange = () => {},
  label = '',
  disabled = false,
  style = {},
  textStyle = {},
  size = 20,
  errorMsg,
}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => !disabled && onChange(!checked)}
        style={[styles.container, style]}>
        <Icon
          type={Icons.MaterialCommunityIcons}
          name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={size}
          color={checked ? color.primary : color.black}
        />

        {!!label && <Text style={[styles.label, textStyle]}>{label}</Text>}
      </TouchableOpacity>
      {!!errorMsg && <Text style={styles.errorMessageText}>{errorMsg}</Text>}
    </>
  );
};

export default CheckBox;
