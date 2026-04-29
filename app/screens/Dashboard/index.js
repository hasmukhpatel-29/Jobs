import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {loginModalRef} from '@navigation/mainStackNavigation';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {CHeader} from '@components/CHeader';
import JobCard from '@components/JobCard';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getJobList} from '@apis/ApiRoutes/JobsApi';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';
import useGlobalStore from '@zustand/store';
import {getUserProfile, profileMeApi} from '@apis/ApiRoutes/UserProfileApi';

const Dashboard = ({openDrawer}) => {
  const isAuthenticated = useGlobalStore(s => {
    return s.isAuthenticated;
  });

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfile();
      profileMeApi();
    }
  }, []);

  const toggleSaveJob = useToggleSaveJob();
  const handleToggleSaveJob = jobId => {
    if (!isAuthenticated) {
      loginModalRef.current?.open();
      return;
    }

    toggleSaveJob(jobId);
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['jobs'],
    queryFn: getJobList,
    getNextPageParam: lastPage => {
      const current = lastPage.pagination.currentPage;
      const total = lastPage.pagination.totalPages;

      return current < total ? current + 1 : undefined;
    },
  });

  const jobs = data?.pages?.flatMap(page => page.data) ?? [];

  return (
    <View style={{flex: 1}}>
      <CHeader title="Dashboard" drawer openDrawer={openDrawer} showBusiness />

      {isLoading ? (
        <CardSkeleton count={4} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => item.job_id || index.toString()}
          renderItem={({item}) => (
            <JobCard item={item} toggleSaveJob={handleToggleSaveJob} />
          )}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator /> : null
          }
        />
      )}
    </View>
  );
};

export default Dashboard;
