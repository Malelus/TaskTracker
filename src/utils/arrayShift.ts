type TArrayShift<T> = {
  array: T[];
  fromIndex: number;
  toIndex: number;
};

const arrayShiftMutable = <T>({ array, fromIndex, toIndex }: TArrayShift<T>): void => {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
};

const arrayShiftImmutable = <T>({ array, fromIndex, toIndex }: TArrayShift<T>): T[] => {
  const newArray = [...array];

  arrayShiftMutable<T>({ array: newArray, fromIndex, toIndex });

  return newArray;
};

export { arrayShiftMutable, arrayShiftImmutable };
