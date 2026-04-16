import axios from 'axios';
import {Config} from '@config/Config';
import useGlobalStore from '@zustand/store';
import {logOut} from './commonFunction';

export const getApiData = async (
  endpoint,
  method,
  data,
  headers,
  customUrl = false,
) => {
  const authState = useGlobalStore.getState()?.userLoginData || {};
  const token = authState?.access_token || '';

  let authHeaders = {
    'Content-Type':
      method?.toLowerCase() === 'get'
        ? 'multipart/form-data'
        : 'application/json',
    'x-product-key': Config.PRODUCT_KEY,
    authorization: token ? `Bearer ${token}` : '',
  };

  if (headers) {
    authHeaders = headers;
  }
  let query = '';
  let qs = '';

  const apiData = data;
  const dataLength = apiData ? Object.keys(apiData).length : 0;

  if (method?.toUpperCase() === 'GET' && dataLength > 0) {
    Object.keys(apiData).forEach((key, i) => {
      const sep = i === dataLength - 1 ? '' : '&';
      query += `${encodeURIComponent(key)}=${encodeURIComponent(
        apiData[key],
      )}${sep}`;
    });
    qs = `?${query}`;
  }

  try {
    const config = {
      method: method,
      timeout: 10000,
      url: customUrl ? endpoint : `${Config.API_URL}${endpoint}${qs}`,
      headers: authHeaders,
      ...(method !== 'GET' && {data}),
      validateStatus: status => status >= 200 && status < 501,
    };
    let response = await axios(config);

    let responseStatus = response?.status;

    if (
      response?.data?.code == 'authentication_failed' ||
      response?.code === 401 ||
      response?.status === 401
    ) {
      logOut();
      return;
    }
    const res = response?.data || {
      status: responseStatus === 200 ? true : responseStatus,
      response: response.data,
    };

    return res;
  } catch (error) {
    console.log('error----', error);
    if (error?.response) {
      let returnObj = error?.response?.data;
      if (error.response?.status === 401 || error.response?.code === 401) {
        logOut();
        return;
      }

      if (
        error?.response?.data?.message ===
        'Your request was made with invalid credentials.'
      ) {
        logOut();
        return;
      }
      return returnObj;
    } else {
      return {
        message: error?.message,
        status: false,
      };
    }
  }
};

function isValidJSON(myString) {
  try {
    JSON.parse(myString);
    return true;
  } catch (e) {
    return false;
  }
}

export const getApiDataProgress = async (
  endpoint,
  method = 'POST',
  data = {},
  header,
  customUrl = '',
) => {
  const authState = useGlobalStore.getState()?.userLoginData || {};
  const token = authState?.access_token || '';

  const url = customUrl || `${Config.API_URL}${endpoint}`;

  const headers = header || {
    'Content-Type': 'multipart/form-data',
    'x-product-key': Config.PRODUCT_KEY,
    authorization: token ? `Bearer ${token}` : '',
  };

  const formData = new FormData();

  Object.keys(data || {}).forEach(key => {
    if (Array.isArray(data[key])) {
      data[key].forEach(item => formData.append(key, item));
    } else {
      formData.append(key, data[key]);
    }
  });

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: formData,
    });

    const res = await response.json();

    if (res?.code === 'authentication_failed' || response.status === 401) {
      logOut();
      return;
    }

    return res;
  } catch (error) {
    return {
      success: false,
      message: error?.message,
    };
  }
};
