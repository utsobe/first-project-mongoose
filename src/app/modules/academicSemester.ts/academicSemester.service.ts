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

const getAllAcademicSemestersFromDB = async (): Promise<
  TAcademicSemester[]
> => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleAcademicSemesterFromDB = async (
  semesterId: string,
): Promise<TAcademicSemester | null> => {
  const result = await AcademicSemester.findById(semesterId);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
): Promise<TAcademicSemester | null> => {
  // semester name --> semester code
  if (payload.name && payload.code) {
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
      throw new Error(
        `Semester name ${payload.name} does not match with code ${payload.code}`,
      );
    }
  }

  const result = await AcademicSemester.findByIdAndUpdate(semesterId, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
