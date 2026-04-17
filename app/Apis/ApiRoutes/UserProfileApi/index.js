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
