import {Alert, Linking, Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import moment from 'moment';
import {navigationRef} from '@navigation/mainStackNavigation';
import Toast from '@components/CToast';
import useGlobalStore from '@zustand/store';
import {Config} from '@config/Config';
import {useThemeContext} from '@contexts/themeContext';

export const NumberValidation = val => {
  if (!isNaN(val)) {
    return val;
  } else {
    return;
  }
};

export const openWebsite = url => {
  if (!url) return;

  const formattedUrl =
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;

  Linking.openURL(formattedUrl).catch(() =>
    Alert.alert('Error', 'Unable to open website'),
  );
};
export const redirectToLogin = () => {
  navigationRef?.current?.reset({
    index: 0,
    routes: [{name: 'UserTab'}],
  });
};

export const logOut = () => {
  useGlobalStore.getState().reset();
  redirectToLogin();
};

export const formatLocation = item => {
  return [
    item?.description || item?.city_name,
    item?.state_name,
    item?.country_name,
  ]
    .filter(Boolean)
    .join(', ');
};

export const getImageUrl = path => {
  if (!path) return '';
  if (typeof path !== 'string') return '';

  if (
    path.startsWith('http') ||
    path.startsWith('file://') ||
    path.startsWith('data:')
  ) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${Config.IMAGE_STORAGE_URL}${cleanPath}`;
};

export const getTimeAgo = date => {
  const createdAt = moment(date);
  const now = moment();

  if (!createdAt.isValid()) {
    return 'Invalid date';
  }

  const minutesDiff = now.diff(createdAt, 'minutes');
  const hoursDiff = now.diff(createdAt, 'hours');
  const daysDiff = now.diff(createdAt, 'days');

  if (minutesDiff < 60) {
    return `${minutesDiff}m ago`;
  }

  if (hoursDiff < 24) {
    return `${hoursDiff}h ago`;
  }

  if (daysDiff === 1) {
    return 'Yesterday';
  }

  if (daysDiff <= 2) {
    return `${daysDiff}d ago`;
  }

  const format = createdAt.year() === now.year() ? 'MMM D' : 'MMM D, YYYY';

  return createdAt.format(format);
};

export const GetStatusColor = status => {
  const {color} = useThemeContext();
  switch (status) {
    case 'Applied':
      return color.primary;

    case 'Under Review':
      return color.orange;

    case 'Shortlisted':
      return color.hexBlue;

    case 'Hired':
      return color.green;

    case 'Rejected':
      return color.red;

    default:
      return color.gray900;
  }
};

export const parseWorkingDays = apiString => {
  if (!apiString) return [];

  const orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (apiString.includes('-')) {
    const [startDay, endDay] = apiString.split('-').map(day => day.trim());

    const startIndex = orderedDays.findIndex(
      d => d.toLowerCase() === startDay.toLowerCase(),
    );
    const endIndex = orderedDays.findIndex(
      d => d.toLowerCase() === endDay.toLowerCase(),
    );

    if (startIndex !== -1 && endIndex !== -1) {
      return orderedDays
        .slice(startIndex, endIndex + 1)
        .map(d => d.toLowerCase());
    }
  }

  if (apiString.includes(',')) {
    return apiString.split(',').map(day => day.trim().toLowerCase());
  }

  return [apiString.trim().toLowerCase()];
};

export const downloadInvoice = async (
  url,
  fileName = `${Date.now()}.pdf`,
  mimeType = 'application/pdf',
) => {
  try {
    const {fs} = ReactNativeBlobUtil;

    const downloadDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    const filePath = `${downloadDir}/${fileName}`;

    const ext = fileName.split('.').pop();

    const options = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        appendExt: ext,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: `Downloading ${fileName}...`,
          mime: mimeType,
        },
      },
    });

    // Await the fetch call
    const res = await ReactNativeBlobUtil.config(options).fetch('GET', url);

    if (Platform.OS === 'ios') {
      ReactNativeBlobUtil.ios.previewDocument(res.path());
    } else {
      Toast.show({type: 'success', text1: `${fileName} saved to Downloads!`});
    }

    return {success: true, path: res.path()};
  } catch (error) {
    console.log('Download error:', error);
    Toast.show({type: 'error', text1: `Failed to download ${fileName}`});
    return {success: false, error};
  }
};
