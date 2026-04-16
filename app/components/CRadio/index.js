import React from 'react';
import {View, Text} from 'react-native';
import _ from 'lodash';
import GetStyles from './styles';
import RadioItem from './radioItem';

const CRadio = props => {
  const styles = GetStyles();

  const {
    options,
    selectedOption,
    handleOptionSelect,
    style,
    errorMsg = '',
    singleStyle,
    txtStyle,
    disabled,
  } = props;

  return (
    <>
      <View style={[style]}>
        {!_.isEmpty(options) && _.isArray(options)
          ? options.map((option, index) => {
              const selected = option.id === selectedOption?.id;

              return (
                <RadioItem
                  key={option.value || `option_${index + 1}`}
                  option={option}
                  selected={selected}
                  onPress={() => !disabled && handleOptionSelect(option)}
                  styles={styles}
                  disabled={disabled}
                  singleStyle={singleStyle}
                  txtStyle={txtStyle}
                />
              );
            })
          : null}
      </View>

      {!!errorMsg && <Text style={styles.errorMessageText}>{errorMsg}</Text>}
    </>
  );
};
export default CRadio;
