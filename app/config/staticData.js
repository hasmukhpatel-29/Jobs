import Auto from '@assets/svg/auto.svg';
import Jobs from '@assets/svg/jobs.svg';
import Ngo from '@assets/svg/ngo.svg';
import News from '@assets/svg/news.svg';
import Property from '@assets/svg/property.svg';
import Tiffin from '@assets/svg/tiffin.svg';
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
  {
    id: 7,
    title: 'Matched Resumes',
    navigate: 'MatchedResumes',
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
  const age = i + 14;
  return {name: age.toString(), value: age};
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
export const creditTypes = [
  {label: 'All Types', value: 'ALL'},
  {label: 'Purchases', value: 'PURCHASE'},
  {label: 'Usage', value: 'USAGE'},
  {label: 'Free Grants', value: 'FREE_GRANT'},
  {label: 'Expired', value: 'EXPIRED'},
  {label: 'Refund', value: 'REFUND'},
];
export const ApplicantFilter = [
  {label: 'All', value: 'ALL'},
  {label: 'Applied', value: 'Applied'},
  {label: 'Under Review', value: 'Under+Review'},
  {label: 'Shortlisted', value: 'Shortlisted'},
  {label: 'Hired', value: 'Hired'},
  {label: 'Rejected', value: 'Rejected'},
];
export const statusOptions = [
  'Under Review',
  'Shortlisted',
  'Hired',
  'Rejected',
];
export const sortArray = [
  {label: 'High - Low', value: 'DESC'},
  {label: 'Low - High', value: 'ASC'},
];

export const SIDEBAR_DATA = [
  {id: 'location', title: 'Location'},
  {id: 'job_category', title: 'Job Category'},
  {id: 'salary_range', title: 'Salary Range'},
  {id: 'work_mode', title: 'Work Mode'},
  {id: 'job_type', title: 'Job Type'},
  {id: 'experience', title: 'Experience'},
];

export const OPTIONS_DATA = {
  job_category: [
    {id: 'it', label: 'Information Technology', count: 32},
    {id: 'beauty', label: 'Beauty & Cosmetology', count: 3},
  ],
  salary_range: [
    {id: '0-3', label: '0 - 3 LPA'},
    {id: '3-6', label: '3 - 6 LPA'},
    {id: '6-10', label: '6 - 10 LPA'},
    {id: '10plus', label: '10+ LPA'},
  ],
  work_mode: [
    {id: 'On-site', label: 'Work From Office'},
    {id: 'Remote', label: 'Remote'},
    {id: 'Hybrid', label: 'Hybrid'},
  ],
  job_type: [
    {id: 'Full-time', label: 'Full Time'},
    {id: 'Part-time', label: 'Part Time'},
    {id: 'Internship', label: 'Internship'},
    {id: 'Contract', label: 'Contract'},
  ],
  experience: [
    {id: 'Fresher', label: 'Fresher'},
    {id: '1-3', label: '1 - 3 Years'},
    {id: '3-5', label: '3 - 5 Years'},
    {id: '5plus', label: '5+ Years'},
  ],
};

export const productData = [
  {
    id: '1',
    title: 'Tiffin',
    Icon: Tiffin,
    url: 'https://www.tiffinservice.app/',
  },
  {
    id: '2',
    title: 'Jobs',
    Icon: Jobs,
    url: 'https://jobs.seaneb.com/',
  },
  {
    id: '3',
    title: 'Auto',
    Icon: Auto,
    url: 'https://auto.seaneb.com/',
  },
  {
    id: '4',
    title: 'Property',
    Icon: Property,
    url: 'https://property.seaneb.com/',
  },
  {
    id: '5',
    title: 'News',
    Icon: News,
    url: 'https://news.seaneb.com/',
  },
  {
    id: '6',
    title: 'NGO',
    Icon: Ngo,
    url: 'https://ngo.seaneb.com/',
  },
];
