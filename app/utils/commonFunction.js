import {Alert, Linking} from 'react-native';
import {navigationRef} from '@navigation/mainStackNavigation';
import useGlobalStore from '@zustand/store';
import {Config} from '@config/Config';
import moment from 'moment';

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

  Linking.canOpenURL(formattedUrl)
    .then(supported => {
      if (!supported) {
        Alert.alert('Error', 'Unable to open website');
        return;
      }
      return Linking.openURL(formattedUrl);
    })
    .catch(() => Alert.alert('Error', 'Unable to open website'));
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
