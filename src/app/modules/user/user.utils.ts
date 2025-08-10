import { TAcademicSemester } from '../academicSemester.ts/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year, semesterCode, 4 digit number , 2025010001
export const generateStudentId = async (payload: TAcademicSemester) => {
  // First time 0000
  let currentId = (0).toString(); // Default to '0000'

  if (await findLastStudentId()) {
    const lastStudentId = await findLastStudentId();
    // 2023010001
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01
    const lastStudentYear = lastStudentId?.substring(0, 4); // 2025
    const currentSemesterCode = payload.code; // 01
    const currentYear = payload.year; // 2025
    if (
      lastStudentId &&
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentYear
    ) {
      // Convert to number and increment
      currentId = lastStudentId.substring(6); // 0001
    }
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
