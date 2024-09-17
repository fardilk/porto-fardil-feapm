import { NonPaginationType, PaginationType } from 'src/@types/global';

export type TerminologyValue = {
  name: string;
  resourceType: string;
  attributePath: string;
  codingDisplay: string;
  codingSystem: string;
  code: string;
  parentCode: string;
  display: string;
  displayEn: string;
  codeSystem: string;
  orderNo: number;
  ftIndex: string;
  use: boolean;
  valueSetDisplay?: string;
  valueSetExtra?: string;
  description: string;
};

export type ValueSet = {
  name: string;
  code: string;
  codeSystem: string;
  valueSetDisplay: string;
};

export type TerminologyResultList = PaginationType & {
  data: TerminologyValue[];
};

export type TerminologyResultOne = NonPaginationType & {
  data: TerminologyValue;
};

export type ValueSetResultList = PaginationType & {
  data: ValueSet[];
};

export type ValueSetResultOne = NonPaginationType & {
  data: ValueSet;
};

export type TerminologyInput = {
  resourceType: string;
  attributePath: string;
  code: string;
  parentCode: string;
  display: string;
  displayEn: string;
  codeSystem: string;
  orderNo: number;
  ftIndex: string;
  use: boolean;
  description: string;
};

export type ValueSetInput = {
  name: string;
  code: string;
  codeSystem: string;
};
