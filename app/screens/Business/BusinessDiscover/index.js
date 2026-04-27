/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AccountModal from '@components/AccountModal';
import {CHeader} from '@components/CHeader';
import CImage from '@components/CImage';
import {size} from '@config/Sizes';
import {CustomIcon} from '@config/LoadIcons';
import {getImageUrl} from '@utils/commonFunction';
import useGlobalStore from '@zustand/store';
import {useThemeContext} from '@contexts/themeContext';
import {getBusinessList} from '@apis/ApiRoutes/Business';
import GetStyles from './styles';

export default function BusinessDiscover() {
  const styles = GetStyles();
  const {color} = useThemeContext();

  const userBusinessData = useGlobalStore(s => s.businessData);
  const activeBusinessId = useGlobalStore(s => s.activeBusinessId);

  const [showModal, setShowModal] = useState(false);

  const businessData = useMemo(() => {
    return userBusinessData?.find(b => b.business_id === activeBusinessId);
  }, [userBusinessData, activeBusinessId]);

  useEffect(() => {
    if (!activeBusinessId && userBusinessData?.length > 0) {
      const firstBusiness = userBusinessData[0];
      const firstBranch = firstBusiness?.branches?.[0];

      const store = useGlobalStore.getState();
      store.setActiveBusinessId(firstBusiness.business_id);
      store.setActiveBranchId(firstBranch?.branch_id);
    }
  }, [userBusinessData]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const HeaderComponent = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerLeftView}
        onPress={() => setShowModal(true)}>
        {businessData?.branch_logo ? (
          <CImage
            src={{uri: getImageUrl(businessData?.branch_logo)}}
            style={styles.headerImg}
          />
        ) : (
          <View style={styles.imgCont}>
            <Text style={styles.iconImage}>
              {businessData?.business_name?.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.headerBusiness}>
          <View style={styles.textCont}>
            <Text
              style={styles.businessName}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {businessData?.business_name}
            </Text>

            <Text numberOfLines={1} style={styles.address}>
              <CustomIcon
                name="location"
                size={size.moderateScale(10)}
                color={color.black}
              />{' '}
              {businessData?.branches[0]?.location?.address}
            </Text>
          </View>
          <CustomIcon
            name="arrowDown"
            size={size.moderateScale(10)}
            color={color.black}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <CHeader
        showBusiness
        options={{
          customLeft: () => <HeaderComponent />,
        }}
      />
      <AccountModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}
