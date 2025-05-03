import * as yup from 'yup';

export const encounterSchema = yup.object().shape({
  createNewInsurance: yup.string(),
  createPaymentScheme: yup
    .object()
    .nullable()
    .when('createNewInsurance', {
      is: (val: any) => val,
      then: (schema) => schema.required('Required'),
    }),
  createPolisNumber: yup.string().when('createNewInsurance', {
    is: (val: any) => val,
    then: (schema) => schema.required('Required'),
  }),
  createPolisHolder: yup.string().when('createNewInsurance', {
    is: (val: any) => val,
    then: (schema) => schema.required('Required'),
  }),
});
