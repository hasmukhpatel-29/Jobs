import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useMemo,
} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CInput from '@components/CInput';
import GetStyles from './styles';

const CDatePicker = forwardRef((props, ref) => {
  const {
    value,
    label,
    onDateChange,
    errorMsg,
    required = false,
    placeholder,
    minDate,
    maxDate,
    disabled = false,
    valueFormat = 'DD/MM/YYYY',
    style,
    defaultValue = new Date(),
    textInputWrapper
  } = props;

  const styles = GetStyles();

  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const displayValue = useMemo(() => {
    if (!value) return '';

    if (value.length < 10) {
      return value;
    }

    const parsed = moment(value, valueFormat, true);
    return parsed.isValid() ? parsed.format(valueFormat) : value;
  }, [value, valueFormat]);

  const handleConfirm = date => {
    setVisible(false);

    const formatted =  moment(date).format(valueFormat);

    onDateChange?.(formatted);
  };

  const handleTextChange = text => {
    let cleaned = text.replace(/[^0-9]/g, '');

    if (cleaned.length <= 2) {
      onDateChange?.(cleaned);
      return;
    }

    if (cleaned.length <= 4) {
      const formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      onDateChange?.(formatted);
      return;
    }

    const formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
      2,
      4,
    )}/${cleaned.slice(4, 8)}`;

    onDateChange?.(formatted);
  };

  return (
    <View style={[styles.root, style]}>
      <CInput
        label={label}
        required={required}
        value={displayValue}
        placeholder={placeholder}
        editable={!disabled}
        onChangeText={handleTextChange}
        calendarIcon
        onCalendar={() => !disabled && setVisible(true)}
        maxLength={10}
        keyboardType="numeric"
        errorMsg={errorMsg}
        textInputWrapper={textInputWrapper}
      />

      <DateTimePickerModal
        isVisible={visible}
        date={
          value && value.length === 10
            ? moment(value, valueFormat).toDate()
            : defaultValue
        }
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
});

export default CDatePicker;