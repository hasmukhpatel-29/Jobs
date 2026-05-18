import React from 'react';
import {View, Text, Modal, TouchableOpacity, SectionList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CImage from '@components/CImage';
import useGlobalStore from '@zustand/store';
import {useThemeContext} from '@contexts/themeContext';
import Icon, {Icons} from '@config/Icons';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import {getImageUrl, openWebsite} from '@utils/commonFunction';
import GetStyles from './styles';

export default function AccountModal({visible, onClose}) {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const navigation = useNavigation();

  const businessList = useGlobalStore(s => s.businessData);
  const activeBranchId = useGlobalStore(s => s.activeBranchId);
  const userRole = useGlobalStore(s => s.userRole);
  const userMeData = useGlobalStore(s => s.userMeData);

  const handleSwitchRole = () => {
    onClose();
    if (userRole === 'user') {
      useGlobalStore.getState().setUserRole('business');
      navigation.navigate('BusinessTab');
    } else {
      useGlobalStore.getState().setUserRole('user');
      navigation.navigate('UserTab');
    }
  };

  const handleSelect = (businessId, branchId) => {
    const store = useGlobalStore.getState();
    store.setActiveBusinessId(businessId);
    store.setActiveBranchId(branchId);
    onClose();
  };

  const sections =
    businessList?.map(b => ({
      title: b.display_name || b.business_name,
      business_id: b.business_id,
      data: b.branches || [],
    })) || [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      statusBarTranslucent={true}
      transparent={true}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => onClose()}>
        <TouchableOpacity activeOpacity={1} style={styles.bottomSheetContainer}>
          <View
            style={[
              styles.mainView,
              {
                paddingBottom:
                  userRole === 'user'
                    ? size.moderateScale(80)
                    : size.moderateScale(140),
              },
            ]}
            onPress={() => onClose()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {userRole === 'user' ? userMeData?.full_name : 'Business'}
              </Text>
              <TouchableOpacity
                style={styles.modalIconBtn}
                onPress={() => onClose()}>
                <CustomIcon
                  name="close"
                  size={size.moderateScale(16)}
                  color={color.black}
                />
              </TouchableOpacity>
            </View>
            {userRole !== 'user' && (
              <SectionList
                style={{flexShrink: 1}}
                sections={sections}
                keyExtractor={item => item.branch_id}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={({section}) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                renderItem={({item, section}) => {
                  const isActive = activeBranchId === item.branch_id;

                  return (
                    <TouchableOpacity
                      style={[
                        styles.mainCont,
                        isActive && {backgroundColor: color.lightBlue},
                      ]}
                      onPress={() => {
                        if (
                          item?.branch_status != 1 ||
                          item?.onboarding_status != 1
                        ) {
                          const url =
                            'https://jobs.seaneb.app/auth/login?prompt=login&target_product=jobs&redirect_url=https%3A%2F%2Fjobs.seaneb.com';
                          openWebsite(url);
                          onClose();
                        } else {
                          handleSelect(section.business_id, item.branch_id);
                        }
                      }}>
                      {item.branch_logo ? (
                        <CImage
                          src={getImageUrl(item.branch_logo)}
                          style={styles.imgStyle}
                        />
                      ) : (
                        <View style={styles.imgCont}>
                          <Text style={styles.iconImage}>
                            {section.title?.charAt(0)}
                          </Text>
                        </View>
                      )}

                      <View style={styles.flexStyle}>
                        <Text style={styles.businessName}>
                          {item?.branch_name}
                        </Text>
                        <Text style={styles.address}>
                          {item?.location?.address}
                        </Text>
                        {(item?.branch_status != 1 ||
                          item?.onboarding_status != 1) && (
                          <View style={styles.paymentTag}>
                            <Text style={styles.paymentTagText}>
                              Payment remaining
                            </Text>
                          </View>
                        )}
                      </View>

                      {isActive && (
                        <Icon
                          type={Icons.AntDesign}
                          name="check"
                          size={20}
                          color={color.blue}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            )}
            <View style={styles.footerContainer}>
              {userRole !== 'user' && (
                <TouchableOpacity
                  style={styles.registerNewBusinessBtn}
                  activeOpacity={0.7}
                  onPress={() => {
                    const url =
                      'https://jobs.seaneb.app/auth/login?prompt=login&target_product=jobs&redirect_url=https%3A%2F%2Fjobs.seaneb.com';
                    openWebsite(url);
                    onClose();
                  }}>
                  <View style={styles.plusIconCont}>
                    <Icon
                      type={Icons.AntDesign}
                      name="plus"
                      size={16}
                      color={color.white}
                    />
                  </View>
                  <Text style={styles.registerNewBusinessText}>
                    Register New Business
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.switchDashboardBtn}
                activeOpacity={0.7}
                onPress={handleSwitchRole}>
                <Icon
                  type={Icons.Feather}
                  name="repeat"
                  size={18}
                  color={color.commonWhite}
                />
                <Text style={styles.switchDashboardText}>
                  {userRole === 'user'
                    ? 'Switch to Business Dashboard'
                    : 'Switch to User Dashboard'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
