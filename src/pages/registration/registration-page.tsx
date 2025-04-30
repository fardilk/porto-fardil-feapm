import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { AppPage } from 'src/components/app-page';
import { Form } from 'src/components/hook-form';
import { InsertIdentifier } from 'src/components/insert-identifier';
import { WindowContainer } from 'src/components/window-container';
import { usePartialState, useStepper } from 'src/hooks';
import { useTranslate } from 'src/locales';
import { setLoading } from 'src/store/slices/app';
import { dispatch, useSelector } from 'src/store/store';
import { deBase64 } from 'src/utils/helper';
import { nikParser } from 'src/utils/nik-parser';
import { timeout } from 'src/utils/timeout';
import { patientCreate, patientGet, patientUpdate } from '../patient/model/functions';
import { Patient, PatientCreateInput } from '../patient/model/types';
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
import { patientToIForm, regIFormToInput } from './model/helper';
import { registrationSchema } from './model/schema';
import { type RegistrationIForm } from './model/types';
import {
  formStepsExistInInternal,
  formStepsExistInSatuSehat,
  formStepsNotExistInSatuSehat,
  formStepsNotExistInternal,
  formStepsRegistrationMethodByPhone
} from './model/variables';

const RegistrationPage = () => {

  const [{ errorNIK, isSatuSehat }, setState] = usePartialState({ errorNIK: "", isSatuSehat: false })

  const [patientSuccess, setPatientSuccess] = useState<Patient | null>(null)

  const isSimplify = useSelector((root) => root.config.simplify);

  const { encryptedNIK } = useParams()

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
    nationality: null,
    currentPage: "",
    formSteps: []
  };

  const { t } = useTranslate();

  const navigate = useNavigate();

  const methods = useForm<RegistrationIForm>({
    defaultValues,
    resolver: yupResolver(registrationSchema) as any,
    mode: "onChange"
  });

  const { handleSubmit, reset, resetField, setValue, watch } = methods;

  const { currentPage, currentPageIndex, handleChangePage, formSteps } = useStepper({
    initialSteps: formStepsExistInInternal,
    onChangeFormSteps: (param) => {
      setValue("formSteps", param)
    },
    onChangeCurrentPage: (param) => {
      setValue("currentPage", param)
    },
  });

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

  useEffect(() => {
    const enc = Boolean(encryptedNIK)
    if (enc) {
      parseNIK(deBase64(encryptedNIK))
      setValue("isRegistered", false)
      handleChangePage({
        action: 'next',
        newFormSteps: formStepsNotExistInSatuSehat,
        toSpecificPage: "create_new_patient"
      });
    }
  }, [encryptedNIK])

  const parseNIK = (nik?: string) => {
    if (nik === undefined) {
      return ""
    }

    const fNik = nikParser(nik)

    setValue('nik', nik)

    setValue(
      'gender',
      {
        label: fNik.kelamin() === 'pria' ? 'Laki-laki' : 'Perempuan',
        value: fNik.kelamin() === 'pria' ? 'male' : 'female'
      },
      { shouldValidate: true }
    );

    // const day = fNik.lahir().toLocaleString('id-ID', { day: '2-digit' });
    // const month = fNik.lahir().toLocaleString('id-ID', { month: '2-digit' });
    // const year = fNik.lahir().toLocaleString('id-ID', { year: 'numeric' });

    setValue('birthDate', dayjs(fNik.lahir(), 'DD-MM-YYYY', true) as any);

    return ""
  }

  const onSubmit = async (data: RegistrationIForm) => {

    try {
      if (currentPageIndex === 0) {
        if (data.nik.replace('\n', '') === '12') {
          setState({ isSatuSehat: true })
        }

        const dataNIK = data.nik.replace('\n', '');

        try {

          dispatch(setLoading(true))

          const wni = !data.citizenship

          if (dataNIK.length === 0) {
            setState({ errorNIK: "Required" })
            timeout(2000).then(() => { setState({ errorNIK: "" }) })
            return
          }

          if (wni && (dataNIK.length < 16 || dataNIK.length > 16)) {
            setState({ errorNIK: "NIK Harus Terdiri Dari 16 Digit" })
            timeout(2000).then(() => { setState({ errorNIK: "" }) })
            return
          }

          const res = await patientGet({ identifier: dataNIK, identifierType: 'Identifier' })

          const newData = res.data
          reset(patientToIForm({ data: newData }))

          handleChangePage({ action: 'next', newFormSteps: formStepsExistInInternal });

        } catch (error) {

          parseNIK(dataNIK)

          handleChangePage({ action: 'next', newFormSteps: formStepsNotExistInternal });
          setValue("isRegistered", false)
          toast.info("Anda Belum Terdaftar, Silahkan mendaftar")
        } finally {
          dispatch(setLoading(false))
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
            {currentPage.value === 'insert_nik' && <InsertIdentifier errorMessage={errorNIK} />}

            {currentPage.value === 'information' && (
              <PatientInformation
                leftTextButton={t('registration.button.back_to_home')}
                rigthTextButton={t('registration.button.edit_phone_email')}
                showButtonRegist
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
