import {businessEndPoint} from '@apis/Endpoints';
import {getApiData, getApiDataProgress} from '@utils/apiHelper';
import {useQuery} from '@tanstack/react-query';
import Toast from '@components/CToast';
import useGlobalStore from '@zustand/store';

const isLoginResponse = response => {
  return response && typeof response.success === 'boolean';
};

export const getBusinessList = async () => {
  try {
    const endpoint = businessEndPoint.businessList;

    const response = await getApiData(endpoint.uri, endpoint.method, {});

    if (isLoginResponse(response)) {
      useGlobalStore.getState().setBusinessData(response?.data);
      return response?.data;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message || 'Something went wrong',
      });

      return;
    }
  } catch (error) {
    console.log('Gallery API Error:', error);
    return [];
  }
};
export const getBusinessGallery = async branchId => {
  try {
    if (!branchId) return [];

    const endpoint = businessEndPoint.galleryList;
    const url = `${endpoint.uri}/${branchId}`;

    const response = await getApiData(url, endpoint.method, {});

    if (isLoginResponse(response)) {
      return response?.data || [];
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message || 'Something went wrong',
      });

      return [];
    }
  } catch (error) {
    console.log('Gallery API Error:', error);

    Toast.show({
      type: 'error',
      text1: 'Failed to load gallery',
    });

    return [];
  }
};

export const useBusinessGallery = branchId => {
  return useQuery({
    queryKey: ['businessGallery', branchId],
    queryFn: () => getBusinessGallery(branchId),
    enabled: !!branchId,
  });
};

export const deleteBusinessGallery = async galleryId => {
  try {
    const endpoint = businessEndPoint.deleteGallery;
    const url = `${endpoint.uri}/${galleryId}`;

    const response = await getApiData(url, endpoint.method, {});

    if (isLoginResponse(response)) {
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message || 'Something went wrong',
      });

      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to load gallery',
    });
  }
};
export const uploadBusinessGallery = async (galleryId, body) => {
  try {
    const endpoint = businessEndPoint.addGallery;
    const url = `${endpoint.uri}/${galleryId}`;
    const data = {media: body};

    const response = await getApiDataProgress(url, endpoint.method, data);

    if (isLoginResponse(response)) {
      return response;
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message || 'Something went wrong',
      });

      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to load gallery',
    });
  }
};
export const upadateBusinessApi = async body => {
  try {
    const endpoint = businessEndPoint.updateBusiness;

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
        text1: response?.data?.message || 'Something went wrong',
      });

      return;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
    });
  }
};
const commonApi = async (endpoint, data = {}, params = '') => {
  const url = `${endpoint.uri}${params}`;

  try {
    const activeBranchId = useGlobalStore.getState().activeBranchId;
    const headers = {'x-branch-id': activeBranchId};
    const response = await getApiData(url, endpoint.method, data, headers, true);

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
export const businessDashboardApi = () =>
  commonApi(businessEndPoint.businessDashboard);
