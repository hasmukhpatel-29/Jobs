import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  FlatList,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from '@components/CToast';
import CommonModal from '@components/CModal/CommonModal';
import CImage from '@components/CImage';
import {CButton} from '@components/CButton';
import {getImageUrl} from '@utils/commonFunction';
import {CustomIcon} from '@config/LoadIcons';
import {Images} from '@config/Images';
import {useThemeContext} from '@contexts/themeContext';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';
const MAX_FILE_SIZE_MB = 5; // Maximum file size limit in MB
const androidVersion = Number(DeviceInfo.getSystemVersion());

// Helper function to handle permission requests
const requestPermission = async (permission, message) => {
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: 'SeaNeB',
      message,
      buttonPositive: 'OK',
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission Error:', err);
    return false;
  }
};

const UploadPhoto = props => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const {
    value = [],
    onImageChange = () => {},
    maxLength = 3,
    label = '',
    required = false,
    errorMsg = '',
    mainLabelContainerStyle = {},
    viewStyle = {},
    type = '',
  } = props;

  const optionsArray = [
    {id: 1, title: 'Camera', icon: 'camera'},
    {id: 2, title: 'Photo', icon: 'cameraLens'},
  ];

  const [uploadModal, setUploadModal] = useState(false);

  const showEnablePermissionAlert = access => {
    Alert.alert('Oops!', `Please allow access to your ${access}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
          } else {
            Linking.openSettings();
          }
        },
      },
    ]);
  };

  const openCamera = async () => {
    const permissionGranted = IOS
      ? true
      : await requestPermission(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          'SeaNeB needs access to your camera.',
        );

    if (permissionGranted) {
      const totalCount = value?.length || 0;
      const remaining = maxLength - totalCount;

      ImagePicker.openCamera({
        width: 300,
        height: 400,
        mediaType: 'photo',
        maxFiles: remaining,
        forceJpg: IOS,
      })
        .then(async image => {
          setUploadModal(false);
          await handleImageSelection(image);
        })
        .catch(err => {
          handleError(err);
        });
    } else {
      showEnablePermissionAlert('camera to capture images.');
    }
  };

  const openGallery = async () => {
    const permissionGranted = IOS
      ? true // For iOS, always assume permission is granted
      : await requestPermission(
          androidVersion >= 13
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES // For Android 13+
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          'SeaNeB needs access to your storage.',
        );
    if (permissionGranted) {
      const totalCount = value?.length || 0;
      const remaining = maxLength - totalCount;

      ImagePicker.openPicker({
        width: 200,
        height: 200,
        mediaType: 'photo',
        maxFiles: remaining,
        forceJpg: IOS,
      })
        .then(async image => {
          setUploadModal(false);
          await handleImageSelection(image);
        })
        .catch(err => {
          handleError(err);
        });
    } else {
      showEnablePermissionAlert('photo to select images.');
    }
  };

  const handleImageSelection = async image => {
    const fileSizeInMB = (image.fileSize || 0) / (1024 * 1024);
    if (fileSizeInMB > MAX_FILE_SIZE_MB) {
      Toast.show({
        type: 'error',
        text2: `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`,
      });
    } else {
      const singleImage = {
        isLocal: true,
        uri: image?.path,
        name: image?.filename,
        type: image?.mime,
      };
      onImageChange(singleImage);
    }
  };

  const handleError = err => {
    setUploadModal(false);
    if (err?.message?.startsWith('User cancelled')) {
      return;
    } else {
      setTimeout(() => {
        Toast.show({type: 'error', text2: err.message});
      }, 200);
    }
  };
  useEffect(() => {
    if (type === 'business') {
      setUploadModal(true);
    }
  }, [type]);

  return (
    <View>
      {type !== 'business' && (
        <>
          {!!label && (
            <View style={[styles.labelMainContainer, mainLabelContainerStyle]}>
              <View style={styles.row}>
                <Text style={styles.labelText}>{label}</Text>
                {required && <Text style={styles.requiredText}>*</Text>}
              </View>
            </View>
          )}

          <View style={[styles.profileImageContainer, viewStyle]}>
            <View style={{position: 'relative'}}>
              <CImage
                src={
                  typeof value === 'string' && value?.trim?.()
                    ? {uri: getImageUrl(value)}
                    : value?.isLocal
                    ? value
                    : Images?.imgDefaultUser
                }
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.profileImageUploadBtn}
                activeOpacity={0.6}
                onPress={() => setUploadModal(true)}>
                <CustomIcon name="camera" color={color.white} />
              </TouchableOpacity>
            </View>
          </View>

          {!!errorMsg && (
            <Text style={styles.errorMessageText}>{errorMsg}</Text>
          )}
        </>
      )}

      <CommonModal
        isVisible={uploadModal}
        onReject={() => {
          setUploadModal(false);
        }}
        childrenViewStyle={styles.uploadModal}>
        <FlatList
          data={optionsArray}
          renderItem={({item, index}) => {
            const isLast = index === optionsArray.length - 1;
            return (
              <TouchableOpacity
                key={`options_${item.id}_${index}`}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.id === 1) {
                    openCamera();
                  } else if (item.id === 2) {
                    openGallery();
                  }
                }}
                style={[
                  styles.uploadModalIconAndTextContainer,
                  isLast && {borderBottomWidth: 0},
                ]}>
                <CustomIcon name={item.icon} style={styles.uploadModalIcon} />
                <Text style={styles.uploadModalTitleText}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />

        <CButton label="Cancel" onPress={() => setUploadModal(false)} />
      </CommonModal>
    </View>
  );
};

export default UploadPhoto;
