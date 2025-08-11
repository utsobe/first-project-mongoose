import z from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Faculty name is required'),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Faculty name is required'),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
