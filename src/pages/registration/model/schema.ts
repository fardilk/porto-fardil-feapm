import { t } from 'i18next';
import * as Yup from 'yup';
import { formStepsRegistrationMethodByPhone } from './variables';

export const registrationSchema = Yup.object().shape({
  currentPage: Yup.string(),
  citizenship: Yup.boolean(),
  formSteps: Yup.array(),
  name: Yup.string().when('currentPage', {
    is: 'create_new_patient',
    then: (s) => s.required(t('validation.name_required')),
  }),
  gender: Yup.object()
    .nullable()
    .when('currentPage', {
      is: 'create_new_patient',
      then: (s) => s.required(t('validation.gender_required')),
    }),
  birthPlace: Yup.string().when('currentPage', {
    is: 'create_new_patient',
    then: (s) => s.required(t('validation.birth_place_required')),
  }),
  birthDate: Yup.string().when('currentPage', {
    is: 'create_new_patient',
    then: (s) => s.required(t('validation.birth_date_required')),
  }),
  phoneNumber: Yup.string().when('currentPage', {
    is: 'create_new_patient',
    then: (s) => s.required(t('validation.phone_number_required')),
    otherwise: (s) =>
      s.when('currentPage', {
        is: 'insert_phone_number',
        then: (sx) =>
          sx.when('formSteps', {
            is: formStepsRegistrationMethodByPhone,
            then: (cs) =>
              cs
                .required(t('validation.phone_number_required'))
                .min(10, t('validation.pho_number_format')),
          }),
      }),
  }),
  email: Yup.string().when('currentPage', {
    is: 'create_new_patient',
    then: (s) =>
      s.email(t('validation.invalid_email_format')).required(t('validation.email_required')),
  }),
  address: Yup.string().when('currentPage', {
    is: 'create_new_patient',
    then: (s) => s.required(t('validation.address_required')),
  }),
  religion: Yup.object()
    .nullable()
    .when('currentPage', {
      is: 'create_new_patient',
      then: (s) => s.required(t('validation.religion_required')),
    }),
  bloodType: Yup.object()
    .nullable()
    .when('currentPage', {
      is: 'create_detail_new_patient',
      then: (s) => s.required(t('validation.blood_type_required')),
    }),
  study: Yup.object()
    .nullable()
    .when('currentPage', {
      is: 'create_detail_new_patient',
      then: (s) => s.required(t('validation.education_required')),
    }),
  marriage: Yup.object()
    .nullable()
    .when('currentPage', {
      is: 'create_detail_new_patient',
      then: (s) => s.required(t('validation.marital_status_required')),
    }),
  job: Yup.object()
    .nullable()
    .when('currentPage', {
      is: 'create_detail_new_patient',
      then: (s) => s.required(t('validation.occupation_required')),
    }),
  language: Yup.object()
    .nullable()
    .when('currentPage', {
      is: 'create_detail_new_patient',
      then: (s) => s.required(t('validation.language_required')),
    }),
});
