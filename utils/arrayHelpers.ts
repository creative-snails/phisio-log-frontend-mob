export function addItem<T>(array: T[], newValue: T): T[] {
  return [...array, newValue];
}

export function removeItem<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index);
}

export function updateItem<T>(array: T[], index: number, newValue: T): T[] {
  return array.map((item, i) => (i === index ? newValue : item));
}

export function updateItemProperty<T>(array: T[], index: number, key: keyof T, newValue: unknown): T[] {
  return array.map((item, i) => (i === index ? ({ ...item, [key]: newValue } as T) : item));
}

export function addNestedItem<T>(array: T[], index: number, key: keyof T, newValue: unknown): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    const nestedArray = (item[key] as []) || [];

    return { ...item, [key]: [...nestedArray, newValue] } as T;
  });
}

export function removeNestedItem<T>(array: T[], index: number, key: keyof T, nestedIndex: number): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    const nestedArray = item[key] as [];
    if (!nestedArray || !Array.isArray(nestedArray)) return item;

    const updatedNestedArray = nestedArray.filter((_, idx) => idx !== nestedIndex);

    return { ...item, [key]: updatedNestedArray } as T;
  });
}

export function updateNestedItem<T>(
  array: T[],
  index: number,
  key: keyof T,
  nestedIndex: number,
  newValue: unknown
): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    if (!item[key]) return { ...item, [key]: [newValue] } as T;

    const nestedArray = [...(item[key] as unknown[])];
    nestedArray[nestedIndex] = newValue;

    return { ...item, [key]: nestedArray } as T;
  });
}
