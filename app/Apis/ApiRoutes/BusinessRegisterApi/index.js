import {businessRegEndPoint} from '@apis/Endpoints';
import Toast from '@components/CToast';
import {Config} from '@config/Config';
import {getApiData, getApiDataProgress} from '@utils/apiHelper';
import {redirectToLogin} from '@utils/commonFunction';
import useGlobalStore from '@zustand/store';

const isLoginResponse = response => {
  return response && typeof response.success === 'boolean';
};

export const verifyPanApi = async body => {
  try {
    const endpoint = businessRegEndPoint.verifyPan;
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
export const verifyGstApi = async body => {
  try {
    const endpoint = businessRegEndPoint.verifyGst;
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
export const categoryListApi = async () => {
  try {
    const body = {
      product_key: Config.PRODUCT_KEY,
    };
    const endpoint = businessRegEndPoint.businessCategory;
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
export const onboardingChargeApi = async () => {
  try {
    const endpoint = businessRegEndPoint.onboardingCharge;
    const response = await getApiData(endpoint.uri, endpoint.method, {});
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
export const createBusinessApi = async body => {
  try {
    const endpoint = businessRegEndPoint.createBusiness;
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
      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};
export const onboardingPaymentApi = async body => {
  try {
    const endpoint = businessRegEndPoint.onboardingPayment;
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
export const cancelOnboardingApi = async body => {
  try {
    const endpoint = businessRegEndPoint.cancelOnboarding;
    const response = await getApiData(endpoint.uri, endpoint.method, body);
    if (isLoginResponse(response)) {
      useGlobalStore.getState().setBusinessLegalFormData({});
      redirectToLogin();
      return response;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error?.message,
    });
  }
};
