import { Box, Divider, Typography } from "@mui/material"
import { lazy, Suspense, useMemo } from "react"
import { useForm } from "react-hook-form"
import { AppPage } from "src/components/app-page"
import { Form, RHFAutocomplete } from "src/components/hook-form"
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

          </Form>
        </Box>
      </WindowContainer>
    </AppPage>
  )
}

export default DevPage