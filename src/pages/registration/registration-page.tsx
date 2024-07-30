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
import { getDummyData } from './model/functions';
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
import { useMemo } from 'react';
import { useSelector } from 'src/store/store';

const RegistrationPage = () => {
  
  const isSimplify = useSelector((root) => root.config.simplify);

  const defaultValues: RegistrationIForm = {
    nik: '',
    citizenship: false,
  };

  const { t } = useTranslate();

  const navigate = useNavigate();

  const { currentPage, currentPageIndex, handleChangePage } = useStepper({
    initialSteps: formStepsExistInInternal,
  });

  const methods = useForm({ defaultValues });
  const { handleSubmit, watch } = methods;
  const isForeign = watch('citizenship');

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 0) {
      if (isForeign) {
        handleChangePage({ action: 'next', newFormSteps: formStepsForeign });
      } else {
        const dataNIK = data.nik.replace('\n', '');
        console.log(dataNIK, 'data form');
        const resp = await getDummyData(dataNIK === '123' ? 'medrec_exist' : 'medrec_not_exist');

        if (resp.data === 'medrec_exist') {
          handleChangePage({ action: 'next', newFormSteps: formStepsExistInInternal });
        } else {
          handleChangePage({ action: 'next', newFormSteps: formStepsNotExistInternal });
        }
      }
    } else {
      switch (currentPage.value) {
        case 'insert_email':
          handleChangePage({ toSpecificPage: 'information' });
          break;
        default: {
          handleChangePage({ action: 'next' });
        }
      }
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
                rightButtonProps={{ onClick: () => handleChangePage({ action: 'next' }) }}
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
              />
            )}

            {currentPage.value === 'create_new_patient' && (
              <NewPatient
                handleNextPage={() => {
                  if (isSimplify) handleChangePage({ toSpecificPage: 'confirmation_new_patient' });
                  else handleChangePage({ action: 'next' });
                }}
                handlePreviousPage={() => handleChangePage({ action: 'previous' })}
              />
            )}

            {currentPage.value === 'confirmation_new_patient' && (
              <PatientInformation
                leftTextButton={t('registration.button.wrong_data')}
                rigthTextButton={t('registration.button.correct_data')}
                leftButtonProps={{ onClick: () => handleChangePage({ action: 'previous' }) }}
                rightButtonProps={{ onClick: () => handleChangePage({ action: 'next' }) }}
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
