import { CircularProgress, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useSelector } from 'src/store/store';

export function AppLoading() {
  const { loading } = useSelector((root) => root.app)

  return (
    <Dialog open={loading}>
      <DialogContent sx={{ px: 4, py: 2 }}>
        <Stack spacing={2} sx={{ placeItems: 'center' }}>
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
