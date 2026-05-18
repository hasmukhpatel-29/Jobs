import {jobEndPoint} from '@apis/Endpoints';
import {getApiData} from '@utils/apiHelper';
import Toast from '@components/CToast';

export const getJobList = async ({pageParam = 1, queryKey}) => {
  const endpoint = jobEndPoint.jobList;
  const [_key, keyword, filters] = queryKey || [];

  let queryStr = `?page=${pageParam}&limit=10`;

  if (keyword) {
    queryStr += `&keyword=${encodeURIComponent(keyword)}`;
  }

  if (filters) {
    const mapValues = (arr, mapper) => {
      if (!arr || !Array.isArray(arr) || !arr.length) return '';
      return arr.map(mapper).filter(Boolean).join(',');
    };

    const jobTypeMapping = {
      full_time: 'Full-time',
      part_time: 'Part-time',
      internship: 'Internship',
      contract: 'Contract',
    };
    const jobTypeStr = mapValues(
      filters.job_type,
      id => jobTypeMapping[id] || id,
    );
    if (jobTypeStr) queryStr += `&job_type=${encodeURIComponent(jobTypeStr)}`;

    const workModeMapping = {
      office: 'On-site',
      remote: 'Remote',
      hybrid: 'Hybrid',
    };
    const workModeStr = mapValues(
      filters.work_mode,
      id => workModeMapping[id] || id,
    );
    if (workModeStr)
      queryStr += `&work_mode=${encodeURIComponent(workModeStr)}`;

    const expMapping = {
      fresher: 'Fresher',
      '1-3': '1-3',
      '3-5': '3-5',
      '5plus': '5+',
    };
    const expStr = mapValues(filters.experience, id => expMapping[id] || id);
    if (expStr) queryStr += `&experience=${encodeURIComponent(expStr)}`;

    const categoryStr = mapValues(filters.job_category, id => id);
    if (categoryStr) queryStr += `&category=${encodeURIComponent(categoryStr)}`;

    if (filters.city) queryStr += `&city=${encodeURIComponent(filters.city)}`;
    if (filters.skills)
      queryStr += `&skills=${encodeURIComponent(filters.skills)}`;
  }

  const uri = `${endpoint.uri}${queryStr}`;

  const response = await getApiData(uri, endpoint.method, {}, false, true);

  if (!response?.success) {
    throw new Error(response?.message || 'Failed to fetch jobs');
  }

  return response;
};

export const getPopularJobCategories = async () => {
  const endpoint = jobEndPoint.popularJobCategory;
  const response = await getApiData(
    endpoint.uri,
    endpoint.method,
    {},
    false,
    true,
  );
  if (!response?.success) {
    throw new Error(
      response?.message || 'Failed to fetch popular job categories',
    );
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

export const jobDetailsApi = async (slug, isSlug = true) => {
  const endpoint = isSlug ? jobEndPoint.jobDetails : jobEndPoint.jobDetailsById;

  const url = `${endpoint.uri}/${slug}`;

  try {
    const response = await getApiData(url, endpoint.method, {}, false, true);

    if (!response?.success) {
      throw new Error(response?.message || 'Failed to fetch job details');
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

export const applyJobApi = async jobId => {
  const endpoint = jobEndPoint.applyJob;
  const url = `${endpoint.uri}/${jobId}`;

  try {
    const response = await getApiData(url, endpoint.method, {}, false, true);

    if (!response?.success) {
      throw new Error(response?.error?.message || 'Failed to apply for job');
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
export const withdrawApplyJobApi = async jobId => {
  const endpoint = jobEndPoint.withdrawApplyJob;
  const url = `${endpoint.uri}/${jobId}`;

  try {
    const response = await getApiData(url, endpoint.method, {}, false, true);

    if (!response?.success) {
      throw new Error(response?.error?.message || 'Failed to withdraw job');
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

export const getMyApplicantList = async () => {
  const endpoint = jobEndPoint.myApplications;

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
export const createJobPostApi = async payload => {
  const endpoint = jobEndPoint.createJob;

  const response = await getApiData(endpoint.uri, endpoint.method, payload);

  if (!response?.success) {
    throw new Error(response?.message || 'Failed to create jobs');
  }

  return response;
};
