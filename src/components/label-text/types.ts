import type { LoadingButtonProps } from '@mui/lab';
import type { CardProps, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

export type LabelTextProps = {
  title: string;
  body: ReactNode;
  titleProps?: TypographyProps;
  bodyProps?: TypographyProps;
  colSpan?: number;
};

export type LabelTextContainerProps = {
  listText: LabelTextProps[];
  col?: number;
  cardProps?: CardProps;
  disableOutline?: boolean;
  orientation?: 'vertical' | 'horizontal';
};

export type LabelTextCardActionProps = {
  label: string;
  action: VoidFunction;
  buttonProps?: LoadingButtonProps;
};

export type LabelTextCardWrapperProps = {
  clickable?: boolean;
  onClick?: () => void;
};

export type LabelTextCardProps = LabelTextCardWrapperProps & {
  listText: LabelTextProps[];
  headerIcon?: string;
  headerLocalIcon?: string;
  headerText?: string;
  headerProps?: TypographyProps;
  orientation?: 'horizontal' | 'vertical';
  buttonAction?: LabelTextCardActionProps[];
};
