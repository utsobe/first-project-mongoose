import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First Name cannot exceed 20 characters'],
    validate: {
      validator: (v: string) => {
        function capitalize(str: string): string {
          if (!str) return '';
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        const capialized = v
          .split(' ')
          .map((word) => capitalize(word))
          .join(' ');

        return v === capialized;
      },
      message: '{VALUE} is not a capialized format',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (v: string) => validator.isAlpha(v),
      message: '{VALUE} is not a valid last name',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'TStudent ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name object is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not supported. Please use one of: 'male', 'female', 'other'",
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact Number is required'],
    },
    emergencyContact: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message:
          "{VALUE} is not a valid blood group. Allowed values are: 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'",
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian details are required'],
    },
    profileImage: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // Include virtuals in the JSON output
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName ? this.name.middleName + ' ' : ''}${this.name.lastName}`;
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  // Check if a student with the given ID exists
  const existingUser = await Student.findOne({ id });
  return existingUser; // Return true if user exists, false otherwise
};

// Query middleware: will work before executing the query
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } }); // Exclude deleted students from the query
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Export the model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
