import {useQueryClient} from '@tanstack/react-query';
import {applyJobApi} from '@apis/ApiRoutes/JobsApi';

export const useApplyJob = () => {
  const queryClient = useQueryClient();

  const applyJob = async jobId => {
    await applyJobApi(jobId);

    //  Update Dashboard (infinite query)
    queryClient.setQueryData(['jobs'], oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map(page => ({
          ...page,
          data: page.data.map(job =>
            job.job_id === jobId
              ? {...job, already_applied: true}
              : job,
          ),
        })),
      };
    });

    // Update Favourites list
    queryClient.setQueryData(['saveJobs'], oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        data: oldData.data.map(job =>
          job.job_id === jobId
            ? {...job, already_applied: true}
            : job,
        ),
      };
    });
  };

  return applyJob;
};