import {useQueryClient} from '@tanstack/react-query';
import {saveJobApi} from '@apis/ApiRoutes/JobsApi';

export const useToggleSaveJob = () => {
  const queryClient = useQueryClient();

  const toggleSaveJob = async jobId => {
    try {
      await saveJobApi(jobId);

      // Update Dashboard (jobs)
      queryClient.setQueryData(['jobs'], oldData => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: page.data.map(job =>
              job.job_id === jobId
                ? {...job, is_saved: !job.is_saved}
                : job,
            ),
          })),
        };
      });

      // Update Favourites
      queryClient.setQueryData(['saveJobs'], oldData => {
        if (!oldData) return oldData;

        const exists = oldData.data.find(j => j.job_id === jobId);

        // remove if unsaved
        if (exists) {
          return {
            ...oldData,
            data: oldData.data.filter(j => j.job_id !== jobId),
          };
        }

        // add if saved
        const jobFromDashboard =
          queryClient
            .getQueryData(['jobs'])
            ?.pages?.flatMap(p => p.data)
            ?.find(j => j.job_id === jobId);

        return {
          ...oldData,
          data: jobFromDashboard
            ? [jobFromDashboard, ...oldData.data]
            : oldData.data,
        };
      });
    } catch (e) {}
  };

  return toggleSaveJob;
};