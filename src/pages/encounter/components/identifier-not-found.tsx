import { Box, Grid, Stack, Typography } from '@mui/material';
import { CardBanner } from 'src/components/card-banner';
import { CardBannerProps } from 'src/components/card-banner/types';
import { useTranslate } from 'src/locales';
import { fAsterisk, getGridLayoutMappedValue } from 'src/utils/helper';

export const IdentifierNotFound = ({
  identifier,
  handleClick,
}: {
  identifier: string;
  handleClick: (param: string) => void;
}) => {
  const { t } = useTranslate();

  const listCard: CardBannerProps[] = [
    {
      title: (
        <Typography variant="h2" color="info.dark">
          {t('registration.re_search')}
        </Typography>
      ),
      body: (
        <Typography variant="h4" color="info.dark">
          {t('registration.re_search_desc')}
        </Typography>
      ),
      localIcon: 'search',
      onClick: () => {
        handleClick('search');
      },
    },
    // {
    //   title: "Melalui Ponsel Anda",
    //   body: "Walk-in Profile Baru dengan melalui ponsel anda"
    // },
    {
      title: (
        <Typography variant="h2" color="success.dark">
          {t('registration.via_platform')}
        </Typography>
      ),
      body: (
        <Typography variant="h4" color="success.dark">
          {t('registration.via_platform_desc')}
        </Typography>
      ),
      localIcon: 'apm',
      onClick: () => {
        handleClick('anjungan');
      },
    },
  ];

  const md = getGridLayoutMappedValue(2);

  return (
    <Stack spacing={2}>
      <Box>
        <Typography align="center" variant="subtitle1" color="secondary.darker">
          NIK dengan nomor {fAsterisk(identifier)} tidak ditemukan.
        </Typography>
        <Typography align="center" variant="subtitle1" color="secondary.darker">
          <Box component="span" sx={{ color: 'info.dark', fontWeight: 'bold' }}>
            {t('registration.re_search')}
          </Box>{' '}
          atau{' '}
          <Box component="span" sx={{ color: 'success.dark', fontWeight: 'bold' }}>
            {t('registration.via_platform')}
          </Box>
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {listCard.map((row, index) => {
          return (
            <Grid item xs={12} md={md} key={index}>
              <CardBanner
                {...row}
                cardProps={{ variant: 'outlined' }}
                iconProps={{ sx: { width: 68 } }}
                clickable
                orientation="horizontal"
              />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default IdentifierNotFound;
