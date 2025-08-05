import { UserService } from './user.service';
import { Request, Response } from 'express';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // creating a schema for validation using zod

    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);

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
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
