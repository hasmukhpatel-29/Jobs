import {useQueryClient} from '@tanstack/react-query';
import {applyJobApi} from '@apis/ApiRoutes/JobsApi';

const updatePagesData = (oldData, jobId) => {
  if (!oldData?.pages) return oldData;
  return {
    ...oldData,
    pages: oldData.pages.map(page => ({
      ...page,
      data: page.data.map(job =>
        job.job_id === jobId
          ? {...job, already_applied: true, application_status: 'Applied'}
          : job,
      ),
    })),
  };
};

const updateListData = (oldData, jobId) => {
  if (!oldData?.data) return oldData;
  return {
    ...oldData,
    data: oldData.data.map(job =>
      job.job_id === jobId
        ? {...job, already_applied: true, application_status: 'Applied'}
        : job,
    ),
  };
};

export const useApplyJob = () => {
  const queryClient = useQueryClient();

  const applyJob = async jobId => {
    try {
      await applyJobApi(jobId);

      // Update ALL infinite job queries on Dashboard
      queryClient.setQueriesData({queryKey: ['jobs'], exact: false}, oldData =>
        updatePagesData(oldData, jobId),
      );

      // Update ALL infinite search job queries
      queryClient.setQueriesData(
        {queryKey: ['jobsSearch'], exact: false},
        oldData => updatePagesData(oldData, jobId),
      );

      // Update Favourites list
      queryClient.setQueriesData(
        {queryKey: ['saveJobs'], exact: false},
        oldData => updateListData(oldData, jobId),
      );

      // Invalidate myApplicants list so it gets fresh data when user views it
      queryClient.invalidateQueries({queryKey: ['myApplicants']});
    } catch (error) {
      console.error('Error applying for job:', error);
      throw error;
    }
  };

  return applyJob;
};
