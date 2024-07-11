import { forwardRef } from 'react';
import { Icon, disableCache } from '@iconify/react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';

import { iconifyClasses } from './classes';
import { Image } from "src/components/image"
import type { IconifyProps } from './types';
import { getIconsPath } from 'src/utils/helper';

// ----------------------------------------------------------------------

const InternalIcon = (props: IconifyProps) => {
  const { localIcon, icon, ...other } = props
  const { sxIcon } = props

  if (localIcon) {
    return <Image src={getIconsPath(localIcon)} sx={sxIcon} />
  }

  if (icon) {
    return <Icon icon={icon} sx={sxIcon} {...other} />
  }

  return <></>
}

export const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ className, width = 20, sx, ...other }, ref) => {

    const sxWidth = (sx as any)?.width ? (sx as any).width : width

    const baseStyles = {
      width: sxWidth,
      height: sxWidth,
      flexShrink: 0,
      display: 'inline-flex',
    };

    const renderFallback = (
      <Box
        component="span"
        className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
        sx={{ ...baseStyles, ...sx }}
      />
    );

    return (
      <NoSsr fallback={renderFallback}>
        <Box
          ref={ref}
          component={InternalIcon}
          className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
          sx={{ ...baseStyles, ...sx }}
          {...other}
        />
      </NoSsr>
    );
  }
);

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache('local');
