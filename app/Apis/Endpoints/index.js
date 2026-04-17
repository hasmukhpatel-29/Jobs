export const authEndpoint = {
  sendOtp: {
    method: 'POST',
    uri: '/mobile/otp/send-otp',
  },
  verifyOtp: {
    method: 'POST',
    uri: '/mobile/otp/verify-otp',
  },
  sendEmailOtp: {
    method: 'POST',
    uri: '/auth/email/send-otp',
  },
  verifyEmailOtp: {
    method: 'POST',
    uri: '/auth/email/verify-otp',
  },
  seanebId: {
    method: 'POST',
    uri: '/mobile/seanebid/check',
  },
  autoCompleteCity: {
    method: 'GET',
    uri: '/autocomplete-cities',
  },
  userSignup: {
    method: 'POST',
    uri: '/mobile/user/signup',
  },
  userLogout: {
    method: 'POST',
    uri: '/mobile/logout',
  },
  deleteUser: {
    method: 'DELETE',
    uri: '/mobile/profile/delete',
  },
};

export const userProfileEndPoint = {
  userProfile: {
    method: 'GET',
    uri: '/mobile/profile/details',
  },
  updateProfile: {
    method: 'PUT',
    uri: '/mobile/profile/update',
  },
  profileMe: {
    method: 'GET',
    uri: '/mobile/profile/me',
  },
};

export const businessRegEndPoint = {
  autoCompleteBusiness: {
    method: 'GET',
    uri: '/business/autocomplete',
  },
  verifyPan: {
    method: 'POST',
    uri: '/mobile/verification/verify-pan',
  },
  verifyGst: {
    method: 'POST',
    uri: '/mobile/verification/verify-gst',
  },
  businessCategory: {
    method: 'POST',
    uri: '/category/list',
  },
  createBusiness: {
    method: 'POST',
    uri: '/mobile/business/create',
  },
  onboardingCharge: {
    method: 'GET',
    uri: '/payment/onboarding-charge-preview',
  },
  onboardingPayment: {
    method: 'POST',
    uri: '/mobile/onboarding/pay-now',
  },
  cancelOnboarding: {
    method: 'POST',
    uri: '/mobile/onboarding/cancel',
  },
};
