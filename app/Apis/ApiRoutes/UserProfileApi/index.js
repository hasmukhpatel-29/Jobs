import Toast from '@components/CToast';
import {userProfileEndPoint} from '@apis/Endpoints';
import {getApiData, getApiDataProgress} from '@utils/apiHelper';
import useGlobalStore from '@zustand/store';

const isLoginResponse = response => {
  return response && typeof response.success === 'boolean';
};

export const getUserProfile = async () => {
  try {
    const endpoint = userProfileEndPoint.userProfile;

    const response = await getApiData(endpoint.uri, endpoint.method, {});

    if (isLoginResponse(response)) {
      useGlobalStore.getState().setUserData(response?.data);
      return response?.data;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message || 'Something went wrong',
      });

      return;
    }
  } catch (error) {
    return;
  }
};

export const updateProfileFetch = async body => {
  try {
    const endpoint = userProfileEndPoint.updateProfile;
    const response = await getApiDataProgress(
      endpoint.uri,
      endpoint.method,
      body,
    );
    if (isLoginResponse(response)) {
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return response;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};
export const profileMeApi = async () => {
  try {
    const endpoint = userProfileEndPoint.profileMe;
    const response = await getApiData(endpoint.uri, endpoint.method, {});
    if (response?.success) {
      useGlobalStore.getState().setUserMeData(response?.data);
    }
    return response;
  } catch (error) {}
};
const editProfileApi = async (endpoint, data = {}, params = '') => {
  const url = `${endpoint.uri}${params}`;

  try {
    const response = await getApiData(url, endpoint.method, data, false, true);

    if (!response?.success) {
      throw new Error(response?.error?.message || 'Request failed');
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

export const profileAllDetailsApi = () =>
  editProfileApi(userProfileEndPoint.profileAllDetails);

export const updateBasicInfoApi = data =>
  editProfileApi(userProfileEndPoint.updateBasicInfo, data);

// Skill APIs
export const getSkillListApi = () =>
  editProfileApi(userProfileEndPoint.skillList);

export const addSkillApi = data =>
  editProfileApi(userProfileEndPoint.addSkill, data);

export const deleteSkillApi = id =>
  editProfileApi(userProfileEndPoint.deleteSkill, {}, `/${id}`);

// Education APIs
export const getDegreeListApi = () =>
  editProfileApi(userProfileEndPoint.degreeList);

export const addEducationApi = data =>
  editProfileApi(userProfileEndPoint.addEducation, data);

export const deleteEducationApi = id =>
  editProfileApi(userProfileEndPoint.deleteEducation, {}, `/${id}`);

export const updateEducationApi = (data,id) =>
  editProfileApi(userProfileEndPoint.updateEducation, data, `/${id}`);

// Experience APIs
export const addExperienceApi = data =>
  editProfileApi(userProfileEndPoint.addExperience, data);

export const deleteExperienceApi = id =>
  editProfileApi(userProfileEndPoint.deleteExperience, {}, `/${id}`);

export const updateExperienceApi = (data,id) =>
  editProfileApi(userProfileEndPoint.updateExperience, data, `/${id}`);