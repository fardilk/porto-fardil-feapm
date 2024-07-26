import { yupResolver } from "@hookform/resolvers/yup"
import { LoadingButton } from "@mui/lab"
import { Box, Divider, Grid, MenuItem, Typography } from "@mui/material"
import { lazy, ReactNode, Suspense, useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AppPage } from "src/components/app-page"
import { Form, RHFAutocomplete, RHFCheckbox, RHFDatePicker, RHFSelect, RHFSwitch, RHFTextField } from "src/components/hook-form"
import { WindowContainer } from "src/components/window-container"
import { timeout } from "src/utils/timeout"
import { getUser } from "./model/functions"
import { DevIForm } from "./model/model"
import { devSchema } from "./model/schema"

const DevPage = () => {

  const options = [
    {
      label: "Time Pils",
      value: "time-pils"
    },
    {
      label: "Radio Group",
      value: "radio-group"
    },
    {
      label: "Handsome Card",
      value: 'card-handsome'
    }
  ]

  const defaultValues: DevIForm = {
    textfield: "",
    component: null,
    autocomplete: null
  }

  const methods = useForm({ defaultValues, resolver: yupResolver(devSchema) })
  const { watch, handleSubmit } = methods

  const componentName = watch("component")

  const Component = useMemo(() => {

    if (componentName) {

      const LazyComponent = lazy(() => import(`./components/${(componentName as any).value}`))

      return (
        <Suspense fallback={<p>Loading...</p>}>
          <LazyComponent />
        </Suspense>
      )
    }

    return <Typography variant="subtitle1">Select Component First</Typography>
  }, [componentName])

  const handleGetUser = async () => {
    try {
      const resp = await getUser({ userID: "7" })

      toast.info(`User Name : ${resp?.[0]?.userName}`, { position: "top-center" })
      await timeout(200)
      toast.info(`User Start Page : ${resp?.[0]?.startPage}`, { position: "top-left" })
      await timeout(200)
      toast.info(`User Status : ${resp?.[0]?.status}`)

    } catch (error) {
      toast.error(`Error : ${error?.message}`)
    }
  }

  const onSubmit = async (data: DevIForm) => {
    console.log(data)
  }

  return (
    <AppPage>
      <WindowContainer
        title="Development"
      >
        <Box sx={{ my: 2, mx: 4 }}>
          <Form methods={methods} onSubmit={handleSubmit((onSubmit as any))}>

            <RHFAutocomplete
              name="component"
              options={options}
              size="small"
              label="Component"
            />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ my: 2 }}>
              {Component}
            </Box>

            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={2}>

              <GridChildren>
                <RHFTextField name="textfield" label="TextField" />
              </GridChildren>

              <GridChildren>
                <RHFAutocomplete
                  name="autocomplete"
                  options={options}
                  label="Autocomplete"
                />
              </GridChildren>

              <GridChildren>
                <RHFSelect name="select" label="Select">
                  <MenuItem value="time">Time</MenuItem>
                </RHFSelect>
              </GridChildren>

              <GridChildren>
                <RHFSwitch name="switch" label="Switch" />
              </GridChildren>

              <GridChildren>
                <RHFCheckbox name="checkbox" label="Checbox" />
              </GridChildren>

              <GridChildren>
                <RHFDatePicker name="datepicker" label="DatePicker" />
              </GridChildren>
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                sx={{ mt: 2 }}
                color="primary"
                variant="contained"
                onClick={() => { handleGetUser() }}
              >
                Get User
              </LoadingButton>
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                sx={{ mt: 2 }}
                fullWidth
                color="secondary"
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Form>
        </Box>
      </WindowContainer>
    </AppPage>
  )
}

export default DevPage

const GridChildren = ({ children }: { children?: ReactNode }) => {

  return (
    <Grid item xs={12} md={4}>
      {children}
    </Grid>
  )
}
