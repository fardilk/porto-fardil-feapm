export type OptionType = {
  label: string;
  value: string;
};

export type DevIForm = {
  textfield: string;
  component: OptionType | null;
  autocomplete: OptionType | null;
};
