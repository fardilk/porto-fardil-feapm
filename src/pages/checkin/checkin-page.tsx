import { Box } from "@mui/material"
import { useForm } from "react-hook-form"
import { AppPage } from "src/components/app-page"
import { Form } from "src/components/hook-form"
import { WindowContainer } from "src/components/window-container"
import { useStepper } from "src/hooks"
import { getDummyData } from "../registration/model/functions"
import { InformationBooking, InformationBookingBPJS, InformationBookingCompany, InformationBookingInsurance, InsertBookingNumber } from "./components"
import { useNavigate } from "react-router"

const CheckinPage = () => {

  const navigate = useNavigate()
  const {
    currentPage,
    currentPageIndex,
    handleChangePage
  } = useStepper({ initialSteps: formStepsCheckinGeneral })

  const methods = useForm()
  const { handleSubmit } = methods

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 0) {

      const resp = await getDummyData("company")

      if (resp.data === "general") handleChangePage({ action: "next", newFormSteps: formStepsCheckinGeneral });
      else if (resp.data === "bpjs") handleChangePage({ action: "next", newFormSteps: formStepsCheckinBPJS });
      else if (resp.data === "insurance") handleChangePage({ action: "next", newFormSteps: formStepsCheckinInsurance })
      else if (resp.data === "company") handleChangePage({ action: "next", newFormSteps: formStepsCheckinCompany })

    } else {
      console.log('hello world')
    }
  }

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title=""
          size="large"
          handleBackNavigation={() => { handleChangePage({ action: "previous" }) }}
          handleCloseNavigation={() => navigate("/")}
          hideBackNavigation={currentPage.properties?.disableBack}
        >

          <Box sx={{ p: 4 }}>

            {currentPage.value === "insert_booking_number" && <InsertBookingNumber />}

            {currentPage.value === "booking_information" && <InformationBooking />}

            {currentPage.value === "booking_information_bpjs" && <InformationBookingBPJS />}

            {currentPage.value === "booking_information_insurance" && <InformationBookingInsurance />}

            {currentPage.value === "booking_information_company" && <InformationBookingCompany />}

          </Box>

        </WindowContainer>
      </Form>
    </AppPage>
  )
}

export default CheckinPage

const initialStep = [
  {
    label: "Masukkan Nomor Booking",
    value: "insert_booking_number"
  },
]

const formStepsCheckinGeneral = [
  ...initialStep,
  {
    label: "Checkin Berhasil",
    value: "booking_information",
    properties: {
      disableBack: true
    }
  }
]

const formStepsCheckinBPJS = [
  ...initialStep,
  {
    label: "Check-in Berhasil",
    value: "booking_information_bpjs",
    properties: {
      disableBack: true
    }
  }
]

const formStepsCheckinInsurance = [
  ...initialStep,
  {
    label: "Pendaftaran Berhasil",
    value: "booking_information_insurance",
    properties: {
      disableBack: true
    }
  }
]

const formStepsCheckinCompany = [
  ...initialStep,
  {
    label: "Pendaftaran Berhasil",
    value: "booking_information_company",
    properties: {
      disableBack: true
    }
  }
]