import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFDatePickerStatic, RHFTimePils } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { Label } from 'src/components/label';
import { useFetch } from 'src/hooks/use-fetch';
import { useTranslate } from 'src/locales';
import { doctorOne } from 'src/pages/doctor/model/functions';
import { SelectTimeProps } from 'src/pages/reservation/model/types';
import { fDate, formatStr } from 'src/utils/format-time';

const SelectTime = (props: SelectTimeProps) => {
  const { handleConfirm, errorMessage, doctorInfo } = props;

  const { t } = useTranslate()
  const { watch, setValue } = useFormContext()

  const values = watch()

  const { data, isLoading, refetch } = useFetch({ practitionerHealthcareServiceID: values?.practitionerHealthcareServiceID || '', date: fDate(dayjs(), formatStr.paramCase.mysqlDate), isBpjs: false }, doctorOne)

  const timeOpt = data?.data?.slot?.map((it) => ({
    label: it.slotTime,
    value: it.slotId,
    disabled: it.isDisabled
  })) || []

  useEffect(() => {
    setValue("date", dayjs())
  }, [])

  return (
    <Stack gap={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{
            width: 1, height: 1, p: 1,
            bgcolor: ({ palette }) => palette.background.neutral
          }}>
            <Box sx={{ display: 'flex', gap: 2, placeItems: 'center' }}>
              <Image
                sx={{ width: 128, height: 128, borderRadius: 1 }}
                src={doctorInfo?.person?.doctorImage}
              />
              <Box>
                <Box sx={{ display: 'flex', placeItems: 'center', gap: 1 }}>
                  <Typography variant='h5'>{doctorInfo?.person?.doctorName}</Typography>
                  <Iconify
                    icon={`material-symbols:${doctorInfo?.person?.gender}-rounded`}
                    color={doctorInfo?.person?.gender === "male" ? "secondary.main" : "error.light"}
                  />
                </Box>
                <Typography>{doctorInfo?.polyName}</Typography>
                <Label color='success'>{data?.data?.experienceYears}</Label>
              </Box>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant='h6'>Dokumen Dokter</Typography>
                    -
                    {/* <List>
                      {
                        data?.data?.doctorProfile?.doctorDocument?.map((row, index) => {

                          return (
                            <ListItem sx={{ mb: 1 }} disablePadding key={index}>
                              <ListItemIcon>
                                <Iconify icon='ic:outline-work' color='warning.main' />
                              </ListItemIcon>
                              <ListItemText disableTypography>
                                <Typography fontWeight="bold">{row.documentType}</Typography>
                                <Typography color="text.secondary">{row.documentNo}</Typography>
                              </ListItemText>
                            </ListItem>
                          )
                        }) || "-"
                      }
                    </List> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant='h6'>Informasi Keilmuan</Typography>
                  -
                  {/* <List>
                    {
                      data?.data?.doctorProfile?.doctorEducation?.map((row, index) => {

                        return (
                          <ListItem sx={{ mb: 1 }} disablePadding key={index}>
                            <ListItemIcon>
                              <Iconify icon='bitcoin-icons:verify-filled' color="success.main" />
                            </ListItemIcon>
                            <ListItemText disableTypography>{row.education}</ListItemText>
                          </ListItem>
                        )
                      }) || "-"
                    }
                  </List> */}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant='h6'>Pengalaman Kerja</Typography>
                  -
                  {/* <List>
                    {
                      data?.data?.doctorProfile?.doctorExperience?.map((row, index) => {

                        return (
                          <ListItem sx={{ mb: 1 }} disablePadding key={index}>
                            <ListItemIcon>
                              <Iconify icon='ic:outline-work' color='warning.main' />
                            </ListItemIcon>
                            <ListItemText disableTypography>
                              <Typography fontWeight="bold">{row.experiencePlace}</Typography>
                              <Typography variant='subtitle2' color="text.secondary">{row.experienceJobDesk} - {row.experienceLength}</Typography>
                              <Typography color="text.secondary">{row.experienceTime}</Typography>
                            </ListItemText>
                          </ListItem>
                        )
                      }) || "-"
                    }
                  </List> */}
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant='h6'>Publikasi / Seminar Kerja</Typography>
              -
              {/* <List>
                {
                  data?.data?.doctorProfile?.doctorPublication?.map((row, index) => {

                    return (
                      <ListItem sx={{ mb: 1 }} disablePadding key={index}>
                        <ListItemIcon>
                          <Iconify icon='ic:outline-work' color='warning.main' />
                        </ListItemIcon>
                        <ListItemText disableTypography>
                          <Typography fontWeight="bold">{row.publicationTitle}</Typography>
                          <Typography color="text.secondary">{row.publicationPlace}</Typography>
                        </ListItemText>
                      </ListItem>
                    )
                  }) || "-"
                }
              </List> */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={1} >
            <Box>
              <Typography variant='button'>Pilih Tanggal</Typography>
              <RHFDatePickerStatic
                name="date"
                format="DD/MM/YYYY"
                disableFuture
                onSelect={(val) => {
                  refetch({ practitionerHealthcareServiceID: values?.practitionerHealthcareServiceID || '', date: fDate(val, formatStr.paramCase.mysqlDate), isBpjs: false })
                }}
                disablePast
                slotProps={{
                  toolbar: { sx: { display: 'none' } },
                  layout: {
                    sx: {
                      borderColor: ({ palette }) => palette.secondary.lighter,
                      borderWidth: 2,
                      borderStyle: 'solid',
                      borderRadius: 1
                    }
                  },
                  day: () => ({
                    sx: {
                      "&.MuiPickersDay-root.Mui-selected": {
                        backgroundColor: "secondary.main",
                      },
                    }
                  }),
                }}
                slots={{
                  actionBar: (params) => (
                    <Box {...params}>
                      <Box sx={{ display: 'flex', gap: 1, placeItems: 'center', placeContent: 'center', mb: 0.5 }}>
                        <Box sx={{ display: 'flex', gap: 0.2, placeItems: 'center' }}>
                          <Iconify icon='stash:circle-dot-duotone' color="secondary.main" /><Typography variant='subtitle2'>Praktik</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.2, placeItems: 'center' }}>
                          <Iconify icon='stash:circle-dot-duotone' color="text.disabled" /><Typography variant='subtitle2'>Tidak Praktik</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ),
                }}
              />
            </Box>

            <Divider />

            <Box sx={{ overflowY: 'auto', maxHeight: '12vh' }}>
              <Box sx={{
                position: 'sticky',
                top: 0,
                bgcolor: ({ palette }) => palette.background.default,
                zIndex: 10,
                pb: 1
              }}>
                <Typography variant='button'>Jadwal Tersedia</Typography>
              </Box>
              <Box>
                <RHFTimePils
                  options={timeOpt}
                  getOptionEqualToValue={(opt, value) => opt.value === value?.value}
                  getOptionLabel={(opt) => opt.label}
                  name="bookTime"
                  errorText={errorMessage?.bookTimeErr}
                  loading={isLoading}
                  getOptionDisabled={(opt) => opt.disabled}
                />
              </Box>
            </Box>

            <Divider />

            <Button
              fullWidth
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              onClick={() => handleConfirm()}
            >
              {t("global.select_this_practitioner")}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2 }}>
        <Button
          color="secondary"
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => handleBack()}
        >
          {t("global.reselect")} {getButtonText()}
        </Button>
      </Box> */}
    </Stack>
  );
};

export default SelectTime;
