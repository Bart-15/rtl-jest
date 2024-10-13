type BooleanOrUndefined = boolean | undefined;

export function hasValueChanged<T extends Record<string, BooleanOrUndefined>>(
  prevObj: T,
  newObj: T,
  key: keyof T,
): boolean {
  return prevObj[key] !== newObj[key];
}
