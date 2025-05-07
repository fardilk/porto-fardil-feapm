import * as yup from 'yup';

export const reservationSchema = yup.object().shape<any>({
  // date: yup.date().required('Field Date is Required'),
  // unable: yup
  //   .string()
  //   .oneOf(['Pindah Jadwal', 'Batal Kunjungan'])
  //   .required('This Field is Required'),
  // bookTime: yup.array().of(yup.number()).min(1).required('At least one time slot is required'),
  createNewInsurance: yup.boolean(),
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
