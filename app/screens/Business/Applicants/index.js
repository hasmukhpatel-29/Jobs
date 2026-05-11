import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Popover from 'react-native-popover-view';
import moment from 'moment';
import {CHeader} from '@components/CHeader';
import {StatCard} from '@components/StatCard';
import CInput from '@components/CInput';
import {useThemeContext} from '@contexts/themeContext';
import {EnterCommentModal} from '@components/CModal/ConfirmationModal';
import Icon, {Icons} from '@config/Icons';
import {ApplicantFilter, statusOptions} from '@config/staticData';
import {
  useApplicantsList,
  useUpdateApplicantStatus,
  useUpdateTimeLine,
} from '@apis/ApiRoutes/Business';
import {GetStatusColor} from '@utils/commonFunction';
import GetStyles from './styles';

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
      onPress={() => navigation.navigate('ApplicantProfile', {applicantId: item?.application_id})}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.applicant.avatar}</Text>
            {item.is_saved && (
              <View style={styles.bookmarkBadge}>
                <Icon
                  type={Icons.FontAwesome}
                  name="bookmark"
                  size={10}
                  color={color.blue}
                />
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

const Applicants = ({navigation}) => {
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
  } = useApplicantsList(filter?.value, debouncedSearch);

  const applicants = data?.pages.flatMap(page => page.data) || [];

  const stats = data?.pages[0]?.stats || {
    total: 0,
    new: 0,
    under_review: 0,
    shortlisted: 0,
    hired: 0,
    rejected: 0,
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.root}>
      <CHeader title="Applicants List" back />
      <View style={styles.statsGrid}>
        <StatCard
          value={stats.total}
          label="Total Applicants"
          iconName="users"
          baseColor={color.primary}
        />
        <StatCard
          value={stats.new}
          label="New"
          iconName="info"
          baseColor={color.blue}
        />
        <StatCard
          value={stats.shortlisted}
          label="Shortlisted"
          iconName="shield"
          baseColor={color.hexBlue}
        />
        <StatCard
          value={stats.hired}
          label="Hired"
          iconName="check-circle"
          baseColor={color.green}
        />
        <StatCard
          value={stats.under_review}
          label="Under Review"
          iconName="alert-triangle"
          baseColor={color.orange}
        />
        <StatCard
          value={stats.rejected}
          label="Rejected"
          iconName="slash"
          baseColor={color.red}
        />
      </View>

      <View style={styles.screenHeader}>
        <View style={{flex: 1}}>
          <CInput
            value={search}
            onChangeText={text => setSearch(text)}
            mainContainerStyle={{marginBottom: 0}}
            inputViewStyle={{height: 35}}
            placeholder="Search by headline,bio or title"
          />
        </View>
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

export default Applicants;
