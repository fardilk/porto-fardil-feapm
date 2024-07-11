import type { CardProps, TypographyProps } from '@mui/material';
import { IconifyProps } from '../iconify';

export type ButtonBaseOverrideProps = {
  clickable?: boolean;
  onClick?: () => void;
};

export type CardBannerContentCardProps = {
  icon?: string;
  localIcon?: string;
  title?: string;
  body?: string;
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
