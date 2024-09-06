import type { IconProps } from '@iconify/react';
import type { SxProps } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type IconifyProp = BoxProps & IconProps;
export type IconifyProps = Omit<IconifyProp, 'icon'> & {
  localIcon?: string;
  icon?: string;
  sxIcon?: SxProps<Theme>;
};
