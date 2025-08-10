import config from '../../config';
import { TAcademicSemester } from '../academicSemester.ts/academicSemester.interface';
import { AcademicSemester } from '../academicSemester.ts/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // if password is not provided, use the default password
  userData.password = password || (config.default_password as string);

  // Set Student Role
  userData.role = 'student';

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // Set manually generated ID
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // Create a new userData
  const newUser = await User.create(userData);

  // Create a student object
  if (Object.keys(newUser).length) {
    // set id, _id as userData
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
