import React from 'react';
import {Text, View} from 'react-native';
import {CButton} from '@components/CButton';
import {CHeader} from '@components/CHeader';
import CImage from '@components/CImage';
import {fontSize} from '@config/theme';
import {Images} from '@config/Images';
import useGlobalStore from '@zustand/store';
import {getImageUrl} from '@utils/commonFunction';
import GetStyles from './styles';

export default function Profile({navigation}) {
  const styles = GetStyles();
  const userData = useGlobalStore(s => {
    return s.userData;
  });
  const isAuthenticated = useGlobalStore(s => s.isAuthenticated);

  return (
    <View style={styles.mainView}>
      <CHeader title={userData?.seaneb_id || 'Profile'} />
      {isAuthenticated && (
        <View style={styles.profileMainCont}>
          <View style={styles.profileCont}>
            <CImage
              src={getImageUrl(userData?.avatar) || Images.imgDefaultUser}
              style={styles.imageStyle}
            />
            <View style={styles.userDetailCont}>
              <Text style={styles.userText}>
                {userData?.first_name} {userData?.last_name}
              </Text>
              <Text style={styles.userText}>
                {userData?.country_code} {userData?.mobile_number}
              </Text>
            </View>
          </View>
          <CButton
            label="Edit Profile"
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
            buttonLabelStyle={{fontSize: fontSize.verySmall}}
          />
          <CButton
            label="Add Business"
            onPress={() => {
              navigation.navigate('BusinessForm');
            }}
            buttonLabelStyle={{fontSize: fontSize.verySmall}}
          />
        </View>
      )}
    </View>
  );
}
