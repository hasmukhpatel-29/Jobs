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