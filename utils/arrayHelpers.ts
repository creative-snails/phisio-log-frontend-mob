export function addItem<T>(array: T[], newValue: T): T[] {
  return [...array, newValue];
}

export function removeItem<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index);
}

export function updateItemField<T>(array: T[], index: number, field: keyof T, newValue: unknown): T[] {
  return array.map((item, i) => (i === index ? { ...item, [field]: newValue } : item));
}

export function addNestedItem<T>(array: T[], index: number, field: keyof T, newValue: unknown): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    const existingNestedArray = (item[field] as []) || [];
    return { ...item, [field]: [...existingNestedArray, newValue] };
  });
}

export function removeNestedItem<T>(array: T[], index: number, field: keyof T, nestedIndex: number): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    const existingNestedArray = item[field] as [];
    if (!existingNestedArray || !Array.isArray(existingNestedArray)) return item;

    const updatedNestedArray = existingNestedArray.filter((_, idx) => idx !== nestedIndex);
    return { ...item, [field]: updatedNestedArray };
  });
}

export function updateNestedItem<T>(
  array: T[],
  index: number,
  field: keyof T,
  nestedIndex: number,
  newValue: unknown
): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    if (!item[field]) return { ...item, [field]: [newValue] } as T;

    const nestedArray = [...(item[field] as unknown[])];
    nestedArray[nestedIndex] = newValue;

    return { ...item, [field]: nestedArray } as T;
  });
}
