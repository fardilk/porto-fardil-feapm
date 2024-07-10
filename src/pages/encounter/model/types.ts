import type { ButtonProps } from '@mui/material';
import type { CardBannerProps } from 'src/components/card-banner/types';

export type SelectEncounterTypeProps = {
  items: CardBannerProps[];
};

export type InformationProps = {
  leftTextButton: string;
  rightTextButton: string;
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
};

export type PaymentMethodProps = {
  handleNext: () => void;
};
