import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { AppPage } from 'src/components/app-page';
import { Form } from 'src/components/hook-form';
import { InsertIdentifier } from 'src/components/insert-identifier';
import { WindowContainer } from 'src/components/window-container';
import { usePartialState, useStepper } from 'src/hooks';
import { useTranslate } from 'src/locales';
import { useSelector } from 'src/store/store';
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
import { patientCreate, patientGet, patientUpdate } from './model/functions';
import { patientToIForm, regIFormToInput } from './model/helper';
import useValidationSchemas from './model/schema';
import { Patient, PatientCreateInput, type RegistrationIForm } from './model/types';
import {
  formStepsExistInInternal,
  formStepsExistInSatuSehat,
  formStepsNotExistInSatuSehat,
  formStepsNotExistInternal,
  formStepsRegistrationMethodByPhone
} from './model/variables';
import { timeout } from 'src/utils/timeout';

const RegistrationPage = () => {

  const [errors, setErrors] = usePartialState({ errorNIK: "" })

  const [patientSuccess, setPatientSuccess] = useState<Patient | null>(null)
  const isSimplify = useSelector((root) => root.config.simplify);

  const defaultValues: RegistrationIForm = {
    patientID: '',
    isRegistered: false,
    nik: '',
    citizenship: false,
    name: '',
    gender: null,
    birthPlace: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    address: '',
    bloodType: null,
    religion: null,
    study: null,
    marriage: null,
    job: null,
    language: null,
  };

  const { t } = useTranslate();

  const navigate = useNavigate();

  const { currentPage, currentPageIndex, handleChangePage, formSteps } = useStepper({
    initialSteps: formStepsExistInInternal,
  });

  const methodsDefault = useForm()
  const { watch } = methodsDefault

  const isForeign = watch('citizenship') === "WNA"

  const [isSatuSehat, setIsSatuSehat] = useState(false)
  const { getValidationSchema } = useValidationSchemas();

  const methods = useForm<RegistrationIForm>({
    defaultValues,
    resolver: yupResolver(getValidationSchema(currentPage.value, isForeign, formSteps)),
    mode: "onChange"
  });

  const { handleSubmit, reset, resetField, setValue } = methods;

  const getTitle = useMemo(
    () => (currentPage?.properties?.i18n ? t(currentPage?.properties?.i18n) : currentPage.label),
    [currentPage, t]
  );

  const createPatient = useCallback(
    async (payload: {
      data: PatientCreateInput
    }) => {
      try {
        const response = await patientCreate(payload);
        setPatientSuccess(response.data)
        handleChangePage({ action: 'next' });
        toast.success("Berhasil")
      } catch (e) {
        toast.error("Gagal")
      }
    },
    [handleChangePage]
  );

  const onSubmit = async (data: RegistrationIForm) => {
    try {
      if (currentPageIndex === 0) {
        if (data.nik.replace('\n', '') === '12') {
          setIsSatuSehat(true)
        }
        // if (isForeign) {
        //   handleChangePage({ action: 'next', newFormSteps: formStepsForeign });
        // } else {
        // }
        const dataNIK = data.nik.replace('\n', '');

        try {

          const wni = !data.citizenship

          if (wni && (dataNIK.length < 16 || dataNIK.length > 16)) {
            setErrors({ errorNIK: "NIK Harus Terdiri Dari 16 Digit" })
            timeout(2000).then(() => { setErrors({ errorNIK: "" }) })
            return
          }

          const res = await patientGet({ identifier: dataNIK, identifierType: 'Identifier' })

          const newData = res.data
          reset(patientToIForm({ data: newData }))

          handleChangePage({ action: 'next', newFormSteps: formStepsExistInInternal });

        } catch (error) {
          handleChangePage({ action: 'next', newFormSteps: formStepsNotExistInternal });
          setValue("isRegistered", false)
          toast.info("Anda Belum Terdaftar, Silahkan mendaftar")
        }

      } else if (currentPageIndex !== 0) {
        if (currentPage.value === 'insert_email') {
          try {
            const email = data.email.replace('\n', '')
            const phone = data.phoneNumber.replace('\n', '');
            await patientUpdate({ data: { email, phone }, patientID: data.patientID || '' }).then((res) => {
              resetField("email", { defaultValue: res.data.email })
              resetField("phoneNumber", { defaultValue: res.data.phone })
            })

            handleChangePage({ toSpecificPage: 'information' });

            toast.success("Berhasil")
          } catch (error) {
            toast.error("Gagal")
          }

        } else if (
          currentPage.value === 'confirmation_new_patient' ||
          (currentPage.value === 'insert_phone_number' &&
            formSteps === formStepsRegistrationMethodByPhone)
        ) {

          const newData = regIFormToInput({ data })
          await createPatient({ data: newData });
        }
        else if (currentPage.value === 'create_new_patient' && isSimplify) {
          handleChangePage({ toSpecificPage: 'confirmation_new_patient' });
        }
        else {
          handleChangePage({ action: 'next' });
        }
      }
    }
    catch (error) {
      console.log(error)
      toast.error("Something Wrong...")
    }
  };

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title={getTitle}
          handleBackNavigation={() => handleChangePage({ action: 'previous' })}
          handleCloseNavigation={() => navigate('/', { replace: true })}
          hideBackNavigation={currentPage.properties?.hideBack}
          hideCloseNavigation={currentPage.properties?.hideClose}
          size={currentPage.properties?.containerSize}
        >
          <Box sx={{ p: 4 }}>
            {currentPage.value === 'insert_nik' && <InsertIdentifier errorMessage={errors.errorNIK} />}

            {currentPage.value === 'information' && (
              <PatientInformation
                leftTextButton={t('registration.button.back_to_home')}
                rigthTextButton={t('registration.button.edit_phone_email')}
                leftButtonProps={{
                  onClick: () => {
                    reset(defaultValues)
                    handleChangePage({ toSpecificPage: 'insert_nik' })
                  },
                }}
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
                  if (isSatuSehat) {
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
                leftButtonProps={{
                  onClick: () => {
                    if (isSimplify) handleChangePage({ toSpecificPage: 'create_new_patient' });
                    else handleChangePage({ action: 'previous' });
                  },
                }}
              />
            )}

            {currentPage.value === 'success_new_patient' && (
              <SuccessNewPatient
                data={patientSuccess}
                handleFinish={() => navigate('/')}
              />
            )}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
};

export default RegistrationPage;
