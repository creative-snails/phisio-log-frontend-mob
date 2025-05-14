export function addField<T>(array: T[], newField: T): T[] {
  return [...array, newField];
}

export function removeField<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index);
}
