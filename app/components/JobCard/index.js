import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CImage from '@components/CImage';
import {CButton} from '@components/CButton';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import Icon, {Icons} from '@config/Icons';
import {useThemeContext} from '@contexts/themeContext';
import {getTimeAgo} from '@utils/commonFunction';
import GetStyles from './styles';

const JobCard = ({item, toggleSaveJob}) => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.headerCont}>
            <View style={styles.headerView}>
              <CustomIcon
                name="location"
                size={size.moderateScale(14)}
                color={color?.black}
              />
              {item?.location?.city && item?.location?.state ? (
                <Text style={styles.company}>
                  {item?.location?.city}, {item?.location?.state}
                </Text>
              ) : (
                <Text style={styles.company}>{item?.location}</Text>
              )}
            </View>
            {item?.created_at && (
              <View style={styles.headerView}>
                <CustomIcon
                  name="timer3"
                  size={size.moderateScale(14)}
                  color={color?.black}
                />
                <Text style={styles.company}>
                  {getTimeAgo(item?.created_at)}
                </Text>
              </View>
            )}
            <View style={styles.headerView}>
              <CustomIcon
                name="briefcase"
                size={size.moderateScale(14)}
                color={color?.black}
              />
              <Text style={styles.company}>{item?.work_mode}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            toggleSaveJob(item?.job_id);
          }}>
          <Icon
            type={Icons.FontAwesome}
            name={item?.is_saved ? 'bookmark' : 'bookmark-o'}
            size={size.moderateScale(18)}
            color={color?.black}
          />
        </TouchableOpacity>
      </View>
      {item?.description && (
        <Text style={styles.description} numberOfLines={2}>
          {item?.description}
        </Text>
      )}

      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item?.job_type}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item?.ctc}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item?.experience} yrs</Text>
        </View>
        {item?.skills && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item?.skills}</Text>
          </View>
        )}
      </View>

      {item?.business_details && (
        <View style={styles.footer}>
          <View style={styles.businessCont}>
            <View style={styles.imgContainer}>
              <CImage
                src={item?.business_details?.branch_logo}
                style={styles.companyLogo}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={styles.companyName}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.business_details?.display_name}
              </Text>
              <Text style={styles.cityName}>
                {item?.business_details?.city_name}
              </Text>
            </View>
          </View>
          <CButton
            label="Apply Now"
            onPress={() => {}}
            buttonStyle={styles.btnStyle}
          />
        </View>
      )}
    </View>
  );
};

export default JobCard;
