import { ButtonProps } from '@mui/material';
import { ItemCardProps } from 'src/components/item-card/item-card';

export type SelectEncounterTypeProps = {
  items: ItemCardProps[];
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
