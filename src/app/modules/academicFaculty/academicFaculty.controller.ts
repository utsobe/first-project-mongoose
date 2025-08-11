import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const payload = req.body;
  const academicFaculty =
    await AcademicFacultyService.createAcademicFacultyIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty created successfully',
    data: academicFaculty,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const academicFaculties =
    await AcademicFacultyService.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    data: academicFaculties,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const academicFaculty =
    await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrieved successfully',
    data: academicFaculty,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const payload = req.body;
  const academicFaculty =
    await AcademicFacultyService.updateAcademicFacultyIntoDB(
      facultyId,
      payload,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: academicFaculty,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
