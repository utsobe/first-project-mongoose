import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
