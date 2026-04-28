import {jobEndPoint} from '@apis/Endpoints';
import {getApiData} from '@utils/apiHelper';
import Toast from '@components/CToast';

export const getJobList = async () => {
  const endpoint = jobEndPoint.jobList;

  const response = await getApiData(
    endpoint.uri,
    endpoint.method,
    {},
    false,
    true,
  );

  if (!response?.success) {
    throw new Error(response?.message || 'Failed to fetch jobs');
  }

  return response;
};

export const saveJobApi = async jobId => {

  const endpoint = jobEndPoint.saveJob;
  const url = `${endpoint.uri}/${jobId}`;

  try {
    const response = await getApiData(url, endpoint.method, {}, false, true);

    if (!response?.success) {
      throw new Error(response?.message || 'Failed to save job');
    }

    return response;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message || 'Something went wrong',
    });
    throw error;
  }
};

export const getSavedJobList = async () => {
  const endpoint = jobEndPoint.saveJobList;

  const response = await getApiData(
    endpoint.uri,
    endpoint.method,
    {},
    false,
    true,
  );

  if (!response?.success) {
    throw new Error(response?.message || 'Failed to fetch jobs');
  }

  return response;
};
