import { ButtonProps } from '@mui/material';
import { CardBannerProps } from 'src/components/card-banner/card-banner';

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
