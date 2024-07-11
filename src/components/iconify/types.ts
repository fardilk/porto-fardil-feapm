import type { IconProps } from '@iconify/react';
import { SxProps } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type IconifyProp = BoxProps & IconProps;
export type IconifyProps = Omit<IconifyProp, 'icon'> & {
  localIcon?: string;
  icon?: string;
  sxIcon?: SxProps<Theme>;
};
