import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AppPage } from 'src/components/app-page';
import type { CardBannerProps } from 'src/components/card-banner/types';
import { Form } from 'src/components/hook-form';
import { InsertIdentifier } from 'src/components/insert-identifier';
import { WindowContainer } from 'src/components/window-container';
import { useStepper } from 'src/hooks';
import {
  ConfirmationOutpatient,
  ConfirmationOutpatientMCU,
  InformationBPJSPatientData,
  InformationOutpatientGeneral,
  InformationPatient,
  InsertBPJSNumber,
  InsertPolisNumber,
  PaymentMethod,
  SelectCompany,
  SelectCompanyNew,
  SelectReservationType,
  SelectInsurance,
  SelectInsuranceNew,
  SelectMCUPackage,
  SelectPractitioner,
  SuccessOutpatient,
} from './components';
import type { ReservationType, Insurancetype } from './model/types';
import InsertEmployeeNumber from './components/insert-employee-number';
import {
  formStepsMCUGeneral,
  formStepsOutpatientBPJS,
  formStepsOutpatientCompany,
  formStepsOutpatientGeneral,
  formStepsOutpatientInsurance,
  formStepsLabGeneral,
  formStepsLabCompany,
  formStepsLabInsurance,
  formStepsRadGeneral,
  formStepsRadCompany,
  formStepsRadInsurance,
  formStepsMCUAssurance,
  formStepsMCUCompany,
} from './model/variables';
import { fAsterisk } from 'src/utils/helper';
import SelectLabPackage from './components/select-lab-package';
import SelectRadService from './components/select-rad-service';
import SelectTime from './components/select-time';
import { useTranslate } from 'src/locales';

const ReservationPage = () => {
  const navigate = useNavigate();
  const { currentPage, currentPageIndex, handleChangePage } = useStepper({
    initialSteps: formStepsOutpatientGeneral,
  });

  const { t } = useTranslate()

  const [errorMessage, setErrorMessage] = useState({ dateErr: '', bookTimeErr: '', unableErr: '' });

  const [reservationType, SetReservationType] = useState<ReservationType>(null);

  const listReservationType: CardBannerProps[] = useMemo(() => [
    {
      title: t('encounter.outpatient.title'),
      body: t('encounter.outpatient.description'),
      localIcon: 'stethoscope',
      onClick: () => {
        SetReservationType('RJ');
        handleChangePage({ action: 'next', newFormSteps: formStepsOutpatientGeneral });
      },
    },
    // {
    //   title: t('encounter.mcu.title'),
    //   body: t('encounter.mcu.description'),
    //   localIcon: 'medical-checkup',
    //   onClick: () => {
    //     SetReservationType('MCU');
    //     handleChangePage({
    //       action: 'next',
    //       newFormSteps: formStepsMCUGeneral,
    //     });
    //   },
    // },
    // {
    //   title: t('encounter.laboratory.title'),
    //   body: t('encounter.laboratory.description'),
    //   localIcon: 'blood-test',
    //   onClick: () => {
    //     SetReservationType('LAB');
    //     handleChangePage({ action: 'next', newFormSteps: formStepsLabGeneral });
    //   },
    // },
    // {
    //   title: t('encounter.radiology.title'),
    //   body: t('encounter.radiology.description'),
    //   localIcon: 'x-rays',
    //   onClick: () => {
    //     SetReservationType('RAD');
    //     handleChangePage({ action: 'next', newFormSteps: formStepsRadGeneral });
    //   },
    // },
  ], [t, SetReservationType, handleChangePage])

  const getListDataEmployee = useMemo(
    () => [
      { title: t('assurance.employee_number'), body: fAsterisk('100200300400') },
      { title: t('assurance.policy_holder_name'), body: 'Anisa Redina' },
      { title: t('assurance.guarantor_type'), body: 'Asuransi Kesehatan' },
      { title: t('assurance.insurance_company'), body: 'Allianz Life Insurance' },
      {
        title: t('assurance.address'),
        body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
      },
      { title: t('assurance.place_date_of_birth'), body: 'Malaysia, 11-04-2000' },
      { title: t('assurance.phone_number'), body: fAsterisk('085157902550') },
    ],
    [t]
  );

  const getListDataInsurance = useMemo(
    () => [
      { title: t('assurance.policy_number'), body: fAsterisk('100200300400') },
      { title: t('assurance.policy_holder_name'), body: 'Anisa Redina' },
      { title: t('assurance.guarantor_type'), body: 'Asuransi Kesehatan' },
      { title: t('assurance.insurance_company'), body: 'Allianz Life Insurance' },
      {
        title: t('assurance.address'),
        body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
      },
      { title: t('assurance.place_date_of_birth'), body: 'Malaysia, 11-04-2000' },
      { title: t('assurance.phone_number'), body: fAsterisk('085157902550') },
    ],
    [t]
  );

  const methods = useForm();

  const { handleSubmit, watch } = methods;

  const watchDate = watch('date');
  const watchBookTime = watch('bookTime');
  const watchUnable = watch('unable');

  useEffect(() => {
    setErrorMessage((prev) => ({ ...prev, dateErr: '' }));
  }, [watchDate]);

  useEffect(() => {
    setErrorMessage((prev) => ({ ...prev, bookTimeErr: '' }));
  }, [watchBookTime]);

  useEffect(() => {
    setErrorMessage((prev) => ({ ...prev, unableErr: '' }));
  }, [watchUnable]);

  const onPractitionerSelect = () => {
    handleChangePage({ action: 'next' });
  };

  const onLabPakckageSelect = () => {
    handleChangePage({ action: 'next' });
  };

  const onRadServiceSelect = () => {
    handleChangePage({ action: 'next' });
  };

  const onAssuranceSelect = (type: Insurancetype) => {
    if (reservationType === 'RJ' && type === 'bpjs') {
      handleChangePage({
        newFormSteps: formStepsOutpatientBPJS,
        toSpecificPage: 'insert_bpjs_number',
      });
    }

    if (reservationType === 'RJ' && type === 'company') {
      handleChangePage({
        newFormSteps: formStepsOutpatientCompany,
        toSpecificPage: 'select_company',
      });
    }

    if (reservationType === 'RJ' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsOutpatientInsurance,
        toSpecificPage: 'select_insurance',
      });
    }

    if (reservationType === 'MCU' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsMCUAssurance,
        toSpecificPage: 'select_insurance',
      });
    }

    if (reservationType === 'MCU' && type === 'company') {
      handleChangePage({
        newFormSteps: formStepsMCUCompany,
        toSpecificPage: 'select_company',
      });
    }

    if (reservationType === 'LAB' && type === 'company') {
      handleChangePage({ newFormSteps: formStepsLabCompany, toSpecificPage: 'select_company' });
    }

    if (reservationType === 'LAB' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsLabInsurance,
        toSpecificPage: 'select_insurance',
      });
    }

    if (reservationType === 'RAD' && type === 'company') {
      handleChangePage({ newFormSteps: formStepsRadCompany, toSpecificPage: 'select_company' });
    }

    if (reservationType === 'RAD' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsRadInsurance,
        toSpecificPage: 'select_insurance',
      });
    }
  };

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 1) {
      // await getDummyData('company');

      handleChangePage({ action: 'next' });
    } else {
      if (currentPage.value === 'insert_polis_number') {
        // await getDummyData('');
        handleChangePage({ action: 'next' });
      }

      if (currentPage.value === 'insert_employee_number') {
        // await getDummyData('');
        handleChangePage({ action: 'next' });
      }

      if (currentPage.value === 'insert_bpjs_number') {
        // await getDummyData('');
        handleChangePage({ action: 'next' });
      }
    }
  };

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title={t(currentPage.label)}
          size={currentPage.properties?.containerSize || 'large'}
          handleBackNavigation={() => {
            handleChangePage({ action: 'previous' });
          }}
          handleCloseNavigation={() => {
            navigate('/', { replace: true });
          }}
          hideBackNavigation={currentPage?.properties?.disableBack}
          hideCloseNavigation={currentPage?.properties?.disableClose}
        >
          <Box sx={{ p: 4 }}>
            {currentPage.value === 'select_reservation_type' && (
              <SelectReservationType
                items={listReservationType}
                handleResetReservationType={() => SetReservationType(null)}
              />
            )}

            {currentPage.value === 'insert_nik' && <InsertIdentifier />}

            {currentPage.value === 'information_outpatient_general' && (
              <InformationOutpatientGeneral
                leftTextButton={t("appointment.patient.actions.invalid_button")}
                rightTextButton={t("appointment.patient.actions.valid_button")}
                leftButtonProps={{
                  onClick: () => {
                    handleChangePage({ action: 'previous' });
                  },
                }}
                rightButtonProps={{
                  onClick: () => {
                    handleChangePage({ action: 'next' });
                  },
                }}
              />
            )}

            {currentPage.value === 'payment_method' && (
              <PaymentMethod
                handleGeneral={() => {
                  handleChangePage({ action: 'next' });
                }}
                reservationType={reservationType}
                handleAssurance={onAssuranceSelect}
              />
            )}

            {currentPage.value === 'select_time' && (
              <SelectTime
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={() => {
                  const today = new Date();
                  const selectedDate = new Date(watchDate);
                  const minDate = new Date(today.setDate(today.getDate()));

                  if (watchDate && watchBookTime && watchUnable && selectedDate >= minDate)
                    handleChangePage({ action: 'next' });
                  if (!watchDate) {
                    setErrorMessage((prev) => ({ ...prev, dateErr: 'Tanggal Harus Diisi' }));
                  } else if (selectedDate < minDate) {
                    setErrorMessage((prev) => ({
                      ...prev,
                      dateErr: 'Tanggal Minimal Besok',
                    }));
                  }
                  if (!watchBookTime) {
                    setErrorMessage((prev) => ({ ...prev, bookTimeErr: 'Jam Harus Diisi' }));
                  }
                  if (!watchUnable) {
                    setErrorMessage((prev) => ({ ...prev, unableErr: 'Pilihan Harus Diisi' }));
                  }
                }}
                reservationType={reservationType}
                errorMessage={errorMessage}
              />
            )}

            {currentPage.value === 'select_healthcare_practitioner' && (
              <SelectPractitioner onCardSelect={onPractitionerSelect} />
            )}

            {currentPage.value === 'confirmation_patient_registration' && (
              <ConfirmationOutpatient
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
                type="general"
              />
            )}

            {currentPage.value === 'confirmation_patient_registration_mcu' && (
              <ConfirmationOutpatientMCU
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration_insurance' && (
              <ConfirmationOutpatient
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
                type="insurance"
              />
            )}

            {currentPage.value === 'registration_success' && (
              <SuccessOutpatient reservationType={reservationType} type="general" />
            )}

            {currentPage.value === 'registration_success_insurance' && (
              <SuccessOutpatient reservationType={reservationType} type="insurance" />
            )}

            {currentPage.value === 'registration_success_company' && (
              <SuccessOutpatient reservationType={reservationType} type="company" />
            )}

            {currentPage.value === 'select_insurance' && (
              <SelectInsurance
                handleSelect={() => {
                  if (reservationType === 'RJ') {
                    handleChangePage({ toSpecificPage: 'select_healthcare_practitioner' });
                  } else if (reservationType === 'LAB') {
                    handleChangePage({ toSpecificPage: 'select_lab_package' });
                  } else if (reservationType === 'RAD') {
                    handleChangePage({ toSpecificPage: 'select_rad_service' });
                  } else if (reservationType === 'MCU') {
                    handleChangePage({
                      action: 'next',
                    });
                  }
                }}
                handleSelectNew={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'select_insurance_new' && (
              <SelectInsuranceNew
                handleSelect={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'insert_polis_number' && <InsertPolisNumber />}

            {currentPage.value === 'information_data_patient_insurance' && (
              <InformationPatient
                title={t('assurance.subtitle.detail_data')}
                detailData={getListDataInsurance}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleNext={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'select_company' && (
              <SelectCompany
                handleSelect={() => {
                  if (reservationType === 'RJ') {
                    handleChangePage({ toSpecificPage: 'select_healthcare_practitioner' });
                  } else if (reservationType === 'LAB') {
                    handleChangePage({ toSpecificPage: 'select_lab_package' });
                  } else if (reservationType === 'RAD') {
                    handleChangePage({ toSpecificPage: 'select_rad_service' });
                  } else if (reservationType === 'MCU') {
                    handleChangePage({ action: 'next' });
                  }
                }}
                handleSelectNew={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'select_company_new' && (
              <SelectCompanyNew
                handleSelect={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration_company' && (
              <ConfirmationOutpatient
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
                type="company"
              />
            )}

            {currentPage.value === 'insert_employee_number' && <InsertEmployeeNumber />}

            {currentPage.value === 'information_data_employee' && (
              <InformationPatient
                title={t('assurance.subtitle.detail_data_employee')}
                detailData={getListDataEmployee}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleNext={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'insert_bpjs_number' && <InsertBPJSNumber />}

            {currentPage.value === 'information_patient_data_bpjs' && (
              <InformationBPJSPatientData
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleSelect={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration_bpjs' && (
              <ConfirmationOutpatient
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                type="bpjs"
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'registration_success_bpjs' && (
              <SuccessOutpatient reservationType={reservationType} type="bpjs" />
            )}

            {currentPage.value === 'select_mcu_package' && (
              <SelectMCUPackage
                handleSelect={() =>
                  handleChangePage({
                    action: 'next',
                  })
                }
              />
            )}

            {currentPage.value === 'select_lab_package' && (
              <SelectLabPackage onCardSelect={onLabPakckageSelect} />
            )}

            {currentPage.value === 'select_rad_service' && (
              <SelectRadService onCardSelect={onRadServiceSelect} />
            )}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
};

export default ReservationPage;
