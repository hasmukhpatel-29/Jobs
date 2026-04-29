import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {loginModalRef} from '@navigation/mainStackNavigation';
import {CHeader} from '@components/CHeader';
import Toast from '@components/CToast';
import CImage from '@components/CImage';
import {CButton} from '@components/CButton';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {applyJobApi, jobDetailsApi} from '@apis/ApiRoutes/JobsApi';
import {CustomIcon} from '@config/LoadIcons';
import {getTimeAgo} from '@utils/commonFunction';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';
import useGlobalStore from '@zustand/store';
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
  const [jobData, setJobData] = useState({});
  const [applyLoading, setApplyLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  const handleApply = async () => {
    try {
      setApplyLoading(true);

      const res = await applyJobApi(jobData?.job_id);

      if (res?.success) {
        setJobData(prev => ({...prev, already_applied: true}));
        Toast.show({
          type: 'success',
          text1: 'Applied successfully!',
        });
      }
    } catch (e) {
    } finally {
      setApplyLoading(false);
    }
  };

  const jobDetails = async () => {
    try {
      setLoading(true);

      const response = await jobDetailsApi(route.params.slug);

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
  const handleToggleSaveJob = jobId => {
    if (!isAuthenticated) {
      loginModalRef.current?.open();
      return;
    }

    setJobData(prev => ({
      ...prev,
      is_saved: !prev.is_saved,
    }));
    toggleSaveJob(jobId);
  };
  return (
    <View style={styles.root}>
      <CHeader title="Job Details" back />
      {loading ? (
        <CardSkeleton count={4} />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.imgContainer}>
                <CImage
                  src={jobData?.business_details?.branch_logo}
                  style={styles.companyLogo}
                />
              </View>
              <Text style={styles.companyName}>
                {jobData?.business_details?.display_name}
              </Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.jobStatus}>{jobData?.status}</Text>
            </View>

            <Text style={styles.jobTitle}>{jobData?.title}</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <CustomIcon name="location" size={14} />
                <Text style={styles.infoText}>
                  {jobData?.location?.city}, {jobData?.location?.state}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <CustomIcon name="briefcase" size={14} />
                <Text style={styles.infoText}>{jobData?.job_type}</Text>
              </View>
              <View style={styles.infoItem}>
                <CustomIcon name="briefcase" size={14} />
                <Text style={styles.infoText}>{jobData?.work_mode}</Text>
              </View>
              <View style={styles.infoItem}>
                <CustomIcon name="wallet" size={14} />
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
              <Text style={styles.footerText}>
                Dept: {jobData?.department} developmefhh
              </Text>
            </View>
          </View>

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
                  <CustomIcon name="location" size={14} />
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
                <CustomIcon name="location" size={16} />
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

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Apply for this position</Text>

            <CButton
              label={jobData?.already_applied ? 'Applied' : 'Apply Now'}
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
    </View>
  );
};

export default JobDetails;
