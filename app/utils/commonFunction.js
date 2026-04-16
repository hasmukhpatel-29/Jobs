import {Alert, Linking} from 'react-native';
import {navigationRef} from '@navigation/mainStackNavigation';
import useGlobalStore from '@zustand/store';

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
