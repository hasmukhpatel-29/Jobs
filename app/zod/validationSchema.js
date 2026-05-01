import {z} from 'zod';
import {parsePhoneNumberFromString} from 'libphonenumber-js/max';

const websiteUrlRegex =
  /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;

// Helper function to add https:// if missing
const addHttpIfMissings = url => {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

export const websiteUrlSchema = z
  .string()
  .trim()
  .transform(url => (url === '' ? '' : addHttpIfMissings(url)))
  .refine(url => url === '' || websiteUrlRegex.test(url), {
    message: 'Enter a valid website URL (e.g., https://example.com)',
  });

export const phoneSchema = (phoneCode, countryCode) =>
  z.object({
    phone: z
      .string()
      .min(1, 'Phone is required')
      .regex(/^\d+$/, 'Only digits allowed')
      .refine(val => {
        const fullNumber = `${phoneCode}${val}`;
        const phone = parsePhoneNumberFromString(fullNumber, countryCode);

        if (!phone || !phone.isValid()) return false;

        if (countryCode === 'IN') {
          return /^[6-9]\d{9}$/.test(val);
        }

        return true;
      }, 'Invalid phone number'),
  });

export const registerSchema = z.object({
  first_name: z
    .string()
    .trim()
    .nonempty('First name is required')
    .min(3, 'First name must be at least 3 characters long')
    .max(20, 'First name cannot exceed 20 characters'),

  last_name: z
    .string()
    .trim()
    .nonempty('Last name is required')
    .min(3, 'Last name must be at least 3 characters long')
    .max(20, 'Last name cannot exceed 20 characters'),

  seaneb_id: z
    .string({required_error: 'SeaNeb ID is required'})
    .trim()
    .min(10, 'SeaNeb ID must be 10–20 characters')
    .max(20, 'SeaNeb ID must be 10–20 characters')
    .regex(/^[a-z0-9-]+$/, 'Use only lowercase letters, numbers, and -'),

  email: z
    .string()
    .trim()
    .optional()
    .refine(val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    }),
  dob: z
    .string()
    .nonempty('Date of Birth is required')
    .regex(
      /^(?:(?:(?:0[1-9]|1\d|2[0-8])\/(?:0[1-9]|1[0-2])|(?:29|30)\/(?:0[13-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/\d{4}|29\/02\/(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00))$/,
      'Invalid date. Please use a valid date in DD/MM/YYYY format',
    )

    .refine(date => {
      const [day, month, year] = date.split('/').map(Number);
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);

      let age = today.getFullYear() - birthDate.getFullYear();

      const hasHadBirthday =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());

      if (!hasHadBirthday) {
        age--;
      }

      return age >= 13;
    }, 'You must be at least 13 years old to register')
    .transform(date => {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    }),
  gender: z.string().min(1, 'Please select gender'),
  place_name: z.string().trim().nonempty('Home town is required'),
  // avatar: z.string().min(1, 'Image is required'),
});

export const LegalFormSchema = z.object({
  panNumber: z
    .string()
    .nullable()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0) {
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'PAN Number must be in the format ABCDE1234F',
          });
        }
        if (val.length !== 10) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'PAN Number must be exactly 10 characters long',
          });
        }
      }
    }),
  gstNumber: z
    .string()
    .nullable()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0 && val.length !== 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'GST Number must be exactly 15 characters',
        });
      }
    }),

  businessLegalName: z
    .string()
    .trim()
    .nonempty('Business name is required')
    .min(3, 'Business name must be at least 3 characters long'),

  termsAndConditionsAccepted: z
    .boolean()
    .refine(val => val === true, 'You must accept the terms and conditions'),

  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  area: z.string().optional(),
  pincode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),

  document_link: z
    .union([z.string(), z.object({uri: z.string(), type: z.string()})])
    .optional(),
});

export const AddressFormSchema = z.object({
  addressLine1: z.string().trim().min(1, 'Address Line 1 is required'),

  addressLine2: z.string().trim().optional(),

  area: z.string().trim().min(1, 'Area is required'),

  city: z.string().trim().min(1, 'City is required'),

  state: z.string().trim().min(1, 'State is required'),

  main_category_id: z.string().min(1, 'Business category is required'),
});
export const ContactFormSchema = z.object({
  displayName: z.string().trim().min(1, 'Business registered name is required'),
  seaneb_id: z
    .string({required_error: 'SeaNeb ID is required'})
    .trim()
    .min(10, 'SeaNeb ID must be 10–20 characters')
    .max(20, 'SeaNeb ID must be 10–20 characters')
    .regex(/^[a-z0-9-]+$/, 'Use only lowercase letters, numbers, and -'),
  contact_number: z
    .string()
    .min(10, 'Contact number must be 10 digits')
    .max(10, 'Contact number must be 10 digits')
    .regex(/^[0-9]+$/, 'Contact number must be digits only'),
  whatsapp_number: z.string().nullable().optional(),
  email: z
    .string()
    .trim()
    .optional()
    .refine(val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    }),

  website: websiteUrlSchema.optional(),
  image: z.string().url('Image must be a valid URL').optional(),
});
export const EditBusinessSchema = (
  phoneCode,
  countryCode,
  whatsappPhoneCode,
  whatsappCountryCode,
) =>
  z.object({
    primary_number: z
      .string()
      .min(1, 'Contact number is required')
      .regex(/^\d+$/, 'Only digits allowed')
      .refine(val => {
        const fullNumber = `${phoneCode}${val}`;
        const phone = parsePhoneNumberFromString(fullNumber, countryCode);

        if (!phone || !phone.isValid()) return false;

        if (countryCode === 'IN') {
          return /^[6-9]\d{9}$/.test(val);
        }

        return true;
      }, 'Invalid contact number'),

    whatsapp_number: z
      .string()
      .optional()
      .nullable()
      .refine(val => {
        if (!val) return true;

        const fullNumber = `${whatsappPhoneCode}${val}`;
        const phone = parsePhoneNumberFromString(
          fullNumber,
          whatsappCountryCode,
        );

        if (!phone || !phone.isValid()) return false;

        if (whatsappCountryCode === 'IN') {
          return /^[6-9]\d{9}$/.test(val);
        }

        return true;
      }, 'Invalid WhatsApp number'),

    email: z
      .string()
      .trim()
      .optional()
      .refine(val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: 'Invalid email address',
      }),

    website: websiteUrlSchema.optional(),

    image: z.string().url('Image must be a valid URL').optional(),
  });

export const profileAddressSchema = isSameAsPermanent =>
  z.object({
    headline: z.string().optional(),
    bio: z.string().optional(),

    address: z.string().optional(),
    area: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    country: z.string().min(2, 'Country is required'),

    pincode: z
      .string()
      .regex(/^[0-9]*$/, 'Only numbers allowed')
      .optional(),

    current_address: z.string().optional(),
    current_area: z.string().optional(),

    current_city: isSameAsPermanent
      ? z.string().optional()
      : z.string().min(2, 'City is required'),

    current_state: isSameAsPermanent
      ? z.string().optional()
      : z.string().min(2, 'State is required'),

    current_country: isSameAsPermanent
      ? z.string().optional()
      : z.string().min(2, 'Country is required'),

    current_pincode: z
      .string()
      .regex(/^[0-9]*$/, 'Only numbers allowed')
      .optional(),
  });

export const educationSchema = isCurrentlyStudying =>
  z
    .object({
      degree: z.string().min(2, 'Degree is required'),
      college: z.string().min(2, 'College / Institute is required'),
      city: z.string().min(2, 'City is required'),
      percentage: z.string().optional(),

      start_month_year: z
        .string()
        .min(7, 'Start date is required')
        .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid format (MM/YYYY)'),

      end_month_year: isCurrentlyStudying
        ? z.string().optional()
        : z
            .string()
            .min(7, 'End date is required')
            .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid format (MM/YYYY)'),
    })
    .refine(
      data => {
        if (isCurrentlyStudying) return true;

        const validFormat = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (
          data.start_month_year &&
          validFormat.test(data.start_month_year) &&
          data.end_month_year &&
          validFormat.test(data.end_month_year)
        ) {
          const [startMonth, startYear] = data.start_month_year.split('/');
          const [endMonth, endYear] = data.end_month_year.split('/');

          const startDate = new Date(
            Number(startYear),
            Number(startMonth) - 1,
            1,
          );
          const endDate = new Date(Number(endYear), Number(endMonth) - 1, 1);

          return startDate < endDate;
        }

        return true;
      },
      {
        message: 'End date must be after start date',
        path: ['end_month_year'],
      },
    );

export const experienceSchema = isCurrentlyWorking =>
  z
    .object({
      company: z.string().min(2, 'Company is required'),
      role: z.string().min(2, 'Role / Title is required'),
      city: z.string().min(2, 'City is required'),
      ctc: z.string().optional(),
      achievement_title: z.string().optional(),
      achievement_desc: z.string().optional(),

      start_month_year: z
        .string()
        .min(7, 'Start date is required')
        .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid format (MM/YYYY)'),

      end_month_year: isCurrentlyWorking
        ? z.string().optional()
        : z
            .string()
            .min(7, 'End date is required')
            .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid format (MM/YYYY)'),
    })
    .refine(
      data => {
        // Skip date comparison if currently working there
        if (isCurrentlyWorking) return true;

        const validFormat = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (
          data.start_month_year &&
          validFormat.test(data.start_month_year) &&
          data.end_month_year &&
          validFormat.test(data.end_month_year)
        ) {
          const [startMonth, startYear] = data.start_month_year.split('/');
          const [endMonth, endYear] = data.end_month_year.split('/');

          const startDate = new Date(
            Number(startYear),
            Number(startMonth) - 1,
            1,
          );
          const endDate = new Date(Number(endYear), Number(endMonth) - 1, 1);

          return startDate < endDate;
        }
        return true;
      },
      {
        message: 'End date must be after start date',
        path: ['end_month_year'],
      },
    );

export const skillSchema = z.object({
  skill_name: z
    .string({required_error: 'Skill name is required'})
    .trim()
    .min(1, 'Skill name cannot be empty')
    .max(50, 'Skill name is too long'),
});
