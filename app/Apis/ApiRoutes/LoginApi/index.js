import DeviceInfo from 'react-native-device-info';
import {
  authEndpoint,
  businessRegEndPoint,
  userProfileEndPoint,
} from '@apis/Endpoints';
import {Config} from '@config/Config';
import {getApiData, getApiDataProgress} from '@utils/apiHelper';
import {logOut} from '@utils/commonFunction';
import useGlobalStore from '@zustand/store';
import Toast from '@components/CToast';

const isLoginResponse = response => {
  return response && typeof response?.success === 'boolean';
};

export const generateOtp = async body => {
  try {
    const endpoint = authEndpoint.sendOtp;
    const response = await getApiData(endpoint.uri, endpoint.method, body);
    if (isLoginResponse(response)) {
      Toast.show({
        type: 'success',
        text1: response?.message,
      });
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};

export const verifyOtp = async body => {
  try {
    const endpoint = authEndpoint.verifyOtp;
    const response = await getApiData(endpoint.uri, endpoint.method, body);
    if (isLoginResponse(response)) {
      if (response?.success && response?.is_existing_user) {
        useGlobalStore.getState().setIsAuthenticated(true);
        useGlobalStore.getState().setUserLoginData(response?.data);
      }
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};

export const generateEmailOtp = async body => {
  try {
    const endpoint = authEndpoint.sendEmailOtp;
    const response = await getApiData(endpoint.uri, endpoint.method, body);
    if (isLoginResponse(response)) {
      Toast.show({
        type: 'success',
        text1: response?.message,
      });
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};

export const verifyEmailOtp = async body => {
  try {
    const endpoint = authEndpoint.verifyEmailOtp;
    const response = await getApiData(endpoint.uri, endpoint.method, body);
    if (isLoginResponse(response)) {
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};

export const seanebIdCheck = async body => {
  try {
    const endpoint = authEndpoint.seanebId;
    const response = await getApiData(endpoint.uri, endpoint.method, body);
    if (isLoginResponse(response)) {
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};

export const autoCompleteCity = async (body, type = 'city') => {
  try {
    let endpoint;
    if (type === 'city') {
      endpoint = authEndpoint.autoCompleteCity;
    } else if (type === 'degree') {
      endpoint = userProfileEndPoint.degreeList;
    } else {
      endpoint = businessRegEndPoint.autoCompleteBusiness;
    }
    const response = await getApiData(
      endpoint.uri,
      endpoint.method,
      body,
      false,
      type === 'degree',
    );
    if (isLoginResponse(response)) {
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};

export const userSignup = async body => {
  try {
    const endpoint = authEndpoint.userSignup;
    const response = await getApiDataProgress(
      endpoint.uri,
      endpoint.method,
      body,
    );
    if (isLoginResponse(response)) {
      if (response?.success) {
        useGlobalStore.getState().setIsAuthenticated(true);
        useGlobalStore.getState().setUserLoginData(response?.data);
      }
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

export const logoutApi = async () => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();

    const payload = {
      product_key: Config.PRODUCT_KEY,
      device_id: deviceId,
      refresh_token: useGlobalStore.getState()?.userLoginData?.refresh_token,
    };

    const endpoint = authEndpoint.userLogout;
    const response = await getApiData(endpoint.uri, endpoint.method, payload);
    if (isLoginResponse(response)) {
      logOut();
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};
export const deleteUserApi = async () => {
  try {
    const endpoint = authEndpoint.deleteUser;
    const response = await getApiData(endpoint.uri, endpoint.method, {});
    if (isLoginResponse(response)) {
      if (response?.success) {
        logOut();
      }
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.error?.message,
      });
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};
