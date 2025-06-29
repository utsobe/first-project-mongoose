import { Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema for validation using zod

    const { student: studentData } = req.body;

    //data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await StudentService.createStudentIntoDB(zodParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Failed to create student',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create student',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to retrieve students',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to retrieve student',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to delete student',
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
