import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { Form } from "src/components/hook-form"
import { Iconify } from "src/components/iconify"
import { CloseIcon } from "yet-another-react-lightbox"
import { InsertEmail, InsertNIK, InsertPhone, NewPatient, PatientInformation, SuccessNewPatient } from "./components"
import { getDummyData } from "./model/functions"
import { RegistrationIForm } from "./model/types"

const RegistrationPage = () => {

  const defaultValues: RegistrationIForm = {
    citizenship: false
  }

  const navigate = useNavigate()
  const [formSteps, setFormSteps] = useState(formStepsExistInInternal)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState<{ label: string, value: string }>(formSteps[0])

  const methods = useForm({ defaultValues })
  const { handleSubmit, watch } = methods
  const isForeign = watch("citizenship")

  const handleChangePage = ({ action, newFormSteps, toSpecificPage }: {
    action?: "next" | "previous",
    newFormSteps?: { label: string, value: string }[],
    toSpecificPage?: string
  }) => {
    const tempFormSteps = newFormSteps || formSteps
    if (newFormSteps) setFormSteps(newFormSteps);


    if (toSpecificPage) {
      const specificPageIndex = tempFormSteps.findIndex((row) => row.value === toSpecificPage)

      if (specificPageIndex) {
        setCurrentPageIndex(specificPageIndex)
        setCurrentPage(tempFormSteps[specificPageIndex])
      }
    } else if (currentPageIndex >= 0 && currentPageIndex <= tempFormSteps.length) {

      const newCurrentPageIndex = currentPageIndex + (action === "next" ? 1 : -1)
      setCurrentPageIndex(newCurrentPageIndex)
      setCurrentPage(tempFormSteps[newCurrentPageIndex])
    }
  }

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 0) {

      if (isForeign) {
        handleChangePage({ action: "next", newFormSteps: formStepsForeign })
      } else {
        const resp = await getDummyData()

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
    <>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", placeContent: "center", p: 4 }}>
          <Box sx={{ width: { xs: "90%", md: "70%", lg: "60%" }, bgcolor: (theme) => theme.palette.background.paper, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
            <Box>
              <AppBar position="static" sx={{ bgcolor: (theme) => theme.palette.grey[300], borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    sx={{ mr: 2 }}
                    onClick={() => handleChangePage({ action: "previous" })}
                  >
                    <Iconify icon="solar:alt-arrow-left-line-duotone" />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {currentPage.label}
                  </Typography>
                  <IconButton onClick={() => navigate("/")}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Box sx={{ p: 4 }}>

                {currentPage.value === "insert_nik" && <InsertNIK />}

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
            </Box>
          </Box>
        </Box >
      </Form>

    </>
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
    value: "information"
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
    value: "confirmation_new_patient"
  },
  {
    label: "Pendaftaran Berhasil",
    value: "success_new_patient"
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
    value: "confirmation_new_patient"
  },
  {
    label: "Pendaftaran Berhasil",
    value: "success_new_patient"
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
    value: "confirmation_new_patient"
  },
  {
    label: "Registration Successful",
    value: "success_new_patient"
  }
]