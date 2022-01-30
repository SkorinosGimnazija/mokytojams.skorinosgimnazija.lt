export const toArray = <T>(item?: T[] | T | null) => {
  if (!Array.isArray(item)) {
    return item == null ? [] : [item];
  }

  return item;
};
