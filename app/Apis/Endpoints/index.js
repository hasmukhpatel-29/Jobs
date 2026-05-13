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
  profileAllDetails: {
    method: 'GET',
    uri: '/profile/me/all-details',
  },
  updateBasicInfo: {
    method: 'PUT',
    uri: '/profile/basic-info',
  },
  skillList: {
    method: 'GET',
    uri: '/skills/list',
  },
  addSkill: {
    method: 'POST',
    uri: '/profile/skill/add',
  },
  deleteSkill: {
    method: 'DELETE',
    uri: '/profile/skill',
  },
  degreeList: {
    method: 'GET',
    uri: '/degrees/list',
  },
  addEducation: {
    method: 'POST',
    uri: '/profile/education',
  },
  deleteEducation: {
    method: 'DELETE',
    uri: '/profile/education',
  },
  updateEducation: {
    method: 'PUT',
    uri: '/profile/education',
  },
  addExperience: {
    method: 'POST',
    uri: '/profile/experience',
  },
  deleteExperience: {
    method: 'DELETE',
    uri: '/profile/experience',
  },
  updateExperience: {
    method: 'PUT',
    uri: '/profile/experience',
  },
  jobCategoryList: {
    method: 'GET',
    uri: '/job-category/all',
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

export const businessEndPoint = {
  businessList: {
    method: 'GET',
    uri: '/profile/businesses',
  },
  galleryList: {
    method: 'GET',
    uri: '/mobile/business/gallery',
  },
  addGallery: {
    method: 'POST',
    uri: '/mobile/business/gallery',
  },
  deleteGallery: {
    method: 'DELETE',
    uri: '/mobile/business/gallery',
  },
  updateBusiness: {
    method: 'PUT',
    uri: '/business/update',
  },
  businessDashboard: {
    method: 'GET',
    uri: '/jobs/mobile/business-dashboard',
  },
  manageJob: {
    method: 'GET',
    uri: '/jobs/mobile/branch',
  },
  creditBalance: {
    method: 'GET',
    uri: '/jobs/mobile/payment/credits/balance',
  },
  creditHistory: {
    method: 'GET',
    uri: '/jobs/mobile/payment/credits/transactions',
  },
  applicantsList: {
    method: 'GET',
    uri: '/jobs/mobile/applications/branch/applicants',
  },
  updateApplicantStatus: {
    method: 'PUT',
    uri: '/jobs/mobile/applications/branch/applicants',
  },
  updateApplicationTimeLine: {
    method: 'POST',
    uri: '/jobs/mobile/applications/branch/applicants',
  },
  applicantProfile:{
    method: 'GET',
    uri: '/jobs/mobile/applications/branch/applicants',
  },
  updateApplicationNote: {
    method: 'PUT',
    uri: '/jobs/mobile/applications/branch/applicants',
  },
  saveApplicant: {
    method: 'PUT',
    uri: '/jobs/mobile/applications/branch/applicants',
  },
  matchingResume:{
    method: 'POST',
    uri: '/jobs/matching-resume/search',
  },
  resumeGenerate:{
    method: 'GET',
    uri: '/jobs/resume/generate',
  }
};

export const jobEndPoint = {
  jobList: {
    method: 'GET',
    uri: '/jobs/list',
  },
  jobDetails: {
    method: 'GET',
    uri: '/jobs/slug',
  },
  jobDetailsById: {
    method: 'GET',
    uri: '/jobs',
  },
  saveJob: {
    method: 'POST',
    uri: '/profile/saved-jobs',
  },
  saveJobList: {
    method: 'GET',
    uri: '/profile/saved-jobs',
  },
  applyJob: {
    method: 'POST',
    uri: '/applications/apply',
  },
  myApplications: {
    method: 'GET',
    uri: '/applications/my-applications',
  },
  createJob: {
    method: 'POST',
    uri: '/jobs/mobile/create',
  },
};
