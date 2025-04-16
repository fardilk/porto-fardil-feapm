import { Box, FormLabel, styled } from "@mui/material";

export const OutlinedWrapper = styled(Box)(({ theme }) => ({
  color: 'darkslategray',
  padding: '14px 12px',
  borderRadius: theme.shape.borderRadius,
  marginTop: 0,
  border: `1px solid ${theme.vars.palette.action.disabledBackground}`,
  ":hover": {
    border: `1px solid ${theme.vars.palette.text.primary}`,
  }
}));

export const FormLabelWrapper = styled(FormLabel)(({ theme }) => ({
  marginLeft: '-0.5em',
  marginTop: '-1.5em',
  paddingLeft: '0.44em',
  paddingRight: '0.44em',
  backgroundColor: theme.palette.background.default,
  display: 'block',
  maxWidth: 'fit-content',
  fontSize: '0.75em',
  width: 'auto',
}));
