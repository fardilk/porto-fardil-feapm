import { Box, useTheme } from "@mui/material";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AppPage } from "src/components/app-page";
import { Form, RHFTextField } from "src/components/hook-form";
import { InsertIdentifier } from "src/components/insert-identifier";
import { Keyboard } from "src/components/keyboard";
import { WindowContainer } from "src/components/window-container";
import { typography } from "src/theme/core";

const PlaygroundPage = () => {

  const theme = useTheme()

  const ref = useRef({})

  const methods = useForm()

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <AppPage>
      <WindowContainer
        title="Development"
      >
        <Form methods={methods}>
          <Box sx={{ p: 4 }}>
            <InsertIdentifier />
          </Box>
        </Form>
      </WindowContainer>
    </AppPage>
  )
}

export default PlaygroundPage
