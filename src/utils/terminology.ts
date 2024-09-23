import { t } from 'i18next';
import { TerminologyValue } from 'src/pages/terminology/model/types';

export const terminologyCodeMapper = ({ code, key }: { code: string; key: string }): string => {
  return `${t(`${key}.${code}`)}`;
};

export const terminologyMapper = ({
  data,
  key,
}: {
  data: TerminologyValue;
  key?: string;
}): { label: string; value: string } => {
  return {
    label: key ? t(`${key}.${data.code}`) : data.display,
    value: data.code,
  };
};

export const terminologyArrayMapper = ({
  data,
  key,
}: {
  data?: TerminologyValue[];
  key?: string;
}): { label: string; value: string }[] => {
  if (data) {
    return data?.map((row) => terminologyMapper({ data: row, key }));
  }

  return [];
};
