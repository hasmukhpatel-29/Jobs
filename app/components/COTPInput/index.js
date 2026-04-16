import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import {View, Text} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {CButton} from '@components/CButton';
import CTab from '@components/CTab';
import Toast from '@components/CToast';
import {CustomIcon} from '@config/LoadIcons';
import {OtpOptions} from '@config/staticData';
import GetStyles from './styles';

const CELL_COUNT = 4;

const COTPInput = forwardRef((props, ref) => {
  const styles = GetStyles();

  const {
    onCodeChanged = () => {},
    onCodeFilled = () => {},
    onResend = () => {},
    autoFocusOnLoad = true,
    errorMsg = '',
    submitLoader = false,
  } = props;

  const [value, setValue] = useState('');
  const [timeExpired, setTimeExpired] = useState(false);
  const [time, setTime] = useState('00:00');
  const [btnLoader, setBtnLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(OtpOptions[0]?.value);

  const countdown = useRef(null);

  useImperativeHandle(ref, () => ({
    start(expireAt) {
      startCountdown(expireAt);
    },
    stop() {
      clearInterval(countdown.current);
      countdown.current = null;
      setTimeExpired(false);
    },
  }));

  const formatTime = diff => {
    let seconds = Math.floor(diff / 1000);
    let mm = Math.floor(seconds / 60);
    let ss = seconds % 60;

    return `${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`;
  };

  const startCountdown = expireAt => {
    countdown.current = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(expireAt).getTime();

      if (now > expiry) {
        clearInterval(countdown.current);
        setTimeExpired(true);
        setTime('00:00');
        setBtnLoader(false);
      } else {
        setTime(formatTime(expiry - now));
        setTimeExpired(false);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(countdown.current);
  }, []);

  return (
    <View style={styles.mainContainerStyles}>
      <CodeField
        value={value}
        onChangeText={text => {
          setValue(text);
          onCodeChanged(text);
          if (text.length === CELL_COUNT) {
            onCodeFilled(text);
          }
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoFocus={autoFocusOnLoad}
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : '-')}
            </Text>
          </View>
        )}
      />
      {!!errorMsg && <Text style={styles.errorMessageText}>{errorMsg}</Text>}
      <CButton
        label="Submit"
        disabled={submitLoader}
        loading={submitLoader}
        onPress={() => {
          if (value.length === CELL_COUNT) {
            onCodeFilled(value);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Please enter OTP',
            });
          }
        }}
        buttonStyle={styles.submitButton}
      />
      {timeExpired ? (
        <>
          <CTab
            data={OtpOptions}
            valueProp="value"
            labelProp="label"
            selectedTab={selectedOption}
            onPress={option => {
              setSelectedOption(option);
            }}
            style={styles.tabStyle}
          />
          <CButton
            label="Resend OTP"
            disabled={btnLoader}
            linkBtn
            onPress={() => {
              setBtnLoader(true);
              onResend(selectedOption);
            }}
            buttonLabelStyle={styles.resendButton}
          />
        </>
      ) : (
        <View style={styles.resendBtnContainer}>
          <CustomIcon name="timer3" style={styles.reloadIcon} />
          <Text style={styles.resendText}>{time}</Text>
        </View>
      )}
    </View>
  );
});

export default COTPInput;
