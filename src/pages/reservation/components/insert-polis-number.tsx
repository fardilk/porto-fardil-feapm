import { Box, Button, Grid, Typography } from "@mui/material";
import { useWatch } from "react-hook-form";
import { RHFAutocomplete, RHFTextField } from "src/components/hook-form";
import { useFetch } from "src/hooks/use-fetch";
import { useTranslate } from "src/locales";
import { payplanDropdown } from "src/modules/payorapm/functions";
import { Insurance, Payplan } from "src/modules/payorapm/types";

const InsertPolisNumber = ({ onBack, onNext }: { onBack: () => void, onNext: () => void }) => {

  const { t } = useTranslate();

  const [valInsurance, valPayplan]: [valInsurance: Insurance, valPayplan: Payplan] = useWatch({ name: ["insurance", "createPaymentScheme"] })

  // const inputRef = useRef<any>({})

  // const [{ elementName, keyboardType }, setPartialState] = usePartialState({ elementName: "polis", keyboardType: "numberOnly" })

  const { data, isLoading } = useFetch({ payorID: valInsurance?.insuranceId || '' }, payplanDropdown)

  return (
    <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid item xs={2}>
        <Typography variant="subtitle1" color="grey.600">{t('assurance.subtitle.insurance_name')}</Typography>
      </Grid>

      <Grid item xs={10}>
        <RHFTextField name="createInsuranceName" disabled />
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle1" color="grey.600">{t('assurance.subtitle.payment_schema')}</Typography>
      </Grid>

      <Grid item xs={10}>
        <RHFAutocomplete
          name="createPaymentScheme"
          options={data?.data || []}
          getOptionLabel={(opt: Payplan) => opt.payplanName}
          getOptionKey={(opt: Payplan) => opt.payplanID}
          loading={isLoading}
          isOptionEqualToValue={(opt: Payplan, val: Payplan) => opt.payplanID === val.payplanID}
          label={t('assurance.subtitle.search_your_schema')}
        />
        <Typography variant="body2">{t('assurance.subtitle.payment_valid')} : {valPayplan?.payplanPeriodStart || '-'} - {valPayplan?.payplanPeriodEnd || '-'}</Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle1" color="grey.600">{t('assurance.subtitle.polis_number')}</Typography>
      </Grid>

      <Grid item xs={10}>
        <RHFTextField name="createPolisNumber" />
      </Grid>

      <Grid item xs={2}>
        <Typography variant="subtitle1" color="grey.600">{t('assurance.subtitle.polis_holder')}</Typography>
      </Grid>

      <Grid item xs={10}>
        <RHFTextField name="createPolisHolder" />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 2, mt: 2 }}>
          <Button
            size="large"
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={onBack}
          >
            {t('global.back')}
          </Button>
          <Button
            size="large"
            variant="contained"
            fullWidth
            color="secondary"
            onClick={onNext}
          >
            {t('global.next')}
          </Button>
        </Box>
      </Grid>

      {
        /**
         * @todo Implement Keyboard Later...
         */
        // elementName && (
        //   <Keyboard
        //     ref={inputRef.current}
        //     elementName={elementName}
        //     inputType={keyboardType}
        //   />
        // )
      }
    </Grid>
  )
}

export default InsertPolisNumber
