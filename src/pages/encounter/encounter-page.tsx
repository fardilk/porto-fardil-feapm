import { Box } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { AppPage } from "src/components/app-page"
import type { CardBannerProps } from "src/components/card-banner/types"
import { Form } from "src/components/hook-form"
import { InsertIdentifier } from "src/components/insert-identifier"
import { WindowContainer } from "src/components/window-container"
import { useStepper } from "src/hooks"
import { getDummyData } from "../registration/model/functions"
import { ConfirmationOutpatientGeneral, InformationOutpatientGeneral, PaymentMethod, SelectEncounterType, SelectInsurance, SelectPractitioner, SuccessOutpatientGeneral } from "./components"
import { Insurancetype } from "./model/types"

const EncounterPage = () => {

  const navigate = useNavigate()
  const {
    currentPage,
    currentPageIndex,
    handleChangePage
  } = useStepper({ initialSteps: formStepsOutpatientGeneral })

  const [listEncounterType, _setListEncounterType] = useState<CardBannerProps[]>([
    {
      title: "PEMERIKSAAN RAWAT JALAN",
      body: "Layanan medis yang mencakup evaluasi kesehatan, diagnosis, dan perawatan tanpa memerlukan rawat inap.",
      localIcon: "stethoscope",
      onClick: () => { handleChangePage({ action: "next", newFormSteps: formStepsOutpatientGeneral }) }
    },
    {
      title: "MEDICAL CHECK UP",
      body: "Serangkaian uji kesehatan rutin untuk memeriksa kesehatan tubuh secara keseluruhan dan mengantisipasi risiko penyakit.",
      localIcon: "medical-checkup",
      onClick: () => { }
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

  const methods = useForm()
  const { handleSubmit } = methods

  const onPractitionerSelect = () => {
    handleChangePage({ action: "next" })
  }

  const onAssuranceSelect = (type: Insurancetype) => {
    if (type === "bpjs") {
      console.log("bpjs")
    } else if (type === "company") {
      console.log("company")
    } else if (type === "insurance") {
      handleChangePage({ action: "next", newFormSteps: formStepsOutpatientInsurance })
    }
  }

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 1) {

      const resp = await getDummyData("company")

      handleChangePage({ action: "next" })

    } else {
      console.log('hello world')
    }
  }

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title={currentPage.label}
          size={currentPage.properties?.containerSize || "large"}
          handleBackNavigation={() => { handleChangePage({ action: "previous" }) }}
          handleCloseNavigation={() => { navigate("/", { replace: true }) }}
          hideBackNavigation={currentPage?.properties?.disableBack}
          hideCloseNavigation={currentPage?.properties?.disableClose}
        >
          <Box sx={{ p: 4 }}>

            {currentPage.value === "select_encounter_type" && <SelectEncounterType items={listEncounterType} />}

            {currentPage.value === "insert_nik" && <InsertIdentifier />}

            {currentPage.value === "information_outpatient_general" && (
              <InformationOutpatientGeneral
                leftTextButton="Data salah, isi ulang NIK"
                rightTextButton="Data sudah benar, lanjutkan"
                leftButtonProps={{ onClick: () => { handleChangePage({ action: "previous" }) } }}
                rightButtonProps={{ onClick: () => { handleChangePage({ action: "next" }) } }}
              />
            )}

            {currentPage.value === "payment_method" && (
              <PaymentMethod
                handleGeneral={() => { }}
                handleAssurance={onAssuranceSelect}
              />
            )}

            {currentPage.value === "select_healthcare_practitioner" && <SelectPractitioner onCardSelect={onPractitionerSelect} />}

            {currentPage.value === "confirmation_patient_registration" && <ConfirmationOutpatientGeneral handleConfirm={() => { handleChangePage({ action: "next" }) }} />}

            {currentPage.value === "registration_success" && <SuccessOutpatientGeneral />}

            {currentPage.value === "select_insurance" && <SelectInsurance handleSelect={() => { handleChangePage({ action: "next" }) }} />}

          </Box>

        </WindowContainer>
      </Form>
    </AppPage>
  )
}

export default EncounterPage

const initialStep = [
  {
    label: "Pilih Jenis Kunjungan",
    value: "select_encounter_type",
    properties: {
      disableBack: true
    }
  },
  {
    label: "Masukkan NIK",
    value: "insert_nik"
  },
  {
    label: "Informasi Data Pasien",
    value: "information_outpatient_general",
    properties: {
      disableBack: true
    }
  },
  {
    label: "Pilih Jenis Pembayaran",
    value: "payment_method",
    properties: {
      disableBack: true
    }
  },
]

const formStepsOutpatientGeneral = [
  ...initialStep,
  {
    label: "Pilih Dokter Poli",
    value: "select_healthcare_practitioner",
    properties: {
      disableBack: true
    }
  },
  {
    label: "Konfirmasi Pendaftaran Pasien",
    value: "confirmation_patient_registration",
    properties: {
      disableBlack: true
    }
  },
  {
    label: "Pendaftaran Berhasil",
    value: "registration_success",
    properties: {
      disableBack: true
    }
  }
]

const formStepsOutpatientInsurance = [
  ...initialStep,
  {
    label: "Pilih Asuransi",
    value: "select_insurance",
    properties: {
      disableBack: true,
      containerSize: "superLarge"
    }
  },
  {
    label: "Pilih Dokter Poli",
    value: "select_healthcare_practitioner",
    properties: {
      disableBack: true
    }
  },
  {
    label: "Konfirmasi Pendaftaran Pasien",
    value: "confirmation_patient_registration",
    properties: {
      disableBlack: true
    }
  },
  {
    label: "Pendaftaran Berhasil",
    value: "registration_success",
    properties: {
      disableBack: true
    }
  }
]