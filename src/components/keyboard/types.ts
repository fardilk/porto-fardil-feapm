import type { DialogProps } from '@mui/material';

export type KeyboardType = {
  inputType: string;
  withDialog?: boolean;
  elementName: string;
  onInputChange?: (key: string) => void;
};

export type KeyboardWrapperProps = Omit<DialogProps, 'open'> & {
  onClose?: () => void;
  withDialog?: boolean;
  elementName: string;
  inputType: string;
  open?: boolean;
};
