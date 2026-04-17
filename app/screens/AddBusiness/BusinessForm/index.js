import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CHeader} from '@components/CHeader';
import {useThemeContext} from '@contexts/themeContext';
import {businessFormStep} from '@config/staticData';
import {CustomIcon} from '@config/LoadIcons';
import {size} from '@config/Sizes';
import useGlobalStore from '@zustand/store';
import BusinessAddress from '../BusinessAddress';
import BusinessLegal from '../BusinessLegal';
import BusinessContact from '../BusinessContact';
import BusinessPayment from '../BusinessPayment';
import GetStyles from './styles';

const BusinessForm = () => {
  const IOS = Platform.OS === 'ios';
  const styles = GetStyles();
  const {color} = useThemeContext();
  const userData = useGlobalStore(s => s.userData);

  const [currentStep, setCurrentStep] = useState(0);

  const childFormRef = useRef(null);

  const handlePressNextStep = async () => {
    const isValid = await childFormRef.current?.validate();
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handlePressBackStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessLegal ref={childFormRef} />;
      case 1:
        return <BusinessAddress ref={childFormRef} />;
      case 2:
        return <BusinessContact ref={childFormRef} />;
      case 3:
        return <BusinessPayment />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const data = useGlobalStore.getState().userMeData;

    if (data?.onboarding?.show_pay_now) {
      const branch = data.onboarding.branches.find(
        b => b.branch_status === 2 && b.onboarding_status === 0,
      );

      if (branch) {
        setCurrentStep(3);
        useGlobalStore.getState().setBusinessLegalFormData({
          onboardingRemaining: true,
          branchId: branch.branch_id,
        });
      }
    } else {
      const prevData = useGlobalStore.getState().businessLegalFormData || {};
      useGlobalStore.getState().setBusinessLegalFormData({
        ...prevData,
        onboardingRemaining: false,
      });
    }
  }, []);
  return (
    <View style={styles.mainView}>
      <CHeader
        title={`${userData?.first_name} ${userData?.last_name}`}
        back
        profileImg
      />
      <Text style={styles.title}>Register Your Business</Text>
      <View style={styles.stepMainCont}>
        {businessFormStep.map((step, index) => {
          const active = step?.id === currentStep;
          const completed = step?.id < currentStep;

          const bgColor = active || completed ? color.black : color.textColor;
          const iconColor = active || completed ? color.white : color.gray200;
          const textColor = active ? color.black : color.textColor;

          return (
            <React.Fragment key={step.id}>
              <View style={styles.stepCont}>
                <View style={styles.iconCont(bgColor)}>
                  <CustomIcon
                    name={step.icon}
                    height={size.moderateScale(12)}
                    width={size.moderateScale(12)}
                    color={iconColor}
                  />
                </View>
                <View style={styles.titleCont}>
                  <Text style={styles.titleText(textColor)}>{step?.name}</Text>
                </View>
              </View>
              {index < businessFormStep.length - 1 && (
                <View style={styles.itemSeparator(bgColor)} />
              )}
            </React.Fragment>
          );
        })}
      </View>
      <KeyboardAvoidingView
        behavior={IOS ? 'padding' : 'null'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {renderCurrentStep()}
        </ScrollView>
      </KeyboardAvoidingView>
      {currentStep <= 2 && (
        <View style={styles.bottomBtnCont}>
          <View style={styles.combineBtnCont}>
            {currentStep !== 0 && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handlePressBackStep}
                style={styles.backBtn}>
                <CustomIcon name="leftArrow" color={color.commonBlack} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handlePressNextStep}
              style={styles.nextBtn}>
              <>
                <Text style={styles.nextBtnText}>Next</Text>
                <View>
                  {currentStep === 0 && (
                    <CustomIcon name="leftArrow" style={styles.icon} />
                  )}
                </View>
              </>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
export default BusinessForm;
