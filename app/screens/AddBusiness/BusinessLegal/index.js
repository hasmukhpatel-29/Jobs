import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';
import {navigationRef} from '@navigation/mainStackNavigation';
import CAutoComplete from '@components/CAutoComplete';
import CInput from '@components/CInput';
import CRadio from '@components/CRadio';
import CheckBox from '@components/CheckBox';
import {BusinessOptions} from '@config/staticData';
import {CustomIcon} from '@config/LoadIcons';
import {zodResolver} from '@hookform/resolvers/zod';
import {LegalFormSchema} from '@zod/validationSchema';
import {verifyGstApi, verifyPanApi} from '@apis/ApiRoutes/BusinessRegisterApi';
import useGlobalStore from '@zustand/store';
import GetStyle from './styles';

const BusinessLegal = forwardRef((props, ref) => {
  const styles = GetStyle();
  // Global store states
  const setIsVerifiedGST = useGlobalStore.getState().setIsVerifiedGST;
  const isVerifiedGST = useGlobalStore.getState().isVerifiedGST;
  const setIsVerifiedPAN = useGlobalStore.getState().setIsVerifiedPAN;
  const isVerifiedPAN = useGlobalStore.getState().isVerifiedPAN;

  const [selectedOption, setSelectedOption] = useState(BusinessOptions[0]);

  const defaultValues = {
    gstNumber: '',
    panNumber: '',
    businessLegalName: '',
    businessLicenceNumber: '',
    addressLine1: '',
    addressLine2: '',
    area: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    document_link: '',
    termsAndConditionsAccepted: false,
  };
  const {
    control,
    trigger,
    reset,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(LegalFormSchema),
    defaultValues: defaultValues,
  });

  // GST verification success handler
  const onGstVerificationSuccess = useCallback(
    response => {
      const gstData = response;
      const mappedData = {
        gstNumber: gstData?.gstin || '',
        panNumber: gstData?.pan_number || '',
        businessLegalName: gstData?.legal_name_of_business || '',
        addressLine1: gstData?.principal_place_address || '',
        addressLine2: gstData?.additional_address_array?.[0]?.address ?? '',
        area: gstData?.principal_place_split_address?.area || '',
        city: gstData?.principal_place_split_address?.city ?? '',
        state: gstData?.principal_place_split_address?.state ?? '',
        country: gstData?.principal_place_split_address?.country ?? 'India',
        pincode: gstData?.principal_place_split_address?.pincode ?? '',
      };

      // Update form
      reset(mappedData);
      const prevData = useGlobalStore.getState().businessLegalFormData || {};
      useGlobalStore.getState().setBusinessLegalFormData({
        ...prevData,
        ...mappedData,
      });
    },
    [reset],
  );

  // PAN verification success handler
  const onPanVerificationSuccess = useCallback(
    response => {
      const panData = response;
      const mappedData = {
        panNumber: panData?.pan_number || '',
        businessLegalName: panData?.first_name + ' ' + panData?.last_name || '',
        addressLine1: panData?.address?.line_1 || '',
        addressLine2: panData?.address?.line_2 || '',
        area: panData?.address?.street_name ?? '',
        pincode: panData?.address?.zip ?? '',
        city: panData?.address?.city ?? '',
        state: panData?.address?.state ?? '',
        country: panData?.address?.country ?? 'India',
        termsAndConditionsAccepted: false,
      };
      reset(mappedData);
      const prevData = useGlobalStore.getState().businessLegalFormData || {};
      useGlobalStore.getState().setBusinessLegalFormData({
        ...prevData,
        ...mappedData,
      });
    },
    [reset],
  );

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = watch();
        const prevData = useGlobalStore.getState().businessLegalFormData || {};
        const data = {
          ...prevData,
          ...formData,
        };
        await useGlobalStore.getState().setBusinessLegalFormData({
          ...prevData,
          ...data,
        });
      }
      return isValid;
    },
  }));

  // Handle radio button selection (switching between PAN and GST)
  const handleSelect = option => {
    setSelectedOption(option);

    const previousTerms = watch('termsAndConditionsAccepted');

    setIsVerifiedPAN(false);
    setIsVerifiedGST(false);

    // Clear PAN/GST-specific data BUT keep terms
    const prev = useGlobalStore.getState().businessLegalFormData || {};
    useGlobalStore.getState().setBusinessLegalFormData({
      ...prev,
      panNumber: '',
      gstNumber: '',
      businessLegalName: '',
      addressLine1: '',
      addressLine2: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
      businessLicenceNumber: '',
    });

    reset({
      gstNumber: '',
      panNumber: '',
      businessLegalName: '',
      businessLicenceNumber: '',
      addressLine1: '',
      addressLine2: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
      document_link: '',
      termsAndConditionsAccepted: previousTerms,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const savedBusinessData = useGlobalStore.getState().businessLegalFormData;
      if (!savedBusinessData) return;
      const savedIsVerifiedPAN = useGlobalStore.getState().isVerifiedPAN;
      const savedIsVerifiedGST = useGlobalStore.getState().isVerifiedGST;

      let optionToSelect = BusinessOptions[0];

      if (savedIsVerifiedGST && savedBusinessData?.gstNumber) {
        optionToSelect = BusinessOptions[1];
      } else if (savedIsVerifiedPAN && savedBusinessData?.panNumber) {
        optionToSelect = BusinessOptions[0];
      } else if (
        savedBusinessData?.gstNumber &&
        !savedBusinessData?.panNumber
      ) {
        optionToSelect = BusinessOptions[1];
      }

      setSelectedOption(optionToSelect);

      setTimeout(() => {
        reset(savedBusinessData);
      }, 0);
    }, [reset]),
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.legalTitle}>
        <Text style={styles.titleText}>Please Select Documents</Text>
        <Text style={styles.optionalText}>(optional)</Text>
        <CustomIcon name="infoCircle" style={styles.infoCircle} />
      </View>
      <CRadio
        options={BusinessOptions}
        selectedOption={selectedOption}
        style={styles.radioStyle}
        handleOptionSelect={option => {
          handleSelect(option);
        }}
      />
      {selectedOption?.id === 2 ? (
        <Controller
          name="gstNumber"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <CInput
              value={value}
              autoCapitalize="characters"
              placeholder="Enter Business GST Number"
              editable={!isVerifiedGST}
              onChangeText={async e => {
                const upper = e.toUpperCase();
                onChange(upper);
                trigger('gstNumber');
                if (upper.length === 15 && !isVerifiedGST) {
                  Keyboard.dismiss();
                  const isValid = await trigger('gstNumber');
                  if (isValid) {
                    const res = await verifyGstApi({
                      gstin: upper,
                    });
                    if (res?.success) {
                      setIsVerifiedPAN(false);
                      setIsVerifiedGST(true);
                      onGstVerificationSuccess(res?.data);
                    } else {
                      setIsVerifiedGST(false);
                      reset({
                        panNumber: '',
                        gstNumber: upper,
                        businessLegalName: '',
                      });
                    }
                  }
                }
              }}
              verifiedIcon={isVerifiedGST}
              errorMsg={error?.message}
            />
          )}
        />
      ) : (
        <Controller
          name="panNumber"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <CInput
              value={value}
              autoCapitalize="characters"
              editable={!isVerifiedPAN}
              placeholder="Enter Business PAN Number"
              onChangeText={async e => {
                const upper = e.toUpperCase();
                onChange(upper);
                trigger('panNumber');
                if (upper.length === 10 && !isVerifiedPAN) {
                  Keyboard.dismiss();
                  const isValid = await trigger('panNumber');
                  if (isValid) {
                    const res = await verifyPanApi({
                      pan: upper,
                    });
                    console.info('🚀 ~ res:', res);
                    if (res?.success) {
                      // Clear GST verification since PAN is now verified (mutual exclusivity)
                      setIsVerifiedGST(false);
                      // Set PAN verification
                      setIsVerifiedPAN(true);
                      onPanVerificationSuccess(res?.data);
                    } else {
                      setIsVerifiedPAN(false);
                      reset({
                        panNumber: upper,
                        gstNumber: '',
                        businessLegalName: '',
                      });
                    }
                  }
                }
              }}
              verifiedIcon={isVerifiedPAN}
              errorMsg={error?.message}
            />
          )}
        />
      )}

      <Controller
        name="businessLegalName"
        control={control}
        defaultValue={null}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <CAutoComplete
            required
            label="Business Name"
            placeholder="Display Business Name"
            value={value}
            onChangeTextValue={text => {
              onChange(text);
            }}
            type="buiness"
            direction="top"
            onSelect={item => {
              const locationText = item?.description || '';

              // Split and clean parts
              const parts = locationText.split(',').map(s => s.trim());

              const country = parts.at(-1) || '';
              const state = parts.at(-2) || '';
              const city = parts.at(-3) || '';

              const addressParts = parts.slice(1, -3);

              const addressLine1 = addressParts[0] || '';
              const addressLine2 = addressParts.slice(1).join(', ') || '';

              const area = addressParts.at(-1) || '';

              setValue('place_id', item?.business_place_id, {
                shouldValidate: true,
              });

              reset(prev => ({
                ...prev,
                businessLegalName: parts[0] || '',
                addressLine1,
                addressLine2,
                area,
                city,
                state,
                country,
                businessPlaceId: item?.business_place_id || '',
                photo: item?.photo_references || [],
              }));
            }}
            errorMsg={error?.message}
          />
        )}
      />
      <Controller
        name="termsAndConditionsAccepted"
        control={control}
        render={({field: {value, onChange}}) => (
          <View style={styles.container}>
            <CheckBox
              checked={value || false}
              onChange={() => onChange(!value)}
            />

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
        )}
      />
      {errors.termsAndConditionsAccepted && (
        <Text style={styles.errorMessageText}>
          {errors.termsAndConditionsAccepted.message}
        </Text>
      )}
    </View>
  );
});
export default BusinessLegal;
