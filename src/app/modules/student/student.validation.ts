import { z } from 'zod';

// Helper function for capitalized validation
const capitalizedName = z
  .string()
  .max(20, 'First Name cannot exceed 20 characters')
  .refine(
    (value) => {
      const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      const expected = value.split(' ').map(capitalize).join(' ');
      return value === expected;
    },
    {
      message: 'First Name must be capitalized',
    },
  );

// UserName Zod schema
const userNameValidationSchema = z.object({
  firstName: capitalizedName,
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: 'Last Name must contain only letters' }),
});

// Guardian Zod schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's Name is required"),
  fatherOccupation: z.string().min(1, "Father's Occupation is required"),
  fatherContactNo: z.string().min(1, "Father's Contact Number is required"),
  motherName: z.string().min(1, "Mother's Name is required"),
  motherOccupation: z.string().min(1, "Mother's Occupation is required"),
  motherContactNo: z.string().min(1, "Mother's Contact Number is required"),
});

// Local Guardian Zod schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1, 'Local Guardian Occupation is required'),
  contactNo: z.string().min(1, 'Local Guardian Contact Number is required'),
  address: z.string().min(1, 'Local Guardian Address is required'),
});

// Main Student Zod schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(30, 'Password cannot exceed 30 characters'),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be one of: 'male', 'female', 'other'",
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email address'),
      contactNumber: z.string().min(1, 'Contact Number is required'),
      emergencyContact: z
        .string()
        .min(1, 'Emergency Contact Number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present Address is required'),
      permanentAddress: z.string().min(1, 'Permanent Address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
