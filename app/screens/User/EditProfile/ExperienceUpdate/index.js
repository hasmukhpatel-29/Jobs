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
import {experienceSchema} from '@zod/validationSchema';
import {
  addExperienceApi,
  deleteExperienceApi,
  updateExperienceApi,
} from '@apis/ApiRoutes/UserProfileApi';
import {CustomIcon} from '@config/LoadIcons';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';
const ExperienceUpdate = ({route}) => {
  const profileDetails = route?.params?.profileDetails || {};
  const styles = GetStyles();
  const {color} = useThemeContext();

  const [experienceList, setExperienceList] = useState(
    profileDetails?.experience || [],
  );
  const [showForm, setShowForm] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const defaultValues = {
    company: '',
    role: '',
    city: '',
    start_month_year: '',
    end_month_year: '',
    ctc: '',
    achievement_title: '',
    achievement_desc: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(experienceSchema(checked)),
    defaultValues: defaultValues,
  });

  const handleEditClick = item => {
    const isPursuing = item?.currently_pursuing || !item?.end_month_year;

    setChecked(isPursuing);
    setEditingId(item.exp_id);
    setShowForm(true);

    reset({
      company: item.company || '',
      role: item.role || '',
      city: item.city || '',
      start_month_year: item.start_month_year || '',
      end_month_year: item.end_month_year || '',
      ctc: item.ctc ? item.ctc.toString() : '',
      achievement_title: item.achievement_title || '',
      achievement_desc: item.achievement_desc || '',
    });

    clearErrors();
  };

  const editProfile = async values => {
    try {
      setLoading(true);
      const body = {
        company: values.company,
        role: values.role,
        city: values.city,
        start_month_year: values.start_month_year,
        end_month_year: checked ? null : values.end_month_year,
        ctc: values.ctc,
        achievement_title: values.achievement_title,
        achievement_desc: values.achievement_desc,
        currently_working: checked,
      };
      const res = editingId
        ? await updateExperienceApi(body, editingId)
        : await addExperienceApi(body);

      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        if (editingId) {
          setExperienceList(prev =>
            prev.map(item =>
              item.exp_id === editingId ? {...item, ...body} : item,
            ),
          );
        } else {
          setExperienceList(prev => [...prev, res?.data]);
        }

        setShowForm(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Update Error:', error);
    }
  };

  const deleteExperience = async id => {
    try {
      const res = await deleteExperienceApi(id);

      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        setExperienceList(prev => prev.filter(item => item.exp_id !== id));
      }
    } catch (error) {
      console.log('Update Error:', error);
    }
  };

  const handleAddClick = () => {
    setEditingId(null);
    setChecked(false);
    reset(defaultValues);
    clearErrors();
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    reset(defaultValues);
    clearErrors();
  };

  return (
    <View style={styles.root}>
      <CHeader title="Experience" back />
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mainView}>
            {!showForm ? (
              <>
                {experienceList?.map((item, index) => (
                  <View key={index} style={styles.educationCard}>
                    <View style={styles.dataCont}>
                      <Text style={styles.tagText}>
                        {item?.role} at {item?.company}
                      </Text>
                      <Text style={styles.rowLabel}>
                        {item?.start_month_year} -{' '}
                        {item?.end_month_year || 'Present'} . {item?.city} .{' '}
                        {item?.ctc}
                      </Text>
                      {item?.achievement_title && (
                        <Text style={styles.achievementTitle}>
                          {item?.achievement_title} ({item?.achievement_desc})
                        </Text>
                      )}
                    </View>
                    <View style={{gap: 10}}>
                      <TouchableOpacity onPress={() => handleEditClick(item)}>
                        <CustomIcon
                          name="edit"
                          color={color.primary}
                          size={20}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteExperience(item?.exp_id)}>
                        <CustomIcon name="delete" color={color.red} size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                <CButton label="+ Add Experience" onPress={handleAddClick} />
              </>
            ) : (
              <>
                <View style={{zIndex: 10000}}>
                  <Controller
                    name="company"
                    control={control}
                    render={({
                      field: {onChange, value},
                      fieldState: {error},
                    }) => (
                      <CAutoComplete
                        required
                        label="Company"
                        placeholder="Search for company"
                        value={value}
                        onSelect={item => {
                          const locationText = item?.description || '';

                          // Split and clean parts
                          const parts = locationText
                            .split(',')
                            .map(s => s.trim());
                          onChange(parts[0] || '');
                          setValue('company', parts[0] || '');
                          setValue('city', parts[1] || '');
                        }}
                        type="buiness"
                        errorMsg={error?.message}
                      />
                    )}
                  />
                </View>

                <Controller
                  name="role"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      required
                      label="Role / Title"
                      placeholder="Job title"
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
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                        )
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
                  label="I CURRENTLY WORK HERE"
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
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                        )
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
                  name="ctc"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="CTC"
                      placeholder="Enter CTC"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="number-pad"
                      errorMsg={error?.message}
                    />
                  )}
                />
                <Controller
                  name="achievement_title"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Achievement Title"
                      placeholder="Enter achievement title"
                      value={value}
                      onChangeText={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />
                <Controller
                  name="achievement_desc"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Achievement description"
                      placeholder="Describe the achievement"
                      value={value}
                      onChangeText={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />
              </>
            )}
          </View>
        </ScrollView>
        {showForm && (
          <View style={styles.btnContainer}>
            <CButton
              outLineBtn
              label="Cancel"
              disabled={loading}
              buttonStyle={styles.floatingBtn}
              onPress={handleCancel}
            />
            <CButton
              label={editingId ? 'Update' : 'Save'}
              loading={loading}
              disabled={loading}
              buttonStyle={styles.floatingBtn}
              onPress={handleSubmit(editProfile)}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default ExperienceUpdate;
