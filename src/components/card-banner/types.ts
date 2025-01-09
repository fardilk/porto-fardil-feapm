import type { CardProps, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';
import type { IconifyProps } from '../iconify';

export type ButtonBaseOverrideProps = {
  disabled?: boolean;
  clickable?: boolean;
  onClick?: () => void;
};

export type CardBannerContentCardProps = {
  icon?: string;
  localIcon?: string;
  title?: string;
  body?: string | ReactNode;
  titleProps?: TypographyProps;
  bodyProps?: TypographyProps;
  iconProps?: IconifyProps;
};

export type CardBannerProps = ButtonBaseOverrideProps &
  CardBannerContentCardProps & {
    orientation?: 'horizontal' | 'vertical';
    cardProps?: CardProps;
  };

export type CardBannerProfileProps = ButtonBaseOverrideProps & {
  icon?: string;
  cardProps?: CardProps;
  name: string;
  heathcareServiceName: string;
  slots: string;
  count: string;
};

export type CardBannerProfileReservationProps = ButtonBaseOverrideProps & {
  icon?: string;
  cardProps?: CardProps;
  name: string;
  heathcareServiceName: string;
};
