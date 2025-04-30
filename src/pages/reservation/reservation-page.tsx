import { Box } from '@mui/material';
import dayjs from 'dayjs';
import nProgress from 'nprogress';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { AppPage } from 'src/components/app-page';
import type { CardBannerProps } from 'src/components/card-banner/types';
import { Form } from 'src/components/hook-form';
import { InsertIdentifier } from 'src/components/insert-identifier';
import { WindowContainer } from 'src/components/window-container';
import { usePartialState, useStepper } from 'src/hooks';
import { useTranslate } from 'src/locales';
import { setLoading } from 'src/store/slices/app';
import { Nullable } from 'src/types/common';
import { fDate, formatStr } from 'src/utils/format-time';
import { enBase64, fAsterisk } from 'src/utils/helper';
import { timeout } from 'src/utils/timeout';
import { appointmentCreate } from '../appointment/model/functions';
import { SelectedLabPackage, SelectedPractioner, SelectedRadiologyPackage } from '../encounter/model/types';
import { patientGet } from '../patient/model/functions';
import { Patient } from '../patient/model/types';
import {
  ConfirmationOutpatient,
  ConfirmationOutpatientMCU,
  IndentifierNotFound,
  InformationBPJSPatientData,
  InformationOutpatientGeneral,
  InformationPatient,
  InsertBPJSNumber,
  InsertPolisNumber,
  PaymentMethod,
  SelectCompany,
  SelectCompanyNew,
  SelectInsurance,
  SelectInsuranceNew,
  SelectMCUPackage,
  SelectPractitioner,
  SelectReservationType,
  SuccessOutpatient,
} from './components';
import InsertEmployeeNumber from './components/insert-employee-number';
import SelectLabPackage from './components/select-lab-package';
import SelectRadService from './components/select-rad-service';
import SelectTime from './components/select-time';
import type { Insurancetype, ReservationType } from './model/types';
import {
  formStepsLabCompany,
  formStepsLabInsurance,
  formStepsMCUAssurance,
  formStepsMCUCompany,
  formStepsOutpatientBPJS,
  formStepsOutpatientCompany,
  formStepsOutpatientGeneral,
  formStepsOutpatientInsurance,
  formStepsRadCompany,
  formStepsRadInsurance,
} from './model/variables';

const ReservationPage = () => {

  const { state: locationState } = useLocation()
  const navigate = useNavigate();

  const { currentPage, currentPageIndex, handleChangePage } = useStepper({
    initialSteps: formStepsOutpatientGeneral,
  });

  const { t } = useTranslate()

  const [errors, setErrors] = usePartialState({ errorIdentifier: "" })
  const [errorMessage, setErrorMessage] = useState({ dateErr: '', bookTimeErr: '', unableErr: '' });
  const [patientData, setPatientData] = useState<Nullable<Patient>>(null);
  const [selectedPractioner, setSelectedPractioner] = useState<Nullable<SelectedPractioner>>(null);
  const [selectedPackageLab, setSelectedPackageLab] = useState<Nullable<SelectedLabPackage>>(null);
  const [selectedPackageRadiology, setSelectedPackageRadiology] =
    useState<Nullable<SelectedRadiologyPackage>>(null);

  const [reservationType, SetReservationType] = useState<ReservationType>(null);

  const listReservationType: CardBannerProps[] = useMemo(() => [
    {
      title: t('encounter.outpatient.title'),
      body: t('encounter.outpatient.description'),
      localIcon: 'stethoscope',
      onClick: () => {
        setValue("serviceType", "OUTPATIENT")
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

  const methods = useForm({ defaultValues: { nik: '' } as any });

  const { handleSubmit, setValue, control } = methods;

  const [watchDate, watchBookTime, watchUnable] = useWatch({ control, name: ["date", "bookTime", "unable"] })

  const values = useWatch({ control })

  useEffect(() => {
    setErrorMessage((prev) => ({ ...prev, dateErr: '', bookTimeErr: '', unableErr: '' }));
  }, [watchDate]);

  useEffect(() => {
    setErrorMessage((prev) => ({ ...prev, bookTimeErr: '' }));
  }, [watchBookTime]);

  useEffect(() => {
    setErrorMessage((prev) => ({ ...prev, unableErr: '' }));
  }, [watchUnable]);

  const onPractitionerSelect = (method?: string) => {
    if (method === "healthcare") {
      handleChangePage({ action: 'next' })
    } else {
      handleChangePage({ action: 'next' });
    }
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

  const handleGetPatientByNIK = async (identifierValue: string) => {
    try {
      const { data: newData } = await patientGet({
        identifier: identifierValue, identifierType: 'Identifier'
      })

      if (!newData) {
        console.log(!newData)
        throw Error("NOT_FOUND")
      }

      setPatientData(newData);

      setValue('patientId', newData.patientID);
    } catch (e) {
      throw Error("INI_MAH_NORMAL")
    }
  };

  const handleCreate = async () => {
    try {
      const resp = await appointmentCreate({
        data: {
          booking: {
            payorParam: {
              payplanClass: ((values.payplan || '') as string).toLowerCase(),
            },
            serviceType: values.serviceType,
            serviceParamOutpatient: {
              scheduleID: '',
              slotID: values?.bookTime?.value
            },
          },
          scheduleDate: values?.date ? fDate(dayjs(values.date), formatStr.paramCase.mysqlDate) : '',
          serviceParamOutpatient: {
            doctorUnavailableAction: values?.unable?.value || ''
          }
        }, patientID: patientData?.patientID || ''
      })

      if (!resp.status) {
        throw Error(resp.message)
      }

      toast.success("Berhasil")

      setValue("resBookingID", resp.data.booking.bookingID)

    } catch (error) {
      toast.error(error?.message || "Gagal")
      throw Error("...")
    }
  }

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 1) {
      const nik = data?.nik?.replaceAll('\n', '');
      if (nik.length === 0) {
        setErrors({ errorIdentifier: "Required" })
        timeout(2000).then(() => { setErrors({ errorIdentifier: "" }) })
        return
      }
      if ((nik.length < 16 || nik.length > 16) && !values.citizenship) {
        setErrors({ errorIdentifier: 'NIK Harus Terdiri Dari 16 Digit' });
        timeout(2000).then(() => { setErrors({ errorIdentifier: "" }) })
      } else {
        try {
          nProgress.start()
          await handleGetPatientByNIK(nik)
          handleChangePage({ toSpecificPage: "information_outpatient_general" });
        } catch (e) {
          if (e?.message === "INI_MAH_NORMAL") {
            toast.error(`NIK dengan nomor ${fAsterisk(nik)} tidak ditemukan.`)
            handleChangePage({ action: 'next' });
          }
          if (e?.message === "NOT_FOUND") {
            toast.info("Anda Belum Terdaftar. Silahkan Daftar Terlebih Dahulu")
          }
        } finally {
          nProgress.done()
        }
      }

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

  useEffect(() => {
    if (locationState && locationState?.fromRegistration) {
      const load = async () => {
        try {
          setLoading(true)

          setValue("serviceType", "OUTPATIENT")
          SetReservationType('RJ');
          await handleGetPatientByNIK(locationState?.nik)
          handleChangePage({ newFormSteps: formStepsOutpatientGeneral, toSpecificPage: 'payment_method' });

        } catch (error) {
          toast.error('Error')
        } finally {
          setLoading(false)
        }
      }

      load()
    }
  }, [locationState])

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
                handleResetReservationType={() => { !locationState?.fromRegistration && SetReservationType(null) }}
              />
            )}

            {currentPage.value === 'insert_nik' && <InsertIdentifier errorMessage={errors.errorIdentifier} />}

            {currentPage.value === 'nik_not_found' && (
              <IndentifierNotFound
                identifier={values.nik}
                handleClick={(param) => {
                  if (param === "search") handleChangePage({ action: "previous" });
                  if (param === "anjungan") navigate(`/registration/${enBase64(values.nik)}`)
                }}
              />
            )}

            {currentPage.value === 'information_outpatient_general' && patientData && (
              <InformationOutpatientGeneral
                leftTextButton={t("appointment.patient.actions.invalid_button")}
                rightTextButton={t("appointment.patient.actions.valid_button")}
                leftButtonProps={{
                  onClick: () => {
                    setPatientData(null);
                    handleChangePage({ toSpecificPage: "insert_nik" });
                  },
                }}
                rightButtonProps={{
                  onClick: () => {
                    handleChangePage({ action: 'next' });
                  },
                }}
                data={patientData}
              />
            )}

            {currentPage.value === 'payment_method' && (
              <PaymentMethod
                handleGeneral={() => {
                  setValue('payplan', 'GENERAL');
                  handleChangePage({ action: 'next' });
                }}
                reservationType={reservationType}
                handleAssurance={onAssuranceSelect}
              />
            )}

            {currentPage.value === 'select_time' && (
              <SelectTime
                doctorInfo={selectedPractioner}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={() => {
                  const selectedDate = watchDate ? dayjs(watchDate) : dayjs()
                  const minDate = dayjs()

                  if (watchDate && watchBookTime && watchUnable && selectedDate >= minDate)
                    handleChangePage({ action: 'next' });
                  if (!selectedDate) {
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
              <SelectPractitioner
                onCardSelect={onPractitionerSelect}
                setSelectedPractitioner={setSelectedPractioner}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration' && (
              <ConfirmationOutpatient
                patientDetail={patientData}
                radPackage={selectedPackageRadiology}
                doctorInfo={selectedPractioner}
                reservationType={reservationType || ""}
                labPackage={selectedPackageLab}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={async () => {
                  try {
                    await handleCreate()

                    handleChangePage({ action: 'next' });
                  } catch (error) {
                    console.log(error)
                    throw Error("...")
                  }
                }}
                type={values?.payplan || "general"}
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
                patientDetail={patientData}
                radPackage={selectedPackageRadiology}
                doctorInfo={selectedPractioner}
                reservationType={reservationType || ""}
                labPackage={selectedPackageLab}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={async () => {
                  handleChangePage({ action: 'next' });
                }}
                type="insurance"
              />
            )}

            {currentPage.value === 'registration_success' && (
              <SuccessOutpatient
                radPackage={selectedPackageRadiology}
                labPackage={selectedPackageLab}
                doctorInfo={selectedPractioner}
                patientDetail={patientData} reservationType={reservationType} type="general" />
            )}

            {currentPage.value === 'registration_success_insurance' && (
              <SuccessOutpatient
                radPackage={selectedPackageRadiology}
                labPackage={selectedPackageLab}
                doctorInfo={selectedPractioner}
                patientDetail={patientData} reservationType={reservationType} type="insurance" />
            )}

            {currentPage.value === 'registration_success_company' && (
              <SuccessOutpatient
                radPackage={selectedPackageRadiology}
                labPackage={selectedPackageLab}
                doctorInfo={selectedPractioner}
                patientDetail={patientData} reservationType={reservationType} type="company" />
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
                patientDetail={patientData}
                radPackage={selectedPackageRadiology}
                doctorInfo={selectedPractioner}
                reservationType={reservationType || ""}
                labPackage={selectedPackageLab}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={async () => {
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
                patientDetail={patientData}
                radPackage={selectedPackageRadiology}
                labPackage={selectedPackageLab}
                doctorInfo={selectedPractioner}
                reservationType={reservationType || ""}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                type="bpjs"
                handleConfirm={async () => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'registration_success_bpjs' && (
              <SuccessOutpatient
                radPackage={selectedPackageRadiology}
                labPackage={selectedPackageLab}
                doctorInfo={selectedPractioner}
                patientDetail={patientData}
                reservationType={reservationType} type="bpjs" />
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
