import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Modal, TouchableOpacity} from 'react-native';
import {loginModalRef} from '@navigation/mainStackNavigation';
import {CHeader} from '@components/CHeader';
import Toast from '@components/CToast';
import CImage from '@components/CImage';
import {CButton} from '@components/CButton';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {size} from '@config/Sizes';
import {jobDetailsApi, withdrawApplyJobApi} from '@apis/ApiRoutes/JobsApi';
import {CustomIcon} from '@config/LoadIcons';
import {GetStatusColor, getTimeAgo} from '@utils/commonFunction';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';
import {useApplyJob} from '@hooks/useApplyJob';
import useGlobalStore from '@zustand/store';
import Icon, {Icons} from '@config/Icons';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';

const GridItem = ({label, value}) => {
  const styles = GetStyles();

  return (
    <View style={styles.gridItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
};

const DetailRow = ({label, value}) => {
  const styles = GetStyles();

  return (
    <View style={styles.row1}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
};

const JobDetails = ({route}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const jobId = route.params?.jobId || '';
  const jobSlug = route.params?.slug || '';
  const myApplicant = route.params?.myApplicant || false;

  const [jobData, setJobData] = useState({});
  const [applyLoading, setApplyLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  const handleApply = async () => {
    if (!isAuthenticated) {
      loginModalRef.current?.open();
      return;
    }
    try {
      setApplyLoading(true);

      await applyJob(jobData?.job_id);

      setJobData(prev => ({
        ...prev,
        already_applied: true,
        application_status: 'Applied',
      }));
      Toast.show({
        type: 'success',
        text1: 'Applied successfully!',
      });
    } catch (e) {
    } finally {
      setApplyLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setWithdrawLoading(true);
      const res = await withdrawApplyJobApi(
        jobData?.application_details?.application_id,
      );

      if (res?.success) {
        setJobData(prev => ({
          ...prev,
          already_applied: false,
          application_status: null,
        }));
        Toast.show({
          type: 'success',
          text1: 'Application withdrawn successfully!',
        });
      }
    } catch (e) {
    } finally {
      setWithdrawLoading(false);
    }
  };

  const jobDetails = async () => {
    try {
      setLoading(true);
      let response;
      if (jobId) {
        response = await jobDetailsApi(jobId, false);
      } else {
        response = await jobDetailsApi(jobSlug, true);
      }

      if (response?.success) {
        setJobData(response.data);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message || 'Something went wrong',
        });
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    jobDetails();
  }, []);

  const skillsArray = jobData?.skills?.split(',') || [];
  const responsibilityArray = jobData?.responsibilities
    ? jobData.responsibilities.split(',')
    : [];
  const benefitsArray = jobData?.other_benefits
    ? jobData.other_benefits.split(',')
    : [];

  const toggleSaveJob = useToggleSaveJob();
  const applyJob = useApplyJob();
  const handleToggleSaveJob = id => {
    if (!isAuthenticated) {
      loginModalRef.current?.open();
      return;
    }

    setJobData(prev => ({
      ...prev,
      is_saved: !prev.is_saved,
    }));
    toggleSaveJob(id);
  };

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

  const isRejected = jobData?.application_status === 'Rejected';

  const filteredSteps = progressSteps.filter(step => {
    if (isRejected) {
      return step.label !== 'Hired';
    } else {
      return step.label !== 'Rejected';
    }
  });

  return (
    <View style={styles.root}>
      <CHeader
        title="Job Details"
        back
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleToggleSaveJob(jobData?.job_id)}
              style={{padding: size.moderateScale(5)}}>
              <CustomIcon
                name={jobData?.is_saved ? 'likeFilled' : 'like'}
                size={size.moderateScale(20)}
                color={jobData?.is_saved ? color.red : color.black}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {loading ? (
        <CardSkeleton count={4} />
      ) : !jobData?.job_id ? (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyText}>No details found</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.imgContainer}>
                <CImage
                  src={jobData?.business_details?.branch_logo}
                  style={styles.companyLogo}
                />
              </View>
              <Text style={styles.companyName} numberOfLines={2}>
                {jobData?.business_details?.display_name}
              </Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.jobStatus}>{jobData?.status}</Text>
            </View>

            <Text style={styles.jobTitle}>{jobData?.title}</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <CustomIcon name="location" size={14} color={color.gray900} />
                <Text style={styles.infoText}>
                  {jobData?.location?.city}, {jobData?.location?.state}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <CustomIcon name="briefcase" size={14} color={color.gray900} />
                <Text style={styles.infoText}>{jobData?.job_type}</Text>
              </View>
              <View style={styles.infoItem}>
                <CustomIcon name="briefcase" size={14} color={color.gray900} />
                <Text style={styles.infoText}>{jobData?.work_mode}</Text>
              </View>
              <View style={styles.infoItem}>
                <CustomIcon name="wallet" size={14} color={color.gray900} />
                <Text style={styles.infoText}>{jobData?.ctc}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>
                Posted on: {getTimeAgo(jobData?.updated_at)}
              </Text>
              <Text style={styles.footerText}>
                Vacancies: {jobData?.vacancies}
              </Text>
              <Text style={styles.footerText}>Dept: {jobData?.department}</Text>
            </View>
          </View>

          {myApplicant && (
            <>
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Application Progress</Text>

                <View style={styles.divider} />

                <View style={styles.progressContainer}>
                  <View style={styles.progressLineBackground} />

                  {filteredSteps.map((step, index) => {
                    const currentStepIndex = filteredSteps.findIndex(
                      step => step.label === jobData?.application_status,
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
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Activity Timeline</Text>
                <View style={styles.divider} />

                <View style={styles.timelineContainer}>
                  <View style={styles.verticalLine} />

                  {jobData?.application_details?.status_history.map(
                    (item, index) => {
                      const badgeText =
                        item?.new_status || item?.previous_status;

                      const statusColor = GetStatusColor(badgeText);

                      const cardStyle = styles.timelineCardGrey(
                        GetStatusColor(badgeText),
                      );

                      const title =
                        item?.message || 'Application submitted successfully';
                      const changedBy = item?.changed_by || 'System';

                      return (
                        <View key={index} style={styles.timelineItem}>
                          <View style={styles.timelineDotContainer}>
                            <View
                              style={[
                                styles.timelineDot,
                                {backgroundColor: statusColor},
                              ]}
                            />
                          </View>

                          <View style={[styles.timelineCard, cardStyle]}>
                            <Text
                              style={[
                                styles.timelineTitle,
                                {color: statusColor},
                              ]}>
                              {title}
                            </Text>

                            <View style={styles.timelineMetaRow}>
                              <View style={styles.metaItem}>
                                <CustomIcon
                                  name="timer3"
                                  size={14}
                                  color={color.gray900}
                                />
                                <Text style={styles.metaText}>
                                  {getTimeAgo(item.changed_at)}
                                </Text>
                              </View>

                              <View style={styles.metaItem}>
                                <CustomIcon
                                  name="userProfile"
                                  size={14}
                                  color={color.gray900}
                                />
                                <Text style={styles.metaText}>{changedBy}</Text>
                              </View>

                              {badgeText && (
                                <View
                                  style={[
                                    styles.badge,
                                    {borderColor: statusColor},
                                  ]}>
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
                    },
                  )}
                </View>
              </View>
            </>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Eligibility Criteria</Text>

            <View style={styles.divider} />

            <View style={styles.grid}>
              <GridItem
                label="MINIMUM QUALIFICATION"
                value={jobData?.education}
              />
              <GridItem
                label="EXPERIENCE REQUIRED"
                value={jobData?.experience && `${jobData.experience} Years`}
              />
              <GridItem
                label="AGE"
                value={
                  jobData?.min_age &&
                  jobData?.max_age &&
                  `${jobData.min_age} - ${jobData.max_age} Years`
                }
              />
              <GridItem
                label="GENDER"
                value={
                  jobData?.gender_preference &&
                  jobData.gender_preference.toUpperCase()
                }
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.label}>SKILLS</Text>

            <View style={styles.tagsContainer}>
              {skillsArray.map((skill, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{skill.trim()}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Job Details</Text>

            <View style={styles.divider} />

            <View style={styles.grid}>
              <GridItem label="VACANCIES" value={jobData?.vacancies} />
              <GridItem label="DEPARTMENT" value={jobData?.department} />

              <GridItem label="JOB TYPE" value={jobData?.job_type} />
              <GridItem
                label="LOCATION"
                value={`${jobData?.location?.city}, ${jobData?.location?.state}, India`}
              />

              <GridItem label="CTC" value={jobData?.ctc} />
              <GridItem label="WORK MODE" value={jobData?.work_mode} />

              <GridItem label="WORKING DAYS" value={jobData?.working_days} />
              <GridItem label="WORKING TIME" value={jobData?.working_time} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <View style={styles.divider} />
            <Text style={styles.descriptionText}>{jobData?.description}</Text>
          </View>

          {responsibilityArray.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Responsibilities</Text>
              <View style={styles.divider} />

              {responsibilityArray.map((item, index) => (
                <View key={index} style={styles.benefitItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.benefitText}>{item.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {benefitsArray.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Other Benefits</Text>
              <View style={styles.divider} />

              {benefitsArray.map((item, index) => (
                <View key={index} style={styles.benefitItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.benefitText}>{item.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {jobData?.business_details && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>About the Company</Text>
              <View style={styles.divider} />

              <View style={styles.companyRow}>
                <CImage
                  src={jobData?.business_details?.branch_logo}
                  style={styles.companyLogo}
                />
                <View>
                  <Text style={styles.companyName}>
                    {jobData?.business_details?.display_name}
                  </Text>

                  <View style={styles.row}>
                    <CustomIcon name="location" size={14} color={color.black} />
                    <Text style={styles.label}>
                      {jobData?.business_details?.city_name}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.value}>
                {jobData?.business_details?.about_branch}
              </Text>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <View style={styles.iconBox}>
                  <CustomIcon name="location" size={16} color={color.black} />
                </View>
                <View>
                  <Text style={styles.label}>ADDRESS</Text>
                  <Text style={styles.value}>
                    {jobData?.business_details?.address}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.iconBox}>
                  <CustomIcon name="call" size={16} />
                </View>
                <View>
                  <Text style={styles.label}>CONTACT</Text>
                  <Text style={styles.value}>
                    {jobData?.business_details?.primary_number}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Apply for this position</Text>

            <CButton
              label={jobData?.application_status || 'Apply Now'}
              onPress={handleApply}
              disabled={jobData?.already_applied || applyLoading}
              loading={applyLoading}
              buttonStyle={styles.applyBtn}
            />
            <CButton
              label={jobData?.is_saved ? 'Unsave Job' : 'Save Job'}
              outLineBtn
              onPress={() => {
                handleToggleSaveJob(jobData?.job_id);
              }}
              buttonStyle={styles.saveBtn}
            />
            {jobData?.already_applied && (
              <CButton
                label="Withdraw Application"
                onPress={() => setWithdrawModalVisible(true)}
                loading={withdrawLoading}
                buttonStyle={[styles.saveBtn, {borderColor: color.red}]}
                buttonLabelStyle={{color: color.red}}
                outLineBtn
              />
            )}
            <View style={styles.divider} />
            <DetailRow label="Salary" value={jobData?.ctc} />
            <DetailRow label="Type" value={jobData?.job_type} />
            <DetailRow label="Work Mode" value={jobData?.work_mode} />
            <DetailRow
              label="Experience"
              value={`${jobData?.experience} Years`}
            />
            <DetailRow
              label="Location"
              value={`${jobData?.location?.city}, ${jobData?.location?.state}`}
            />
            <DetailRow label="Working Days" value={jobData?.working_days} />
            <DetailRow label="Timing" value={jobData?.working_time} />
          </View>
        </ScrollView>
      )}
      {jobData?.job_id &&
        (jobData?.already_applied ? (
          <CButton
            label="Withdraw Appliacation"
            onPress={() => setWithdrawModalVisible(true)}
            loading={withdrawLoading}
            buttonStyle={[styles.floatingBtn, {backgroundColor: color.red}]}
          />
        ) : (
          <CButton
            label={jobData?.application_status || 'Apply Now'}
            onPress={handleApply}
            disabled={applyLoading}
            loading={applyLoading}
            buttonStyle={styles.floatingBtn}
          />
        ))}
      <Modal
        visible={withdrawModalVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setWithdrawModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <View style={styles.warningIconCont}>
                <Icon
                  type={Icons.AntDesign}
                  name="warning"
                  size={24}
                  color={color.isRejected}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.modalTitle}>Withdraw Application?</Text>
                <Text style={styles.modalSubtitle}>
                  This action cannot be undone.
                </Text>
              </View>
            </View>

            <Text style={styles.modalDesc}>
              You are about to withdraw your application for "{jobData?.title}".
              The employer will no longer see your application, and you will
              need to re-apply if you change your mind.
            </Text>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.keepBtn}
                onPress={() => setWithdrawModalVisible(false)}
                activeOpacity={0.7}>
                <Text style={styles.keepBtnText}>Keep Application</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesWithdrawBtn}
                onPress={() => {
                  setWithdrawModalVisible(false);
                  handleWithdraw();
                }}
                activeOpacity={0.7}>
                <Icon
                  type={Icons.Entypo}
                  name="block"
                  size={16}
                  color={color.white}
                />
                <Text style={styles.yesWithdrawBtnText}>Yes, Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default JobDetails;
