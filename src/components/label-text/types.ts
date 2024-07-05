import type { TypographyProps } from '@mui/material';

export type LabelTextProps = {
  title: string;
  body: string;
  titleProps?: TypographyProps;
  bodyProps?: TypographyProps;
  colSpan?: number;
};
