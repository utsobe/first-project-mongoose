import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (
  studentData: TStudent,
): Promise<TStudent> => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Student already exists');
  }
  const result = await Student.create(studentData); // built in static method

  //   const student = new Student(studentData); // create an instance of the model
  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error('Student already exists');
  //   }
  //   const result = await student.save(); // built in instance method
  return result;
};

const getAllStudentsFromDB = async (): Promise<TStudent[]> => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //   const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    { $match: { id } }, // Match the student by ID
  ]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
