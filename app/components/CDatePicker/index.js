import React, {forwardRef, useImperativeHandle, useState, useMemo} from 'react';
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
    editable = false,
    valueFormat = 'DD/MM/YYYY',
    style,
    defaultValue = new Date(),
    textInputWrapper,
    mode = 'date',
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

    const formatted = moment(date).format(valueFormat);

    onDateChange?.(formatted);
  };
  const handleTextChange = text => {
    let formatted = text;

    if (mode === 'date') {
      let cleaned = text.replace(/[^0-9]/g, '').slice(0, 8);

      if (cleaned.length <= 2) {
        formatted = cleaned;
      } else if (cleaned.length <= 4) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      } else {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
          2,
          4,
        )}/${cleaned.slice(4)}`;
      }
    } else if (mode === 'time') {
      let cleaned = text.replace(/[^0-9:\sAPMapm]/g, '');

      const justNumbers = cleaned.replace(/[^0-9]/g, '');
      if (justNumbers.length >= 3 && !cleaned.includes(':')) {
        const numIndex = cleaned.search(/[0-9]{3}/);
        if (numIndex !== -1) {
          cleaned =
            cleaned.slice(0, numIndex + 2) + ':' + cleaned.slice(numIndex + 2);
        }
      }

      cleaned = cleaned.replace(/(\d)([a-zA-Z])/g, '$1 $2');
      cleaned = cleaned.replace(/\s+/g, ' ');

      formatted = cleaned.toUpperCase().slice(0, 8);
    } else if (mode === 'datetime') {
      let cleaned = text.replace(/[^0-9/\s:APMapm]/g, '');

      formatted = cleaned.slice(0, 19);
    }
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
        iconName={mode === 'date' ? 'calendar' : 'timer3'}
        calendarIcon
        onCalendar={() => (!disabled || editable) && setVisible(true)}
        maxLength={mode === 'date' ? 10 : 20}
        keyboardType={mode === 'date' ? 'numeric' : 'default'}
        errorMsg={errorMsg}
        textInputWrapper={textInputWrapper}
      />

      <DateTimePickerModal
        isVisible={visible}
        mode={mode}
        date={
          value && moment(value, valueFormat, true).isValid()
            ? moment(value, valueFormat, true).toDate()
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
