import Joi from 'joi';

// Capitalization custom validation for firstName
const capitalizedName = Joi.string().custom((value, helpers) => {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const expected = value
    .split(' ')
    .map((word: string) => capitalize(word))
    .join(' ');

  if (value !== expected) {
    return helpers.error('string.capitalized', { value });
  }
  return value;
}, 'Capitalized Name Validation');

// Username schema
const userNameValidationSchema = Joi.object({
  firstName: capitalizedName.max(20).required().messages({
    'string.base': 'First Name must be a string',
    'string.empty': 'First Name is required',
    'string.max': 'First Name cannot exceed 20 characters',
    'string.capitalized': 'First Name must be capitalized',
  }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Last Name must contain only alphabetic characters',
      'string.empty': 'Last Name is required',
    }),
});

// Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's Name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's Occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': "Father's Contact Number is required",
  }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's Name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's Occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': "Mother's Contact Number is required",
  }),
});

// Local guardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local Guardian Address is required',
  }),
});

// Main student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name object is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': "Gender must be one of: 'male', 'female', or 'other'",
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
  }),
  contactNumber: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  emergencyContact: Joi.string().required().messages({
    'string.empty': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional()
    .messages({
      'any.only':
        "Blood group must be one of: 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'",
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian details are required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian details are required',
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
