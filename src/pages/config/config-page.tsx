import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { AppPage } from 'src/components/app-page';
import { Form, RHFRadioGroup, RHFSwitch } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { WindowContainer } from 'src/components/window-container';
import { setConfig } from 'src/store/slices/config';
import { dispatch, useSelector } from 'src/store/store';
import { timeout } from 'src/utils/timeout';
import type { ConfigIForm } from './model/types';
import { useTranslate } from 'src/locales';

const ConfigPage = () => {
  const config = useSelector((root) => root.config);

  const { t } = useTranslate();

  const defaultValues: ConfigIForm = {
    checkin: config.checkin,
    encounter: config.encounter,
    registration: config.registration,
    reservation: config.reservation,
    simplify: config.simplify,
    mode: config.mode,
  };

  const navigate = useNavigate();
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isSubmitting },
  } = methods;

  const values = watch();

  const isFluid = values.mode === 'fluid';

  const onSubmit = async (data: ConfigIForm) => {
    await timeout(100);

    dispatch(setConfig(data));
    reset(data);

    toast.success(t('config.success'));
  };

  return (
    <AppPage>
      <WindowContainer
        title={t('config.title')}
        hideBackNavigation
        handleCloseNavigation={() => {
          navigate('/', { replace: true });
        }}
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} p={4}>
            <Box sx={{ display: 'flex', placeContent: 'space-between' }}>
              <Typography variant="h5">{t('config.configure_page')}</Typography>
              <LoadingButton
                variant="soft"
                color="info"
                type="submit"
                disabled={!isDirty}
                loading={isSubmitting}
                startIcon={<Iconify icon="fluent:save-32-regular" />}
              >
                {t('config.save')}
              </LoadingButton>
            </Box>
            <Divider />
            <Box>
              <Grid container rowSpacing={2} my={2} columnSpacing={3}>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <Typography variant="subtitle1" color="grey.600">
                    {t('config.checkin')}
                  </Typography>
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <RHFSwitch name="checkin" label={t('config.active_label')} />
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <Typography variant="subtitle1" color="grey.600">
                    {t('config.encounter')}
                  </Typography>
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <RHFSwitch name="encounter" label={t('config.active_label')} />
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <Typography variant="subtitle1" color="grey.600">
                    {t('config.reservation')}
                  </Typography>
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <RHFSwitch name="reservation" label={t('config.active_label')} />
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <Typography variant="subtitle1" color="grey.600">
                    {t('config.registration')}
                  </Typography>
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <RHFSwitch name="registration" label={t('config.active_label')} />
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <Typography variant="subtitle1" color="grey.600">
                    {t('config.simplify')}
                  </Typography>
                </Grid>
                <Grid item xs={3} display={'flex'} alignItems={'center'}>
                  <RHFSwitch name="simplify" label={t('config.active_label')} />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">{t('config.mode')} : </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFRadioGroup
                    row
                    name="mode"
                    options={[
                      { label: 'Fluid', value: 'fluid' },
                      { label: 'Fixed', value: 'fixed' },
                    ]}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      placeItems: 'center',
                      placeContent: 'center',
                      height: '100%',
                      gap: 1,
                    }}
                  >
                    {values.checkin && (
                      <Button
                        sx={{ width: !isFluid ? '20%' : undefined }}
                        variant="soft"
                        color="primary"
                        fullWidth={isFluid}
                      >
                        {t('config.checkin')}
                      </Button>
                    )}
                    {values.encounter && (
                      <Button
                        sx={{ width: !isFluid ? '20%' : undefined }}
                        variant="soft"
                        color="primary"
                        fullWidth={isFluid}
                      >
                        {t('config.encounter')}
                      </Button>
                    )}
                    {values.reservation && (
                      <Button
                        sx={{ width: !isFluid ? '20%' : undefined }}
                        variant="soft"
                        color="primary"
                        fullWidth={isFluid}
                      >
                        {t('config.reservation')}
                      </Button>
                    )}
                    {values.registration && (
                      <Button
                        sx={{ width: !isFluid ? '20%' : undefined }}
                        variant="soft"
                        color="primary"
                        fullWidth={isFluid}
                      >
                        {t('config.registration')}
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Form>
      </WindowContainer>
    </AppPage>
  );
};

export default ConfigPage;
