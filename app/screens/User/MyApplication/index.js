import React from 'react';
import {View, FlatList, Text} from 'react-native';
import CardSkeleton from '@components/Skeleton/CardSkeleton';
import {CHeader} from '@components/CHeader';
import JobCard from '@components/JobCard';
import {useQuery} from '@tanstack/react-query';
import {useToggleSaveJob} from '@hooks/useToggleSaveJob';
import { getMyApplicantList } from '@apis/ApiRoutes/JobsApi';

const MyApplication = ({}) => {
  const toggleSaveJob = useToggleSaveJob();

  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['myApplicants'],
    queryFn: getMyApplicantList,
  });

  const myApplicant = data?.data ?? [];

  return (
    <View style={{flex: 1}}>
      <CHeader title="My Applicant" back />
      {isLoading ? (
        <CardSkeleton count={4} />
      ) : (
        <FlatList
          data={myApplicant}
          keyExtractor={(item, index) => item.job_id || index.toString()}
          renderItem={({item}) => (
            <JobCard item={item} toggleSaveJob={toggleSaveJob} myApplicant />
          )}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={
            !isLoading && (
              <Text style={{textAlign: 'center', marginTop: 20}}>
                No Applicant found
              </Text>
            )
          }
        />
      )}
    </View>
  );
};

export default MyApplication;
