import type { RadioProps } from '@mui/material/Radio';
import { type Theme, type SxProps, styled } from '@mui/material/styles';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';

import { Controller, useFormContext } from 'react-hook-form';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  size?: "small" | "medium"
  disableOutline?: boolean
  slotProps?: {
    wrap?: SxProps<Theme>;
    radio: RadioProps;
    formLabel: FormLabelProps;
    formHelperText: FormHelperTextProps;
  };
  options: {
    label: string;
    value: string;
  }[];
};


const RadioGroupWrapper = ({ withOutline, size, children }: { withOutline?: boolean, children: ReactNode, size?: "small" | "medium" }) => {

  const style = {
    color: 'darkslategray',
    border: '1px solid #e0e0e0',
    padding: size === "medium" ? '8px 12px' : '0px 8px',
    borderRadius: 1,
    display: 'flex',
    placeContent: 'space-between',
    flexWrap: 'wrap',
  }

  if (withOutline) {
    return (
      <Box sx={{ ...style }}>
        {children}
      </Box>
    )
  }

  return children
}

export function RHFRadioGroup({ name, label, options, helperText, slotProps, size = "medium", disableOutline, ...other }: Props) {
  const { control } = useFormContext();

  const labelledby = `${name}-radio-buttons-group-label`;
  const ariaLabel = (val: string) => `Radio ${val}`;

  return (
    <RadioGroupWrapper withOutline={!disableOutline} size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl component="fieldset" sx={slotProps?.wrap}>
            {label && (
              <FormLabel
                id={labelledby}
                component="legend"
                {...slotProps?.formLabel}
                sx={{ mb: 1, typography: 'body2', ...slotProps?.formLabel.sx }}
              >
                {label}
              </FormLabel>
            )}

            <RadioGroup {...field} aria-labelledby={labelledby} {...other} >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio
                      {...slotProps?.radio}
                      inputProps={{
                        ...(!option.label && { 'aria-label': ariaLabel(option.label) }),
                        ...slotProps?.radio?.inputProps,
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </RadioGroup>

            {(!!error || helperText) && (
              <FormHelperText error={!!error} sx={{ mx: 0 }} {...slotProps?.formHelperText}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </RadioGroupWrapper>
  );
}
