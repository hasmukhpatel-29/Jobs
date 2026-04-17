import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';
import Toast from '@components/CToast';
import OtpModal from '@components/OtpModal';
import CInput from '@components/CInput';
import UploadPhoto from '@components/UploadPhoto';
import {ContactFormSchema} from '@zod/validationSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useThemeContext} from '@contexts/themeContext';
import {NumberValidation} from '@utils/commonFunction';
import useGlobalStore from '@zustand/store';
import {seanebIdCheck} from '@apis/ApiRoutes/LoginApi';
import GetStyle from './styles';

const BusinessContact = forwardRef((props, ref) => {
  const styles = GetStyle();
  const {color} = useThemeContext();

  const [countryCode, setCountryCode] = useState('IN');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [whatsappCC, setWhatsappCC] = useState('IN');
  const [whatsappPC, setWhatsappPC] = useState('+91');
  const [seanebIdUnique, setSeanebIdUnique] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState('');
  const [phoneVerified, setPhoneVerified] = useState('');
  const [whatsappVerified, setWhatsappVerified] = useState('');
  const [otpType, setOtpType] = useState('');
  const [otpModal, setOtpModal] = useState(false);

  const {
    control,
    trigger,
    clearErrors,
    watch,
    getValues,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(ContactFormSchema),
  });

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const formData = watch();
      const isValid = await trigger();
      console.info('🚀 ~ isValid:', isValid, errors);

      if (formData.seaneb_id !== seanebIdUnique) {
        Toast.show({
          type: 'error',
          text1: 'Please verify Seaneb ID',
        });
        return false;
      }

      if (formData.contact_number !== phoneVerified) {
        Toast.show({
          type: 'error',
          text1: 'Please verify contact number',
        });
        return false;
      }
      const isWhatsappSame =
        formData.whatsapp_number === formData.contact_number;

      const isWhatsappEmpty = !formData.whatsapp_number;

      if (!isWhatsappSame && !isWhatsappEmpty) {
        if (formData.whatsapp_number !== whatsappVerified) {
          Toast.show({
            type: 'error',
            text1: 'Please verify WhatsApp number',
          });
          return false;
        }
      }

      if (isValid) {
        const prevData = useGlobalStore.getState().businessLegalFormData || {};

        await useGlobalStore.getState().setBusinessLegalFormData({
          ...prevData,
          ...formData,
          contact_phone_code: phoneCode,
          whatsapp_phone_code: whatsappPC,
        });
      }

      return isValid;
    },
  }));

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

  useFocusEffect(
    useCallback(() => {
      const savedBusinessData = useGlobalStore.getState().businessLegalFormData;
      if (!savedBusinessData) return;
      setTimeout(() => {
        reset(savedBusinessData);
      }, 0);
    }, [reset]),
  );

  return (
    <View style={styles.mainView}>
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
        name="displayName"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <CInput
            label="Display Business Name"
            required
            value={value}
            onChangeText={onChange}
            placeholder="Enter Display Business Name"
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
          formState: {dirtyFields},
        }) => (
          <CInput
            label="SeaNeB ID"
            required
            value={value}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Seaneb id"
            errorMsg={error?.message}
            onChangeText={text => {
              const sanitizedText = text.replace(/\s+/g, '').toLowerCase();
              onChange(sanitizedText);
              trigger('seaneb_id');
            }}
            showUpdate={
              seanebIdUnique !== getValues('seaneb_id') && value?.length > 9
            }
            loading={isVerifying}
            verifiedIcon={
              seanebIdUnique === getValues('seaneb_id') && value?.length > 9
            }
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
        name="contact_number"
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
                if (val.length === 10) {
                  trigger('contact_number');
                }
              }
            }}
            phoneInput
            countryCode={countryCode}
            phoneCode={phoneCode}
            showUpdate={
              phoneVerified !== getValues('contact_number') && value?.length > 7
            }
            verifiedIcon={
              phoneVerified === getValues('contact_number') && value?.length > 7
            }
            onVerify={async () => {
              const isValid = await trigger('contact_number');
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
              setWhatsappPC(country.callingCode[0]);
              setWhatsappPC(`+${country.callingCode[0]}`);
            }}
            showUpdate={
              whatsappVerified !== getValues('whatsapp_number') &&
              getValues('whatsapp_number') !== getValues('contact_number') &&
              value?.length > 7
            }
            verifiedIcon={
              (whatsappVerified === getValues('whatsapp_number') ||
                getValues('whatsapp_number') === getValues('contact_number')) &&
              value?.length > 7
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
        render={({field: {onChange, value}, fieldState: {error, isDirty}}) => (
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
      <Controller
        name="website"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          const displayValue = value?.replace(/^https?:\/\//i, '') || '';
          return (
            <CInput
              label="Business website"
              value={displayValue}
              onChangeText={onChange}
              leftText="https://"
              borderColor={color?.buttonColor}
              placeholder="Enter business website"
              errorMsg={error?.message}
            />
          );
        }}
      />
      <OtpModal
        isVisible={otpModal}
        type={otpType}
        purpose={otpType === 'email' ? 3 : 2}
        valueToVerify={
          otpType === 'mobile'
            ? getValues('contact_number')
            : otpType === 'whatsapp'
            ? getValues('whatsapp_number')
            : getValues('business_email')
        }
        countryCode={
          otpType === 'mobile'
            ? phoneCode
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
              const phone = getValues('contact_number');
              setPhoneVerified(phone);
            }
          }
        }}
      />
    </View>
  );
});
export default BusinessContact;
