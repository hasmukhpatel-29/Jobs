import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CImage from '@components/CImage';
import {Images} from '@config/Images';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import {useThemeContext} from '@contexts/themeContext';
// import {isLiquidGlassSupported, LiquidGlassView} from '@callstack/liquid-glass';
import useGlobalStore from '@zustand/store';
import {getImageUrl} from '@utils/commonFunction';
import GetStyles from './styles';

export const CHeader = React.memo(props => {
  const {
    options,
    headerContainerStyle,
    headerLogo,
    headerLogoStyle,
    back,
    headerTextColor,
    headerTextStyle,
    onBackPress,
    title,
    isUploading,
    profileImg,
    showBusiness,
  } = props;

  const userData = useGlobalStore(s => s.userData);
  const userMeData = useGlobalStore.getState().userMeData;
  const userRole = useGlobalStore.getState().userRole;

  const navigation = useNavigation();
  const styles = GetStyles();
  const {color} = useThemeContext();
  const insets = useSafeAreaInsets();

  const isDisabled = isUploading;
  const titleColor = headerTextColor ?? color.black;

  return (
    <View
      style={[
        styles.headerContainer,
        headerContainerStyle,
        {paddingTop: insets.top},
      ]}>
      <View style={styles.leftContainer}>
        {title && (
          <View style={styles.rowAlign}>
            {back && (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={isDisabled}
                style={styles.backButton}
                onPress={onBackPress ? onBackPress : () => navigation.goBack()}>
                {/* {isLiquidGlassSupported ? (
                  <LiquidGlassView effect="clear" interactive>
                    <CustomIcon
                      name="leftArrow"
                      size={size.moderateScale(18)}
                      color={color.black}
                    />
                  </LiquidGlassView>
                ) : ( */}
                  <CustomIcon
                    name="leftArrow"
                    size={size.moderateScale(18)}
                    color={color.black}
                  />
                {/* )} */}
              </TouchableOpacity>
            )}
            {profileImg && (
              <CImage
                src={getImageUrl(userData?.avatar) || Images.imgDefaultUser}
                style={styles.profileImg}
              />
            )}

            <Text
              numberOfLines={1}
              style={[styles.title, {color: titleColor}, headerTextStyle]}>
              {title}
            </Text>
          </View>
        )}

        {headerLogo && (
          <View style={[styles.logoContainer, headerLogoStyle]}>
            <Text style={styles.logoText}>SeaNeB</Text>
          </View>
        )}

        {options?.customLeft?.()}

        {options?.headerLeftText && (
          <Text
            numberOfLines={1}
            style={[
              styles.headerLeftText,
              {color: titleColor},
              headerTextStyle,
            ]}>
            {options?.headerLeftText}
          </Text>
        )}
      </View>

      <View style={styles.profileContainer}>
        {options?.headerRight?.()}
        {showBusiness && userMeData?.is_business_registered && !userMeData?.onboarding?.show_pay_now && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (userRole === 'user') {
                useGlobalStore.getState().setUserRole('business');
                navigation.navigate('BusinessTab');
              } else {
                useGlobalStore.getState().setUserRole('user');
                navigation.navigate('UserTab');
              }
            }}>
            <CImage
              src={getImageUrl(userData?.avatar) || Images.imgDefaultUser}
              style={styles.profileImg}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
