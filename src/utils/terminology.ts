import { t } from 'i18next';
import { TerminologyValue } from 'src/pages/terminology/model/types';

export const terminologyCodeMapper = ({
  code,
  key,
  defaultDisplay,
}: {
  code: string;
  key: string;
  defaultDisplay: string;
}): string => {
  return !code ? code : `${t(`${key}.${code}`, { defaultValue: defaultDisplay })}`;
};

export const terminologyMapper = ({
  data,
  key,
}: {
  data: TerminologyValue;
  key?: string;
}): { label: string; value: string } => {
  return {
    label:
      key && !!data.code
        ? t(`${key}.${data.code}`, { defaultValue: data.codingDisplay })
        : data.display,
    value: data.code,
  };
};

export const terminologyArrayMapper = ({
  data,
  key,
  additional,
}: {
  data?: TerminologyValue[];
  key?: string;
  additional?: TerminologyValue[];
}): { label: string; value: string }[] => {
  if (data) {
    let newData = data;
    if (additional) {
      newData = [...data, ...additional];
    }
    return newData.map((row) => terminologyMapper({ data: row, key }));
  }

  return [];
};
