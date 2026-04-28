import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {CHeader} from '@components/CHeader';
import JobCard from '@components/JobCard';
import {getSavedJobList} from '@apis/ApiRoutes/JobsApi';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';

export default function Favourites() {
  const toggleSaveJob = useToggleSaveJob();

  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['saveJobs'],
    queryFn: getSavedJobList,
  });

  const jobs = data?.data ?? [];

  return (
    <View style={{flex: 1}}>
      <CHeader title="Favourites" />

      <FlatList
        data={jobs}
        keyExtractor={(item, index) => item.job_id || index.toString()}
        renderItem={({item}) => (
          <JobCard item={item} toggleSaveJob={toggleSaveJob} />
        )}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={
          !isLoading && (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No saved jobs found
            </Text>
          )
        }
      />
    </View>
  );
}
