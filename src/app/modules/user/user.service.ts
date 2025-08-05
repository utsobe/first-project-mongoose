import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // if password is not provided, use the default password
  userData.password = password || (config.default_password as string);

  // Set Student Role
  userData.role = 'student';

  // Set manually generated ID
  userData.id = '203010001';

  // Create a new userData
  const newUser = await User.create(userData);

  // Create a student object
  if (Object.keys(newUser).length) {
    // set id, _id as userData
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id

    const newStudent = await Student.create(studentData);

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
