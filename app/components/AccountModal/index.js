import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  SectionList,
} from 'react-native';
import Animated, {FadeIn, FadeOut, SlideInDown} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import CImage from '@components/CImage';
import useGlobalStore from '@zustand/store';
import {useThemeContext} from '@contexts/themeContext';
import Icon, {Icons} from '@config/Icons';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import {getImageUrl} from '@utils/commonFunction';
import GetStyles from './styles';

export default function AccountModal({visible, onClose}) {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const insets = useSafeAreaInsets();

  const businessList = useGlobalStore(s => s.businessData);
  const activeBranchId = useGlobalStore(s => s.activeBranchId);

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
    <Modal transparent visible={visible} animationType="none">
      <Pressable style={styles.flexStyle} onPress={onClose}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.flexStyle}>
          <BlurView style={styles.flexStyle} blurType="dark" blurAmount={10} />
        </Animated.View>
      </Pressable>

      <Animated.View
        entering={SlideInDown}
        style={[styles.mainView, {paddingBottom: insets.bottom + 10}]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onClose}
          hitSlop={10}
          style={styles.closeCont}>
          <CustomIcon
            name="close"
            size={size.moderateScale(16)}
            color={color.black}
          />
        </TouchableOpacity>
        <SectionList
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
                onPress={() =>
                  handleSelect(section.business_id, item.branch_id)
                }>
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
                  <Text style={styles.businessName}>{item.branch_name}</Text>
                  <Text style={styles.address}>{item.location?.address}</Text>
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
      </Animated.View>
    </Modal>
  );
}
