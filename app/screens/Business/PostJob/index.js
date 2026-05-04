import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {CHeader} from '@components/CHeader';
import CInput from '@components/CInput';
import {CButton} from '@components/CButton';
import CheckBox from '@components/CheckBox';
import Toast from '@components/CToast';
import CDatePicker from '@components/CDatePicker';
import CAutoComplete from '@components/CAutoComplete';
import DropDownList from '@components/DropDownList';
import {
  ageOptions,
  educationOptions,
  experienceOptions,
  genderOptions,
  jobTypeOptions,
  vacancyOptions,
  weekDays,
  workTypeOptions,
} from '@config/staticData';
import {zodResolver} from '@hookform/resolvers/zod';
import {CustomIcon} from '@config/LoadIcons';
import {formatLocation} from '@utils/commonFunction';
import {postJobSchema} from '@zod/validationSchema';
import {createJobPostApi} from '@apis/ApiRoutes/JobsApi';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';

const PostJob = ({navigation}) => {
  const styles = GetStyles();

  const [isWalkIn, setIsWalkIn] = useState(false);
  const [isSingleDay, setIsSingleDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillList, setSkillList] = useState([]);

  const defaultValues = {
    title: '',
    is_walkin_drive: false,
    walkin_start_date: '',
    walkin_end_date: '',
    walkin_time_from: '',
    walkin_time_to: '',
    walkin_venue: '',
    walkin_contact_name: '',
    walkin_contact_number: '',
    walkin_instructions: '',
    education: '',
    experience: '',
    min_age: undefined,
    max_age: undefined,
    gender_preference: '',
    skills: '',
    vacancies: '',
    job_category_id: '',
    job_category_name: '',
    department: '',
    job_type: '',
    address: '',
    location_name: '',
    city: '',
    state: '',
    country: '',
    ctc: '',
    work_mode: '',
    other_benefits: '',
    working_days: [],
    working_time_From: '',
    working_time_to: '',
    description: '',
    responsibilities: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(postJobSchema(isWalkIn, isSingleDay)),
    defaultValues: defaultValues,
  });

  const onSubmit = async values => {
    try {
      setLoading(true);

      const rawPayload = {
        ...values,
        is_walkin_drive: isWalkIn,
        is_single_day: isSingleDay,
        end_date: isSingleDay ? values.start_date : values.end_date,
        working_time: `${values?.working_time_From} - ${values.working_time_to}`,
        skills:
          values.skills && values.skills.length > 0
            ? values.skills.join(', ')
            : null,
        working_days:
          values.working_days && values.working_days.length > 0
            ? values.working_days.join(', ')
            : null,
      };
      const payload = Object.fromEntries(
        Object.entries(rawPayload).filter(
          ([_, value]) => value != null && value !== '',
        ),
      );
      const res = await createJobPostApi(payload);
      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: 'Job posted successfully',
        });
        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Post Job Error:', error?.message);
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  };

  const handleAddSkill = item => {
    const newSkill = item?.name;

    // Check if it exists to prevent duplicates
    if (newSkill && !skillList.includes(newSkill)) {
      const updatedList = [...skillList, newSkill];
      setSkillList(updatedList);
    }
    setValue('skills', '');
  };

  const handleRemoveSkill = item => {
    const updatedList = skillList.filter(skill => skill !== item);
    setSkillList(updatedList);
  };

  return (
    <View style={styles.root}>
      <CHeader title="Post Job" back />
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mainView}>
            <Controller
              name="title"
              control={control}
              rules={{required: 'Job title is required'}}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  required
                  label="Job Title"
                  placeholder="Add job title, role, vacancies etc"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />

            <CheckBox
              checked={isWalkIn}
              label="This is a Walk-in Drive"
              onChange={() => setIsWalkIn(!isWalkIn)}
            />

            {isWalkIn && (
              <View>
                <Text style={styles.title}>Walk-in Drive Details</Text>
                <View style={styles.row}>
                  <View style={styles.halfWidth}>
                    <Controller
                      name="walkin_start_date"
                      control={control}
                      render={({
                        field: {onChange, value},
                        fieldState: {error},
                      }) => (
                        <CDatePicker
                          label="Start Date"
                          value={value || ''}
                          placeholder="DD/MM/YYYY"
                          valueFormat="DD/MM/YYYY"
                          onDateChange={onChange}
                          errorMsg={error?.message}
                        />
                      )}
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <Controller
                      name="walkin_end_date"
                      control={control}
                      render={({
                        field: {onChange, value},
                        fieldState: {error},
                      }) => (
                        <CDatePicker
                          label="End Date"
                          value={value || ''}
                          placeholder="DD/MM/YYYY"
                          valueFormat="DD/MM/YYYY"
                          onDateChange={onChange}
                          disabled={isSingleDay}
                          editable={!isSingleDay}
                          errorMsg={error?.message}
                        />
                      )}
                    />
                  </View>
                </View>

                <CheckBox
                  checked={isSingleDay}
                  label="Single day drive"
                  onChange={() => {
                    const newValue = !isSingleDay;
                    setIsSingleDay(newValue);
                    if (newValue) {
                      clearErrors('end_date');
                    }
                  }}
                  style={{marginBottom: 5}}
                />

                <View style={styles.row}>
                  <View style={styles.halfWidth}>
                    <Controller
                      name="walkin_time_from"
                      control={control}
                      render={({
                        field: {onChange, value},
                        fieldState: {error},
                      }) => (
                        <CDatePicker
                          mode="time"
                          label="Interview Time (From)"
                          value={value || ''}
                          placeholder="10:00 AM"
                          valueFormat="hh:mm A"
                          onDateChange={onChange}
                          errorMsg={error?.message}
                        />
                      )}
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <Controller
                      name="walkin_time_to"
                      control={control}
                      render={({
                        field: {onChange, value},
                        fieldState: {error},
                      }) => (
                        <CDatePicker
                          mode="time"
                          label="Interview Time (To)"
                          value={value || ''}
                          placeholder="05:00 PM"
                          valueFormat="hh:mm A"
                          onDateChange={onChange}
                          errorMsg={error?.message}
                        />
                      )}
                    />
                  </View>
                </View>

                <Controller
                  name="walkin_venue"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Venue / Location"
                      placeholder="Exact interview address"
                      value={value}
                      onChangeText={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />

                <Controller
                  name="walkin_contact_name"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Contact Person Name"
                      placeholder="HR or Coordinator"
                      value={value}
                      onChangeText={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />
                <Controller
                  name="walkin_contact_number"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Contact Number"
                      placeholder="Mobile number"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                      maxLength={10}
                      errorMsg={error?.message}
                    />
                  )}
                />

                <Controller
                  name="walkin_instructions"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CInput
                      label="Instructions for Candidates"
                      placeholder="e.g. Carry 2 copies of resume, Aadhar card, wear formal attire..."
                      value={value}
                      onChangeText={onChange}
                      multiline={true}
                      errorMsg={error?.message}
                    />
                  )}
                />
              </View>
            )}

            <Text style={styles.title}>Eligibility Criteria</Text>
            <Controller
              name="education"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Education"
                  valueProp="value"
                  placeholder="Select Education"
                  data={educationOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="experience"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Experience"
                  valueProp="value"
                  placeholder="Select Experience"
                  data={experienceOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="min_age"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Minimum Age"
                  valueProp="value"
                  placeholder="Select minimum age"
                  data={ageOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="max_age"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Maximum Age"
                  valueProp="value"
                  placeholder="Select maximum age"
                  data={ageOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="gender_preference"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Gender Preference"
                  valueProp="value"
                  placeholder="Select gender"
                  data={genderOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="skills"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <View>
                  <CAutoComplete
                    label="Skill"
                    placeholder="Search and select a skill..."
                    value={value}
                    onSelect={item => {
                      handleAddSkill(item);
                    }}
                    type="skill"
                    errorMsg={error?.message}
                  />

                  <View style={styles.chipContainer}>
                    {skillList.map((skill, index) => (
                      <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{skill}</Text>
                        <TouchableOpacity
                          onPress={() => onChange(handleRemoveSkill(skill))}>
                          <CustomIcon name="close" size={10} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            />
            <Text style={styles.title}>Job Details</Text>
            <Controller
              name="vacancies"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Vacancies"
                  valueProp="value"
                  placeholder="Select vacancies"
                  data={vacancyOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="job_category_name"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CAutoComplete
                  required
                  label="Industry"
                  placeholder="Search industry"
                  value={value}
                  onSelect={item => {
                    setValue('job_category_id', item?.job_category_id);
                    onChange(item?.job_category_name);
                  }}
                  errorMsg={error?.message}
                  type="jobCategory"
                />
              )}
            />
            <Controller
              name="department"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Department"
                  placeholder="Department name"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="job_type"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  required
                  label="Job Type"
                  valueProp="value"
                  placeholder="Select job type"
                  data={jobTypeOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="address_line"
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
              name="location_name"
              control={control}
              defaultValue={null}
              render={({field: {onChange, value}}) => (
                <CAutoComplete
                  required
                  label="Location"
                  placeholder="Search area, city"
                  value={value}
                  onSelect={item => {
                    const locationText = formatLocation(item);
                    setValue('location_name', locationText);
                    setValue('city', item?.city_name);
                    setValue('state', item?.state_name);
                    setValue('country', item?.country_name);
                  }}
                  errorMsg={errors?.place_name?.message}
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
              name="work_mode"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Work Mode"
                  valueProp="value"
                  placeholder="Select work mode"
                  data={workTypeOptions}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="other_benefits"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  label="Other Benefits"
                  placeholder="Enter your job other benefits"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="working_days"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <DropDownList
                  label="Working Days"
                  valueProp="value"
                  placeholder="Select working days"
                  data={weekDays}
                  onChange={onChange}
                  value={value}
                  errorMsg={error?.message}
                  multiSelection
                />
              )}
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Controller
                  name="working_time_From"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CDatePicker
                      mode="time"
                      label="Working Hours (From)"
                      value={value || ''}
                      placeholder="10:00 AM"
                      valueFormat="hh:mm A"
                      onDateChange={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />
              </View>
              <View style={styles.halfWidth}>
                <Controller
                  name="working_time_to"
                  control={control}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <CDatePicker
                      mode="time"
                      label="Working Hours (To)"
                      value={value || ''}
                      placeholder="05:00 PM"
                      valueFormat="hh:mm A"
                      onDateChange={onChange}
                      errorMsg={error?.message}
                    />
                  )}
                />
              </View>
            </View>
            <Text style={styles.title}>Description & Responsibility</Text>
            <Controller
              name="description"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  required
                  label="Description"
                  placeholder="Add your job description"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />
            <Controller
              name="responsibilities"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CInput
                  required
                  label="Responsibilities"
                  placeholder="Add your job responsibilities"
                  value={value}
                  onChangeText={onChange}
                  errorMsg={error?.message}
                />
              )}
            />
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <CButton
            label="Post Job"
            loading={loading}
            disabled={loading}
            buttonStyle={styles.floatingBtn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PostJob;
