/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import CTab from '@components/CTab';
import {CButton} from '@components/CButton';
import Toast from '@components/CToast';
import {OtpOptions} from '@config/staticData';
import {
  verifyEmailOtp,
  verifyOtp,
  generateEmailOtp,
  generateOtp,
} from '@apis/ApiRoutes/LoginApi';
import GetStyles from './styles';

const CELL_COUNT = 4;

const OtpModal = ({
  isVisible,
  onClose,
  type, // 'email' | 'mobile'
  valueToVerify, // email or mobile number
  countryCode, // required for mobile OTP
  purpose,
}) => {
  const styles = GetStyles();

  const [otp, setOtp] = useState('');
  const [selectedOption, setSelectedOption] = useState('whatsapp');
  const [time, setTime] = useState('00:00');
  const [timeExpired, setTimeExpired] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const countdown = useRef(null);
  const [showModal, setShowModal] = useState(false);

  // Timer helpers
  const formatTime = diff => {
    const seconds = Math.floor(diff / 1000);
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`;
  };

  const startCountdown = expireAt => {
    clearInterval(countdown.current);
    countdown.current = setInterval(() => {
      const now = Date.now();
      if (now >= expireAt) {
        clearInterval(countdown.current);
        setTimeExpired(true);
        setTime('00:00');
      } else {
        setTime(formatTime(expireAt - now));
        setTimeExpired(false);
      }
    }, 1000);
  };

  const initModal = async () => {
    setOtp('');
    setSelectedOption('whatsapp');

    const success = await sendOtp();

    if (success) {
      const expireAt = Date.now() + 60 * 1000;
      startCountdown(expireAt);
      setShowModal(true);
    } else {
      setShowModal(false);
      onClose(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      initModal();
    }
    return () => clearInterval(countdown.current);
  }, [isVisible]);

  // Send OTP
  const sendOtp = async () => {
    try {
      if (type === 'email') {
        const body = {email: valueToVerify, purpose};
        const res = await generateEmailOtp(body);

        if (res?.success) {
          return true;
        } else {
          Toast.show({
            type: 'error',
            text1: res?.error?.message || 'Failed to send OTP',
          });
          return false;
        }
      } else {
        const body = {
          mobile_number: valueToVerify,
          country_code: countryCode,
          purpose,
          via: selectedOption,
        };

        const res = await generateOtp(body);

        if (res?.success) {
          return true;
        } else {
          Toast.show({
            type: 'error',
            text1: res?.message || 'Failed to send OTP',
          });
          return false;
        }
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong sending OTP',
      });
      return false;
    }
  };

  // Verify OTP
  const verifyOtpHandler = async val => {
    const otpValue = val || otp;
    if (otpValue.length !== CELL_COUNT) {
      Toast.show({type: 'error', text1: 'Please enter a valid OTP'});
      return;
    }
    try {
      setIsVerifying(true);
      let resMsg = false;
      if (type === 'email') {
        const body = {otp: otpValue, email: valueToVerify, purpose: purpose};
        const res = await verifyEmailOtp(body);
        resMsg = res;
      } else {
        const body = {
          otp: otpValue,
          mobile_number: valueToVerify,
          country_code: countryCode,
          purpose: purpose,
          via: selectedOption,
        };
        const res = await verifyOtp(body);
        resMsg = res;
      }
      setIsVerifying(false);

      if (resMsg?.success) {
        Toast.show({
          type: 'success',
          text1: resMsg?.message,
        });
        setShowModal(false);
        onClose(true);
      } else {
        Toast.show({
          type: 'error',
          text1: resMsg?.error?.message,
        });
      }
      setOtp('');
    } catch (err) {
      Toast.show({type: 'error', text1: 'Something went wrong verifying OTP'});
    }
  };

  return (
    <Modal visible={showModal} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {type === 'email'
              ? 'Verify Your Email'
              : 'Verify Your Mobile Number'}
          </Text>
          <Text style={styles.subTitle}>The Confirmation code was sent on</Text>
          <Text style={styles.userNumber}>
            {type === 'email'
              ? valueToVerify
              : `${countryCode} ${valueToVerify}`}
          </Text>

          <CodeField
            value={otp}
            onChangeText={text => {
              setOtp(text);
              if (text.length === CELL_COUNT) {
                verifyOtpHandler(text);
              }
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus
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

          <View style={styles.btnCont}>
            <CButton
              loading={isVerifying}
              onPress={verifyOtpHandler}
              label="Submit"
            />
          </View>

          {type === 'mobile' && timeExpired && (
            <View style={styles.tabStyle}>
              <CTab
                data={OtpOptions}
                valueProp="value"
                labelProp="label"
                selectedTab={selectedOption}
                onPress={option => setSelectedOption(option)}
              />
            </View>
          )}

          {timeExpired ? (
            <TouchableOpacity
              onPress={() => {
                sendOtp();
                const expireAt = Date.now() + 60 * 1000;
                startCountdown(expireAt);
              }}>
              <Text style={styles.resendOtpText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>{time}</Text>
          )}

          <CButton
            onPress={() => {
              setShowModal(false);
              onClose(false);
            }}
            label="Close"
            linkBtn
            buttonStyle={styles.closeBtn}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default OtpModal;
