/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {CHeader} from '@components/CHeader';
import useGlobalStore from '@zustand/store';
import {useThemeContext} from '@contexts/themeContext';
import {businessDashboardApi, getBusinessList} from '@apis/ApiRoutes/Business';
import Icon, {Icons} from '@config/Icons';
import {getTimeAgo} from '@utils/commonFunction';
import GetStyles from './styles';

const StatCard = ({title, value, icon, color, bgColor}) => {
  const styles = GetStyles();

  return (
    <View style={styles.cardShadowWrapper}>
      <View style={styles.cardInnerContent}>
        <View style={styles.cardInner}>
          <View style={[styles.iconWrapper, {backgroundColor: bgColor}]}>
            <Icon type={Icons.Feather} name={icon} size={20} color={color} />
          </View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.cardValue}>
            {value}
          </Text>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default function BusinessDiscover({openDrawer}) {
  const styles = GetStyles();
  const {color} = useThemeContext();

  const userBusinessData = useGlobalStore(s => s.businessData);
  const activeBusinessId = useGlobalStore(s => s.activeBusinessId);

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (!activeBusinessId && userBusinessData?.length > 0) {
      const firstBusiness = userBusinessData[0];
      const firstBranch = firstBusiness?.branches?.[0];

      const store = useGlobalStore.getState();
      store.setActiveBusinessId(firstBusiness.business_id);
      store.setActiveBranchId(firstBranch?.branch_id);
    }
  }, [userBusinessData]);

  const fetchDashboard = async () => {
    if (!activeBusinessId) return;

    try {
      setLoading(true);
      const response = await businessDashboardApi();

      if (response?.success && response?.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  useEffect(() => {
    if (activeBusinessId) {
      fetchDashboard();
    }
  }, [activeBusinessId]);

  const weeklyApps = dashboardData?.applicationsThisWeek || [];
  const totalWeeklyApps = weeklyApps.reduce((sum, item) => sum + item.count, 0);
  const maxWeeklyApps = Math.max(0, ...weeklyApps.map(item => item.count));

  return (
    <View style={styles.root}>
      <CHeader showBusiness title="Dashboard" drawer openDrawer={openDrawer} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : !dashboardData ? (
        <View style={styles.loaderContainer}>
          <Text style={{color: color.black}}>No data available</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.grid}>
            <StatCard
              title="Total Jobs Posted"
              value={dashboardData.stats?.totalJobsPosted || 0}
              icon="briefcase"
              color={color.primary}
              bgColor={`${color.primary}10`}
            />
            <StatCard
              title="Active Listings"
              value={dashboardData.stats?.activeListings || 0}
              icon="check-circle"
              color={color.green}
              bgColor={`${color.green}10`}
            />
            <StatCard
              title="Total Applications"
              value={dashboardData.stats?.totalApplications || 0}
              icon="users"
              color={color.hexBlue}
              bgColor={`${color.hexBlue}10`}
            />
            <StatCard
              title="Shortlisted Candidates"
              value={dashboardData.stats?.shortlistedCandidates || 0}
              icon="star"
              color={color.orange}
              bgColor={`${color.orange}10`}
            />
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>Applications This Week</Text>
                <Text style={styles.chartSubtitle}>
                  Daily breakdown of received applications
                </Text>
              </View>
              <Text style={styles.chartTotal}>{totalWeeklyApps}</Text>
            </View>

            <View style={styles.barsContainer}>
              {weeklyApps.map((item, index) => {
                const heightPct =
                  maxWeeklyApps > 0 ? (item.count / maxWeeklyApps) * 100 : 0;
                return (
                  <View key={index} style={styles.barColumn}>
                    <View style={styles.barBackground}>
                      <View
                        style={[styles.barFill, {height: `${heightPct}%`}]}
                      />
                    </View>
                    <Text style={styles.barLabel}>{item.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>Hiring Funnel</Text>
                <Text style={styles.chartSubtitle}>
                  From application to hire
                </Text>
              </View>
            </View>
            {dashboardData?.hiringFunnel.map((item, index) => {
              const maxCount = Math.max(
                1,
                ...dashboardData?.hiringFunnel.map(i => i.count),
              );
              const widthPct = `${(item.count / maxCount) * 100}%`;
              const bgColor = [
                color.primary,
                color.hexBlue,
                color.orange,
                color.green,
              ];
              return (
                <View key={index} style={styles.chartHiringContainer}>
                  <View style={styles.chartHiring}>
                    <Text style={styles.hiringTitle}>{item.stage}</Text>
                    <Text style={styles.hiringTitle}>{item.count}</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: widthPct,
                          backgroundColor: bgColor[index % bgColor.length],
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>Top Performing Jobs</Text>
                <Text style={styles.chartSubtitle}>By applications</Text>
              </View>
            </View>
            <View style={styles.jobsListContainer}>
              {dashboardData?.topPerformingJobs.map((job, index) => (
                <View key={job.job_id || index} style={styles.jobRow}>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.jobTitleText} numberOfLines={1}>
                    {job.title.charAt(0).toUpperCase() + job.title.slice(1)}
                  </Text>
                  <Text style={styles.jobCountText}>{job.applications}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Recent Activity</Text>
            </View>
            <View style={styles.jobsListContainer}>
              {dashboardData?.recentActivity.map((item, index) => {
                const bgColor = [
                  color.primary,
                  color.hexBlue,
                  color.orange,
                  color.green,
                ];
                return (
                  <View key={item.job_id || index} style={styles.jobRow}>
                    <View
                      style={[
                        styles.avatar,
                        {backgroundColor: bgColor[index % bgColor.length]},
                      ]}>
                      <Text style={styles.avatarText}>
                        {item?.profile_initial}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.actionText}>
                        <Text style={styles.nameText}>
                          {item?.applicant_name}
                        </Text>{' '}
                        applied for {item?.job_title}
                      </Text>
                      <Text style={styles.timeText}>
                        {getTimeAgo(item?.applied_at)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
