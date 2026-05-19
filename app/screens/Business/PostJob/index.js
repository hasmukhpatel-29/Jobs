import React, {useEffect, useMemo, useState} from 'react';
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
import CImage from '@components/CImage';
import useGlobalStore from '@zustand/store';
import {getImageUrl} from '@utils/commonFunction';
import Icon, {Icons} from '@config/Icons';
import {useThemeContext} from '@contexts/themeContext';
import {size} from '@config/Sizes';
import {
  ageOptions,
  educationOptions,
  experienceOptions,
  genderOptions,
  jobTypeOptions,
  weekDays,
  workTypeOptions,
} from '@config/staticData';
import {zodResolver} from '@hookform/resolvers/zod';
import {CustomIcon} from '@config/LoadIcons';
import {parseWorkingDays} from '@utils/commonFunction';
import {postJobSchema} from '@zod/validationSchema';
import {createJobPostApi} from '@apis/ApiRoutes/JobsApi';
import {aiJobDescriptionApi} from '@apis/ApiRoutes/Business';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';

const PostJob = ({navigation, route}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const repostData = route.params?.repostData || {};

  const businessList = useGlobalStore(s => s.businessData);
  const activeBusinessId = useGlobalStore(s => s.activeBusinessId);

  // Flatten all branches from all businesses
  const allBranches = useMemo(() => {
    if (!businessList) return [];
    return businessList.flatMap(b =>
      (b.branches || []).map(branch => ({
        ...branch,
        business_name: b.display_name || b.business_name,
        business_id: b.business_id,
      })),
    );
  }, [businessList]);

  const [isWalkIn, setIsWalkIn] = useState(false);
  const [isSingleDay, setIsSingleDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

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
    job_type: jobTypeOptions[0]?.value || '',
    branch_id: '',
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
    getValues,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(postJobSchema(isWalkIn, isSingleDay)),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (Object.keys(repostData).length > 0) {
      // Parse Working Time
      let timeFrom = '';
      let timeTo = '';
      if (repostData.working_time) {
        const times = repostData.working_time.split(' - ');
        timeFrom = times[0] || '';
        timeTo = times[1] || '';
      }

      // Parse Skills
      if (repostData.skills) {
        const parsedSkills = repostData.skills.split(',').map(s => s.trim());
        setSkillList(parsedSkills);
      }

      // Set Checkboxes Local State
      setIsWalkIn(!!repostData.is_walkin_drive);
      setIsSingleDay(!!repostData.is_single_day);

      // Create a display location name
      const locationName = repostData.location
        ? [repostData.location.city, repostData.location.state]
            .filter(Boolean)
            .join(', ')
        : '';

      reset({
        ...defaultValues,
        title: repostData.title || '',
        is_walkin_drive: !!repostData.is_walkin_drive,
        walkin_start_date: repostData.walkin_start_date || '',
        walkin_end_date: repostData.walkin_end_date || '',
        walkin_time_from: repostData.walkin_time_from || '',
        walkin_time_to: repostData.walkin_time_to || '',
        walkin_venue: repostData.walkin_venue || '',
        walkin_contact_name: repostData.walkin_contact_name || '',
        walkin_contact_number: repostData.walkin_contact_number || '',
        walkin_instructions: repostData.walkin_instructions || '',
        education: repostData.education || '',
        experience: repostData.experience || '',
        min_age: repostData.min_age || undefined,
        max_age: repostData.max_age || undefined,
        gender_preference: repostData.gender_preference?.toLowerCase() || 'any',
        skills: '',
        vacancies: repostData.vacancies ? repostData.vacancies.toString() : '',
        job_category_id: repostData?.category?.job_category_id || '',
        job_category_name: repostData?.category?.job_category_name || '',
        department: repostData.department || '',
        job_type: repostData.job_type || '',
        address_line: repostData.location?.address_line || '',
        location_name: locationName,
        city: repostData.location?.city || '',
        state: repostData.location?.state || '',
        country: repostData.location?.country || '',
        ctc: repostData.ctc ? repostData.ctc.toString() : '',
        work_mode: repostData.work_mode || '',
        other_benefits: repostData.other_benefits || '',
        working_days: parseWorkingDays(repostData.working_days),
        working_time_From: timeFrom,
        working_time_to: timeTo,
        description: repostData.description || '',
        responsibilities: repostData.responsibilities || '',
      });
    }
  }, [repostData, reset]);

  const onSubmit = async values => {
    try {
      setLoading(true);

      const rawPayload = {
        ...values,
        is_walkin_drive: isWalkIn,
        is_single_day: isSingleDay,
        end_date: isSingleDay ? values.start_date : values.end_date,
        working_time: `${values?.working_time_From} - ${values.working_time_to}`,
        skills: skillList && skillList.length > 0 ? skillList.join(', ') : null,
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

  const handleAIAutoFill = async () => {
    const titleVal = getValues('title')?.trim();
    if (!titleVal) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a job title first',
      });
      return;
    }

    try {
      setAiLoading(true);
      const area = getValues('area') || '';
      const city = getValues('city') || '';
      const state = getValues('state') || '';
      const country = getValues('country') || '';
      const locationText =
        [area, city, state, country].filter(Boolean).join(', ') || 'India';

      const payload = {
        designation: titleVal,
        job_type:
          getValues('job_type') || jobTypeOptions[0]?.value || 'Full-time',
        location: locationText,
        work_mode: getValues('work_mode') || 'On-site',
      };

      const res = await aiJobDescriptionApi(payload);
      if (res?.success && res?.data) {
        if (res.data.title) {
          setValue('title', res.data.title);
        }
        if (res.data?.description) {
          setValue('description', res.data.description);
        }
        if (res.data?.responsibilities) {
          setValue('responsibilities', res.data.responsibilities);
        }
        Toast.show({
          type: 'success',
          text1: res.message || 'Job details generated successfully!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: res?.message || 'Failed to generate job description',
        });
      }
    } catch (error) {
      console.log('AI Auto Fill Error:', error);
      Toast.show({
        type: 'error',
        text1: error?.message || 'Failed to generate job description',
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (allBranches.length > 0) {
      const firstBranch = allBranches[0];
      const currentBranchId = getValues('branch_id');
      if (!currentBranchId) {
        setValue('branch_id', firstBranch.branch_id);
        setValue('area', firstBranch.location?.area);
        setValue('city', firstBranch.location?.city || '');
        setValue('state', firstBranch.location?.state || '');
        setValue('country', firstBranch.location?.country || '');
        const loc = firstBranch?.location?.address;
        setValue('address_line', loc);
      }
    }
  }, [allBranches]);

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
                <View>
                  <View style={styles.aiHeaderRow}>
                    <View style={styles.aiLabelContainer}>
                      <Text style={styles.aiLabelText}>
                        Job Designation / Title
                      </Text>
                      <Text style={styles.aiRequiredStar}> *</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      disabled={aiLoading}
                      onPress={handleAIAutoFill}
                      style={[styles.aiBtn, !!value && styles.aiBtnActive]}>
                      <Icon
                        type={Icons.FontAwesome}
                        name="star"
                        size={size.moderateScale(12)}
                        color={value ? color.blue : color.gray900}
                      />
                      <Text
                        style={[
                          styles.aiBtnText,
                          !!value && styles.aiBtnTextActive,
                        ]}>
                        {aiLoading ? 'Generating...' : 'AI Auto-Fill'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <CInput
                    placeholder="Add job designation, role, vacancies etc"
                    value={value}
                    onChangeText={onChange}
                    errorMsg={error?.message}
                  />

                  <View style={styles.aiHelpRow}>
                    <Icon
                      type={Icons.Ionicons}
                      name="information-circle-outline"
                      size={size.moderateScale(14)}
                      color={color.gray900}
                      style={styles.aiHelpIcon}
                    />
                    <Text style={styles.aiHelpText}>
                      Enter a designation and press AI Auto-Fill to instantly
                      generate a professional title, description, and
                      responsibilities.
                    </Text>
                  </View>
                </View>
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
                          minDate={new Date()}
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
                          minDate={new Date()}
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
                      maxLength={15}
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
                <CInput
                  label="Vacancies"
                  placeholder="e.g. 5"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  maxLength={5}
                  errorMsg={error?.message}
                />
              )}
            />
            <View style={{zIndex: 20000}}>
              <Controller
                name="job_category_name"
                control={control}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <CAutoComplete
                    required
                    label="Industry"
                    placeholder="Search industry"
                    value={value}
                    onSelect={item => {
                      setValue('job_category_id', item?.job_category_id);
                      onChange(item?.job_category_name);
                    }}
                    onChangeTextValue={text => {
                      onChange(text);
                      setValue('job_category_id', null);
                    }}
                    errorMsg={error?.message}
                    type="jobCategory"
                    onBlur={() => {
                      onBlur();
                      const currentId = getValues('job_category_id');
                      if (!currentId) {
                        onChange('');
                      }
                    }}
                  />
                )}
              />
            </View>
            <Controller
              name="department"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CAutoComplete
                  required
                  label="Department"
                  placeholder="Search department"
                  value={value}
                  onSelect={item => {
                    setValue('department', item);
                    onChange(item);
                  }}
                  onChangeTextValue={text => {
                    onChange(text);
                    setValue('department', null);
                  }}
                  errorMsg={error?.message}
                  type="jobDepartment"
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
              name="branch_id"
              control={control}
              render={({field: {onChange, value}}) => {
                const selectedBranch = allBranches.find(
                  b => b.branch_id === value,
                );
                return (
                  <View style={styles.bpWrapper}>
                    <Text style={styles.bpLabel}>
                      Job Location (Branch){' '}
                      <Text style={styles.bpRequired}>*</Text>
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.bpSelectedCard,
                        branchDropdownOpen && styles.bpSelectedCardOpen,
                      ]}
                      onPress={() => setBranchDropdownOpen(prev => !prev)}>
                      {selectedBranch ? (
                        <View style={styles.bpBranchRow}>
                          {selectedBranch.branch_logo ? (
                            <CImage
                              src={{
                                uri: getImageUrl(selectedBranch.branch_logo),
                              }}
                              style={styles.bpAvatar}
                            />
                          ) : (
                            <View style={styles.bpAvatarPlaceholder}>
                              <Text style={styles.bpAvatarText}>
                                {selectedBranch.business_name
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </Text>
                            </View>
                          )}
                          <View style={styles.bpBranchInfo}>
                            <Text style={styles.bpBranchName} numberOfLines={1}>
                              {selectedBranch.branch_name}
                            </Text>
                            <View style={styles.bpLocationRow}>
                              <Icon
                                type={Icons.Ionicons}
                                name="location-outline"
                                size={size.moderateScale(11)}
                                color={color.gray900}
                              />
                              <Text
                                style={styles.bpLocationText}
                                numberOfLines={1}>
                                {selectedBranch?.location?.address}
                              </Text>
                            </View>
                          </View>
                          <Icon
                            type={Icons.Ionicons}
                            name={
                              branchDropdownOpen ? 'chevron-up' : 'chevron-down'
                            }
                            size={size.moderateScale(16)}
                            color={color.gray900}
                          />
                        </View>
                      ) : (
                        <View style={styles.bpPlaceholderRow}>
                          <Text style={styles.bpPlaceholderText}>
                            Select branch location
                          </Text>
                          <Icon
                            type={Icons.Ionicons}
                            name={
                              branchDropdownOpen ? 'chevron-up' : 'chevron-down'
                            }
                            size={size.moderateScale(16)}
                            color={color.gray900}
                          />
                        </View>
                      )}
                    </TouchableOpacity>

                    {branchDropdownOpen && (
                      <View style={styles.bpDropdownList}>
                        {allBranches.map((branch, idx) => {
                          const isSelected = value === branch.branch_id;
                          return (
                            <TouchableOpacity
                              key={branch.branch_id || idx}
                              activeOpacity={0.75}
                              style={[
                                styles.bpDropdownItem,
                                isSelected && styles.bpDropdownItemSelected,
                                idx < allBranches.length - 1 &&
                                  styles.bpItemBorder,
                              ]}
                              onPress={() => {
                                onChange(branch.branch_id);
                                setBranchDropdownOpen(false);
                                setValue('area', branch.location?.area);
                                setValue('city', branch.location?.city || '');
                                setValue('state', branch.location?.state || '');
                                setValue(
                                  'country',
                                  branch.location?.country || '',
                                );
                                const loc = branch?.location?.address;
                                setValue('address_line', loc);
                              }}>
                              {branch.branch_logo ? (
                                <CImage
                                  src={{uri: getImageUrl(branch.branch_logo)}}
                                  style={styles.bpAvatar}
                                />
                              ) : (
                                <View style={styles.bpAvatarPlaceholder}>
                                  <Text style={styles.bpAvatarText}>
                                    {branch.business_name
                                      ?.charAt(0)
                                      ?.toUpperCase()}
                                  </Text>
                                </View>
                              )}
                              <View style={styles.bpBranchInfo}>
                                <Text
                                  style={styles.bpBranchName}
                                  numberOfLines={1}>
                                  {branch.branch_name}
                                </Text>
                                <View style={styles.bpLocationRow}>
                                  <Icon
                                    type={Icons.Ionicons}
                                    name="location-outline"
                                    size={size.moderateScale(11)}
                                    color={color.gray900}
                                  />
                                  <Text
                                    style={styles.bpLocationText}
                                    numberOfLines={1}>
                                    {branch?.location?.address}
                                  </Text>
                                </View>
                              </View>
                              {isSelected && (
                                <Icon
                                  type={Icons.AntDesign}
                                  name="check"
                                  size={size.moderateScale(18)}
                                  color={color.blue}
                                />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              }}
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
                  maxLength={10}
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
                  multiline
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
                  multiline
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
