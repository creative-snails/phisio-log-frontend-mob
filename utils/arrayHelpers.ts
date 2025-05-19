export function addField<T>(array: T[], newValue: T): T[] {
  return [...array, newValue];
}

export function removeField<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index);
}

export function addNestedField<T>(array: T[], index: number, field: keyof T, newValue: keyof T | string): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    const existingNestedArray = (item[field] as []) || [];
    return { ...item, [field]: [...existingNestedArray, newValue] };
  });
}

export function removeNestedField<T>(array: T[], index: number, field: keyof T, nestedIndex: number): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    const existingNestedArray = item[field] as [];
    if (!existingNestedArray || !Array.isArray(existingNestedArray)) return item;

    const updatedNestedArray = existingNestedArray.filter((_, idx) => idx !== nestedIndex);
    return { ...item, [field]: updatedNestedArray };
  });
}
