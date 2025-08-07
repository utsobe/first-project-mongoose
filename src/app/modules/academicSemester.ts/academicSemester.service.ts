import { academicSemesterNameCodeMapper } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (
  payload: TAcademicSemester,
): Promise<TAcademicSemester> => {
  // semester name --> semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error(
      `Semester name ${payload.name} does not match with code ${payload.code}`,
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
};
