/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Popover from 'react-native-popover-view';
import {ConfirmationModal} from '@components/CModal/ConfirmationModal';
import Toast from '@components/CToast';
import {CHeader} from '@components/CHeader';
import useGlobalStore from '@zustand/store';
import {useThemeContext} from '@contexts/themeContext';
import {manageJobApi, closeJobApi} from '@apis/ApiRoutes/Business';
import Icon, {Icons} from '@config/Icons';
import {size} from '@config/Sizes';
import {getTimeAgo} from '@utils/commonFunction';
import GetStyles from './styles';

const JobCardItem = ({item, onMenuPress, onView, styles, color}) => {
  const menuRef = useRef(null);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.titleText} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.metaText}>
            {item?.job_type} • {getTimeAgo(item?.created_at)}
          </Text>
        </View>
        <TouchableOpacity
          ref={menuRef}
          activeOpacity={0.7}
          style={styles.menuIconContainer}
          onPress={() => onMenuPress(menuRef, item)}>
          <Icon
            type={Icons.Entypo}
            name="dots-three-vertical"
            size={size.moderateScale(16)}
            color={color.gray200}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.statusMetricsContainer}>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot(item?.status === 'Active')} />
            <Text style={styles.statusText(item?.status === 'Active')}>
              {item?.status}
            </Text>
          </View>
          <View style={styles.metricsContainer}>
            <Icon
              type={Icons.Feather}
              name="users"
              size={size.moderateScale(14)}
              color={color.placeholderText}
            />
            <Text style={styles.metricsText}>{item?.applicant_count || 0}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.viewButton}
          onPress={() => onView(item)}>
          <Text style={styles.viewButtonText}>View Job Posting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ManageJob({navigation}) {
  const styles = GetStyles();
  const {color} = useThemeContext();

  const activeBusinessId = useGlobalStore(s => s.activeBusinessId);

  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState({});
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleCloseJob = async () => {
    if (!selectedJob?.job_id) return;
    try {
      setConfirmVisible(false);
      setLoading(true);
      const response = await closeJobApi(selectedJob.job_id);
      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: response?.message || 'Job closed successfully',
        });
        fetchDashboard();
      }
    } catch (error) {
      console.error('Failed to close job:', error);
    } finally {
      setLoading(false);
      setSelectedJob(null);
    }
  };

  const fetchDashboard = async () => {
    if (!activeBusinessId) return;

    try {
      setLoading(true);
      const response = await manageJobApi();

      if (response?.success && response?.data) {
        setJobList(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch job:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeBusinessId) {
      fetchDashboard();
    }
  }, [activeBusinessId]);

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{color: color.placeholderText}}>
          No job postings found.
        </Text>
      </View>
    );
  };

  const closePopover = () => {
    setPopoverAnchor(null);
  };

  return (
    <View style={styles.root}>
      <CHeader title="Manage Job" />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : (
        <View>
          <FlatList
            data={jobList}
            keyExtractor={(item, index) => item.job_id || index.toString()}
            renderItem={({item}) => (
              <JobCardItem
                item={item}
                styles={styles}
                color={color}
                onMenuPress={(ref, data) => {
                  setPopoverAnchor(ref);
                  setSelectedJob(data);
                }}
                onView={() => {
                  navigation.navigate('JobEmployerDetails', {
                    jobData: item,
                  });
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>
      )}
      <Popover
        isVisible={!!popoverAnchor}
        from={popoverAnchor}
        onRequestClose={closePopover}
        popoverStyle={styles.popoverStyle}>
        <View>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              closePopover();
              navigation.navigate('PostJob', {repostData: selectedJob});
              setSelectedJob(null);
            }}>
            <Icon
              type={Icons.Ionicons}
              name="copy-outline"
              size={size.moderateScale(18)}
              color={color.green}
            />
            <Text style={[styles.menuText, {color: color.green}]}>Repost</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              closePopover();
              navigation.navigate('JobEmployerDetails', {
                jobData: selectedJob,
              });
              setSelectedJob(null);
            }}>
            <Icon
              type={Icons.Feather}
              name="eye"
              size={size.moderateScale(18)}
              color={color.black}
            />
            <Text style={[styles.menuText, {color: color.black}]}>
              View Detail
            </Text>
          </TouchableOpacity>

          {selectedJob?.status !== 'Closed' && (
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                closePopover();
                setConfirmVisible(true);
              }}>
              <Icon
                type={Icons.Feather}
                name="trash-2"
                size={size.moderateScale(18)}
                color={color.red}
              />
              <Text style={[styles.menuText, {color: color.red}]}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </Popover>

      <ConfirmationModal
        isVisible={confirmVisible}
        title="Are you sure you want to close this job?"
        yesText="Close Job"
        noText="Cancel"
        onConfirm={handleCloseJob}
        onReject={() => {
          setConfirmVisible(false);
          setSelectedJob(null);
        }}
      />
    </View>
  );
}
