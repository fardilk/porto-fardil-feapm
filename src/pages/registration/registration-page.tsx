import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AppPage } from 'src/components/app-page';
import { Form } from 'src/components/hook-form';
import { WindowContainer } from 'src/components/window-container';
import { useStepper } from 'src/hooks';
import {
  BarcodePhone,
  DetailNewPatient,
  InsertEmail,
  InsertPhone,
  NewPatient,
  PatientInformation,
  SelectRegistrationMethod,
  SuccessNewPatient,
} from './components';
import type { RegistrationIForm } from './model/types';
import { InsertIdentifier } from 'src/components/insert-identifier';
import {
  formStepsExistInInternal,
  formStepsExistInSatuSehat,
  formStepsForeign,
  formStepsNotExistInSatuSehat,
  formStepsNotExistInternal,
  formStepsRegistrationMethodByPhone,
} from './model/variables';
import { useTranslate } from 'src/locales';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'src/store/store';
import { postPatient } from './model/functions';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchema } from './model/schema';

const RegistrationPage = () => {
  const isSimplify = useSelector((root) => root.config.simplify);

  const defaultValues: RegistrationIForm = {
    nik: '',
    citizenship: false,
    name: '',
    gender: {
      label: '',
      value: '',
    },
    birthPlace: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    address: '',
    bloodType: {
      label: '',
      value: '',
    },
    religion: {
      label: '',
      value: '',
    },
    study: {
      label: '',
      value: '',
    },
    marriage: {
      label: '',
      value: '',
    },
    job: {
      label: '',
      value: '',
    },
    language: {
      label: '',
      value: '',
    },
  };

  const { t } = useTranslate();

  const navigate = useNavigate();

  const { currentPage, currentPageIndex, handleChangePage, formSteps } = useStepper({
    initialSteps: formStepsExistInInternal,
  });

  // const methods = useForm<RegistrationIForm>({
  //   defaultValues,
  //   resolver: yupResolver(getValidationSchema(currentPage, watch('citizenship'), formSteps)),
  // });

  // const methods = useForm();
  // const { handleSubmit, watch } = methods;
  const watch = useForm().watch
  const value = watch();
  const isForeign = watch('citizenship');

  const methods = useForm<RegistrationIForm>({
    defaultValues,
    resolver: yupResolver(getValidationSchema(currentPage.value, isForeign, formSteps)),
  });

  const { handleSubmit, formState: { errors } } = methods;

  const createPatient = useCallback(
    async (payload: {
      data: {
        nik: string;
        passportNumber: string;
        name: string;
        gender: string;
        birthPlace: string;
        birthDttm: string;
        phone: string;
        email: string;
        nationality: string;
        address: string;
        additional: {
          bloodType: string;
          religion: string;
          education: string;
          maritalStatus: string;
          occupation: string;
          dailyLanguage: string;
        };
      };
    }) => {
      try {
        const response = await postPatient(payload);
        console.log('success', response);
        handleChangePage({ action: 'next' });
      } catch (e) {
        console.log(e);
      }
    },
    [handleChangePage]
  );

  const onSubmit = async (data: any) => {
    console.log('Form data:', data);
    console.log('ooo', currentPage.value);
    try{if (currentPageIndex === 0) {
      if (isForeign) {
        console.log(data.nik.replace('\n', ''));
        handleChangePage({ action: 'next', newFormSteps: formStepsForeign });
      } else {
        const dataNIK = data.nik.replace('\n', '');
        console.log(dataNIK, 'data form');
        // const resp = await getDummyData(dataNIK === '123' ? 'medrec_exist' : 'medrec_not_exist');

        const resp = dataNIK === '123' ? 'medrec_exist' : 'medrec_not_exist';

        console.log(resp)
        if (resp === 'medrec_exist') {
          handleChangePage({ action: 'next', newFormSteps: formStepsExistInInternal });
        } else {
          handleChangePage({ action: 'next', newFormSteps: formStepsNotExistInternal });
        }
      }
    } else if (currentPageIndex !== 0) {
      // console.log("kkkk", formSteps, formSteps===formStepsRegistrationMethodByPhone)
      if (currentPage.value === 'insert_email') {
        handleChangePage({ toSpecificPage: 'information' });
      } else if (
        currentPage.value === 'confirmation_new_patient' ||
        (currentPage.value === 'insert_phone_number' &&
          formSteps === formStepsRegistrationMethodByPhone)
      ) {
        console.log('takde');
        const payload = {
          data: {
            nik: isForeign ? '' : data.nik.replace('\n', ''),
            passportNumber: isForeign ? data.nik.replace('\n', '') : '',
            name: data.name,
            gender: data.gender.value,
            birthPlace: data.birthPlace,
            birthDttm: data.birthDate,
            phone: data.phoneNumber.replace('\n', ''),
            email: data.email,
            nationality: isForeign ? 'WNA' : 'WNI',
            address: data.address,
            additional: {
              bloodType: data.bloodType.value,
              religion: data.religion.value,
              education: data.study.value,
              maritalStatus: data.marriage.value,
              occupation: data.job.value,
              dailyLanguage: data.language.value,
            },
          },
        };
        createPatient(payload);
      }
      else if(currentPage.value==='create_new_patient' && isSimplify){
        handleChangePage({ toSpecificPage: 'confirmation_new_patient' });
      }
      else {
        console.log("hayo")
        handleChangePage({ action: 'next' });
      }
    }}
    catch (error) {
      // Log the error if submission fails
      console.log('Submission error:', error);
    }
  };

  const getTitle = useMemo(
    () => (currentPage?.properties?.i18n ? t(currentPage?.properties?.i18n) : currentPage.label),
    [currentPage, t]
  );

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title={getTitle}
          handleBackNavigation={() => handleChangePage({ action: 'previous' })}
          handleCloseNavigation={() => navigate('/', { replace: true })}
          hideBackNavigation={currentPage.properties?.hideBack}
          hideCloseNavigation={currentPage.properties?.hideClose}
        >
          <Box sx={{ p: 4 }}>
            {currentPage.value === 'insert_nik' && <InsertIdentifier />}

            {currentPage.value === 'information' && (
              <PatientInformation
                leftTextButton={t('registration.button.back_to_home')}
                rigthTextButton={t('registration.button.edit_phone_email')}
                leftButtonProps={{
                  onClick: () => handleChangePage({ toSpecificPage: 'insert_nik' }),
                }}
                // rightButtonProps={{ onClick: () => handleChangePage({ action: 'next' }) }}
              />
            )}

            {currentPage.value === 'select_registration_method' && (
              <SelectRegistrationMethod
                handleByPhone={() =>
                  handleChangePage({
                    action: 'next',
                    newFormSteps: formStepsRegistrationMethodByPhone,
                  })
                }
                handleByAnjungan={() => {
                  console.log(watch('nik'))
                  if (watch('nik').trim() === '12') {
                    handleChangePage({
                      action: 'next',
                      newFormSteps: formStepsExistInSatuSehat,
                    });
                  } else {
                    handleChangePage({
                      action: 'next',
                      newFormSteps: formStepsNotExistInSatuSehat,
                    });
                  }
                }}
              />
            )}

            {currentPage.value === 'insert_phone_number' && <InsertPhone />}

            {currentPage.value === 'barcode_phone' && <BarcodePhone />}

            {currentPage.value === 'insert_email' && <InsertEmail />}

            {currentPage.value === 'create_detail_new_patient' && (
              <DetailNewPatient
                handleNextPage={() => handleChangePage({ action: 'next' })}
                handlePreviousPage={() => handleChangePage({ action: 'previous' })}
                errors={errors}
              />
            )}

            {currentPage.value === 'create_new_patient' && (
              <NewPatient
                handleNextPage={() => {
                  if (isSimplify) handleChangePage({ toSpecificPage: 'confirmation_new_patient' });
                  else handleChangePage({ action: 'next' });
                }}
                handlePreviousPage={() => handleChangePage({ action: 'previous' })}
                errors={errors}
              />
            )}

            {currentPage.value === 'confirmation_new_patient' && (
              <PatientInformation
                leftTextButton={t('registration.button.wrong_data')}
                rigthTextButton={t('registration.button.correct_data')}
                leftButtonProps={{
                  onClick: () => {
                    if (isSimplify) handleChangePage({ toSpecificPage: 'create_new_patient' });
                    else handleChangePage({ action: 'previous' });
                  },
                }}
                // rightButtonProps = {{
                //   onClick: async () => {
                //     await registerPatient();
                //     handleChangePage({ action: 'next' });
                //   }
                // }}
              />
            )}

            {currentPage.value === 'success_new_patient' && (
              <SuccessNewPatient handleFinish={() => navigate('/')} />
            )}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
};

export default RegistrationPage;
