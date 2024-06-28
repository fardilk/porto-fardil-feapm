import { Box } from "@mui/material"
import { InsertNIK } from "./components"
import { useState } from "react"

const RegistrationPage = () => {
  const step = ["insertNIK", "information", "insertNumber", "insertEmail"]

  const [currentPage, setCurrentPage] = useState(step[0])

  return (
    <>
      <Box sx={{ display: "flex", placeContent: "center", p: 4 }}>
        <Box sx={{ width: { xs: "100%", md: "80%", lg: "80%" } }}>
          {
            currentPage === "insertNIK" && (
              <InsertNIK />
            )
          }
        </Box>
      </Box >
    </>
  )
}

export default RegistrationPage