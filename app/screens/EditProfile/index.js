import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import DeviceInfo from 'react-native-device-info';
import CInput from '@components/CInput';
import CDatePicker from '@components/CDatePicker';
import {CButton} from '@components/CButton';
import OtpModal from '@components/OtpModal';
import Toast from '@components/CToast';
import CAutoComplete from '@components/CAutoComplete';
import {CHeader} from '@components/CHeader';
import UploadPhoto from '@components/UploadPhoto';
import DropDownList from '@components/DropDownList';
import {genderData} from '@config/staticData';
import {useThemeContext} from '@contexts/themeContext';
import useGlobalStore from '@zustand/store';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerSchema} from '@zod/validationSchema';
import {NumberValidation} from '@utils/commonFunction';
import {updateProfileFetch} from '@apis/ApiRoutes/UserProfileApi';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';
const EditProfile = ({navigation}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();

  const userData = useGlobalStore(state => {
    return state.userData;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [otpSendModalEnable, setOtpSendModalEnable] = useState(false);
  const [emailVerified, setEmailVerified] = useState(!!userData?.email);
  const [phoneVerified, setPhoneVerified] = useState(!!userData?.mobile_number);
  const [otpType, setOtpType] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [phoneCode, setPhoneCode] = useState(userData?.country_code || '+91');

  const formatDateForUI = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const defaultValues = {
    email: userData?.email || '',
    gender:
      userData?.gender !== undefined && userData?.gender !== null
        ? genderData.find(e => e.id == userData.gender)?.name
        : '',
    seaneb_id: userData?.seaneb_id || '',
    first_name: userData?.first_name || '',
    last_name: userData?.last_name || '',
    image: '',
    dob: userData?.dob ? formatDateForUI(userData?.dob) : null,
    place_id: userData?.City?.city_id || null,
    place_name: userData?.City?.city_name || '',
    mobile_number: userData?.mobile_number || '',
    avatar: userData?.avatar || null,
  };

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
  });

  const editProfile = async data => {
    try {
      const avtarUri = getValues('avatar');
      setIsLoading(true);
      const deviceId = await DeviceInfo.getUniqueId();
      const payload = {
        country_code: phoneCode,
        mobile_number: getValues('mobile_number'),
        product_key: 'seaneb',
        device_type: Platform.OS,
        device_id: deviceId,
        email: data.email,
      };
      if (avtarUri !== userData?.avatar) {
        const cleanedAvatar = avtarUri
          ? (({uri, name, type}) => ({uri, name, type}))(avtarUri)
          : null;

        payload.avatar = cleanedAvatar;
      }
      const res = await updateProfileFetch(payload);
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
          text1: res?.error?.message,
        });
        return false;
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <CHeader title="Edit Profile" back />
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mainView}>
            <View style={styles.imageCont}>
              <Controller
                name="avatar"
                control={control}
                render={({field: {value, onChange}}) => (
                  <UploadPhoto
                    value={value}
                    onImageChange={image => {
                      onChange(image);
                      setValue('avatar', image);
                    }}
                    errorMsg={errors?.avatar?.message}
                  />
                )}
              />
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
                  editable={false}
                  textInputWrapper={{backgroundColor: color.customBlack(0.2)}}
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
                  onChangeText={text =>
                    onChange(text.replace(/[^a-zA-Z\s]/g, ''))
                  }
                  placeholder="Enter last name"
                  editable={false}
                  textInputWrapper={{backgroundColor: color.customBlack(0.2)}}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="mobile_number"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => {
                return (
                  <CInput
                    label="Mobile Number"
                    required
                    value={value}
                    placeholder="Enter Mobile number"
                    phoneInput
                    onChangeText={val => {
                      onChange(NumberValidation(val));
                      if (phoneVerified) {
                        setPhoneVerified(false);
                      }
                    }}
                    countryCode={countryCode}
                    phoneCode={phoneCode}
                    onSelect={country => {
                      setCountryCode(country.cca2);
                      setPhoneCode(`+${country.callingCode[0]}`);
                    }}
                    showUpdate={!phoneVerified}
                    verifiedIcon={phoneVerified}
                    onVerify={async () => {
                      const isValid = await trigger('mobile_number');
                      if (isValid) {
                        setOtpType('mobile');
                        setOtpSendModalEnable(true);
                      }
                    }}
                    errorMsg={error?.message}
                  />
                );
              }}
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
                  placeholder="Enter email"
                  editable={!isLoading}
                  errorMsg={error?.message}
                  showUpdate={!emailVerified && isDirty}
                  verifiedIcon={emailVerified}
                  onVerify={async () => {
                    const isValid = await trigger('email');
                    if (isValid) {
                      setOtpType('email');
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
                  disabled={true}
                  textInputWrapper={{backgroundColor: color.customBlack(0.2)}}
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
                  valueProp="name"
                  labelProp="name"
                  placeholder="Select Gender"
                  data={genderData}
                  disabled
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="seaneb_id"
              control={control}
              render={({field: {value}}) => (
                <CInput
                  label="SeaNeB ID"
                  required
                  value={value}
                  editable={false}
                  autoCapitalize="none"
                  placeholder="Enter Unique Seaneb id"
                  verifiedIcon={true}
                  textInputWrapper={{backgroundColor: color.customBlack(0.2)}}
                />
              )}
            />
            <Controller
              name="place_name"
              control={control}
              defaultValue={null}
              render={({field: {onChange, value}}) => (
                <CAutoComplete
                  label="Home Town"
                  placeholder="Search location"
                  value={value}
                  textInputWrapper={{backgroundColor: color.customBlack(0.2)}}
                  editable={false}
                />
              )}
            />
            <CButton
              label={'Save'}
              onPress={handleSubmit(editProfile)}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <OtpModal
        isVisible={otpSendModalEnable}
        type={otpType}
        purpose={4}
        valueToVerify={
          otpType === 'mobile' ? getValues('mobile_number') : getValues('email')
        }
        countryCode={otpType === 'mobile' ? phoneCode : ''}
        onClose={success => {
          setOtpSendModalEnable(false);
          if (success) {
            if (otpType === 'email') {
              const email = getValues('email');
              setEmailVerified(true);
            } else if (otpType === 'mobile') {
              const phone = getValues('mobile_number');
              setPhoneVerified(true);
            }
          }
        }}
      />
    </View>
  );
};

export default EditProfile;
