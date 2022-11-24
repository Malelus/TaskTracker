type TDirection = {
  increase: string;
  decrease: string;
};

type TUpdateProperites<T> = {
  array: T[];
  currentValue: number;
  direction: string;
};

export const directionOptions: TDirection = {
  increase: 'increase',
  decrease: 'decrease',
};

const updateProperties = <T>({ array, currentValue, direction }: TUpdateProperites<T>) => {
  if (direction === directionOptions.increase) {
    return currentValue < array.length - 1 ? currentValue + 1 : currentValue;
  }

  if (direction === directionOptions.decrease) {
    return currentValue > 0 ? currentValue - 1 : currentValue;
  }

  return currentValue;
};

export default updateProperties;
