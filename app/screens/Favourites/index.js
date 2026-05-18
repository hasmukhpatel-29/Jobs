import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {CHeader} from '@components/CHeader';
import JobCard from '@components/JobCard';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {getSavedJobList} from '@apis/ApiRoutes/JobsApi';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';
import GetStyles from './styles';
import useGlobalStore from '@zustand/store';

export default function Favourites() {
  const styles = GetStyles();
  const toggleSaveJob = useToggleSaveJob();
  const isAuthenticated = useGlobalStore(state => state.isAuthenticated);

  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['saveJobs'],
    queryFn: getSavedJobList,
    enabled: !!isAuthenticated,
  });

  const jobs = data?.data ?? [];

  return (
    <View style={styles.root}>
      <CHeader title="Favourites" />
      {isLoading ? (
        <CardSkeleton count={4} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => item.job_id || index.toString()}
          renderItem={({item}) => (
            <JobCard item={item} toggleSaveJob={toggleSaveJob} />
          )}
          contentContainerStyle={styles.contentContainerStyle}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={
            !isLoading && (
              <Text style={styles.emptyText}>No saved jobs found</Text>
            )
          }
        />
      )}
    </View>
  );
}
