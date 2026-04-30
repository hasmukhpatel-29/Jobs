import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {CHeader} from '@components/CHeader';
import CInput from '@components/CInput';
import CAutoComplete from '@components/CAutoComplete';
import {CButton} from '@components/CButton';
import CheckBox from '@components/CheckBox';
import Toast from '@components/CToast';
import CDatePicker from '@components/CDatePicker';
import {zodResolver} from '@hookform/resolvers/zod';
import {educationSchema} from '@zod/validationSchema';
import {
  addEducationApi,
  deleteEducationApi,
} from '@apis/ApiRoutes/UserProfileApi';
import {CustomIcon} from '@config/LoadIcons';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';
const EducationUpdate = ({navigation, route}) => {
  const profileDetails = route?.params?.profileDetails || {};
  const styles = GetStyles();
  const {color} = useThemeContext();

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    degree: '',
    college: '',
    city: '',
    start_month_year: '',
    end_month_year: '',
    percentage: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(educationSchema(checked)),
    defaultValues: defaultValues,
  });

  const editProfile = async values => {
    try {
      setLoading(true);
      const body = {
        degree: values.degree,
        college: values.college,
        city: values.city,
        start_month_year: values.start_month_year,
        end_month_year: values.end_month_year,
        percentage: values.percentage,
        currently_pursuing: checked,
      };

      const res = await addEducationApi(body);

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
  const deleteEducation = async id => {
    try {
      const res = await deleteEducationApi(id);

      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });

        // navigation.goBack();
      }
    } catch (error) {
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
            {profileDetails?.education.map((item, index) => (
              <View key={index} style={styles.educationCard}>
                <View>
                  <Text style={styles.tagText}>{item.degree}</Text>
                  <Text style={styles.rowLabel}>
                    {item.college} . {item.city}
                  </Text>
                  <Text style={styles.sectionTitle2}>
                    {item.start_month_year} -{' '}
                    {item?.end_month_year || 'Present'} . {item.percentage}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteEducation(item?.education_id)}>
                  <CustomIcon name="delete" color={color.red} size={20} />
                </TouchableOpacity>
              </View>
            ))}
            <View style={{zIndex: 10000}}>
              <Controller
                name="degree"
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <CAutoComplete
                    required
                    label="Degree"
                    placeholder="Search for degree"
                    value={value}
                    onSelect={item => {
                      onChange(item?.degree_name);
                      setValue('degree', item?.degree_name);
                    }}
                    errorMsg={error?.message}
                    type="degree"
                  />
                )}
              />
            </View>
            <Controller
              name="college"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  required
                  label="College / Institute"
                  placeholder="Enter institute name"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
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
                  }}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="start_month_year"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CDatePicker
                  label="Start Date"
                  required
                  value={value || ''}
                  placeholder="MM/YYYY"
                  minDate={new Date('1800-01-01')}
                  maxDate={
                    new Date(new Date().getFullYear(), new Date().getMonth())
                  }
                  valueFormat="MM/YYYY"
                  onDateChange={onChange}
                  disabled={true}
                  editable={true}
                  errorMsg={error?.message}
                />
              )}
            />
            <CheckBox
              checked={checked}
              label="CURRENTLY STUDYING"
              onChange={() => setChecked(!checked)}
              style={{marginBottom: 10}}
            />
            <Controller
              name="end_month_year"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CDatePicker
                  label="End Date"
                  required
                  value={value || ''}
                  placeholder="MM/YYYY"
                  minDate={new Date('1800-01-01')}
                  maxDate={
                    new Date(new Date().getFullYear(), new Date().getMonth())
                  }
                  valueFormat="MM/YYYY"
                  onDateChange={onChange}
                  disabled={true}
                  editable={true}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="percentage"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Percentage"
                  placeholder="Enter Percentage"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  errorMsg={error?.message}
                />
              )}
            />
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

export default EducationUpdate;
