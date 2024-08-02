import { Box } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AppPage } from 'src/components/app-page';
import { Form } from 'src/components/hook-form';
import { InsertIdentifier } from 'src/components/insert-identifier';
import { WindowContainer } from 'src/components/window-container';
import { useStepper } from 'src/hooks';
import { getDummyData } from '../registration/model/functions';
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
  SelectEncounterType,
  SelectInsurance,
  SelectInsuranceNew,
  SelectMCUPackage,
  SelectPractitioner,
  SuccessOutpatient,
} from './components';
import type {
  EncounterType,
  GetPatientByNIKResponse,
  Insurancetype,
  ListDoctorResponse,
  ListMCUPackageResponse,
  ListPolyResponse,
  SelectedPractioner,
} from './model/types';
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
import { useTranslate } from 'src/locales';
import {
  createBooking,
  getDoctorList,
  getMCUPackage,
  getPatientByNIK,
  getPolyList,
} from './model/functions';
import { Nullable } from 'src/types/common';

const EncounterPage = () => {
  const { t } = useTranslate();
  const methods = useForm();
  const { handleSubmit, watch, setValue, getValues } = methods;

  const navigate = useNavigate();
  const { currentPage, currentPageIndex, handleChangePage } = useStepper({
    initialSteps: formStepsOutpatientGeneral,
  });

  const [selectedPractioner, setSelectedPractioner] = useState<Nullable<SelectedPractioner>>(null);
  const [selectedPackageMCUName, setSelectedPackageMCUName] = useState<Nullable<string>>(null);
  const [encounterType, setEncounterType] = useState<EncounterType>(null);
  const [patientData, setPatientData] = useState<Nullable<GetPatientByNIKResponse>>(null);
  const [listDoctor, setListDoctor] = useState<ListDoctorResponse>([]);
  const [mcuPackageList, setMCUPackageList] = useState<ListMCUPackageResponse>([]);
  const [listPoly, setListPoly] = useState<ListPolyResponse>([]);
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
    {
      title: t('encounter.mcu.title'),
      body: t('encounter.mcu.description'),
      localIcon: 'medical-checkup',
      onClick: () => {
        setEncounterType('MCU');
        setValue('serviceType', 'MCU');
        handleChangePage({
          action: 'next',
          newFormSteps: formStepsMCUGeneral,
        });
      },
    },
    {
      title: t('encounter.laboratory.title'),
      body: t('encounter.laboratory.description'),
      localIcon: 'blood-test',
      onClick: () => {
        setEncounterType('LAB');
        handleChangePage({ action: 'next', newFormSteps: formStepsLabGeneral });
      },
    },
    {
      title: t('encounter.radiology.title'),
      body: t('encounter.radiology.description'),
      localIcon: 'x-rays',
      onClick: () => {
        setEncounterType('RAD');
        handleChangePage({ action: 'next', newFormSteps: formStepsRadGeneral });
      },
    },
  ];

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

  const handleGetListDoctor = useCallback(async (keyword: string, page: number) => {
    try {
      const response = await getDoctorList({
        page,
        keyword,
      });

      setListDoctor(response);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleGetListPoly = useCallback(async (keyword: string, page: number) => {
    try {
      const response = await getPolyList({
        page,
        keyword,
      });

      setListPoly(response);
    } catch (e) {
      console.log(e);
    }
  }, []);

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

  const handleCreateBooking = useCallback(async () => {
    try {
      await createBooking({
        ...(encounterType === 'RJ'
          ? {
              doctorId: getValues()?.practionerId ?? '-',
              polyId: getValues()?.departmentId ?? '-',
            }
          : encounterType === 'MCU'
            ? {
                packageMCUId: getValues()?.MCUPackageId ?? '-',
              }
            : {}),
        patientId: getValues()?.patientId ?? '-',
        payplanClass: getValues()?.payplan ?? '-',
        serviceType: getValues()?.serviceType ?? '-',
      });

      handleChangePage({ action: 'next' });
    } catch (e) {
      console.log(e);
    }
  }, [getValues, handleChangePage, encounterType]);

  const handleGetPatientByNIK = async (NIK: string) => {
    try {
      const res = await getPatientByNIK({
        NIK,
      });
      setPatientData(res);
      setValue('patientId', res.patientID);
    } catch (e) {
      Promise.reject(e);
    }
  };

  const handleSelectGeneralPayment = () => {
    setValue('payplan', 'GENERAL');
    if (encounterType === 'RJ') {
      handleGetListDoctor('', 1);
      handleGetListPoly('', 1);
    }

    if (encounterType === 'MCU') {
      handleGetListPackageMCU('', 1);
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

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 1) {
      const nik = data?.nik?.replaceAll('\n', '');
      try {
        await handleGetPatientByNIK(nik);
        handleChangePage({ action: 'next' });
      } catch (e) {
        console.log(e);
      }
    } else {
      if (currentPage.value === 'insert_polis_number') {
        await getDummyData('');
        handleChangePage({ action: 'next' });
      }

      if (currentPage.value === 'insert_employee_number') {
        await getDummyData('');
        handleChangePage({ action: 'next' });
      }

      if (currentPage.value === 'insert_bpjs_number') {
        await getDummyData('');
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
            {currentPage.value === 'select_encounter_type' && (
              <SelectEncounterType
                items={listEncounterType}
                handleResetEncounterType={() => setEncounterType(null)}
              />
            )}

            {currentPage.value === 'insert_nik' && <InsertIdentifier />}

            {currentPage.value === 'information_outpatient_general' && patientData && (
              <InformationOutpatientGeneral
                leftTextButton={t('appointment.patient.actions.invalid_button')}
                rightTextButton={t('appointment.patient.actions.valid_button')}
                leftButtonProps={{
                  onClick: () => {
                    setPatientData(null);
                    handleChangePage({ action: 'previous' });
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
                setFormValue={setValue}
                watchFormValue={watch}
                onCardSelect={onPractitionerSelect}
                handleGetDoctor={handleGetListDoctor}
                handleGetPoly={handleGetListPoly}
                setSelectedPractitioner={setSelectedPractioner}
                listDoctor={listDoctor}
                listPoly={listPoly}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration' &&
              patientData &&
              selectedPractioner && (
                <ConfirmationOutpatient
                  patientDetail={patientData}
                  doctorInfo={selectedPractioner}
                  handleBack={() => {
                    handleChangePage({ action: 'previous' });
                  }}
                  handleConfirm={handleCreateBooking}
                  type="general"
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

            {currentPage.value === 'confirmation_patient_registration_insurance' &&
              patientData &&
              selectedPractioner && (
                <ConfirmationOutpatient
                  doctorInfo={selectedPractioner}
                  patientDetail={patientData}
                  handleBack={() => {
                    handleChangePage({ action: 'previous' });
                  }}
                  handleConfirm={() => {
                    handleChangePage({ action: 'next' });
                  }}
                  type="insurance"
                />
              )}

            {currentPage.value === 'registration_success' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                encounterType={encounterType}
                practitioner={selectedPractioner}
                MCUPackageName={selectedPackageMCUName}
                type="general"
              />
            )}

            {currentPage.value === 'registration_success_insurance' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                encounterType={encounterType}
                practitioner={selectedPractioner}
                MCUPackageName={selectedPackageMCUName}
                type="insurance"
              />
            )}

            {currentPage.value === 'registration_success_company' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                encounterType={encounterType}
                practitioner={selectedPractioner}
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

            {currentPage.value === 'confirmation_patient_registration_company' &&
              patientData &&
              selectedPractioner && (
                <ConfirmationOutpatient
                  doctorInfo={selectedPractioner}
                  patientDetail={patientData}
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

            {currentPage.value === 'confirmation_patient_registration_bpjs' &&
              patientData &&
              selectedPractioner && (
                <ConfirmationOutpatient
                  doctorInfo={selectedPractioner}
                  patientDetail={patientData}
                  handleBack={() => {
                    handleChangePage({ action: 'previous' });
                  }}
                  type="bpjs"
                  handleConfirm={() => {
                    handleChangePage({ action: 'next' });
                  }}
                />
              )}

            {currentPage.value === 'registration_success_bpjs' && patientData && (
              <SuccessOutpatient
                patientData={patientData}
                encounterType={encounterType}
                practitioner={selectedPractioner}
                MCUPackageName={selectedPackageMCUName}
                type="bpjs"
              />
            )}

            {currentPage.value === 'select_mcu_package' && (
              <SelectMCUPackage
                handleSelect={handleSelectMCUPackage}
                watchFormValue={watch}
                setFormValue={setValue}
                data={mcuPackageList}
                handleGetPackage={handleGetListPackageMCU}
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

export default EncounterPage;
