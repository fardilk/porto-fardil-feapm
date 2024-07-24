import type { LoadingButtonProps } from '@mui/lab';
import type { ButtonProps, DialogProps, SxProps, TypographyProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

export type ModalInfoAndActionProp = {
  disableHeader?: boolean;
  disableClose?: boolean;
  open: boolean;
  child?: ModalInfoAndActionChildProp[];
  title: string;
  titleProps?: TypographyProps;
  subtitle?: string;
  children?: ReactNode;
  header?: ReactNode;
  mode?: 'buttonOnly' | 'buttonAndText';
  dialogProps?: Omit<DialogProps, 'open'>;
  handleClose: VoidFunction;
};

export type ModalInfoAndActionChildProp = {
  label: string;
  action: VoidFunction;
  buttonProps?: LoadingButtonProps;
};

export type ModalInfoProp = {
  open: boolean;
  title?: string;
  subtitle?: string;
  bodyTitle?: string;
  bodyChildren?: React.ReactNode;
  acceptText?: string;
  declineText?: string;
  handleClose: () => void;
  handleConfirm: () => void;
  handleCancel?: () => void;
  confirmStyle?: ButtonProps;
  cancelStyle?: ButtonProps;
  sx?: SxProps<Theme>;
};
