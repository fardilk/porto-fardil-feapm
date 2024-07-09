export type TimePilsContainerProps<T> = {
  options: T[];
  getOptionLabel: (option: T) => string;
  getIsSelected: (option: T) => boolean;
  onClick: (option: T) => void;
};
