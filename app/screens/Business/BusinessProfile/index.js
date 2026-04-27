/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useMemo, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {CHeader} from '@components/CHeader';
import AccountModal from '@components/AccountModal';
import CCarousel from '@components/CCarousel';
import useGlobalStore from '@zustand/store';
import {useThemeContext} from '@contexts/themeContext';
import {useBusinessGallery} from '@apis/ApiRoutes/Business';
import CImage from '@components/CImage';
import {CustomIcon} from '@config/LoadIcons';
import {
  getImageUrl,
  openPhoneDialer,
  openWebsite,
  openWhatsApp,
} from '@utils/commonFunction';
import {Images} from '@config/Images';
import {size} from '@config/Sizes';
import GetStyles from './styles';

export default function BusinessProfile({navigation}) {
  const {color} = useThemeContext();
  const styles = GetStyles();

  const userBusinessData = useGlobalStore(s => s.businessData);
  const activeBusinessId = useGlobalStore(s => s.activeBusinessId);
  const activeBranchId = useGlobalStore(s => s.activeBranchId);

  const [showModal, setShowModal] = useState(false);

  const businessData = useMemo(() => {
    return userBusinessData?.find(b => b.business_id === activeBusinessId);
  }, [userBusinessData, activeBusinessId]);

  const branchData = useMemo(() => {
    return businessData?.branches?.find(b => b.branch_id === activeBranchId);
  }, [businessData, activeBranchId]);

  useEffect(() => {
    if (!activeBusinessId && userBusinessData?.length > 0) {
      const firstBusiness = userBusinessData[0];
      const firstBranch = firstBusiness?.branches?.[0];

      const store = useGlobalStore.getState();
      store.setActiveBusinessId(firstBusiness.business_id);
      store.setActiveBranchId(firstBranch?.branch_id);
    }
  }, [userBusinessData]);

  const {data: galleryData} = useBusinessGallery(branchData?.branch_id);

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
    <View style={styles.mainView}>
      <CHeader
        showBusiness
        options={{
          customLeft: () => <HeaderComponent />,
        }}
      />

      {galleryData?.length === 0 ? (
        <View>
          <CImage
            src={Images.seanebCoverGalery}
            style={styles.imgStyle}
            resizeMode="stretch"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('EditGallery')}
            style={styles.editCont}
            activeOpacity={0.7}>
            <CustomIcon
              name="edit"
              size={size.moderateScale(20)}
              color={color.commonWhite}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <CCarousel planningData={galleryData ?? []} isEditShopGallery />
      )}

      <View style={styles.profileView}>
        <View style={styles.businessImgCont}>
          {branchData?.branch_logo ? (
            <CImage
              src={getImageUrl(branchData?.branch_logo)}
              style={styles.businessImgView}
            />
          ) : (
            <View style={styles.businessImgView}>
              <Text style={styles.businessIconImage}>
                {branchData?.branch_name?.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.textCont}>
            <Text
              style={styles.businessName}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {branchData?.branch_name}
            </Text>

            <Text numberOfLines={1} style={styles.address}>
              <CustomIcon
                name="location"
                size={size.moderateScale(10)}
                color={color.black}
              />{' '}
              {branchData?.location?.address}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('EditBusiness')}
            style={styles.editContainer}>
            <CustomIcon
              name="edit"
              size={size.moderateScale(25)}
              color={color.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: size.moderateScale(10),
          marginTop: size.moderateScale(20),
        }}>
        <View style={styles.sectionContainer}>
          <View style={{gap: size.moderateScale(5)}}>
            <View style={styles.sectionContainer}>
              <Text style={styles.detailLabel}>Display Business Name:</Text>
              <Text style={styles.detailValue}>
                {businessData?.business_name}
              </Text>
            </View>

            {businessData?.gst_number && (
              <View style={styles.sectionContainer}>
                <Text style={styles.detailLabel}>GSTIN:</Text>
                <Text style={styles.detailValue}>
                  {businessData?.gst_number}
                </Text>
              </View>
            )}
            {businessData?.pan_number && (
              <View style={styles.sectionContainer}>
                <Text style={styles.detailLabel}>PAN No.</Text>
                <Text style={styles.detailValue}>
                  {businessData?.pan_number}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        {branchData?.primary_number && (
          <View style={styles.sectionHeaderWithEdit}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => openPhoneDialer(branchData?.primary_number)}
              style={styles.contactItem}>
              <CImage
                src={Images.imgIcTelephone}
                resizeMode="contain"
                style={styles.contactLogo}
              />
              <Text style={styles.contactText}>
                {branchData?.country_code} {branchData?.primary_number}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {branchData?.whatsapp_number && (
          <View style={styles.sectionHeaderWithEdit}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                openWhatsApp(
                  branchData?.whatsapp_country_code,
                  branchData?.whatsapp_number,
                )
              }
              style={styles.contactItem}>
              <CImage
                src={Images.imgWhatsApp}
                resizeMode="contain"
                style={styles.contactLogo}
              />
              <Text style={styles.contactText}>
                {branchData?.whatsapp_country_code}{' '}
                {branchData?.whatsapp_number}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {branchData?.website && (
          <View style={styles.sectionHeaderWithEdit}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => openWebsite(branchData?.website)}
              style={styles.contactItem}>
              <CImage
                src={Images.imgWorld}
                resizeMode="contain"
                style={styles.contactLogo}
              />
              <Text style={styles.contactText}>{branchData?.website}</Text>
            </TouchableOpacity>
          </View>
        )}

        {branchData?.business_email && (
          <View style={styles.sectionHeaderWithEdit}>
            <View style={styles.contactItem}>
              <CImage
                src={Images.imgEmail}
                resizeMode="contain"
                style={styles.contactLogo}
              />
              <Text style={styles.contactText}>
                {branchData?.business_email}
              </Text>
            </View>
          </View>
        )}
        {branchData?.location && (
          <View style={styles.sectionHeaderWithEdit}>
            <View style={styles.contactItem}>
              <CImage
                src={Images.imgLocation}
                resizeMode="contain"
                style={styles.contactLogo}
              />
              <Text style={styles.contactText}>
                {branchData?.location?.address}
              </Text>
            </View>
          </View>
        )}
      </View>

      <AccountModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}
