export const OtpOptions = [
  {
    id: 1,
    label: 'Via WhatsApp',
    value: 'whatsapp',
  },
  {id: 2, label: 'Via SMS', value: 'sms'},
];

export const genderData = [
  {id: 0, name: 'Male', value: 'Male'},
  {id: 1, name: 'Female', value: 'Female'},
];

export const dashboardList = [
  {
    id: 1,
    title: 'My Applications',
    navigate: 'MyApplication',
  },
];
export const busDashboardList = [
  {
    id: 1,
    title: 'Manage Job',
    navigate: 'ManageJob',
  },
  {
    id: 2,
    title: 'Post Job',
    navigate: 'PostJob',
  },
  {
    id: 3,
    title: 'Plan',
    navigate: 'Plan',
  },
  {
    id: 4,
    title: 'Credits',
    navigate: 'Credits',
  },
  {
    id: 5,
    title: 'Applicants',
    navigate: 'Applicants',
  },
  {
    id: 6,
    title: 'Saved Candidates',
    navigate: 'SavedCandidates',
  },
];

export const businessFormStep = [
  {
    id: 0,
    name: 'Business Details',
    icon: 'store',
  },
  {
    id: 1,
    name: 'Address',
    icon: 'location',
  },
  {
    id: 2,
    name: 'Contact',
    icon: 'phone',
  },
  {
    id: 3,
    name: 'Payment',
    icon: 'card',
  },
];
export const BusinessOptions = [
  {id: 1, label: 'Business PAN', value: 'Business PAN'},
  {id: 2, label: 'Business GST', value: 'Business GST'},
];

export const educationOptions = [
  {value: '10th', name: '10th'},
  {value: '12th', name: '12th / Intermediate'},
  {value: 'diploma', name: 'Diploma'},
  {value: 'bachelors', name: "Bachelor's Degree"},
  {value: 'masters', name: "Master's Degree"},
  {value: 'phd', name: 'PhD / Doctorate'},
];

export const experienceOptions = [
  {value: 'fresher', name: 'Fresher'},
  {value: '1-2', name: '1-2 Years'},
  {value: '3-5', name: '3-5 Years'},
  {value: '5-10', name: '5-10 Years'},
  {value: '10+', name: '10+ Years'},
];

export const ageOptions = Array.from({length: 57}, (_, i) => {
  const age = (i + 14).toString();
  return {name: age, value: age};
});

export const genderOptions = [
  {value: 'any', name: 'Any'},
  {value: 'male', name: 'Male'},
  {value: 'female', name: 'Female'},
];

export const vacancyOptions = [
  {value: '1-5', name: '1-5'},
  {value: '5-10', name: '5-10'},
  {value: '10-20', name: '10-20'},
  {value: '20-50', name: '20-50'},
  {value: '50+', name: '50+'},
];

export const jobTypeOptions = [
  {value: 'Full-time', name: 'Full Time'},
  {value: 'Part-time', name: 'Part Time'},
  {value: 'Contract', name: 'Contract'},
  {value: 'Internship', name: 'Internship'},
];

export const workTypeOptions = [
  {value: 'On-site', name: 'On-site'},
  {value: 'Remote', name: 'Remote'},
  {value: 'Hybrid', name: 'Hybrid'},
];

export const weekDays = [
  {value: 'mon', name: 'Mon'},
  {value: 'tue', name: 'Tue'},
  {value: 'wed', name: 'Wed'},
  {value: 'thu', name: 'Thu'},
  {value: 'fri', name: 'Fri'},
  {value: 'sat', name: 'Sat'},
  {value: 'sun', name: 'Sun'},
];
