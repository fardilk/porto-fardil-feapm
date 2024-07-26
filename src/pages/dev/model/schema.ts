import * as yup from 'yup';

export const devSchema = yup.object().shape<any>({
  textfield: yup.object().required('Enter Text'),
  component: yup.object().nullable().required('Select Component'),
  autocomplete: yup.object().nullable().required('Select Autocomplete'),
});
