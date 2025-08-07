import z from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constants';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
      errorMap: () => ({
        message: "Semester name must be one of: 'Autumn', 'Summer', 'Fall'",
      }),
    }),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      errorMap: () => ({
        message: "Semester code must be one of: '01', '02', '03'",
      }),
    }),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      errorMap: () => ({
        message: 'Start Month must be a valid month',
      }),
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      errorMap: () => ({
        message: 'End Month must be a valid month',
      }),
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
