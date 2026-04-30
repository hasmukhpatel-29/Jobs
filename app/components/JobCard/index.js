import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {loginModalRef} from '@navigation/mainStackNavigation';
import CImage from '@components/CImage';
import {CButton} from '@components/CButton';
import Toast from '@components/CToast';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import Icon, {Icons} from '@config/Icons';
import {useThemeContext} from '@contexts/themeContext';
import {GetStatusColor, getTimeAgo} from '@utils/commonFunction';
import {useApplyJob} from '@hooks/useApplyJob';
import useGlobalStore from '@zustand/store';
import GetStyles from './styles';

const JobCard = ({item, toggleSaveJob, myApplicant}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const navigation = useNavigation();
  const [applyLoading, setApplyLoading] = useState(false);
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  const applyJob = useApplyJob();

  const handleApply = async () => {
    if (!isAuthenticated) {
      loginModalRef.current?.open();
      return;
    }
    if (item?.already_applied) return;

    try {
      setApplyLoading(true);

      await applyJob(item?.job_id);
      Toast.show({
        type: 'success',
        text1: 'Applied successfully!',
      });
    } catch (e) {
    } finally {
      setApplyLoading(false);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('JobDetails', {
          jobId: item?.job?.job_id || item?.job_id,
          myApplicant,
        })
      }
      style={styles.card}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item?.title || item?.job?.title}</Text>
          <View style={styles.headerCont}>
            <View style={styles.headerView}>
              <CustomIcon
                name="location"
                size={size.moderateScale(14)}
                color={color?.gray900}
              />
              {item?.location?.city && item?.location?.state ? (
                <Text style={styles.company}>
                  {item?.location?.city}, {item?.location?.state}
                </Text>
              ) : (
                <Text style={styles.company}>
                  {item?.location || item?.job?.location}
                </Text>
              )}
            </View>
            {item?.created_at && (
              <View style={styles.headerView}>
                <CustomIcon
                  name="timer3"
                  size={size.moderateScale(14)}
                  color={color?.gray900}
                />
                <Text style={styles.company}>
                  {getTimeAgo(item?.created_at)}
                </Text>
              </View>
            )}
            <View style={styles.headerView}>
              <CustomIcon
                name="briefcase"
                size={size.moderateScale(14)}
                color={color?.gray900}
              />
              <Text style={styles.company}>
                {item?.work_mode || item?.job?.work_mode}
              </Text>
            </View>
          </View>
        </View>

        {item?.job ? (
          <View style={styles.appliedCont(GetStatusColor(item?.status))}>
            <Text style={styles.appliedText(GetStatusColor(item?.status))}>
              {item?.status}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              toggleSaveJob(item?.job_id);
            }}>
            <Icon
              type={Icons.FontAwesome}
              name={item?.is_saved ? 'bookmark' : 'bookmark-o'}
              size={size.moderateScale(18)}
              color={color?.black}
            />
          </TouchableOpacity>
        )}
      </View>
      {item?.description && (
        <Text style={styles.description} numberOfLines={2}>
          {item?.description}
        </Text>
      )}

      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>
            {item?.job_type || item?.job?.job_type}
          </Text>
        </View>
        {(item?.ctc || item?.job?.ctc) && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item?.ctc || item?.job?.ctc}</Text>
          </View>
        )}
        {(item?.experience || item?.job?.experience) && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {item?.experience || item?.job?.experience} yrs
            </Text>
          </View>
        )}
        {(item?.skills || item?.job?.category) && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {item?.skills || item?.job?.category}
            </Text>
          </View>
        )}
      </View>

      {item?.business_details && (
        <View style={styles.footer}>
          <View style={styles.businessCont}>
            <View style={styles.imgContainer}>
              <CImage
                src={item?.business_details?.branch_logo}
                style={styles.companyLogo}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={styles.companyName}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.business_details?.display_name}
              </Text>
              <Text style={styles.cityName}>
                {item?.business_details?.city_name}
              </Text>
            </View>
          </View>
          <CButton
            label={item?.application_status || 'Apply Now'}
            onPress={handleApply}
            disabled={item?.already_applied || applyLoading}
            loading={applyLoading}
            buttonStyle={styles.btnStyle}
          />
        </View>
      )}
      {item?.job && (
        <View style={styles.footer}>
          <View style={styles.headerView}>
            <CustomIcon
              name="timer3"
              size={size.moderateScale(14)}
              color={color?.gray900}
            />
            <Text style={styles.company}>
              Applied {getTimeAgo(item?.applied_at)}
            </Text>
          </View>
          <CButton
            label="Details"
            onPress={() =>
              navigation.navigate('JobDetails', {
                jobId: item?.job?.job_id,
                myApplicant,
              })
            }
            buttonStyle={styles.btnStyle}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default JobCard;
