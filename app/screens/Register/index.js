import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import CImage from '@components/CImage';
import CInput from '@components/CInput';
import CDatePicker from '@components/CDatePicker';
import DropDownList from '@components/DropDownList';
import {CButton} from '@components/CButton';
import OtpModal from '@components/OtpModal';
import Toast from '@components/CToast';
import CAutoComplete from '@components/CAutoComplete';
import UploadPhoto from '@components/UploadPhoto';
import CheckBox from '@components/CheckBox';
import {Images} from '@config/Images';
import {Config} from '@config/Config';
import {useThemeContext} from '@contexts/themeContext';
import useGlobalStore from '@zustand/store';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerSchema} from '@zod/validationSchema';
import {seanebIdCheck, userSignup} from '@apis/ApiRoutes/LoginApi';
import {formatLocation} from '@utils/commonFunction';
import {genderData} from '@config/staticData';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';
const Register = ({navigation}) => {
  const styles = GetStyles();
  const {theme} = useThemeContext();

  const [isLoading, setIsLoading] = useState(false);
  const [seanebIdUnique, setSeanebIdUnique] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSendModalEnable, setOtpSendModalEnable] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [checked, setChecked] = useState(false);

  const defaultValues = {
    email: '',
    gender: '',
    seaneb_id: '',
    first_name: '',
    last_name: '',
    image: '',
    dob: '',
    place_name: '',
    place_id: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    setError,
    formState: {errors, dirtyFields},
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const SeanebIdAvailable = async data => {
    try {
      const payload = {
        seaneb_id: data,
      };
      const res = await seanebIdCheck(payload);
      if (res.success) {
        return true;
      } else {
        Toast.show({
          type: 'error',
          text1: res?.error?.message,
        });
        return false;
      }
    } catch (error) {
      setSeanebIdUnique('');
    }
  };

  const userRegister = async data => {
    if (seanebIdUnique !== getValues('seaneb_id')) {
      setError('seaneb_id', {
        message: 'Please verify your SeaNeb ID',
      });
      return;
    }
    try {
      setIsLoading(true);
      const avtarUri = getValues('avatar');
      const cleanedAvatar = avtarUri
        ? (({uri, name, type}) => ({uri, name, type}))(avtarUri)
        : null;
      const payload = {
        ...data,
        country_code: useGlobalStore.getState()?.userLoginData.country_code,
        mobile_number: useGlobalStore.getState()?.userLoginData.mobile_number,
        product_key: Config.PRODUCT_KEY,
        seaneb_id: data.seaneb_id,
        place_id: getValues('place_id'),
        avatar: cleanedAvatar,
      };
      const res = await userSignup(payload);
      setIsLoading(false);
      if (res.success) {
        navigation?.reset({
          index: 0,
          routes: [{name: 'UserTab'}],
        });
        return true;
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message,
        });
        return false;
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoCont}>
            <CImage
              src={theme !== 'dark' ? Images.darkLogo : Images.lightLogo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.registerTextCont}>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subTitle}>
              Please fill in the details below
            </Text>
            <View style={styles.imageCont}>
              <Controller
                name="avatar"
                control={control}
                render={({field: {value, onChange}}) => (
                  <UploadPhoto
                    value={value}
                    onImageChange={image => {
                      onChange(image);
                      return setValue('avatar', image);
                    }}
                    errorMsg={errors?.avatar?.message}
                  />
                )}
              />
            </View>
          </View>
          <Controller
            name="first_name"
            control={control}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CInput
                label="First Name"
                required
                value={value}
                onChangeText={text =>
                  onChange(text.replace(/[^a-zA-Z\s]/g, ''))
                }
                editable={!isLoading}
                placeholder="Enter first name"
                errorMsg={error?.message}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CInput
                label="Last Name"
                required
                value={value}
                editable={!isLoading}
                onChangeText={text =>
                  onChange(text.replace(/[^a-zA-Z\s]/g, ''))
                }
                placeholder="Enter last name"
                errorMsg={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({
              field: {onChange, value},
              fieldState: {error, isDirty},
            }) => (
              <CInput
                label="Email"
                value={value}
                onChangeText={text => {
                  onChange(text.toLowerCase());
                  if (emailVerified) {
                    setEmailVerified(false);
                  }
                  if (error) {
                    trigger('email');
                  }
                }}
                editable={!isLoading}
                placeholder="Enter email"
                errorMsg={error?.message}
                showUpdate={!emailVerified && isDirty && !error && value}
                verifiedIcon={emailVerified}
                onVerify={async () => {
                  const isValid = await trigger('email');
                  if (isValid) {
                    setOtpSendModalEnable(true);
                  }
                }}
              />
            )}
          />
          <Controller
            name="dob"
            control={control}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CDatePicker
                label="Date of Birth (DD/MM/YYYY)"
                required
                value={value || ''}
                placeholder="dd/mm/yyyy"
                minDate={new Date('1800-01-01')}
                maxDate={
                  new Date(
                    new Date().getFullYear() - 13,
                    new Date().getMonth(),
                    new Date().getDate(),
                  )
                }
                valueFormat="DD/MM/YYYY"
                onDateChange={onChange}
                errorMsg={error?.message}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <DropDownList
                required
                label="Gender"
                valueProp="value"
                placeholder="Select Gender"
                data={genderData}
                onChange={onChange}
                value={value}
                errorMsg={error?.message}
              />
            )}
          />
          <Controller
            name="seaneb_id"
            control={control}
            render={({
              field: {onChange, value},
              fieldState: {isDirty, error},
            }) => (
              <CInput
                label="SeaNeB ID"
                required
                value={value}
                editable={!isLoading}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => {
                  const sanitizedText = text.replace(/\s+/g, '').toLowerCase();
                  onChange(sanitizedText);
                  trigger('seaneb_id');
                }}
                placeholder="Enter Unique Seaneb id"
                showUpdate={
                  seanebIdUnique !== getValues('seaneb_id') && value?.length > 9
                }
                loading={isVerifying}
                verifiedIcon={
                  seanebIdUnique === getValues('seaneb_id') && value?.length > 9
                }
                errorMsg={error?.message}
                onVerify={async () => {
                  const isValid = await trigger('seaneb_id');
                  if (isValid) {
                    Keyboard.dismiss();
                    setIsVerifying(true);
                    const isAvailable = await SeanebIdAvailable(value);
                    if (isAvailable) {
                      setSeanebIdUnique(value);
                    }
                    setIsVerifying(false);
                    dirtyFields.seaneb_id = false;
                  }
                }}
              />
            )}
          />
          <Controller
            name="place_name"
            control={control}
            defaultValue={null}
            render={({field: {onChange, value}}) => (
              <CAutoComplete
                required
                label="Home Town"
                placeholder="Enter your home town"
                value={value}
                direction="top"
                onSelect={item => {
                  const locationText = formatLocation(item);

                  setValue('place_id', item?.place_id, {
                    shouldValidate: true,
                  });
                  setValue('place_name', locationText, {
                    shouldValidate: true,
                  });
                }}
                errorMsg={errors?.place_name?.message}
              />
            )}
          />
          <View style={styles.container}>
            <CheckBox checked={checked} onChange={() => setChecked(!checked)} />

            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text
                style={styles.termsTextLink}
                onPress={() => console.log('Terms')}>
                Terms of Service
              </Text>
              |{' '}
              <Text
                style={styles.termsTextLink}
                onPress={() => console.log('Privacy')}>
                Privacy Policy
              </Text>{' '}
              |{' '}
              <Text
                style={styles.termsTextLink}
                onPress={() => console.log('Content')}>
                Content Policy
              </Text>
            </Text>
          </View>
          <CButton
            label="Register"
            onPress={handleSubmit(userRegister)}
            loading={isLoading}
            disabled={!checked || isLoading}
            buttonStyle={{marginVertical: 20}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <OtpModal
        isVisible={otpSendModalEnable}
        type="email"
        purpose={1}
        valueToVerify={getValues('email')}
        onClose={success => {
          setOtpSendModalEnable(false);
          if (success) {
            setEmailVerified(true);
          }
        }}
      />
    </View>
  );
};

export default Register;
