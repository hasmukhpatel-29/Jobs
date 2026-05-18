import React from 'react';
import {View, FlatList, Text} from 'react-native';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {CHeader} from '@components/CHeader';
import JobCard from '@components/JobCard';
import {useQuery} from '@tanstack/react-query';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';
import {getMyApplicantList} from '@apis/ApiRoutes/JobsApi';
import useGlobalStore from '@zustand/store';
import GetStyles from './styles';

const MyApplication = ({}) => {
  const styles = GetStyles();
  const isAuthenticated = useGlobalStore(state => state.isAuthenticated);
  const toggleSaveJob = useToggleSaveJob();

  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['myApplicants'],
    queryFn: getMyApplicantList,
    enabled: !!isAuthenticated,
  });

  const myApplicant = data?.data ?? [];

  return (
    <View style={styles.root}>
      <CHeader title="My Applicant" />
      {isLoading ? (
        <CardSkeleton count={4} />
      ) : (
        <FlatList
          data={myApplicant}
          keyExtractor={(item, index) => item.job_id || index.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}) => (
            <JobCard item={item} toggleSaveJob={toggleSaveJob} myApplicant />
          )}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={
            !isLoading && (
              <Text style={styles.emptyText}>No Applicant found</Text>
            )
          }
        />
      )}
    </View>
  );
};

export default MyApplication;
