export function getSearchValue(
  value: string | string[] | undefined,
  defaultValue: string
): string {
  return Array.isArray(value) ? value[0] : value || defaultValue;
}
