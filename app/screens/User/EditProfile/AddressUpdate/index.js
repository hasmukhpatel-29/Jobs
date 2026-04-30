import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {CHeader} from '@components/CHeader';
import CInput from '@components/CInput';
import CAutoComplete from '@components/CAutoComplete';
import {CButton} from '@components/CButton';
import CheckBox from '@components/CheckBox';
import Toast from '@components/CToast';
import {zodResolver} from '@hookform/resolvers/zod';
import {profileAddressSchema} from '@zod/validationSchema';
import {updateBasicInfoApi} from '@apis/ApiRoutes/UserProfileApi';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';
const AddressUpdate = ({navigation, route}) => {
  const profileDetails = route?.params?.profileDetails || {};
  const styles = GetStyles();

  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    headline: profileDetails?.headline || '',
    bio: profileDetails?.bio || '',

    address: profileDetails?.permanent_address?.address || '',
    area: profileDetails?.permanent_address?.area || '',
    city: profileDetails?.permanent_address?.city || '',
    state: profileDetails?.permanent_address?.state || '',
    country: profileDetails?.permanent_address?.country || '',
    pincode: profileDetails?.permanent_address?.pincode || '',

    current_address: profileDetails?.current_address?.address || '',
    current_area: profileDetails?.current_address?.area || '',
    current_city: profileDetails?.current_address?.city || '',
    current_state: profileDetails?.current_address?.state || '',
    current_country: profileDetails?.current_address?.country || '',
    current_pincode: profileDetails?.current_address?.pincode || '',
  };
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(profileAddressSchema(checked)),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (profileDetails) {
      setChecked(profileDetails?.same_as_permanent);
      reset(defaultValues);
    }
  }, [profileDetails]);

  const editProfile = async values => {
    try {
      setLoading(true);
      const body = {
        headline: values.headline,
        bio: values.bio,

        permanent_address: {
          address: values.address,
          city: values.city,
          state: values.state,
          country: values.country,
          pincode: values.pincode,
        },

        same_as_permanent: checked,

        current_address: checked
          ? null
          : {
              address: values.current_address,
              city: values.current_city,
              state: values.current_state,
              country: values.current_country,
              pincode: values.current_pincode,
            },
      };

      const res = await updateBasicInfoApi(body);

      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: 'Profile updated successfully',
        });

        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Update Error:', error);
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
            <Controller
              name="headline"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Headline"
                  placeholder="eg. Software Engineer"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="bio"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Bio / Summary"
                  placeholder="write a short summary about your proffesional"
                  value={value}
                  multiline
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />
            <Text style={styles.title}>PERMANENT ADDRESS</Text>

            <Controller
              name="address"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Address"
                  placeholder="Enter Your Block No. & Building Name"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="area"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Area"
                  placeholder="Enter area"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                  selection={{start: 0, end: 0}}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              defaultValue={null}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CAutoComplete
                  required
                  label="City"
                  placeholder="Enter City"
                  value={value}
                  onSelect={item => {
                    onChange(item?.city_name);
                    setValue('city', item?.city_name);
                    setValue('state', item?.state_name);
                    setValue('country', item?.country_name);
                  }}
                  errorMsg={error?.message}
                />
              )}
            />
            <View style={styles.cityInputStyle}>
              <View style={styles.inputStyle}>
                <Controller
                  name="state"
                  control={control}
                  defaultValue={null}
                  render={({field: {value}}) => (
                    <CInput
                      label="State"
                      required
                      editable={false}
                      placeholder="State"
                      value={value}
                    />
                  )}
                />
              </View>

              <View style={styles.inputStyle}>
                <Controller
                  name="country"
                  control={control}
                  defaultValue={null}
                  render={({field: {value}}) => (
                    <CInput
                      label="Country"
                      required
                      editable={false}
                      placeholder="Country"
                      value={value}
                    />
                  )}
                />
              </View>
            </View>
            <Controller
              name="pincode"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Pincode"
                  placeholder="Enter Pincode"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  errorMsg={error?.message}
                />
              )}
            />
            <CheckBox
              checked={checked}
              label="Current Address same as permanent"
              onChange={() => setChecked(!checked)}
              style={{marginBottom: 15}}
            />
            {!checked && (
              <>
                <Text style={styles.title}>CURRENT ADDRESS</Text>

                <Controller
                  name="current_address"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Address"
                      placeholder="Enter Your Block No. & Building Name"
                      value={value}
                      onChangeText={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />

                <Controller
                  name="current_area"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Area"
                      placeholder="Enter Area"
                      value={value}
                      onChangeText={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />

                <Controller
                  name="current_city"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CAutoComplete
                      label="City"
                      value={value}
                      onSelect={item => {
                        onChange(item?.city_name);
                        setValue('current_city', item?.city_name);
                        setValue('current_state', item?.state_name);
                        setValue('current_country', item?.country_name);
                      }}
                      errorMsg={error?.message}
                    />
                  )}
                />

                <View style={styles.cityInputStyle}>
                  <View style={styles.inputStyle}>
                    <Controller
                      name="current_state"
                      control={control}
                      render={({field: {value}}) => (
                        <CInput
                          label="State"
                          value={value}
                          placeholder="State"
                          editable={false}
                        />
                      )}
                    />
                  </View>
                  <View style={styles.inputStyle}>
                    <Controller
                      name="current_country"
                      control={control}
                      render={({field: {value}}) => (
                        <CInput
                          label="Country"
                          value={value}
                          placeholder="Country"
                          editable={false}
                        />
                      )}
                    />
                  </View>
                </View>

                <Controller
                  name="current_pincode"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Pincode"
                      value={value}
                      onChangeText={onChange}
                      placeholder='Enter Pincode'
                      keyboardType="number-pad"
                      errorMsg={error?.message}
                    />
                  )}
                />
              </>
            )}
          </View>
        </ScrollView>
        <CButton
          label="Save"
          loading={loading}
          disabled={loading}
          buttonStyle={styles.floatingBtn}
          onPress={handleSubmit(editProfile)}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddressUpdate;
