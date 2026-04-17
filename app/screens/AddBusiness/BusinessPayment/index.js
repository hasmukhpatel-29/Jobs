import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {CButton} from '@components/CButton';
import Toast from '@components/CToast';
import {
  cancelOnboardingApi,
  createBusinessApi,
  onboardingChargeApi,
  onboardingPaymentApi,
} from '@apis/ApiRoutes/BusinessRegisterApi';
import useGlobalStore from '@zustand/store';
import {redirectToLogin} from '@utils/commonFunction';
import GetStyles from './styles';

const BusinessPayment = () => {
  const styles = GetStyles();
  const [paymentCharges, setPaymentCharges] = useState({});
  const [loading, setLoading] = useState(false);
  const businessData = useGlobalStore.getState().businessLegalFormData;
  const [paymentData, setPaymentData] = useState({});

  const onboardingApi = async () => {
    const res = await onboardingChargeApi();
    if (res?.success) {
      setPaymentCharges(res?.data);
    }
  };

  useEffect(() => {
    onboardingApi();
  }, []);

  const baseAmount = Number(paymentCharges?.base_amount || 0);
  const gstPercent = Number(paymentCharges?.gst_percentage || 0);

  const gstAmount = (baseAmount * gstPercent) / 100;
  const totalAmount = baseAmount + gstAmount;

  const businessRegApi = async () => {
    setLoading(true);
    const branchlogo = businessData?.branch_logo;
    const cleanedLogo = branchlogo
      ? (({uri, name, type}) => ({uri, name, type}))(branchlogo)
      : null;
    const fullAddress = [
      businessData?.addressLine1,
      businessData?.addressLine2,
      businessData?.area,
      businessData?.city,
      businessData?.state,
    ]
      .filter(Boolean)
      .join(', ');
    const body = {
      business_name: businessData?.businessLegalName,
      display_name: businessData?.displayName,
      main_category_id: businessData?.main_category_id,
      seaneb_id: businessData?.seaneb_id,
      primary_number: businessData?.contact_number,
      country_code: businessData?.contact_phone_code,
      whatsapp_number: businessData?.whatsapp_number || '',
      whatsapp_country_code: businessData?.whatsapp_phone_code,
      about_branch: '',
      place_id: businessData?.place_id ?? '',
      business_place_id: businessData?.businessPlaceId ?? '',
      photo_references: businessData?.photo ?? [],
      address: fullAddress,
      landmark: (businessData?.addressLine2).substring(0, 20) ?? '',
      area: businessData?.area,
      city: businessData?.city,
      state: businessData?.state,
      website: businessData?.website ?? '',
      pan: businessData?.panNumber ?? '',
      gst: businessData?.gstNumber ?? '',
      verification_id: '',
      pincode: '',
      file: '',
      business_email: businessData?.business_email ?? '',
      branch_logo: cleanedLogo,
    };
    const res = await createBusinessApi(body);
    setLoading(false);
    if (res?.success) {
      useGlobalStore.getState().setBusinessLegalFormData({});
      setPaymentData(res?.data);
      startPayment(res?.data?.payment_session_id, res?.data?.order_id);
    } else {
      Toast.show({
        type: 'error',
        text1: res?.error?.message,
      });
    }
  };

  const startPayment = (sessionId, orderId) => {
    try {
      // navigate to web
      redirectToLogin();
    } catch (e) {
      console.log('Payment error:', e);
    }
  };

  const onboardingPayment = async id => {
    setLoading(true);
    const body = {
      branch_id: id,
    };
    const res = await onboardingPaymentApi(body);
    if (res?.success) {
      setPaymentData(res);
      startPayment(res?.payment_session_id, res?.order_id);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Review your onboarding fee and taxes</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payment Summary</Text>
          <Text style={styles.cardSub}>Onboarding Charges</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardHeader}>
          <View style={styles.row}>
            <Text style={styles.label}>{paymentCharges?.description}</Text>
            <Text style={styles.value}>₹{paymentCharges?.base_amount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              GST ({paymentCharges?.gst_percentage}%)
            </Text>
            <Text style={styles.value}>₹{gstAmount.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total Payable</Text>
          <Text style={styles.totalAmount}>₹{totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          This is a one-time onboarding fee for setting up your business on the
          platform. GST is calculated at 18% as per government regulations.
          Payment will be processed securely via Cashfree.
        </Text>
      </View>
      <CButton
        label="Pay Now"
        onPress={() => {
          if (paymentData?.payment_session_id) {
            startPayment(
              paymentData?.payment_session_id,
              paymentData?.order_id,
            );
          } else if (businessData?.onboardingRemaining) {
            onboardingPayment(businessData?.branchId);
          } else {
            businessRegApi();
          }
        }}
        loading={loading}
        disabled={loading}
      />
      {(paymentData?.branch_id || businessData?.onboardingRemaining) && (
        <CButton
          outLineBtn
          label="Cancel Onboarding"
          onPress={() =>
            cancelOnboardingApi({
              branch_id: paymentData?.branch_id || businessData?.branchId,
            })
          }
          buttonStyle={styles.btnStyle}
        />
      )}
    </View>
  );
};

export default BusinessPayment;
