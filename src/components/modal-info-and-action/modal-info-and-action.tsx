import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { CloseIcon } from 'yet-another-react-lightbox';
import type { ModalInfoAndActionProp } from './types';

/**
 * HIS V3 Teams &
 * Einsa / SangpenciptaJS / Lasteinsa / Ruby
 * @see {@link https://github.com/dev-system-2022/his-frontend/issues/12} - Read More For Documentation
 */

const ModalInfoAndAction = (props: ModalInfoAndActionProp) => {

  const { child,
    open,
    title,
    titleProps,
    children,
    header,
    disableClose,
    subtitle,
    mode = "buttonAndText",
    dialogProps,
    disableHeader,
    handleClose, } = props

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth {...dialogProps}>
      {
        !disableHeader && (
          <DialogTitle sx={{ display: 'flex', placeContent: 'space-between', placeItems: 'center', pt: 3 }}>
            <Box sx={{ width: '100%' }}>
              {header}

            </Box>
            {
              !disableClose && (
                <IconButton size='small' onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              )
            }
          </DialogTitle>
        )
      }
      <DialogContent>
        <Box sx={{ mt: 4 }}>
          {mode === 'buttonOnly' && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" align="center" {...titleProps}>
                  {title}
                </Typography>
              </Grid>
              {child && child.length > 0 &&
                child.map((row, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Button
                      {...row.buttonProps}
                      sx={{ p: 4 }}
                      onClick={row.action}
                      fullWidth
                    >
                      {row.label}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          )}
          {mode === 'buttonAndText' && (
            <>
              <Typography variant="h6" align="center" {...titleProps} gutterBottom>
                {title}
              </Typography>
              {
                !children ? (
                  <Typography align="center">{subtitle}</Typography>
                ) : children
              }
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {mode === 'buttonAndText' &&
          child && child.length > 0 &&
          child.map((row, index) => (
            <LoadingButton
              {...row.buttonProps}
              key={index}
              onClick={row.action}
            >
              {row.label}
            </LoadingButton>
          ))}
      </DialogActions>
    </Dialog>
  );
};

export default ModalInfoAndAction;
