import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {CHeader} from '@components/CHeader';
import CImage from '@components/CImage';
import {CustomIcon} from '@config/LoadIcons';
import {getTimeAgo} from '@utils/commonFunction';
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

const JobEmployerDetails = ({route}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const jobData = route.params?.jobData || {};

  const skillsArray = jobData?.skills?.split(',') || [];
  const responsibilityArray = jobData?.responsibilities
    ? jobData.responsibilities.split(',')
    : [];
  const benefitsArray = jobData?.other_benefits
    ? jobData.other_benefits.split(',')
    : [];

  return (
    <View style={styles.root}>
      <CHeader title="Job Post Details" back />
      {!jobData?.job_id ? (
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
              <Text style={styles.companyName}>
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
                <Text style={styles.infoText}>{jobData?.ctc || '-'}</Text>
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
            <Text style={styles.sectionTitle}>Location Detail</Text>

            <View style={styles.divider} />
            <GridItem label="Address" value={jobData?.location?.address_line} />
            <GridItem label="City" value={jobData?.location?.city} />
            <GridItem label="State" value={jobData?.location?.state} />
            <GridItem label="Country" value={jobData?.location?.country} />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Work Schedule</Text>

            <View style={styles.divider} />
            <GridItem label="WORK MODE" value={jobData?.work_mode} />
            <GridItem label="WORKING DAYS" value={jobData?.working_days} />
            <GridItem label="WORKING TIME" value={jobData?.working_time} />
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
        </ScrollView>
      )}
    </View>
  );
};

export default JobEmployerDetails;
