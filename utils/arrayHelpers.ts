export function addField<T>(array: T[], newFieldValue: T): T[] {
  return [...array, newFieldValue];
}

export function removeField<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index);
}

export function addNestedField<T>(array: T[], index: number, field: keyof T, newFieldValue: keyof T | string): T[] {
  return array.map((item, i) => {
    if (i !== index) return item;

    const existingNestedArray = (item[field] as []) || [];
    return { ...item, [field]: [...existingNestedArray, newFieldValue] };
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
