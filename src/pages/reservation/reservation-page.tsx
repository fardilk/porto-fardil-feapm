import { Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AppPage } from 'src/components/app-page';
import type { CardBannerProps } from 'src/components/card-banner/types';
import { Form } from 'src/components/hook-form';
import { InsertIdentifier } from 'src/components/insert-identifier';
import { WindowContainer } from 'src/components/window-container';
import { useStepper } from 'src/hooks';
import { getDummyData } from '../registration/model/functions';
import {
  InformationOutpatientGeneral,
  PaymentMethod,
  SelectEncounterType,
  SelectPractitioner,
} from './components';

const ReservationPage = () => {
  const navigate = useNavigate();
  const { currentPage, currentPageIndex, handleChangePage } = useStepper({
    initialSteps: formStepsOutpatientGeneral,
  });

  const [listReservationType, _setListReservationType] = useState<CardBannerProps[]>([
    {
      title: 'PEMERIKSAAN RAWAT JALAN',
      body: 'Layanan medis yang mencakup evaluasi kesehatan, diagnosis, dan perawatan tanpa memerlukan rawat inap.',
      localIcon: 'stethoscope',
      onClick: () => {
        handleChangePage({ action: 'next', newFormSteps: formStepsOutpatientGeneral });
      },
    },
    {
      title: 'MEDICAL CHECK UP',
      body: 'Serangkaian uji kesehatan rutin untuk memeriksa kesehatan tubuh secara keseluruhan dan mengantisipasi risiko penyakit.',
      localIcon: 'medical-checkup',
      onClick: () => {},
    },
    {
      title: 'LABORATORIUM',
      body: 'Fasilitas yang menyediakan uji diagnostik untuk mendukung evaluasi kesehatan, diagnosis, dan medical check up rutin tanpa perlu rawat inap.',
      localIcon: 'blood-test',
      onClick: () => {},
    },
    {
      title: 'RADIOLOGI',
      body: 'Layanan medis yang menyediakan uji pencitraan seperti X-ray, CT scan, dan MRI untuk mendukung diagnosis dan perawatan tanpa memerlukan rawat inap.',
      localIcon: 'x-rays',
      onClick: () => {},
    },
  ]);

  const methods = useForm();
  const { handleSubmit } = methods;

  const onPractitionerSelect = () => {
    console.log("practicioner selected");
  };

  const onGeneralPaymentSelect = () => {

    handleChangePage({
      action: "next",
      newFormSteps: formStepsOutpatientGeneral
    })
  }

  const onSubmit = async (data: any) => {
    if (currentPageIndex === 1) {
      const resp = await getDummyData('company');

      handleChangePage({ action: 'next' });
    } else {
      console.log('hello world');
    }
  };

  return (
    <AppPage>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WindowContainer
          title={currentPage.label}
          size={currentPage.properties?.containerSize || 'large'}
          handleBackNavigation={() => {
            handleChangePage({ action: 'previous' });
          }}
          handleCloseNavigation={() => {
            navigate('/', { replace: true });
          }}
          hideBackNavigation={currentPage?.properties?.disableBack}
          hideCloseNavigation={currentPage?.properties?.disableClose}
        >
          <Box sx={{ p: 4 }}>
            {currentPage.value === 'select_encounter_type' && (
              <SelectEncounterType items={listReservationType} />
            )}

            {currentPage.value === 'insert_nik' && <InsertIdentifier />}

            {currentPage.value === 'information_outpatient_general' && (
              <InformationOutpatientGeneral
                leftTextButton="Data salah, isi ulang NIK"
                rightTextButton="Data sudah benar, lanjutkan"
                leftButtonProps={{
                  onClick: () => {
                    handleChangePage({ action: 'previous' });
                  },
                }}
                rightButtonProps={{
                  onClick: () => {
                    handleChangePage({ action: 'next' });
                  },
                }}
              />
            )}

            {currentPage.value === 'payment_method' && (
              <PaymentMethod handleGeneral={onGeneralPaymentSelect} handleAssurance={() => {}} />
            )}

            {currentPage.value === 'select_healthcare_practitioner' && (
              <SelectPractitioner onCardSelect={onPractitionerSelect} />
            )}
{/* 
            {currentPage.value === 'confirmation_patient_registration' && (
              <ConfirmationOutpatientGeneral
                handleConfirm={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )}

            {currentPage.value === 'registration_success' && <SuccessOutpatientGeneral />}

            {currentPage.value === 'select_insurance' && (
              <SelectInsurance
                handleSelect={() => {
                  handleChangePage({ action: 'next' });
                }}
              />
            )} */}
          </Box>
        </WindowContainer>
      </Form>
    </AppPage>
  );
};

export default ReservationPage;

const initialStep = [
  {
    label: 'Pilih Jenis Kunjungan',
    value: 'select_encounter_type',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Masukkan NIK',
    value: 'insert_nik',
  },
  {
    label: 'Informasi Data Pasien',
    value: 'information_outpatient_general',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Pilih Jenis Pembayaran',
    value: 'payment_method',
    properties: {
      disableBack: true,
    },
  },
];

const formStepsOutpatientGeneral = [
  ...initialStep,
  {
    label: 'Pilih Dokter Poli',
    value: 'select_healthcare_practitioner',
    properties: {
      disableBack: true,
    },
  },
  {
    label: 'Konfirmasi Pendaftaran Pasien',
    value: 'confirmation_patient_registration',
    properties: {
      disableBlack: true,
    },
  },
  {
    label: 'Pendaftaran Berhasil',
    value: 'registration_success',
    properties: {
      disableBack: true,
    },
  },
];
