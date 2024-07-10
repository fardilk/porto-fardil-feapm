import type { CardProps, TypographyProps } from '@mui/material';

export type ButtonBaseOverrideProps = {
  clickable?: boolean;
  onClick?: () => void;
};

export type CardBannerContentCardProps = {
  icon?: string;
  title?: string;
  body?: string;
  titleProps?: TypographyProps;
  bodyProps?: TypographyProps;
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
