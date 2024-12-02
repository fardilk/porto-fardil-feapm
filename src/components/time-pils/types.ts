export type TimePilsContainerProps<T> = {
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionDisabled?: (option: T) => boolean;
  getIsSelected: (option: T) => boolean;
  onClick: (option: T) => void;
  error?: boolean;
};
