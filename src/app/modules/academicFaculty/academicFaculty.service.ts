import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const academicFaculty = await AcademicFaculty.create(payload);
  return academicFaculty;
};

const getAllAcademicFacultiesFromDB = async () => {
  const academicFaculties = await AcademicFaculty.find({}).lean();
  return academicFaculties;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const academicFaculty = await AcademicFaculty.findById(id).lean();
  if (!academicFaculty) {
    throw new Error('Academic Faculty not found');
  }
  return academicFaculty;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const academicFaculty = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!academicFaculty) {
    throw new Error('Academic Faculty not found');
  }
  return academicFaculty;
};

export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
