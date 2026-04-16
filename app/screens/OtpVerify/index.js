import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import COTPInput from '@components/COTPInput';
import CImage from '@components/CImage';
import Toast from '@components/CToast';
import {Images} from '@config/Images';
import {Config} from '@config/Config';
import {useThemeContext} from '@contexts/themeContext';
import {generateOtp, verifyOtp} from '@apis/ApiRoutes/LoginApi';
import useGlobalStore from '@zustand/store';
import GetStyles from './styles';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';

const OtpVerify = ({route, navigation}) => {
  const IOS = Platform.OS === 'ios';
  const styles = GetStyles();
  const {theme} = useThemeContext();
  const data = route.params?.data;
  const otpInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [otpVia, setOtpVia] = useState(data?.via);

  const startCountDown = () => {
    const date = moment().add(1, 'minute').format();
    otpInputRef?.current?.start(date);
  };

  const stopCountDown = () => {
    otpInputRef?.current?.stop();
  };

  useEffect(() => {
    setTimeout(() => {
      startCountDown();
    }, 100);
    return stopCountDown;
  }, []);

  const resendOtp = async via => {
    setOtpVia(via);
    const payload = {
      ...data,
      via,
    };
    const resp = await generateOtp(payload);
    if (resp.success) {
      startCountDown();
    } else {
      Toast.show({
        type: 'error',
        text1: resp.message,
      });
    }
  };

  const verifyOtpCode = async code => {
    setLoading(true);
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    const deviceModel = DeviceInfo.getModel();
    const payload = {
      ...data,
      otp: code,
      via: otpVia,
      product_key: Config?.PRODUCT_KEY,
      device_type: Platform.OS,
      device_id: deviceId,
      device_name: deviceName,
      device_model: deviceModel,
    };
    const resp = await verifyOtp(payload);
    if (resp.success) {
      if (resp?.is_existing_user) {
        navigation?.reset({
          index: 0,
          routes: [{name: 'UserTab'}],
        });
      } else {
        useGlobalStore.getState().setUserLoginData(payload);
        navigation?.reset({
          index: 0,
          routes: [{name: 'Register'}],
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: resp.message,
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={IOS ? 'padding' : 'null'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.imgContainer}>
            <CImage
              src={theme !== 'dark' ? Images.darkLogo : Images.lightLogo}
              style={styles.imgStyle}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.mobileNumberLabelText}>
            Verify Your Mobile Number
          </Text>
          <Text style={styles.weWillSentYouCodeText}>
            The confirmation code was sent on
          </Text>
          <Text style={styles.enterOtpText}>
            {data?.country_code} {data?.mobile_number}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}>
              <CustomIcon name="edit" style={styles.imgEdit} />
            </TouchableOpacity>
          </Text>
          <COTPInput
            ref={otpInputRef}
            onResend={val => {
              resendOtp(val);
            }}
            submitLoader={loading}
            onCodeFilled={code => {
              verifyOtpCode(code);
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OtpVerify;
