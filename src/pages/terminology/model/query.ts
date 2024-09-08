export const TerminologyValueQuery = `
  name
  resourceType
  attributePath
  codingDisplay
  codingSystem
  code
  parentCode
  display
  displayEn
  codeSystem
  valueSetDisplay
  valueSetExtra
  orderNo
  ftIndex
  use
  description
`;

export const ValueSetQuery = `
  name
  code
  codeSystem
  valueSetDisplay
  meta {
    createdUserID
    createdDatetime
    updatedUserID
    updatedDatetime
  }
`;

export const TerminologyResultListQuery = `
  status
  message
  pagination {
    totalRow
    totalPage
    page
  }
  data {
    ${TerminologyValueQuery}
  }
`;

export const TerminologyResultOneQuery = `
  status
  message
  data {
    ${TerminologyValueQuery}
  }
`;

export const ValueSetResultListQuery = `
  status
  message
  pagination {
    totalRow
    totalPage
    page
  }
  data {
    ${ValueSetQuery}
  }
`;

export const ValueSetResultOneQuery = `
  status
  message
  data {
    ${ValueSetQuery}
  }
`;
