import {useQueryClient} from '@tanstack/react-query';
import {saveJobApi} from '@apis/ApiRoutes/JobsApi';

const updatePagesData = (oldData, jobId) => {
  if (!oldData?.pages) return oldData;
  return {
    ...oldData,
    pages: oldData.pages.map(page => ({
      ...page,
      data: page.data.map(job =>
        job.job_id === jobId ? {...job, is_saved: !job.is_saved} : job,
      ),
    })),
  };
};

export const useToggleSaveJob = () => {
  const queryClient = useQueryClient();

  const toggleSaveJob = async jobId => {
    try {
      await saveJobApi(jobId);

      queryClient.setQueriesData({queryKey: ['jobs'], exact: false}, oldData =>
        updatePagesData(oldData, jobId),
      );
      queryClient.setQueriesData(
        {queryKey: ['jobsSearch'], exact: false},
        oldData => updatePagesData(oldData, jobId),
      );

      // Update Favourites list
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

        // add if saved — try to grab the job object from any cached jobs query
        const allCachedQueries = queryClient.getQueriesData({
          queryKey: ['jobs'],
          exact: false,
        });
        let jobFromDashboard;
        for (const [, data] of allCachedQueries) {
          jobFromDashboard = data?.pages
            ?.flatMap(p => p.data)
            ?.find(j => j.job_id === jobId);
          if (jobFromDashboard) break;
        }

        return {
          ...oldData,
          data: jobFromDashboard
            ? [{...jobFromDashboard, is_saved: true}, ...oldData.data]
            : oldData.data,
        };
      });
    } catch (e) {}
  };

  return toggleSaveJob;
};
