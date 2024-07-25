import { Box } from "@mui/material"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { AppPage } from "src/components/app-page"
import type { CardBannerProps } from "src/components/card-banner/types"
import { Form } from "src/components/hook-form"
import { InsertIdentifier } from "src/components/insert-identifier"
import { WindowContainer } from "src/components/window-container"
import { useStepper } from "src/hooks"
import { getDummyData } from "../registration/model/functions"
import { ConfirmationOutpatient, ConfirmationOutpatientMCU, InformationBPJSPatientData, InformationOutpatientGeneral, InformationPatient, InsertBPJSNumber, InsertPolisNumber, PaymentMethod, SelectCompany, SelectCompanyNew, SelectEncounterType, SelectInsurance, SelectInsuranceNew, SelectMCUPackage, SelectPractitioner, SuccessOutpatient } from "./components"
import type { EncounterType, Insurancetype } from "./model/types"
import InsertEmployeeNumber from "./components/insert-employee-number"
import { formStepsMCUAssurance, formStepsMCUCompany, formStepsMCUGeneral, formStepsOutpatientBPJS, formStepsOutpatientCompany, formStepsOutpatientGeneral, formStepsOutpatientInsurance } from "./model/variables"
import { fAsterisk } from "src/utils/helper"

const EncounterPage = () => {

  const navigate = useNavigate()
  const {
    currentPage,
    currentPageIndex,
    handleChangePage,
    formSteps
  } = useStepper({ initialSteps: formStepsOutpatientGeneral })

  const [encounterType, setEncounterType] = useState<EncounterType>(null)

  const [listEncounterType, _setListEncounterType] = useState<CardBannerProps[]>([
    {
      title: "PEMERIKSAAN RAWAT JALAN",
      body: "Layanan medis yang mencakup evaluasi kesehatan, diagnosis, dan perawatan tanpa memerlukan rawat inap.",
      localIcon: "stethoscope",
      onClick: () => { 
        setEncounterType("RJ")
        handleChangePage({ action: "next", newFormSteps: formStepsOutpatientGeneral })
      }
    },
    {
      title: "MEDICAL CHECK UP",
      body: "Serangkaian uji kesehatan rutin untuk memeriksa kesehatan tubuh secara keseluruhan dan mengantisipasi risiko penyakit.",
      localIcon: "medical-checkup",
      onClick: () => { 
        setEncounterType("MCU")
        handleChangePage({
        action: "next",
        newFormSteps: formStepsMCUGeneral
      })}
    },
    {
      title: "LABORATORIUM",
      body: "Fasilitas yang menyediakan uji diagnostik untuk mendukung evaluasi kesehatan, diagnosis, dan medical check up rutin tanpa perlu rawat inap.",
      localIcon: "blood-test",
      onClick: () => { }
    },
    {
      title: "RADIOLOGI",
      body: "Layanan medis yang menyediakan uji pencitraan seperti X-ray, CT scan, dan MRI untuk mendukung diagnosis dan perawatan tanpa memerlukan rawat inap.",
      localIcon: "x-rays",
      onClick: () => { }
    },
  ])

  const getListDataEmployee = useMemo(
    () => [
      { title: 'Nomor Karyawan', body: fAsterisk('100200300400') },
      { title: 'Nama Pemegang Polis', body: 'Anisa Redina' },
      { title: 'Jenis Penjamin', body: 'Asuransi Kesehatan' },
      { title: 'Perusahaan Asuransi', body: 'Allianz Life Insurance' },
      {
        title: 'Alamat',
        body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
      },
      { title: 'Tempat, Tanggal Lahir', body: 'Malaysia, 11-04-2000' },
      { title: 'No Telpon', body: fAsterisk('085157902550') },
    ],
    []
  );

  const getListDataInsurance = useMemo(
    () => [
      { title: 'Nomor Polis', body: fAsterisk('100200300400') },
      { title: 'Nama Pemegang Polis', body: 'Anisa Redina' },
      { title: 'Jenis Penjamin', body: 'Asuransi Kesehatan' },
      { title: 'Perusahaan Asuransi', body: 'Allianz Life Insurance' },
      {
        title: 'Alamat',
        body: 'Jl. Nusa Loka No 24, Kelurahan Rawa Mekar Jaya, Serpong, Tangerang Selatan',
      },
      { title: 'Tempat, Tanggal Lahir', body: 'Malaysia, 11-04-2000' },
      { title: 'No Telpon', body: fAsterisk('085157902550') },
    ],
    []
  );

  const methods = useForm()
  const { handleSubmit } = methods

  const onPractitionerSelect = () => {
    handleChangePage({ action: "next" })
  }

  const onAssuranceSelect = (type: Insurancetype) => {

    if(encounterType === "RJ" && type === "bpjs"){
      handleChangePage({ newFormSteps: formStepsOutpatientBPJS, toSpecificPage: "insert_bpjs_number"})
    }

    if(encounterType === "RJ" && type === "company"){
      handleChangePage({ newFormSteps: formStepsOutpatientCompany, toSpecificPage: "select_company"})
    }

    if(encounterType === "RJ" && type === "insurance"){
      handleChangePage({ newFormSteps: formStepsOutpatientInsurance, toSpecificPage: "select_insurance"})
    }

    if(encounterType === "MCU" && type === "insurance"){
      handleChangePage({
        newFormSteps: formStepsMCUAssurance,
        toSpecificPage: "select_insurance"
      })
    }

    if(encounterType === "MCU" && type === "company"){
      handleChangePage({
        newFormSteps: formStepsMCUCompany,
        toSpecificPage: "select_company"
      })
    }
  }

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 1) {

      await getDummyData("company")

      handleChangePage({ action: "next" })

    } else {
      if (currentPage.value === "insert_polis_number") {
        await getDummyData("")
        handleChangePage({ action: "next" })
      }

      if (currentPage.value === "insert_employee_number") {
        await getDummyData("")
        handleChangePage({ action: "next" })
      }

      if (currentPage.value === "insert_bpjs_number") {
        await getDummyData("")
        handleChangePage({ action: "next" })
      }
    }
  }

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title={currentPage.label}
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
              <SelectEncounterType items={listEncounterType} handleResetEncounterType={() => setEncounterType(null)} />
            )}

            {currentPage.value === 'insert_nik' && <InsertIdentifier />}

            {currentPage.value === 'information_outpatient_general' && (
              <InformationOutpatientGeneral
                leftTextButton="Data salah, isi ulang NIK"
                rightTextButton="Data sudah benar, lanjutkan"
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
                encounterType={encounterType}
                handleAssurance={onAssuranceSelect}
              />
            )}

            {currentPage.value === 'select_healthcare_practitioner' && (
              <SelectPractitioner onCardSelect={onPractitionerSelect} />
            )}

            {currentPage.value === 'confirmation_patient_registration' && (
              <ConfirmationOutpatient
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
                type="general"
              />
            )}

            {currentPage.value === 'confirmation_patient_registration_mcu' && (
              <ConfirmationOutpatientMCU
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'confirmation_patient_registration_insurance' && (
              <ConfirmationOutpatient
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
                type="insurance"
              />
            )}

            {currentPage.value === 'registration_success' && <SuccessOutpatient encounterType={encounterType} type="general" />}

            {currentPage.value === 'registration_success_insurance' && (
              <SuccessOutpatient encounterType={encounterType} type="insurance" />
            )}

            {currentPage.value === 'select_insurance' && (
              <SelectInsurance
                handleSelect={() => {
                  if(encounterType === "RJ"){
                    handleChangePage({ toSpecificPage: 'select_healthcare_practitioner' });
                  }

                  if(encounterType === "MCU"){
                    handleChangePage({
                      action: "next"
                    })
                  }
                }}
                handleSelectNew={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'select_insurance_new' && (
              <SelectInsuranceNew
                handleSelect={() => { handleChangePage({ action: "next" }) }}
              />
            )}

            {
              currentPage.value === "insert_polis_number" && (
                <InsertPolisNumber />
              )
            }

            {currentPage.value === 'information_data_patient_insurance' && (
              <InformationPatient
                title="Detail Data Asuransi Pasien"
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
                  if(encounterType === "RJ"){
                    handleChangePage({ toSpecificPage: 'select_healthcare_practitioner' });
                  }

                  if(encounterType === "MCU"){
                    handleChangePage({ action: 'next'})
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

            {
              currentPage.value === "confirmation_patient_registration_company" && (
                <SuccessOutpatient encounterType={encounterType} type="company" />
              )
            }

            {
              currentPage.value === "insert_employee_number" && (
                <InsertEmployeeNumber />
              )
            }

            {currentPage.value === 'information_data_employee' && (
              <InformationPatient
                title="Detail Data Karyawan"
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
                type="bpjs"
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'registration_success_bpjs' && <SuccessOutpatient encounterType={encounterType} type="bpjs" />}

            {currentPage.value === 'select_mcu_package' && (
              <SelectMCUPackage
                handleSelect={() =>
                  handleChangePage({
                    action: 'next'
                  })
                }
              />
            )}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
}

export default EncounterPage
