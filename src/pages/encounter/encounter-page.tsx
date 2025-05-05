import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import nProgress from 'nprogress';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { AppPage } from 'src/components/app-page';
import { Form } from 'src/components/hook-form';
import { InsertIdentifier } from 'src/components/insert-identifier';
import { WindowContainer } from 'src/components/window-container';
import { usePartialState, useStepper } from 'src/hooks';
import { useTranslate } from 'src/locales';
import { createPatientCoverageAPM } from 'src/modules/payorapm/functions';
import { Company, Insurance, Payplan } from 'src/modules/payorapm/types';
import { setLoading } from 'src/store/slices/app';
import type { Nullable } from 'src/types/common';
import { fDate, formatStr } from 'src/utils/format-time';
import { enBase64, fAsterisk } from 'src/utils/helper';
import { timeout } from 'src/utils/timeout';
import { appointmentCreate } from '../appointment/model/functions';
import { BookingInput } from '../appointment/model/types';
import { patientGet } from '../patient/model/functions';
import { Patient } from '../patient/model/types';
import {
  ConfirmationOutpatient,
  ConfirmationOutpatientMCU,
  IdentifierNotFound,
  InformationBPJSPatientData,
  InformationOutpatientGeneral,
  InformationPatient,
  InsertBPJSNumber,
  InsertPolisNumber,
  PaymentMethod,
  SelectCompany,
  SelectCompanyNew,
  SelectEncounterType,
  SelectInsurance,
  SelectInsuranceNew,
  SelectMCUPackage,
  SelectPractitioner,
  SuccessOutpatient,
} from './components';
import InsertEmployeeNumber from './components/insert-employee-number';
import SelectLabPackage from './components/select-lab-package';
import SelectRadService from './components/select-rad-service';
import SelectTime from './components/select-time';
import {
  getLabPackage,
  getMCUPackage,
  getRadiologyPackage
} from './model/functions';
import { encounterSchema } from './model/schema';
import type {
  EncounterType,
  Insurancetype,
  ListLabPackageResponse,
  ListMCUPackageResponse,
  ListRadiologyPackageResponse,
  SelectedLabPackage,
  SelectedPractioner,
  SelectedRadiologyPackage
} from './model/types';
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
  formStepsRadInsurance
} from './model/variables';

const EncounterPage = () => {

  const { t } = useTranslate();
  const { state: locationState } = useLocation()
  const methods = useForm({ resolver: yupResolver(encounterSchema) as any });

  const { handleSubmit, setValue, getValues, trigger, control } = methods;

  const values = useWatch({ control })

  const watchBookTime = values.bookTime

  const navigate = useNavigate();
  const { currentPage, currentPageIndex, handleChangePage } = useStepper({
    initialSteps: formStepsOutpatientGeneral,
  });

  const [errors, setErrors] = usePartialState({ errorIdentifier: "" })
  const [selectedPractioner, setSelectedPractioner] = useState<Nullable<SelectedPractioner>>(null);
  const [selectedPackageMCUName, setSelectedPackageMCUName] = useState<Nullable<string>>(null);
  const [selectedPackageLab, setSelectedPackageLab] = useState<Nullable<SelectedLabPackage>>(null);
  const [selectedPackageRadiology, setSelectedPackageRadiology] =
    useState<Nullable<SelectedRadiologyPackage>>(null);
  const [encounterType, setEncounterType] = useState<EncounterType>(null);
  const [patientData, setPatientData] = useState<Nullable<Patient>>(null);
  const [mcuPackageList, setMCUPackageList] = useState<ListMCUPackageResponse>([]);
  const [labPackageList, setLabPackageList] = useState<ListLabPackageResponse>([]);
  const [radiologyPackageList, setRadiologyPackageList] = useState<ListRadiologyPackageResponse>(
    []
  );
  const [errorMessage, setErrorMessage] = useState({ dateErr: '', bookTimeErr: '', unableErr: '' });
  const listEncounterType = [
    {
      title: t('encounter.outpatient.title'),
      body: t('encounter.outpatient.description'),
      localIcon: 'stethoscope',
      onClick: () => {
        setEncounterType('RJ');
        setValue('serviceType', 'OUTPATIENT');
        handleChangePage({ action: 'next', newFormSteps: formStepsOutpatientGeneral });
      },
    },
    /**
     * @todo Uncomment me later...
     */
    // {
    //   title: t('encounter.mcu.title'),
    //   body: t('encounter.mcu.description'),
    //   localIcon: 'medical-checkup',
    //   onClick: () => {
    //     setEncounterType('MCU');
    //     setValue('serviceType', 'MCU');
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
    //     setEncounterType('LAB');
    //     setValue('serviceType', 'LABORATORY');
    //     handleChangePage({ action: 'next', newFormSteps: formStepsLabGeneral });
    //   },
    // },
    // {
    //   title: t('encounter.radiology.title'),
    //   body: t('encounter.radiology.description'),
    //   localIcon: 'x-rays',
    //   onClick: () => {
    //     setEncounterType('RAD');
    //     setValue('serviceType', 'RADIOLOGY');
    //     handleChangePage({ action: 'next', newFormSteps: formStepsRadGeneral });
    //   },
    // },
  ];

  console.log(values)

  useEffect(() => {
    if (values?.bookTime) {
      setErrorMessage({ bookTimeErr: '', dateErr: '', unableErr: '' })
    }
  }, [values?.bookTime])

  const getListDataEmployee = useMemo(
    () => [
      { title: t('assurance.employee_number'), body: fAsterisk(values?.createPolisNumber || '-'), colSpan: 2 },
      { title: t('assurance.policy_holder_name'), body: values?.createPolisHolder || '-', colSpan: 2 },
      { title: t('assurance.insurance_company'), body: values?.createCompanyName || '-', colSpan: 2 },
      { title: t('assurance.place_date_of_birth'), body: `${patientData?.birthPlace || '-'}, ${patientData?.birthDttm || '-'}`, colSpan: 2 },
      { title: t('assurance.phone_number'), body: fAsterisk(patientData?.phone || '-'), colSpan: 2 },
      {
        title: t('assurance.address'),
        body: patientData?.address || '-',
        colSpan: 4
      },
    ],
    [t, values, patientData]
  );

  const getListDataInsurance = useMemo(
    () => [
      { title: t('assurance.policy_number'), body: fAsterisk(values?.createPolisNumber || '-'), colSpan: 2 },
      { title: t('assurance.policy_holder_name'), body: values?.createPolisHolder || '-', colSpan: 2 },
      { title: t('assurance.insurance_company'), body: values?.createInsuranceName || '-', colSpan: 2 },
      { title: t('assurance.place_date_of_birth'), body: `${patientData?.birthPlace || '-'}, ${patientData?.birthDttm || '-'}`, colSpan: 2 },
      { title: t('assurance.phone_number'), body: fAsterisk(patientData?.phone || '-'), colSpan: 2 },
      {
        title: t('assurance.address'),
        body: patientData?.address || '-',
        colSpan: 4
      },
    ],
    [t, values, patientData]
  );

  const onPractitionerSelect = (method?: string) => {
    if (method === "healthcare") {
      handleChangePage({ action: 'next' })
    } else {
      handleChangePage({ action: 'next' });
    }
  };

  const onRadServiceSelect = () => {
    handleChangePage({ action: 'next' });
  };

  const onAssuranceSelect = (type: Insurancetype) => {

    setValue("payplan", type)

    if (encounterType === 'RJ' && type === 'bpjs') {
      handleChangePage({
        newFormSteps: formStepsOutpatientBPJS,
        toSpecificPage: 'insert_bpjs_number',
      });
    }

    if (encounterType === 'RJ' && type === 'company') {
      handleChangePage({
        newFormSteps: formStepsOutpatientCompany,
        toSpecificPage: 'select_company',
      });
    }

    if (encounterType === 'RJ' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsOutpatientInsurance,
        toSpecificPage: 'select_insurance',
      });
    }

    if (encounterType === 'MCU' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsMCUAssurance,
        toSpecificPage: 'select_insurance',
      });
    }

    if (encounterType === 'MCU' && type === 'company') {
      handleChangePage({
        newFormSteps: formStepsMCUCompany,
        toSpecificPage: 'select_company',
      });
    }

    if (encounterType === 'LAB' && type === 'company') {
      handleChangePage({ newFormSteps: formStepsLabCompany, toSpecificPage: 'select_company' });
    }

    if (encounterType === 'LAB' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsLabInsurance,
        toSpecificPage: 'select_insurance',
      });
    }

    if (encounterType === 'RAD' && type === 'company') {
      handleChangePage({ newFormSteps: formStepsRadCompany, toSpecificPage: 'select_company' });
    }

    if (encounterType === 'RAD' && type === 'insurance') {
      handleChangePage({
        newFormSteps: formStepsRadInsurance,
        toSpecificPage: 'select_insurance',
      });
    }
  };

  const handleGetListPackageMCU = useCallback(async (keyword: string, page: number) => {
    try {
      const response = await getMCUPackage({
        page,
        keyword,
      });

      setMCUPackageList(response);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleGetListPackageLab = useCallback(async (keyword: string, page: number) => {
    try {
      const response = await getLabPackage({
        page,
        keyword,
      });

      setLabPackageList(response);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleGetListPackageRadiology = useCallback(async (keyword: string, page: number) => {
    try {
      const response = await getRadiologyPackage({
        page,
        keyword,
      });

      setRadiologyPackageList(response);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleCreateBooking = useCallback(async () => {
    try {
      // await createBooking({
      //   ...(encounterType === 'RJ'
      //     ? {
      //       doctorId: getValues()?.practionerId ?? '-',
      //       polyId: getValues()?.departmentId ?? '-',
      //     }
      //     : encounterType === 'MCU'
      //       ? {
      //         packageMCUId: getValues()?.MCUPackageId ?? '-',
      //       }
      //       : encounterType === 'LAB'
      //         ? {
      //           packageLabId: getValues()?.LabPackageId,
      //         }
      //         : encounterType === 'RAD'
      //           ? {
      //             packageRadiologyId: getValues()?.radPackageId,
      //           }
      //           : {}),
      //   patientId: getValues()?.patientId ?? '-',
      //   payplanClass: getValues()?.payplan ?? '-',
      //   serviceType: getValues()?.serviceType ?? '-',
      // });

      const patientID = values.patientId || ""

      const newData: BookingInput = {
        serviceType: values.serviceType,
        serviceParamOutpatient: {
          // departmentID: values.departmentId || '',
          // doctorID: values.practionerId || ''
          scheduleID: values.scheduleID || ''
        },
        payorParam: {
          payplanClass: ((values.payplan || '') as string).toLowerCase(),
        },
      }

      // const resp = await bookingCreateNoQuery({ data: newData, patientID })

      const payplanClass = ((values.payplan || '') as string).toLowerCase()
      const selectedInsurance = values?.selectedInsurance as Insurance | undefined
      const selectedCompany = values?.selectedCompany as Company | undefined

      const resp = await appointmentCreate({
        data: {
          booking: {
            payorParam: {
              payplanClass,
              payplanParamInsurance: payplanClass === "insurance" ? { patientCoverageID: selectedInsurance?.patient?.patientCoverageID || selectedInsurance?.insuranceId || '', subscriberWarrantyNumber: selectedInsurance?.patient?.warrantyNo || '' } : undefined,
              payplanParamCompany: payplanClass === "company" ? { patientCoverageID: selectedCompany?.patient?.patientCoverageID || selectedCompany?.companyId || '', subscriberWarrantyNumber: selectedCompany?.patient?.subscribeWarrantyNumber || '' } : undefined
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

      setValue("resBookingID", resp.data.booking.bookingID)

      toast.success("Berhasil")

      handleChangePage({ action: 'next' });
    } catch (e) {
      toast.error(e?.message || "Gagal")
    }
  }, [getValues, handleChangePage, encounterType]);

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
      setValue('statusAdmission', newData.statusAdmission)
    } catch (e) {
      throw Error("INI_MAH_NORMAL")
    }
  };

  const handleSelectGeneralPayment = () => {
    setValue('payplan', 'GENERAL');

    if (encounterType === 'MCU') {
      handleGetListPackageMCU('', 1);
    }

    if (encounterType === 'LAB') {
      handleGetListPackageLab('', 1);
    }

    if (encounterType === 'RAD') {
      handleGetListPackageRadiology('', 1);
    }

    handleChangePage({ action: 'next' });
  };

  const handleSelectMCUPackage = useCallback(
    (selected: { id: string; packageName: string }) => {
      setValue('MCUPackageId', selected.id);
      setSelectedPackageMCUName(selected.packageName);
      handleChangePage({
        action: 'next',
      });
    },
    [handleChangePage, setValue, setSelectedPackageMCUName]
  );

  const handleSelectLabPackage = useCallback(
    (selected: { id: string; name: string; price: number }) => {
      setValue('LabPackageId', selected.id);
      setSelectedPackageLab({
        name: selected.name,
        price: selected.price,
      });
      handleChangePage({
        action: 'next',
      });
    },
    [handleChangePage, setValue, setSelectedPackageLab]
  );

  const handleSelectRadiologyPackage = useCallback(
    (selected: { id: string; name: string; price: number }) => {
      setValue('radPackageId', selected.id);
      setSelectedPackageRadiology({
        name: selected.name,
        price: selected.price,
      });
      handleChangePage({
        action: 'next',
      });
    },
    [handleChangePage, setValue, setSelectedPackageRadiology]
  );

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

          setEncounterType('RJ');
          setValue('serviceType', 'OUTPATIENT');
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
          size={currentPage.properties?.containerSize}
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
            {currentPage.value === 'select_encounter_type' && (
              <SelectEncounterType
                items={listEncounterType}
                handleResetEncounterType={() => { !locationState?.fromRegistration && setEncounterType(null) }}
              />
            )}

            {currentPage.value === 'insert_nik' && (
              <InsertIdentifier errorMessage={errors.errorIdentifier} />
            )}

            {currentPage.value === 'nik_not_found' && (
              <IdentifierNotFound
                identifier={values.nik}
                handleClick={(param) => {
                  if (param === "search") handleChangePage({ action: "previous" });
                  if (param === "anjungan") navigate(`/registration/${enBase64(values.nik)}`)
                }}
              />
            )}

            {currentPage.value === 'information_outpatient_general' && patientData && (
              <InformationOutpatientGeneral
                leftTextButton={t('appointment.patient.actions.invalid_button')}
                rightTextButton={t('appointment.patient.actions.valid_button')}
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
                handleGeneral={handleSelectGeneralPayment}
                encounterType={encounterType}
                handleAssurance={onAssuranceSelect}
              />
            )}

            {currentPage.value === 'select_healthcare_practitioner' && (
              <SelectPractitioner
                onCardSelect={onPractitionerSelect}
                setSelectedPractitioner={setSelectedPractioner}
              />
            )}

            {currentPage.value === 'select_time' && (
              <SelectTime
                doctorInfo={selectedPractioner}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={() => {
                  if (!watchBookTime) {
                    setErrorMessage((prev) => ({ ...prev, bookTimeErr: 'Jam Harus Diisi' }));
                  } else {
                    handleChangePage({ action: 'next' });
                    setErrorMessage({ bookTimeErr: '', dateErr: '', unableErr: '' })
                  }
                }}
                reservationType={"RJ"}
                errorMessage={errorMessage}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration' && patientData && (
              <ConfirmationOutpatient
                patientDetail={patientData}
                radPackage={selectedPackageRadiology}
                doctorInfo={selectedPractioner}
                encounterType={encounterType}
                labPackage={selectedPackageLab}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleConfirm={handleCreateBooking}
                type={(values?.payplan || "general").toLowerCase()}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration_mcu' &&
              patientData &&
              selectedPackageMCUName && (
                <ConfirmationOutpatientMCU
                  packageName={selectedPackageMCUName}
                  patientDetail={patientData}
                  handleBack={() => {
                    handleChangePage({ action: 'previous' });
                  }}
                  handleConfirm={handleCreateBooking}
                />
              )}

            {currentPage.value === 'confirmation_patient_registration_insurance' && patientData && (
              <ConfirmationOutpatient
                doctorInfo={selectedPractioner}
                radPackage={selectedPackageRadiology}
                patientDetail={patientData}
                encounterType={encounterType}
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

            {currentPage.value === 'registration_success' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                encounterType={encounterType}
                radiologyPackage={selectedPackageRadiology}
                practitioner={selectedPractioner}
                labPackage={selectedPackageLab}
                MCUPackageName={selectedPackageMCUName}
                type="general"
              />
            )}

            {currentPage.value === 'registration_success_insurance' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                radiologyPackage={selectedPackageRadiology}
                encounterType={encounterType}
                practitioner={selectedPractioner}
                labPackage={selectedPackageLab}
                MCUPackageName={selectedPackageMCUName}
                type="insurance"
              />
            )}

            {currentPage.value === 'registration_success_company' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                radiologyPackage={selectedPackageRadiology}
                encounterType={encounterType}
                practitioner={selectedPractioner}
                labPackage={selectedPackageLab}
                MCUPackageName={selectedPackageMCUName}
                type="company"
              />
            )}

            {currentPage.value === 'select_insurance' && (
              <SelectInsurance
                handleSelect={() => {
                  if (encounterType === 'RJ') {
                    handleChangePage({ toSpecificPage: 'select_healthcare_practitioner' });
                  } else if (encounterType === 'LAB') {
                    handleChangePage({ toSpecificPage: 'select_lab_package' });
                  } else if (encounterType === 'RAD') {
                    handleChangePage({ toSpecificPage: 'select_rad_service' });
                  } else if (encounterType === 'MCU') {
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

            {currentPage.value === 'insert_polis_number' && (
              <InsertPolisNumber
                onBack={() => { handleChangePage({ action: "previous" }) }}
                onNext={() => {
                  trigger(["createPaymentScheme", "createPolisNumber", "createPolisHolder"]).then((res) => { console.log(res); if (res) handleChangePage({ action: "next" }) })
                }}
              />
            )}

            {currentPage.value === 'information_data_patient_insurance' && (
              <InformationPatient
                title={t('assurance.subtitle.detail_data')}
                detailData={getListDataInsurance}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleNext={async () => {
                  const response = await createPatientCoverageAPM({
                    data: {
                      patientID: patientData?.patientID || '',
                      payplanID: (values?.createPaymentScheme as Payplan)?.payplanID || '',
                      subscibreNumber: values?.createPolisNumber || '',
                      subscriberName: values?.createPolisHolder || ''
                    }
                  })

                  if (response.status) {
                    toast.success(response.message)

                    setValue("selectedInsurance", { insuranceId: response.data.patientCoverageID, patient: { warrantyNo: response.data.subscriberWarrantyNumber } })
                    handleChangePage({ action: 'next' });
                  } else {
                    toast.error(response.message)
                  }
                }}
              />
            )}

            {currentPage.value === 'select_company' && (
              <SelectCompany
                handleSelect={() => {
                  if (encounterType === 'RJ') {
                    handleChangePage({ toSpecificPage: 'select_healthcare_practitioner' });
                  } else if (encounterType === 'LAB') {
                    handleChangePage({ toSpecificPage: 'select_lab_package' });
                  } else if (encounterType === 'RAD') {
                    handleChangePage({ toSpecificPage: 'select_rad_service' });
                  } else if (encounterType === 'MCU') {
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

            {currentPage.value === 'confirmation_patient_registration_company' && patientData && (
              <ConfirmationOutpatient
                doctorInfo={selectedPractioner}
                radPackage={selectedPackageRadiology}
                encounterType={encounterType}
                patientDetail={patientData}
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

            {currentPage.value === 'insert_employee_number' && (
              <InsertEmployeeNumber
                onNext={() => {
                  trigger(["createPaymentScheme", "createPolisNumber", "createPolisHolder"]).then((res) => { console.log(res); if (res) handleChangePage({ action: "next" }) })
                }}
                onBack={() => { handleChangePage({ action: "previous" }) }}
              />
            )}

            {currentPage.value === 'information_data_employee' && (
              <InformationPatient
                title={t('assurance.subtitle.detail_data_employee')}
                detailData={getListDataEmployee}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                handleNext={async () => {
                  const response = await createPatientCoverageAPM({
                    data: {
                      patientID: patientData?.patientID || '',
                      payplanID: (values?.createPaymentScheme as Payplan)?.payplanID || '',
                      subscibreNumber: values?.createPolisNumber || '',
                      subscriberName: values?.createPolisHolder || ''
                    }
                  })

                  if (response.status) {
                    toast.success(response.message)
                    setValue("selectedCompany", { patient: { subscribeWarrantyNumber: response.data.subscriberWarrantyNumber }, companyId: response.data.patientCoverageID })
                    handleChangePage({ action: 'next' });
                  } else {
                    toast.error(response.message)
                  }
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

            {currentPage.value === 'confirmation_patient_registration_bpjs' && patientData && (
              <ConfirmationOutpatient
                doctorInfo={selectedPractioner}
                radPackage={selectedPackageRadiology}
                encounterType={encounterType}
                patientDetail={patientData}
                labPackage={selectedPackageLab}
                handleBack={() => {
                  handleChangePage({ action: 'previous' });
                }}
                type="bpjs"
                handleConfirm={async () => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'registration_success_bpjs' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                radiologyPackage={selectedPackageRadiology}
                encounterType={encounterType}
                practitioner={selectedPractioner}
                labPackage={selectedPackageLab}
                MCUPackageName={selectedPackageMCUName}
                type="bpjs"
              />
            )}

            {currentPage.value === 'select_mcu_package' && (
              <SelectMCUPackage
                handleSelect={handleSelectMCUPackage}
                data={mcuPackageList}
                handleGetPackage={handleGetListPackageMCU}
              />
            )}

            {currentPage.value === 'select_lab_package' && (
              <SelectLabPackage
                onCardSelect={handleSelectLabPackage}
                data={labPackageList}
                handleGetPackage={handleGetListPackageLab}
              />
            )}

            {currentPage.value === 'select_rad_service' && (
              <SelectRadService
                onCardSelect={handleSelectRadiologyPackage}
                data={radiologyPackageList}
                handleGetPackage={handleGetListPackageRadiology}
              />
            )}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
};

export default EncounterPage;
