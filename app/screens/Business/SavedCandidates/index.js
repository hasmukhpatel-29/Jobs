import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Popover from 'react-native-popover-view';
import moment from 'moment';
import {CHeader} from '@components/CHeader';
import CInput from '@components/CInput';
import {useThemeContext} from '@contexts/themeContext';
import {EnterCommentModal} from '@components/CModal/ConfirmationModal';
import Icon, {Icons} from '@config/Icons';
import {ApplicantFilter, statusOptions} from '@config/staticData';
import {
  useSavedCandidatesList,
  useUpdateApplicantStatus,
  useUpdateTimeLine,
} from '@apis/ApiRoutes/Business';
import {GetStatusColor} from '@utils/commonFunction';
import {CustomIcon} from '@config/LoadIcons';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ApplicantRow = ({item, onUpdate, navigation}) => {
  const {color} = useThemeContext();
  const styles = GetStyles();
  const statusColor = GetStatusColor(item.status);
  const statusBtnRef = useRef(null);
  const [statusAnchor, setStatusAnchor] = useState(null);

  const closeStatusPopover = () => setStatusAnchor(null);
  const {mutate: updateStatus} = useUpdateApplicantStatus();

  const handleStatusSelect = newStatus => {
    updateStatus({
      applicationId: item.application_id,
      status: newStatus,
    });
    closeStatusPopover();
  };

  return (
    <TouchableOpacity
      style={styles.applicantCard}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('ApplicantProfile', {
          applicantId: item?.application_id,
        })
      }>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.applicant.avatar}</Text>
            {item?.is_saved && (
              <View style={styles.bookmarkBadge}>
                <CustomIcon name="likeFilled" size={10} color={color.red} />
              </View>
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text
              style={styles.fullName}
              numberOfLines={2}
              adjustsFontSizeToFit>
              {item.applicant.full_name}
            </Text>
            <Text style={styles.headline} numberOfLines={2}>
              {item.applicant.headline}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          ref={statusBtnRef}
          onPress={() => setStatusAnchor(statusBtnRef)}
          activeOpacity={0.7}
          style={[
            styles.statusPill,
            {borderColor: statusColor, backgroundColor: `${statusColor}15`},
          ]}>
          <View style={[styles.statusDot, {backgroundColor: statusColor}]} />
          <Text style={[styles.statusText, {color: statusColor}]}>
            {item.status}
          </Text>
          <Icon
            type={Icons.Feather}
            name={statusAnchor ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={statusColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.activityBox}>
        <Text style={styles.activityLabel}>LATEST ACTIVITY</Text>
        <View style={styles.activityContent}>
          <View
            style={[styles.statusDotSmall, {backgroundColor: statusColor}]}
          />
          <View>
            <Text style={styles.activityMessage}>
              {item.latest_activity.message}
            </Text>
            <Text style={styles.activityTime}>
              {moment(item.latest_activity.timestamp).format('MMM D, YYYY')} •{' '}
              {item.latest_activity.by}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.skillsContainer}>
        {item.applicant.skills.slice(0, 2).map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
        {item.applicant.skills.length > 2 && (
          <View style={styles.skillTag}>
            <Text style={styles.skillText}>
              +{item.applicant.skills.length - 2}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.jobInfo}>
          <Text style={styles.footerJobText}>
            {item.job.title} • {moment(item.applied_at).format('MMM D, YYYY')}
          </Text>
          <Text style={styles.footerJobText}>
            {moment(item.applied_at).format('hh:mm A')}
          </Text>
        </View>

        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.updateBtn} onPress={onUpdate}>
            <Icon
              type={Icons.Feather}
              name="plus"
              size={16}
              color={color.blue}
            />
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Popover
        isVisible={!!statusAnchor}
        from={statusAnchor}
        onRequestClose={closeStatusPopover}
        popoverStyle={styles.popoverStyle}
        arrowSize={{width: 0, height: 0}}>
        <View style={styles.popoverInnerContainer}>
          {statusOptions.map(statusOption => {
            const optColor = GetStatusColor(statusOption);
            const isSelected = item.status === statusOption;

            return (
              <TouchableOpacity
                key={statusOption}
                activeOpacity={0.7}
                style={[
                  styles.statusMenuItem,
                  isSelected && {backgroundColor: `${optColor}15`},
                ]}
                onPress={() => handleStatusSelect(statusOption)}>
                <View style={[styles.statusDot, {backgroundColor: optColor}]} />
                <Text
                  style={[
                    styles.statusMenuText,
                    isSelected && {color: optColor},
                  ]}>
                  {statusOption}
                </Text>
                {isSelected && (
                  <View style={styles.popoverIconContainer}>
                    <Icon
                      type={Icons.Feather}
                      name="check"
                      size={16}
                      color={optColor}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Popover>
    </TouchableOpacity>
  );
};

const SavedCandidates = ({navigation}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const [filter, setFilter] = useState(ApplicantFilter[0]);
  const filterBtnRef = useRef(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const {mutate: updateTimeline} = useUpdateTimeLine();

  const handleTimelineUpdate = newStatus => {
    updateTimeline({
      applicationId: selectedApplicant.application_id,
      message: newStatus,
    });
  };

  const openModal = item => {
    setSelectedApplicant(item);
    setCommentModalVisible(true);
  };

  const closeModal = () => {
    setCommentModalVisible(false);
    setSelectedApplicant(null);
  };

  const closePopover = () => setPopoverAnchor(null);

  const handleFilterSelect = selectedOption => {
    setFilter(selectedOption);
    closePopover();
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useSavedCandidatesList(filter?.value, debouncedSearch);

  const applicants = data?.pages.flatMap(page => page.data) || [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.root}>
      <CHeader title="Saved Applicants" back />
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <View style={styles.screenHeader}>
          <CInput
            value={search}
            onChangeText={text => setSearch(text)}
            mainContainerStyle={{marginBottom: 0, flex: 1}}
            placeholder="Search by candidate,etc"
            multiline={false}
            inputStyle={{
              flex: 1,
              minWidth: '100%',
              paddingVertical: 0,
            }}
            inputViewStyle={{height: 35}}
            returnKeyType="search"
            onSubmitEditing={() => refetch()}
            blurOnSubmit
          />
          <TouchableOpacity
            ref={filterBtnRef}
            activeOpacity={0.7}
            style={styles.filterBtn}
            onPress={() => setPopoverAnchor(filterBtnRef)}>
            <Text style={styles.filterText}>{filter?.label}</Text>
            <Icon
              type={Icons.Feather}
              name="chevron-down"
              size={16}
              color={color.black}
            />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={styles.emptyComponeemptyComponentnt}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={applicants}
              renderItem={({item}) => (
                <ApplicantRow
                  item={item}
                  onUpdate={() => openModal(item)}
                  navigation={navigation}
                />
              )}
              keyExtractor={item => item.transaction_id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              refreshing={isRefetching}
              onRefresh={refetch}
              ListEmptyComponent={
                <View style={styles.emptyComponent}>
                  <Text style={styles.emptyText}>No Applicant found</Text>/
                </View>
              }
              ListFooterComponent={
                isFetchingNextPage ? (
                  <ActivityIndicator color={color.primary} />
                ) : null
              }
            />
          </View>
        )}
      </KeyboardAvoidingView>
      <Popover
        isVisible={!!popoverAnchor}
        from={popoverAnchor}
        onRequestClose={closePopover}
        popoverStyle={styles.popoverStyle}
        arrowSize={{width: 0, height: 0}}>
        <View style={styles.popoverInnerContainer}>
          {ApplicantFilter.map(option => {
            const isActive = filter === option;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                style={styles.popoverRow}
                onPress={() => handleFilterSelect(option)}>
                <Text
                  style={[
                    styles.popoverText,
                    isActive && styles.popoverTextActive,
                  ]}>
                  {option?.label}
                </Text>
                <View style={styles.popoverIconContainer}>
                  {isActive && (
                    <Icon
                      type={Icons.Feather}
                      name="check"
                      size={20}
                      color={color.blue}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Popover>
      <EnterCommentModal
        isVisible={commentModalVisible}
        title="Quick Update"
        subTitle={`Write a quick message to ${
          selectedApplicant?.applicant?.full_name || 'the applicant'
        }`}
        yesText="Post update"
        onConfirm={mes => {
          handleTimelineUpdate(mes);
          closeModal();
        }}
        onReject={closeModal}
      />
    </View>
  );
};

export default SavedCandidates;
