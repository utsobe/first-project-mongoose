import { TStudent } from './student.interface';
import { Student } from './student.model';

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
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
