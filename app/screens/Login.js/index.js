import {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {phoneSchema} from '@zod/validationSchema';
import CImage from '@components/CImage';
import CInput from '@components/CInput';
import {CButton} from '@components/CButton';
import CTab from '@components/CTab';
import Toast from '@components/CToast';
import {useThemeContext} from '@contexts/themeContext';
import {OtpOptions} from '@config/staticData';
import {Images} from '@config/Images';
import {generateOtp} from '@apis/ApiRoutes/LoginApi';
import {NumberValidation} from '@utils/commonFunction';
import {GetStyles} from './styles';

export default function Login({navigation}) {
  const IOS = Platform.OS === 'ios';
  const styles = GetStyles();
  const {theme} = useThemeContext();

  const [countryCode, setCountryCode] = useState('IN');
  const [phoneCode, setPhoneCode] = useState('+91');

  const [selectedOption, setSelectedOption] = useState(OtpOptions[0]?.value);
  const [btnLoader, setBtnLoader] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(phoneSchema(phoneCode, countryCode)),
  });

  const onSubmit = async data1 => {
    setBtnLoader(true);
    const data = {
      mobile_number: data1.phone,
      country_code: phoneCode,
      via: selectedOption,
      purpose: 0,
    };
    const resp = await generateOtp(data);
    setBtnLoader(false);
    if (resp.success) {
      navigation?.navigate('OtpVerify', {data});
    } else {
      Toast.show({
        type: 'error',
        text1: resp?.message,
      });
    }
  };

  return (
    <View style={styles.container}>
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.skipCont}
              onPress={() => navigation.navigate('UserTab')}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.title}>Find Jobs and Hire Talent Easily</Text>

            <Text style={styles.title1}>The confirmation code was sent on</Text>
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

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="phone"
              render={({field: {value, onChange}}) => (
                <CInput
                  phoneInput
                  placeholder="Enter Your Number"
                  countryCode={countryCode}
                  phoneCode={phoneCode}
                  onSelect={country => {
                    setCountryCode(country.cca2);
                    setPhoneCode(`+${country.callingCode[0]}`);
                  }}
                  keyboardType="number-pad"
                  value={value}
                  editable={!btnLoader}
                  onChangeText={val => onChange(NumberValidation(val))}
                  errorMsg={errors?.phone?.message}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  returnKeyType="done"
                />
              )}
            />

            <CButton
              label="Get OTP"
              loading={btnLoader}
              disabled={btnLoader}
              onPress={handleSubmit(onSubmit)}
              buttonStyle={styles.button}
            />
            <View style={styles.termsContainer}>
              <Text style={styles.continueText}>
                By continue, you agree to our
              </Text>
              <View style={styles.termsLinkContainer}>
                <Text style={styles.termLinkText}>
                  End User Licence Agreement
                </Text>
                <Text style={styles.termLinkText}>Terms of Service</Text>
                <Text style={styles.termLinkText}>Privacy Policy</Text>
                <Text style={styles.termLinkText}>Content Policy</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
