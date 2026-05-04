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
import CAutoComplete from '@components/CAutoComplete';
import {CButton} from '@components/CButton';
import Toast from '@components/CToast';
import {zodResolver} from '@hookform/resolvers/zod';
import {addSkillApi, deleteSkillApi} from '@apis/ApiRoutes/UserProfileApi';
import {CustomIcon} from '@config/LoadIcons';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';
import {skillSchema} from '@zod/validationSchema';

const IOS = Platform.OS === 'ios';
const SkillUpdate = ({route}) => {
  const profileDetails = route?.params?.profileDetails || {};
  const styles = GetStyles();
  const {color} = useThemeContext();

  const [skillList, setSkillList] = useState(profileDetails?.skills || []);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    skill_name: '',
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: defaultValues,
  });

  const editProfile = async values => {
    try {
      const isDuplicate = skillList.some(
        skill =>
          skill.skill_name.toLowerCase() === values.skill_name.toLowerCase(),
      );

      if (isDuplicate) {
        Toast.show({type: 'error', text1: 'Skill already added'});
        return;
      }
      setLoading(true);
      const body = {
        skill_name: values.skill_name,
      };
      const res = await addSkillApi(body);

      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        setSkillList(prev => [...prev, res?.data]);
        reset(defaultValues);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Update Error:', error);
    }
  };

  const deleteExperience = async id => {
    try {
      const res = await deleteSkillApi(id);

      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        setSkillList(prev => prev.filter(item => item.skill_id !== id));
      }
    } catch (error) {
      console.log('Update Error:', error);
    }
  };

  return (
    <View style={styles.root}>
      <CHeader title="Skill" back />
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mainView}>
            {skillList?.map((item, index) => (
              <View key={index} style={styles.educationCard}>
                <View style={styles.dataCont}>
                  <Text style={styles.tagText}>{item?.skill_name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteExperience(item?.skill_id)}>
                  <CustomIcon name="delete" color={color.red} size={20} />
                </TouchableOpacity>
              </View>
            ))}

            <View style={{zIndex: 10000}}>
              <Controller
                name="skill_name"
                control={control}
                render={({field: {value}, fieldState: {error}}) => (
                  <CAutoComplete
                    required
                    label="Skill"
                    placeholder="Enter Skill"
                    value={value}
                    onSelect={item => {
                      setValue('skill_name', item?.name);
                    }}
                    type="skill"
                    errorMsg={error?.message}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <CButton
            label="Add"
            loading={loading}
            disabled={loading}
            buttonStyle={styles.floatingBtn}
            onPress={handleSubmit(editProfile)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SkillUpdate;
