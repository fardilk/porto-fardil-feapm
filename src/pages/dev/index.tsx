import { Box, Divider, Grid, MenuItem, Typography } from "@mui/material"
import { lazy, ReactNode, Suspense, useMemo } from "react"
import { useForm } from "react-hook-form"
import { AppPage } from "src/components/app-page"
import { Form, RHFAutocomplete, RHFCheckbox, RHFDatePicker, RHFSelect, RHFSwitch, RHFTextField } from "src/components/hook-form"
import { WindowContainer } from "src/components/window-container"

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

  const methods = useForm({ defaultValues: { component: options[2] } })

  const componentName = methods.watch("component")

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

  return (
    <AppPage>
      <WindowContainer
        title="Development"
      >
        <Box sx={{ my: 2, mx: 4 }}>
          <Form methods={methods}>

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