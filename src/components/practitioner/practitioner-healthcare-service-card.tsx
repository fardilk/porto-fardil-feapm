import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Iconify } from "../iconify";
import { Label } from "../label";

export type PractitionerHealthcareServiceCardProps = {
  practitionerName: string,
  heathcareServiceName: string,
  slots: string;
  patientTotal: string
}

const PractitionerHealthcareServiceCard = (props: PractitionerHealthcareServiceCardProps) => {
  const { heathcareServiceName, patientTotal, practitionerName, slots } = props

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography gutterBottom variant="subtitle2">{practitionerName}</Typography>
          <Box sx={{ display: 'flex', placeContent: 'space-between', gap: 1 }}>
            <Label
              sx={{ width: '100%' }}
              color="success"
              startIcon={<Iconify icon="streamline:medical-cross-sign-healthcare" />}>{heathcareServiceName}</Label>
            <Label
              sx={{ width: '100%' }}
              color="success"
              startIcon={<Iconify icon="mdi:clock-outline" />}>{slots}</Label>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PractitionerHealthcareServiceCard