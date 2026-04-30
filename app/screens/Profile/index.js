import React, {useCallback, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {CButton} from '@components/CButton';
import {CHeader} from '@components/CHeader';
import CImage from '@components/CImage';
import {fontSize} from '@config/theme';
import {Images} from '@config/Images';
import Icon, {Icons} from '@config/Icons';
import useGlobalStore from '@zustand/store';
import {profileAllDetailsApi} from '@apis/ApiRoutes/UserProfileApi';
import {useThemeContext} from '@contexts/themeContext';
import {getImageUrl} from '@utils/commonFunction';
import GetStyles from './styles';

const addressFields = [
  [
    {label: 'ADDRESS', key: 'address'},
    {label: 'AREA', key: 'area'},
  ],
  [
    {label: 'CITY', key: 'city'},
    {label: 'STATE', key: 'state'},
  ],
  [
    {label: 'COUNTRY', key: 'country'},
    {label: 'PINCODE', key: 'pincode'},
  ],
];

const SectionHeader = ({title, title2, onEdit}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionTitle2}>{title2}</Text>
      </View>
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Icon
          type={Icons.Ionicons}
          name="pencil"
          size={14}
          color={color.primary}
        />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const DataRow = ({label, value}) => {
  const styles = GetStyles();
  return (
    <View style={styles.dataRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, !value && styles.placeholderText]}>
        {value || 'Not provided'}
      </Text>
    </View>
  );
};

const AddressSection = ({title, data}) => {
  const styles = GetStyles();

  return (
    <View style={{marginTop: 12}}>
      <Text style={styles.title}>{title}</Text>

      {addressFields.map((row, rowIndex) => (
        <View key={rowIndex} style={{flexDirection: 'row', gap: 12}}>
          {row.map((item, index) => (
            <View key={index} style={{flex: 1}}>
              <DataRow label={item.label} value={data?.[item.key]} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default function Profile({navigation}) {
  const styles = GetStyles();
  const userData = useGlobalStore(s => {
    return s.userData;
  });
  const isAuthenticated = useGlobalStore(s => s.isAuthenticated);
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  //  Fetch profile details
  const getProfileDetails = async () => {
    try {
      setLoading(true);
      const res = await profileAllDetailsApi();

      if (res?.success) {
        setProfileDetails(res.data);
      }
    } catch (e) {
      console.log('Error:', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfileDetails();
    }, []),
  );

  return (
    <View style={styles.mainView}>
      <CHeader title={userData?.seaneb_id || 'Profile'} />
      {isAuthenticated && (
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
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
            <View style={styles.card}>
              <SectionHeader
                title="Profile Overview & Location"
                title2="Your headline, bio, and address details."
                onEdit={() =>
                  navigation.navigate('AddressUpdate', {profileDetails})
                }
              />

              <DataRow label="HEADLINE" value={profileDetails?.headline} />
              <DataRow label="BIO" value={profileDetails?.bio} />
              <AddressSection
                title="PERMANENT ADDRESS"
                data={profileDetails?.permanent_address}
              />
              {profileDetails?.current_address && (
                <AddressSection
                  title="CURRENT ADDRESS"
                  data={profileDetails?.current_address}
                />
              )}
            </View>
            <View style={styles.card}>
              <SectionHeader
                title="Education"
                title2="Add your academic qualifications."
                onEdit={() =>
                  navigation.navigate('EducationUpdate', {profileDetails})
                }
              />
              {profileDetails?.education.map((item, index) => (
                <View key={index} style={styles.educationCard}>
                  <Text style={styles.tagText}>{item.degree}</Text>
                  <Text style={styles.rowLabel}>
                    {item.college} . {item.city}
                  </Text>
                  <Text style={styles.sectionTitle2}>
                    {item.start_month_year} -{' '}
                    {item?.end_month_year || 'Present'} . {item.percentage}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
