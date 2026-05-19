/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Popover from 'react-native-popover-view';
import moment from 'moment';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {CButton} from '@components/CButton';
import {EnterCommentModal} from '@components/CModal/ConfirmationModal';
import {CHeader} from '@components/CHeader';
import Toast from '@components/CToast';
import {useThemeContext} from '@contexts/themeContext';
import {
  applicantProfileApi,
  saveApplicantApi,
  updateNoteApi,
  useUpdateApplicantStatus,
  useUpdateTimeLine,
} from '@apis/ApiRoutes/Business';
import {GetStatusColor} from '@utils/commonFunction';
import {CustomIcon} from '@config/LoadIcons';
import Icon, {Icons} from '@config/Icons';
import {statusOptions} from '@config/staticData';
import {size} from '@config/Sizes';
import GetStyles from './styles';

const ApplicantProfile = ({route}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const applicantId = route.params?.applicantId || '';

  const [jobData, setJobData] = useState({});
  const statusBtnRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [statusAnchor, setStatusAnchor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const closeStatusPopover = () => setStatusAnchor(null);
  const {applicant = {}, job = {}, applied_at} = jobData;
  const statusColor = GetStatusColor(jobData.status);

  const closeModal = () => {
    setShowModal(false);
  };

  const {mutate: updateStatus} = useUpdateApplicantStatus();
  const {mutate: updateTimeline} = useUpdateTimeLine();

  const handleToggleSaveJob = async () => {
    const res = await saveApplicantApi(jobData?.application_id);
    if (res?.success) {
      Toast.show({
        type: 'success',
        text1: res?.message,
      });
      setJobData(prevData => ({
        ...prevData,
        is_saved: !prevData.is_saved,
      }));
    }
  };

  const applicantProfile = async () => {
    try {
      setLoading(true);
      let response = await applicantProfileApi(applicantId, false);

      if (response?.success) {
        setJobData(response.data);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Something went wrong',
        });
      }
    } catch (error) {
      console.error('Error fetching applicant details:', error);
    } finally {
      setLoading(false);
    }
  };

  const TimelineItem = ({item, index}) => {
    const isLast = index === applicant?.experience.length - 1;

    const primaryColor = color.blue;

    return (
      <View style={styles.timelineRow}>
        <View style={styles.timelineGraphicContainer}>
          <View
            style={[
              styles.timelineDot,
              {borderColor: primaryColor},
              item.is_current && {backgroundColor: primaryColor},
            ]}
          />
          {!isLast && (
            <View
              style={[
                styles.timelineLine,
                {backgroundColor: `${primaryColor}40`},
              ]}
            />
          )}
        </View>

        <View
          style={[
            styles.timelineCard,
            item?.is_current
              ? {
                  backgroundColor: `${primaryColor}0A`,
                  borderColor: `${primaryColor}30`,
                }
              : {
                  backgroundColor: color.white,
                  borderColor: color.borderColor,
                },
          ]}>
          <View style={styles.cardHeader}>
            <Text style={styles.jobTitle}>{item.role}</Text>
            {item?.is_current && (
              <View
                style={[styles.currentBadge, {backgroundColor: primaryColor}]}>
                <Text style={styles.currentBadgeText}>CURRENT</Text>
              </View>
            )}
          </View>

          <Text style={styles.companyName}>{item.company}</Text>

          <View style={styles.metaDataRow}>
            <View style={styles.metaItem}>
              <Icon
                type={Icons.Feather}
                name="calendar"
                size={12}
                color={color.gray200}
              />
              <Text style={styles.metaText}>
                {item?.start_month_year} - {item?.end_month_year || 'Present'}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Icon
                type={Icons.Feather}
                name="map-pin"
                size={12}
                color={color.gray200}
              />
              <Text style={styles.metaText}>{item?.city}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    applicantProfile();
  }, []);

  const handleStatusSelect = newStatus => {
    updateStatus({
      applicationId: jobData.application_id,
      status: newStatus,
    });
    closeStatusPopover();
    applicantProfile();
  };

  const handleConfirmModal = async message => {
    if (modalMode === 'note') {
      await updateNoteApi(jobData.application_id, message);
    } else if (modalMode === 'update') {
      updateTimeline({
        applicationId: jobData.application_id,
        message: message,
      });
    }
    applicantProfile();
    closeModal();
  };

  const InfoCard = ({iconType, iconName, label, value}) => (
    <View style={styles.infoCard}>
      <View style={styles.infoIconWrapper}>
        <Icon type={iconType} name={iconName} size={16} color={color.gray200} />
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || 'N/A'}</Text>
      </View>
    </View>
  );

  const progressSteps = [
    {
      id: 1,
      label: 'Applied',
      color: color.primary,
      icon: 'checkmark',
    },
    {
      id: 2,
      label: 'Under Review',
      color: color.orange,
      icon: 'checkmark',
    },
    {
      id: 3,
      label: 'Shortlisted',
      color: color.hexBlue,
      icon: 'checkmark',
    },

    {
      id: 4,
      label: 'Hired',
      color: color.green,
      icon: 'checkmark',
    },
    {
      id: 5,
      label: 'Rejected',
      color: color.red,
      icon: 'close',
    },
  ];

  const isRejected = jobData?.status === 'Rejected';
  const filteredSteps = progressSteps.filter(step => {
    if (isRejected) {
      return step.label !== 'Hired';
    } else {
      return step.label !== 'Rejected';
    }
  });

  return (
    <View style={styles.root}>
      <CHeader title="Applicant Profile" back />
      {loading ? (
        <CardSkeleton count={4} />
      ) : !jobData ? (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyText}>No applicant profile found</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.profileRoot}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.profileCont}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>
                  {applicant?.avatar}
                </Text>
              </View>

              <View style={styles.profileContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.profileName}>{applicant?.full_name}</Text>
                  <Text style={styles.profileHeadline}>
                    {applicant?.headline}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    handleToggleSaveJob();
                  }}>
                  <CustomIcon
                    name={jobData?.is_saved ? 'likeFilled' : 'like'}
                    size={size.moderateScale(24)}
                    color={jobData?.is_saved ? color?.red : color?.black}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.metaRow}>
              {applicant?.location && (
                <View style={styles.metaItem}>
                  <CustomIcon name="location" size={14} color={color.gray900} />
                  <Text style={styles.metaText}>{applicant?.location}</Text>
                </View>
              )}
              <View style={styles.metaItem}>
                <Icon
                  type={Icons.Feather}
                  name="file-text"
                  size={14}
                  color={color.gray900}
                />
                <Text style={styles.metaText}>{job?.title}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>ABOUT</Text>
            <Text style={styles.aboutText}>
              {applicant?.bio || 'No bio provided.'}
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>CONTACT & DETAILS</Text>
            <View style={styles.infoGrid}>
              <InfoCard
                iconType={Icons.Feather}
                iconName="phone"
                label="PHONE"
                value={applicant?.mobile_number}
              />
              <InfoCard
                iconType={Icons.Feather}
                iconName="calendar"
                label="APPLIED ON"
                value={`${moment(applied_at).format('MMM D, YYYY')} · ${moment(
                  applied_at,
                ).format('hh:mm A')}`}
              />
              <InfoCard
                iconType={Icons.Feather}
                iconName="tag"
                label="CATEGORY"
                value={job?.category}
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsWrapper}>
              {applicant?.skills?.map((skill, index) => (
                <View key={index} style={styles.profileSkillTag}>
                  <Text style={styles.profileSkillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {applicant?.experience?.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {applicant?.experience?.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </View>
          )}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionView}>
              <Text style={styles.sectionTitle}>Internal Note / Reason</Text>
              <TouchableOpacity
                ref={statusBtnRef}
                onPress={() => {
                  setModalMode('note');
                  setShowModal(true);
                }}
                activeOpacity={0.7}
                style={styles.editCont}>
                {jobData?.note && (
                  <Icon type={Icons.Feather} name="edit" size={14} />
                )}
                <Text style={styles.statusText}>
                  {jobData?.note === '' ? 'Add' : 'Edit'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.noteText}>
            {jobData?.note || 'No internal notes added yet'}
          </Text>
          {applicant?.education && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={{gap: 10}}>
                {applicant?.education?.map((item, index) => (
                  <View style={styles.infoCard}>
                    <View style={styles.educationWrapper}>
                      <Icon
                        type={Icons.FontAwesome5}
                        name="graduation-cap"
                        size={16}
                        color={color.green}
                      />
                    </View>
                    <View style={styles.infoTextWrapper}>
                      <Text style={styles.infoValue}>{item?.degree}</Text>
                      <Text style={styles.infoLabel}>{item?.college}</Text>
                      <View style={styles.locationRow}>
                        <Icon
                          type={Icons.Feather}
                          name="map-pin"
                          size={12}
                          color={color.gray200}
                        />
                        <Text style={styles.locationText} numberOfLines={1}>
                          {item?.city}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.sectionContainer}>
            <View style={styles.sectionView}>
              <Text style={styles.sectionTitle}>Hiring Pipeline Tracker</Text>
              <TouchableOpacity
                ref={statusBtnRef}
                onPress={() => setStatusAnchor(statusBtnRef)}
                activeOpacity={0.7}
                style={[
                  styles.statusPill,
                  {
                    borderColor: statusColor,
                    backgroundColor: `${statusColor}15`,
                  },
                ]}>
                <View
                  style={[styles.statusDot, {backgroundColor: statusColor}]}
                />
                <Text style={[styles.statusText, {color: statusColor}]}>
                  {jobData.status}
                </Text>
                <Icon
                  type={Icons.Feather}
                  name={statusAnchor ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={statusColor}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressLineBackground} />

              {filteredSteps.map((step, index) => {
                const currentStepIndex = filteredSteps.findIndex(
                  step => step.label === jobData?.status,
                );
                const isCompleted = index <= currentStepIndex;

                return (
                  <View key={step.id} style={styles.progressStep}>
                    <View
                      style={[
                        styles.progressCircle,
                        {
                          backgroundColor: isCompleted
                            ? step.color
                            : color.gray,
                        },
                      ]}>
                      {isCompleted ? (
                        <Icon
                          type={Icons.Ionicons}
                          name={step.icon}
                          size={20}
                          color={color.white}
                        />
                      ) : (
                        <Text style={styles.numText}>{step.id}</Text>
                      )}
                    </View>

                    <Text
                      style={[
                        styles.progressLabel,
                        {
                          color:
                            step.label === 'Rejected'
                              ? color.red
                              : isCompleted
                              ? color.black
                              : color.gray200,
                        },
                      ]}>
                      {step.label}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.timelineContainer}>
              <View style={styles.verticalLine} />
              {jobData?.status_updates?.map((item, index) => {
                const badgeText = item?.stage || item?.previous_status;

                const statusColor = GetStatusColor(badgeText);

                const cardStyle = styles.timelineCardGrey(
                  GetStatusColor(badgeText),
                );

                const title =
                  item?.message || 'Application submitted successfully';
                const changedBy = item?.by || 'System';

                return (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDotContainer}>
                      <View
                        style={[
                          styles.timelineDot1,
                          {backgroundColor: statusColor},
                        ]}
                      />
                    </View>

                    <View style={[styles.timelineCard1, cardStyle]}>
                      <Text
                        style={[styles.timelineTitle, {color: statusColor}]}>
                        {title}
                      </Text>

                      <View style={styles.timelineMetaRow}>
                        <View style={styles.metaItem1}>
                          <CustomIcon
                            name="timer3"
                            size={14}
                            color={color.gray900}
                          />
                          <Text style={styles.metaText1}>
                            {`${moment(item?.timestamp).format(
                              'MMM D, YYYY',
                            )} · ${moment(item?.timestamp).format('hh:mm A')}`}
                          </Text>
                        </View>

                        <View style={styles.metaItem}>
                          <CustomIcon
                            name="userProfile"
                            size={14}
                            color={color.gray900}
                          />
                          <Text style={styles.metaText1}>{changedBy}</Text>
                        </View>

                        {badgeText && (
                          <View
                            style={[styles.badge, {borderColor: statusColor}]}>
                            <Text
                              style={[
                                styles.progressLabel,
                                {color: statusColor},
                              ]}>
                              {badgeText}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <CButton
            label="Post an Update"
            outLineBtn
            onPress={() => {
              setModalMode('update');
              setShowModal(true);
            }}
          />
        </ScrollView>
      )}
      <EnterCommentModal
        isVisible={showModal}
        title={modalMode === 'note' ? 'Add Internal Note' : 'Quick Update'}
        subTitle={
          modalMode === 'note'
            ? 'This note is only visible to your team.'
            : `Write a quick message to the applicant`
        }
        yesText={modalMode === 'note' ? 'Save Note' : 'Post Update'}
        onConfirm={handleConfirmModal}
        onReject={closeModal}
      />

      <Popover
        isVisible={!!statusAnchor}
        from={statusAnchor}
        onRequestClose={closeStatusPopover}
        popoverStyle={styles.popoverStyle}
        arrowSize={{width: 0, height: 0}}>
        <View style={styles.popoverInnerContainer}>
          {statusOptions.map(statusOption => {
            const optColor = GetStatusColor(statusOption);
            const isSelected = jobData.status === statusOption;

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
    </View>
  );
};

export default ApplicantProfile;
