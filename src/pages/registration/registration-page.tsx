import { Box } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { AppPage } from "src/components/app-page"
import { Form } from "src/components/hook-form"
import { WindowContainer } from "src/components/window-container"
import { useStepper } from "src/hooks/use-stepper"
import { InsertEmail, InsertPhone, NewPatient, PatientInformation, SuccessNewPatient } from "./components"
import { getDummyData } from "./model/functions"
import type { RegistrationIForm } from "./model/types"
import { InsertIdentifier } from "src/components/insert-identifier"

const RegistrationPage = () => {

  const defaultValues: RegistrationIForm = {
    citizenship: false
  }

  const navigate = useNavigate()

  const {
    currentPage,
    currentPageIndex,
    handleChangePage
  } = useStepper({ initialSteps: formStepsExistInInternal })

  const methods = useForm({ defaultValues })
  const { handleSubmit, watch } = methods
  const isForeign = watch("citizenship")

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 0) {

      if (isForeign) {
        handleChangePage({ action: "next", newFormSteps: formStepsForeign })
      } else {
        const resp = await getDummyData("medrec_exit")

        if (resp.data === "medrec_exit") handleChangePage({ action: "next", newFormSteps: formStepsExistInInternal });
        else if (resp.data === "exist_satusehat") handleChangePage({ action: "next", newFormSteps: formStepsExistInSatuSehat });
        else if (resp.data === "not_exist_satusehat") handleChangePage({ action: "next", newFormSteps: formStepsNotExistInSatuSehat })
      }
    } else {
      switch (currentPage.value) {
        case "insert_email":
          handleChangePage({ toSpecificPage: "information" })
          break;
        default:
          handleChangePage({ action: "next" });
      }
    }
  }

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <WindowContainer
          title={currentPage.label}
          handleBackNavigation={() => handleChangePage({ action: "previous" })}
          handleCloseNavigation={() => navigate("/", { replace: true })}
          hideBackNavigation={currentPage.properties?.hideBack}
          hideCloseNavigation={currentPage.properties?.hideClose}
        >
          <Box sx={{ p: 4 }}>

            {currentPage.value === "insert_nik" && <InsertIdentifier />}

            {
              currentPage.value === "information" && (
                <PatientInformation
                  leftTextButton="Kembali Ke Beranda"
                  rigthTextButton="Edit Nomor Telepon dan Email"
                  leftButtonProps={{ onClick: () => navigate("/") }}
                  rightButtonProps={{ onClick: () => handleChangePage({ action: "next" }) }}
                />
              )
            }

            {currentPage.value === "insert_phone_number" && <InsertPhone />}

            {currentPage.value === "insert_email" && <InsertEmail />}

            {currentPage.value === "create_new_patient" && (
              <NewPatient
                handleNextPage={() => handleChangePage({ action: "next" })}
                handlePreviousPage={() => handleChangePage({ action: "previous" })}
              />
            )}

            {
              currentPage.value === "confirmation_new_patient" && (
                <PatientInformation
                  leftTextButton={isForeign ? "Incorrect Data, Please Re-enter Data" : "Data salah, isi ulang data"}
                  rigthTextButton={isForeign ? "Data is Correct, Continue" : "Data sudah benar, lanjutkan"}
                  leftButtonProps={{ onClick: () => handleChangePage({ action: "previous" }) }}
                  rightButtonProps={{ onClick: () => handleChangePage({ action: "next" }) }}
                />
              )
            }

            {currentPage.value === "success_new_patient" && (
              <SuccessNewPatient handleFinish={() => navigate("/")} />
            )}
          </Box>
        </WindowContainer>

      </Form>
    </AppPage>
  )
}

export default RegistrationPage

const formStepsExistInInternal = [
  {
    label: "Masukkan NIK",
    value: "insert_nik"
  },
  {
    label: "Informasi Data Pasien",
    value: "information",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Masukkan Nomor Telepon",
    value: "insert_phone_number"
  },
  {
    label: "Masukkan Email",
    value: "insert_email"
  }
]

const formStepsExistInSatuSehat = [
  {
    label: "Masukkan NIK",
    value: "insert_nik"
  },
  {
    label: "Isi Data Pasien Baru",
    value: "create_new_patient"
  },
  {
    label: "Konfirmasi Data Pasien",
    value: "confirmation_new_patient",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Pendaftaran Berhasil",
    value: "success_new_patient",
    properties: {
      hideBack: true,
    }
  }
]

const formStepsNotExistInSatuSehat = [
  {
    label: "Masukkan NIK",
    value: "insert_nik"
  },
  {
    label: "Isi Data Pasien Baru",
    value: "create_new_patient"
  },
  {
    label: "Konfirmasi Data Pasien",
    value: "confirmation_new_patient",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Pendaftaran Berhasil",
    value: "success_new_patient",
    properties: {
      hideBack: true,
    }
  }
]

const formStepsForeign = [
  {
    label: "Submit Passport",
    value: "insert_nik"
  },
  {
    label: "Entry New Data Patient",
    value: "create_new_patient"
  },
  {
    label: "Patient Data Confirmation",
    value: "confirmation_new_patient",
    properties: {
      hideBack: true,
    }
  },
  {
    label: "Registration Successful",
    value: "success_new_patient",
    properties: {
      hideBack: true,
    }
  }
]