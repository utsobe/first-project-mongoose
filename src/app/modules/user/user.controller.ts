import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req, res) => {
  // creating a schema for validation using zod

  const { password, student: studentData } = req.body;

  const result = await UserService.createStudentIntoDB(password, studentData);

  // if (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'Failed to create student',
  //     error: error.details,
  //   });
  // }

  // res.status(200).json({
  //   success: true,
  //   message: 'Student created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
