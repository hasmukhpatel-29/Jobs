import {Alert, Linking} from 'react-native';

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
