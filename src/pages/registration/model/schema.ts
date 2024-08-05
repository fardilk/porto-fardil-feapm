import * as Yup from 'yup';
import { formStepsRegistrationMethodByPhone } from './variables';
import { RegistrationIForm } from './types';
import { useTranslate } from 'src/locales';

const useValidationSchemas = () => {
  const { t } = useTranslate();

  const createNewPatientSchema = Yup.object({
    name: Yup.string().required(t('validation.name_required')),
    gender: Yup.object().nullable().required(t('validation.gender_required')),
    birthPlace: Yup.string().required(t('validation.birth_place_required')),
    birthDate: Yup.string().required(t('validation.birth_date_required')),
    phoneNumber: Yup.string().required(t('validation.phone_number_required')),
    email: Yup.string().email(t('validation.invalid_email_format')).required(t('validation.email_required')),
    address: Yup.string().required(t('validation.address_required')),
    religion: Yup.object().nullable().required(t('validation.religion_required')),
  }) as Yup.ObjectSchema<RegistrationIForm>;

  const createDetailNewPatientSchema = Yup.object({
    bloodType: Yup.object().nullable().required(t('validation.blood_type_required')),
    study: Yup.object().nullable().required(t('validation.education_required')),
    marriage: Yup.object().nullable().required(t('validation.marital_status_required')),
    job: Yup.object().nullable().required(t('validation.occupation_required')),
    language: Yup.object().nullable().required(t('validation.language_required')),
  }) as Yup.ObjectSchema<RegistrationIForm>;

  const insertPhoneNumberSchema = Yup.object({
    phoneNumber: Yup.string().required(t('validation.phone_number_required')).min(10, t('validation.pho_number_format')),
  }) as Yup.ObjectSchema<RegistrationIForm>;

  // Default empty schema
  const defaultSchema = Yup.object({}) as Yup.ObjectSchema<RegistrationIForm>;

  const getValidationSchema = (
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

  return {
    getValidationSchema
  };
};

export default useValidationSchemas;
