import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppPage } from 'src/components/app-page';
import { Form } from 'src/components/hook-form';
import { WindowContainer } from 'src/components/window-container';
import { useStepper } from 'src/hooks';
import { getDummyData } from '../registration/model/functions';
import { InformationBooking, InsertBookingNumber } from './components';
import { useNavigate } from 'react-router';
import { toast } from 'src/components/snackbar';
import { useEffect, useMemo, useState } from 'react';
import { useTranslate } from 'src/locales';
import { getCheckin } from './model/functions';
import { CheckinResponse } from './model/types';

const CheckinPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const { currentPage, currentPageIndex, handleChangePage } = useStepper({
    initialSteps: formStepsCheckinGeneral,
  });
  const [dataCheckin, setDataCheckin] = useState<CheckinResponse | null>(null)

  const [errorMessage, setErrorMessage] = useState('');

  const methods = useForm();
  const { handleSubmit, watch } = methods;
  // const onSubmit = async (data: any) => {
  //   if (!data?.booking_number?.replaceAll('\n', '')) {
  //     toast.error(t('checkin.error.empty_booking_number'));
  //     return;
  //   }
  //   if (data?.booking_number?.replaceAll('\n', '')?.length < 3) {
  //     setErrorMessage(t('checkin.error.not_found_number'));
  //     toast.error(t('checkin.error.invalid'));
  //     return;
  //   }

  //   if (currentPageIndex === 0) {
  //     const keyboardValue = data.booking_number.replaceAll('\n', '');
  //     const resp = await getDummyData(
  //       keyboardValue === '123'
  //         ? 'bpjs'
  //         : keyboardValue === '456'
  //           ? 'insurance'
  //           : keyboardValue === '789'
  //             ? 'company'
  //             : 'general'
  //     );

  //     if (resp.data === 'general')
  //       handleChangePage({ action: 'next', newFormSteps: formStepsCheckinGeneral });
  //     else if (resp.data === 'bpjs')
  //       handleChangePage({ action: 'next', newFormSteps: formStepsCheckinBPJS });
  //     else if (resp.data === 'insurance')
  //       handleChangePage({ action: 'next', newFormSteps: formStepsCheckinInsurance });
  //     else if (resp.data === 'company')
  //       handleChangePage({ action: 'next', newFormSteps: formStepsCheckinCompany });
  //   } else {
  //     console.log('hello world');
  //   }
  // };

  const onSubmit = async (data : {booking_number?: string}) => {

    const bookingNumber = data.booking_number?.replaceAll('\n', "")

    if(!bookingNumber){
      return ''
    }
    try {
      const data = await getCheckin({
        bookingNumber
      })
      setDataCheckin(data)
      handleChangePage({ action: "next" })
    } catch (e) {
      console.log(e)
    }
  }

  const watchBookingNumnber = watch('booking_number');

  const getTitle = useMemo(
    () => (currentPage?.properties?.i18n ? t(currentPage?.properties?.i18n) : currentPage.label),
    [currentPage, t]
  );

  useEffect(() => {
    setErrorMessage('');
  }, [watchBookingNumnber]);

  console.log(dataCheckin,'checkin data')

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
              <InsertBookingNumber errorMessage={errorMessage}/>
            )}

            {currentPage.value === 'booking_information' && dataCheckin && <InformationBooking data={dataCheckin} type="general" />}

            {/* {currentPage.value === 'booking_information_bpjs' && <InformationBooking type="bpjs" />}

            {currentPage.value === 'booking_information_insurance' && (
              <InformationBooking type="insurance" />
            )}

            {currentPage.value === 'booking_information_company' && (
              <InformationBooking type="company" />
            )} */}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
};

export default CheckinPage;

const initialStep = [
  {
    label: 'Masukkan Nomor Booking',
    value: 'insert_booking_number',
    properties: {
      i18n: 'checkin.input_booking_title',
    },
  },
];

const formStepsCheckinGeneral = [
  ...initialStep,
  {
    label: 'Checkin Berhasil',
    value: 'booking_information',
    properties: {
      disableBack: true,
      i18n: 'checkin.checkin_success',
    },
  },
];

const formStepsCheckinBPJS = [
  ...initialStep,
  {
    label: 'Check-in Berhasil',
    value: 'booking_information_bpjs',
    properties: {
      disableBack: true,
      i18n: 'checkin.checkin_success',
    },
  },
];

const formStepsCheckinInsurance = [
  ...initialStep,
  {
    label: 'Pendaftaran Berhasil',
    value: 'booking_information_insurance',
    properties: {
      disableBack: true,
      i18n: 'checkin.checkin_success',
    },
  },
];

const formStepsCheckinCompany = [
  ...initialStep,
  {
    label: 'Pendaftaran Berhasil',
    value: 'booking_information_company',
    properties: {
      disableBack: true,
      i18n: 'checkin.checkin_success',
    },
  },
];
