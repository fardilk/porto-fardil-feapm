import type { CardProps, TypographyProps } from '@mui/material';

export type LabelTextProps = {
  title: string;
  body: string;
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
