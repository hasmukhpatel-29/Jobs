import {useEffect, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import OtpModal from '@components/OtpModal';
import CInput from '@components/CInput';
import UploadPhoto from '@components/UploadPhoto';
import {CHeader} from '@components/CHeader';
import {CButton} from '@components/CButton';
import Toast from '@components/CToast';
import {EditBusinessSchema} from '@zod/validationSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {NumberValidation} from '@utils/commonFunction';
import useGlobalStore from '@zustand/store';
import {getBusinessList, upadateBusinessApi} from '@apis/ApiRoutes/Business';
import GetStyle from './styles';

const IOS = Platform.OS === 'ios';

export default function EditBusiness({navigation}) {
  const styles = GetStyle();

  const userData = useGlobalStore(s => {
    return s.userData;
  });
  const userBusinessData = useGlobalStore(s => s.businessData);
  const activeBusinessId = useGlobalStore(s => s.activeBusinessId);
  const activeBranchId = useGlobalStore(s => s.activeBranchId);

  const businessData = useMemo(() => {
    return userBusinessData?.find(b => b.business_id === activeBusinessId);
  }, [userBusinessData, activeBusinessId]);

  const branchData = useMemo(() => {
    return businessData?.branches?.find(b => b.branch_id === activeBranchId);
  }, [businessData, activeBranchId]);

  const [countryCode, setCountryCode] = useState('IN');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [whatsappCC, setWhatsappCC] = useState('IN');
  const [whatsappPC, setWhatsappPC] = useState('+91');
  const [emailVerified, setEmailVerified] = useState('');
  const [phoneVerified, setPhoneVerified] = useState('');
  const [whatsappVerified, setWhatsappVerified] = useState('');
  const [otpType, setOtpType] = useState('');
  const [otpModal, setOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = useMemo(
    () => EditBusinessSchema(phoneCode, countryCode, whatsappPC, whatsappCC),
    [phoneCode, countryCode, whatsappPC, whatsappCC],
  );

  const {
    control,
    trigger,
    clearErrors,
    getValues,
    reset,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!branchData) return;

    reset({
      branch_logo: branchData?.branch_logo || '',
      primary_number: branchData?.primary_number || '',
      whatsapp_number: branchData?.whatsapp_number || '',
      business_email: branchData?.business_email || '',
    });

    setPhoneVerified(branchData?.primary_number || '');
    setWhatsappVerified(branchData?.whatsapp_number || '');
    setEmailVerified(branchData?.business_email || '');

    if (branchData?.country_code) {
      setPhoneCode(branchData.country_code);
    }

    if (branchData?.whatsapp_country_code) {
      setWhatsappPC(branchData.whatsapp_country_code);
    }
  }, [branchData, reset]);

  const editBusiness = async () => {
    setIsLoading(true);

    const values = getValues();
    const body = {
      branch_id: activeBranchId,
    };
    if (values.branch_logo !== branchData?.branch_logo) {
      const cleanedAvatar = values.branch_logo
        ? (({uri, name, type}) => ({uri, name, type}))(values.branch_logo)
        : null;

      body.branch_logo = cleanedAvatar;
    }
    if (values.primary_number !== branchData?.primary_number) {
      body.primary_number = values.primary_number;
      body.country_code = phoneCode;
    }
    if (values.whatsapp_number !== branchData?.whatsapp_number) {
      body.whatsapp_number = values.whatsapp_number;
      body.whatsapp_country_code = whatsappPC;
    }
    if (values.business_email !== branchData?.business_email) {
      body.business_email = values.business_email;
    }

    const res = await upadateBusinessApi(body);
    console.info('🚀 ~ editBusiness ~ body:', body);
    console.info('🚀 ~ editBusiness ~ res:', res);
    setIsLoading(false);
    if (res?.success) {
      getBusinessList();
      navigation.goBack();
    } else if (res?.otp_required && res?.meta.length >= 1) {
      const otpData = res.meta[0];
      setOtpType(otpData.type);
      setOtpModal(true);
    } else {
      Toast.show({
        type: 'error',
        text1: res?.error?.message || 'Something went wrong',
      });
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.mainView}>
      <CHeader title="Edit Business" back />
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Controller
              name="branch_logo"
              control={control}
              render={({field: {onChange, value}}) => {
                return (
                  <UploadPhoto
                    viewStyle={styles.imgStyle}
                    value={value}
                    onImageChange={image => {
                      onChange(image);
                      setValue('branch_logo', image);
                    }}
                    errorMsg={errors?.branch_logo?.message}
                  />
                );
              }}
            />
            <Controller
              name="primary_number"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Contact Number"
                  required
                  value={value}
                  placeholder="Enter Your Contact Number"
                  onChangeText={val => {
                    if (val === '' || NumberValidation(val)) {
                      onChange(val);
                      if (val.length >= 8) {
                        trigger('primary_number');
                      }
                    }
                  }}
                  phoneInput
                  countryCode={countryCode}
                  phoneCode={phoneCode}
                  showUpdate={
                    phoneVerified !== getValues('primary_number') &&
                    value?.length > 8
                  }
                  verifiedIcon={
                    phoneVerified === getValues('primary_number') &&
                    value?.length > 8
                  }
                  onVerify={async () => {
                    const isValid = await trigger('primary_number');
                    if (isValid) {
                      setOtpType('mobile');
                      setOtpModal(true);
                    }
                  }}
                  onSelect={country => {
                    setCountryCode(country.cca2);
                    setPhoneCode(`+${country.callingCode[0]}`);
                  }}
                  keyboardType="number-pad"
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="whatsapp_number"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Whatsapp Number"
                  value={value}
                  onChangeText={val => {
                    if (val === '' || NumberValidation(val)) {
                      onChange(val);
                    }
                  }}
                  phoneInput
                  placeholder="Enter Whatsapp Number"
                  countryCode={whatsappCC}
                  phoneCode={whatsappPC}
                  onSelect={country => {
                    setWhatsappCC(country.cca2);
                    setWhatsappPC(`+${country.callingCode[0]}`);
                  }}
                  showUpdate={
                    whatsappVerified !== getValues('whatsapp_number') &&
                    value?.length > 8
                  }
                  verifiedIcon={
                    whatsappVerified === getValues('whatsapp_number') &&
                    value?.length > 8
                  }
                  onVerify={async () => {
                    const isValid = await trigger('whatsapp_number');
                    if (isValid) {
                      setOtpType('whatsapp');
                      setOtpModal(true);
                    }
                  }}
                  keyboardType="number-pad"
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="business_email"
              control={control}
              render={({
                field: {onChange, value},
                fieldState: {error, isDirty},
              }) => (
                <CInput
                  label="Business Email"
                  value={value}
                  onChangeText={text => {
                    onChange(text);
                    if (errors.business_email) {
                      clearErrors('business_email');
                    }
                    if (/^\S+@\S+\.\S+$/.test(text)) {
                      trigger('business_email');
                    }
                  }}
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  textContentType="none"
                  importantForAutofill="no"
                  autoFill="none"
                  errorMsg={error?.message}
                  showUpdate={
                    emailVerified !== getValues('business_email') && isDirty
                  }
                  verifiedIcon={
                    emailVerified === getValues('business_email') && isDirty
                  }
                  onVerify={async () => {
                    const isValid = await trigger('business_email');
                    if (isValid) {
                      setOtpType('email');
                      setOtpModal(true);
                    }
                  }}
                />
              )}
            />
            <CButton
              label={'Save'}
              onPress={handleSubmit(editBusiness)}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <OtpModal
        isVisible={otpModal}
        type={otpType}
        purpose={5}
        valueToVerify={
          otpType === 'mobile'
            ? userData?.mobile_number
            : otpType === 'whatsapp'
            ? getValues('whatsapp_number')
            : getValues('business_email')
        }
        countryCode={
          otpType === 'mobile'
            ? userData?.country_code
            : otpType === 'whatsapp'
            ? whatsappPC
            : ''
        }
        onClose={success => {
          setOtpModal(false);
          if (success) {
            if (otpType === 'email') {
              const email = getValues('business_email');
              setEmailVerified(email);
            } else if (otpType === 'whatsapp') {
              const whatsapp = getValues('whatsapp_number');
              setWhatsappVerified(whatsapp);
            } else if (otpType === 'mobile') {
              const phone = getValues('primary_number');
              setPhoneVerified(phone);
            }
          }
        }}
      />
    </View>
  );
}
