import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppPage } from 'src/components/app-page';
import { Form } from 'src/components/hook-form';
import { WindowContainer } from 'src/components/window-container';
import { useStepper } from 'src/hooks';
import { InformationBooking, InsertBookingNumber } from './components';
import { useNavigate } from 'react-router';
import { toast } from 'src/components/snackbar';
import { useEffect, useMemo, useState } from 'react';
import { useTranslate } from 'src/locales';
import { getCheckin } from './model/functions';
import { BookingType } from './model/types';
import nProgress from 'nprogress';

const CheckinPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const { currentPage, handleChangePage } = useStepper({
    initialSteps: steps,
  });
  const [dataCheckin, setDataCheckin] = useState<BookingType | null>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const methods = useForm();
  const { handleSubmit, watch } = methods;

  const onSubmit = async (data: { booking_number?: string }): Promise<void> => {
    const bookingNumber = data.booking_number?.replaceAll('\n', '');

    if (!bookingNumber) {
      toast.error(t('checkin.error.empty_booking_number'));
    } else {
      try {
        nProgress.start();
        const response = await getCheckin({
          bookingNumber,
        });
        toast.success('Berhasil Lapor Kehadiran');
        setDataCheckin(response.data.booking);

        handleChangePage({ action: 'next' });
      } catch (e) {
        toast.error('Nomor Booking Tidak Ditemukan. Silahkan Cek Ulang Nomor Booking');
      } finally {
        nProgress.done();
      }
    }
  };

  const watchBookingNumnber = watch('booking_number');

  const getTitle = useMemo(
    () => (currentPage?.properties?.i18n ? t(currentPage?.properties?.i18n) : currentPage.label),
    [currentPage, t]
  );

  useEffect(() => {
    setErrorMessage('');
  }, [watchBookingNumnber]);

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title={getTitle}
          size="large"
          handleBackNavigation={() => {
            handleChangePage({ action: 'previous' });
          }}
          handleCloseNavigation={() => navigate('/')}
          hideBackNavigation={currentPage.properties?.disableBack}
        >
          <Box sx={{ p: 4 }}>
            {currentPage.value === 'insert_booking_number' && (
              <InsertBookingNumber errorMessage={errorMessage} />
            )}

            {currentPage.value === 'booking_information' && dataCheckin && (
              <InformationBooking data={dataCheckin} />
            )}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
};

export default CheckinPage;

const steps = [
  {
    label: 'Masukkan Nomor Booking',
    value: 'insert_booking_number',
    properties: {
      i18n: 'checkin.input_booking_title',
    },
  },
  {
    label: 'Checkin Berhasil',
    value: 'booking_information',
    properties: {
      disableBack: true,
      i18n: 'checkin.checkin_success',
    },
  },
];
