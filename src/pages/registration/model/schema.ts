import * as Yup from 'yup';
import { formStepsRegistrationMethodByPhone } from './variables';
import { RegistrationIForm } from './types';

// Define the validation schemas for each step
const createNewPatientSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  gender: Yup.object({
    label: Yup.string().required('Gender label is required'),
    value: Yup.string().required('Gender value is required'),
  }),
  birthPlace: Yup.string().required('Birthplace is required'),
  birthDate: Yup.string().required('Birth date is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  address: Yup.string().required('Address is required'),
  religion: Yup.object({
    label: Yup.string().required('Religion label is required'),
    value: Yup.string().required('Religion value is required'),
  }),
}) as Yup.ObjectSchema<RegistrationIForm>;

const createDetailNewPatientSchema = Yup.object({
  bloodType: Yup.object({
    label: Yup.string().required('Blood type label is required'),
    value: Yup.string().required('Blood type value is required'),
  }),
  study: Yup.object({
    label: Yup.string().required('Education level label is required'),
    value: Yup.string().required('Education level value is required'),
  }),
  marriage: Yup.object({
    label: Yup.string().required('Marital status label is required'),
    value: Yup.string().required('Marital status value is required'),
  }),
  job: Yup.object({
    label: Yup.string().required('Occupation label is required'),
    value: Yup.string().required('Occupation value is required'),
  }),
  language: Yup.object({
    label: Yup.string().required('Daily language label is required'),
    value: Yup.string().required('Daily language value is required'),
  }),
}) as Yup.ObjectSchema<RegistrationIForm>;

const insertPhoneNumberSchema = Yup.object({
  phoneNumber: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 characters'),
}) as Yup.ObjectSchema<RegistrationIForm>;

// Default empty schema
const defaultSchema = Yup.object({}) as Yup.ObjectSchema<RegistrationIForm>;

// Function to get the appropriate validation schema
export const getValidationSchema = (
  currentPageValue: string,
  isForeign: boolean,
  formSteps: any[]
): Yup.ObjectSchema<RegistrationIForm> => {
  if (currentPageValue === 'create_new_patient') {
    return createNewPatientSchema;
  }

  if (currentPageValue === 'create_detail_new_patient') {
    return createDetailNewPatientSchema;
  }

  if (currentPageValue === 'insert_phone_number' && formSteps === formStepsRegistrationMethodByPhone) {
    return insertPhoneNumberSchema;
  }

  return defaultSchema;
};
