import { useFormContext } from 'react-hook-form';
// @mui
import { autocompleteClasses, AutocompleteProps, InputAdornment, TextFieldProps } from '@mui/material';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { RHFAutocomplete } from './rhf-autocomplete';
import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type AutocompleteBaseProps = Omit<
  AutocompleteProps<any, boolean, boolean, boolean>,
  'renderInput'
>;

type RHFAutocompleteProps = Omit<AutocompleteBaseProps, 'options'> & {
  name: string;
  label?: string;
  placeholder?: string;
  hiddenLabel?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  textfieldProps?: TextFieldProps;
  onSelect?: (newValue: AutocompleteBaseProps['value']) => void;
  options?: AutocompleteBaseProps['options'];
  addNewIfNotExist?: boolean;
  additionalOption?: (inputValue: string) => AutocompleteBaseProps['value'];
};

type RHFAutocompleteOnEnterProps<T> = Omit<RHFAutocompleteProps, 'options'> & {
  getOptions?: (list: T[]) => T[];
  firstInit?: boolean;
  dependencyArray?: any[];
  fetchFunction: (keywords: string, extendParam?: any) => Promise<T[]>;
  onSelect?: (newValue: AutocompleteBaseProps['value']) => void;
};

// ----------------------------------------------------------------------

function RHFAutocompleteOnEnterAlias<T>(props: RHFAutocompleteOnEnterProps<T>, ref?: any) {
  const { fetchFunction, name, firstInit, onSelect, getOptions, loading: loadingProps, dependencyArray, ...other } = props

  const { setValue } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [option, setOption] = useState<T[]>([]);
  const [previous, setPrevious] = useState<any[]>([])

  const load = (param?: string, extendParam?: any) => {
    setLoading(true);
    fetchFunction(param ?? inputValue, extendParam)
      .then((res) => setOption(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (firstInit) load();
  }, [firstInit]);

  useEffect(() => {
    if (dependencyArray) {
      setPrevious((prev) => {
        if (prev !== dependencyArray) {
          return dependencyArray
        }
        return prev
      })
    }
  }, [dependencyArray])

  useEffect(() => {
    if (previous) {
      load()
    }
  }, [...previous])

  const defOnInputChange = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
        load();
      }
    },
    [inputValue, load, fetchFunction, setLoading, setOption]
  );


  useImperativeHandle(ref, () => {
    return {
      resetSearch: (param?: string, extendParam?: any) => {
        load(param, extendParam)
      }
    }
  }, [load, fetchFunction, inputValue, setLoading, setOption])

  return (
    <RHFAutocomplete
      {...other}
      sx={{
        [`& .${autocompleteClasses.popupIndicator}`]: {
          transform: "none"
        },
        ...other.sx
      }}
      options={getOptions ? getOptions(option) : option}
      onInputChange={(e: any) => {
        e?.target?.value === "" && load("")
        setInputValue(e?.target?.value ?? "")
      }}
      onChange={
        other.onChange
          ? other.onChange
          : (e, newvalue) => {
            setValue(name, newvalue, { shouldValidate: true });
            onSelect && onSelect(newvalue);
          }
      }
      noOptionsText="Tidak Ada Data | Ketik Kemudian Tekan Enter"
      onKeyDown={defOnInputChange}
      name={name}
      loading={loading || loadingProps}
      loadingText="Sedang Mengambil Data..."
      slotProps={{
        popupIndicator: {
          onClick: () => load()
        }
      }}
      popupIcon={
        !loading ? (<Iconify icon='material-symbols:search-rounded' />) : undefined
      }
      textfieldProps={{
        InputProps: {
          endAdornment: (loading || loadingProps) ? (
            <InputAdornment position="end">
              <Iconify icon='svg-spinners:8-dots-rotate' fontSize="1.5em" color="primary.main" />
            </InputAdornment>
          ) : (
            other.textfieldProps?.InputProps?.endAdornment
          ),
          autoComplete: 'off'
        },
      }}
    />
  );
}

export const RHFAutocompleteOnEnter = forwardRef(RHFAutocompleteOnEnterAlias) as <T>(
  props: RHFAutocompleteOnEnterProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => JSX.Element;
