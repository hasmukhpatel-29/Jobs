import {businessEndPoint} from '@apis/Endpoints';
import {getApiData, getApiDataProgress} from '@utils/apiHelper';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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
const commonApi = async (endpoint, data = {}, params = '', central = true) => {
  const url = `${endpoint.uri}${params}`;

  try {
    const activeBranchId = useGlobalStore.getState().activeBranchId;
    const headers = {'x-branch-id': activeBranchId};
    const response = await getApiData(
      url,
      endpoint.method,
      data,
      headers,
      central,
    );

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

export const manageJobApi = () =>
  commonApi(businessEndPoint.manageJob, {}, '', false);

export const creditBalanceApi = () =>
  commonApi(businessEndPoint.creditBalance, {}, '', false);

export const useCreditBalance = () => {
  return useQuery({
    queryKey: ['creditBalance'],
    queryFn: async () => {
      const response = await creditBalanceApi();
      return response?.data;
    },
  });
};

export const creditHistoryApi = (page = 1, type = 'ALL') => {
  let params = `?page=${page}`;

  if (type !== 'ALL') {
    params += `&type=${type}`;
  }
  return commonApi(businessEndPoint.creditHistory, {}, params, false);
};

export const useCreditHistory = filterType => {
  return useInfiniteQuery({
    queryKey: ['creditHistory', filterType],
    queryFn: async ({pageParam = 1}) => {
      const response = await creditHistoryApi(pageParam, filterType);
      return response?.data;
    },
    getNextPageParam: lastPage => {
      if (!lastPage || !lastPage.pagination) return undefined;
      const {page, total_pages} = lastPage.pagination;

      if (page < total_pages) {
        return page + 1;
      }
      return undefined;
    },
  });
};
export const applicantsListApi = (page = 1, status = 'ALL', search = '') => {
  let params = `?page=${page}`;

  if (status !== 'ALL') {
    params += `&status=${status}`;
  }
  if (search) {
    params += `&search=${encodeURIComponent(search)}`;
  }
  return commonApi(businessEndPoint.applicantsList, {}, params, false);
};

export const useApplicantsList = (filterType, search) => {
  return useInfiniteQuery({
    queryKey: ['applicantsList', filterType, search],
    queryFn: async ({pageParam = 1}) => {
      const response = await applicantsListApi(pageParam, filterType, search);
      return response;
    },
    getNextPageParam: lastPage => {
      if (!lastPage || !lastPage.pagination) return undefined;
      const {page, total_pages} = lastPage.pagination;

      if (page < total_pages) {
        return page + 1;
      }
      return undefined;
    },
  });
};

export const updateApplicantStatusApi = (applicationId, status) => {
  const params = `/${applicationId}/status`;

  const data = {status: status};

  return commonApi(businessEndPoint.updateApplicantStatus, data, params, false);
};

export const useUpdateApplicantStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({applicationId, status}) =>
      updateApplicantStatusApi(applicationId, status),

    onSuccess: response => {
      queryClient.invalidateQueries({queryKey: ['applicantsList']});

      Toast.show({
        type: 'success',
        text1: response?.message || 'Status updated successfully',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Failed to update status',
      });
    },
  });
};
export const updateApplicantTimeLineApi = (applicationId, message) => {
  const params = `/${applicationId}/update`;

  const data = {message: message};

  return commonApi(
    businessEndPoint.updateApplicationTimeLine,
    data,
    params,
    false,
  );
};

export const useUpdateTimeLine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({applicationId, message}) =>
      updateApplicantTimeLineApi(applicationId, message),

    onSuccess: response => {
      queryClient.invalidateQueries({queryKey: ['applicantsList']});

      Toast.show({
        type: 'success',
        text1: response?.message || 'Message updated successfully',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Failed to update status',
      });
    },
  });
};

export const applicantProfileApi = applicationId => {
  const params = `/${applicationId}`;
  return commonApi(businessEndPoint.applicantProfile, {}, params, false);
};

export const updateNoteApi = (applicationId, message) => {
  const params = `/${applicationId}/note`;

  const data = {note: message};

  return commonApi(
    businessEndPoint.updateApplicationNote,
    data,
    params,
    false,
  );
};
export const saveApplicantApi = (applicationId) => {
  const params = `/${applicationId}/save`;

  return commonApi(
    businessEndPoint.saveApplicant,
    {},
    params,
    false,
  );
};
