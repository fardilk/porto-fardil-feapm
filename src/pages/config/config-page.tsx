import { LoadingButton } from "@mui/lab"
import { Box, Button, Divider, Grid, Stack, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { AppPage } from "src/components/app-page"
import { Form, RHFRadioGroup, RHFSwitch } from "src/components/hook-form"
import { Iconify } from "src/components/iconify"
import { WindowContainer } from "src/components/window-container"
import { setConfig } from "src/store/slices/config"
import { dispatch, useSelector } from "src/store/store"
import { timeout } from "src/utils/timeout"
import { ConfigIForm } from "./model/types"

const ConfigPage = () => {

  const config = useSelector((root) => root.config)

  const defaultValues: ConfigIForm = {
    checkin: config.checkin,
    encounter: config.encounter,
    registration: config.registration,
    reservation: config.reservation,
    mode: config.mode
  }

  const navigate = useNavigate()
  const methods = useForm({ defaultValues })
  const { handleSubmit, reset, watch, formState: { isDirty, isSubmitting } } = methods

  const values = watch()

  const isFluid = values.mode === "fluid"

  const onSubmit = async (data: ConfigIForm) => {
    await timeout(100)

    dispatch(setConfig(data))
    reset(data)

    toast.success("Berhasil Disimpan")
  }

  return (
    <AppPage>
      <WindowContainer
        title="Configuration"
        hideBackNavigation
        handleCloseNavigation={() => { navigate("/", { replace: true }) }}
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>

          <Stack spacing={2} p={4}>
            <Box sx={{ display: 'flex', placeContent: 'space-between' }}>
              <Typography variant="h5">Konfigurasi Halaman Awal</Typography>
              <LoadingButton
                variant="soft"
                color="info"
                type="submit"
                disabled={!isDirty}
                loading={isSubmitting}
                startIcon={<Iconify icon="fluent:save-32-regular" />}
              >
                Simpan
              </LoadingButton>
            </Box>
            <Divider />
            <Box>
              <TableContainer>
                <Table>
                  <colgroup>
                    <col width="30%" />
                    <col width="60%" />
                  </colgroup>
                  <TableHead>

                    <TableRows title="Checkin">
                      <RHFSwitch
                        name="checkin"
                        label="Aktif"
                      />
                    </TableRows>

                    <TableRows title="Kunjungan Dokter">
                      <RHFSwitch
                        name="encounter"
                        label="Aktif"
                      />
                    </TableRows>

                    <TableRows title="Reservasi">
                      <RHFSwitch
                        name="reservation"
                        label="Aktif"
                      />
                    </TableRows>

                    <TableRows title="Registrasi Pasien Baru">
                      <RHFSwitch
                        name="registration"
                        label="Aktif"
                      />
                    </TableRows>

                  </TableHead>
                </Table>
              </TableContainer>
            </Box>
            <Divider />
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Mode Tampilan Menu : </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFRadioGroup
                    row
                    name="mode"
                    options={[{ label: "Fluid", value: "fluid" }, { label: "Fixed", value: "fixed" }]}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      placeItems: "center",
                      placeContent: "center",
                      height: "100%",
                      gap: 1
                    }}>
                    {
                      values.checkin && (
                        <Button
                          sx={{ width: !isFluid ? '20%' : undefined }}
                          variant="soft"
                          color="primary"
                          fullWidth={isFluid}
                        >
                          Checkin
                        </Button>
                      )
                    }
                    {
                      values.encounter && (
                        <Button
                          sx={{ width: !isFluid ? '20%' : undefined }}
                          variant="soft"
                          color="primary"
                          fullWidth={isFluid}
                        >
                          Kunjungan Dokter
                        </Button>
                      )
                    }
                    {
                      values.reservation && (
                        <Button
                          sx={{ width: !isFluid ? '20%' : undefined }}
                          variant="soft"
                          color="primary"
                          fullWidth={isFluid}
                        >
                          Reservasi
                        </Button>
                      )
                    }
                    {
                      values.registration && (
                        <Button
                          sx={{ width: !isFluid ? '20%' : undefined }}
                          variant="soft"
                          color="primary"
                          fullWidth={isFluid}
                        >
                          Registrasi Pasien Baru
                        </Button>
                      )
                    }
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Form>

      </WindowContainer>
    </AppPage>
  )
}

export default ConfigPage

const TableRows = ({ title, children }: { title: string, children: ReactNode }) => {
  return (
    <TableRow>
      <TableCell> {title} </TableCell>
      <TableCell>
        {children}
      </TableCell>
    </TableRow>
  )
}