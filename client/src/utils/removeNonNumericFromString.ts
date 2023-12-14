export function removeNonNumericFromString(value: string) {
  return value.replace(/\D/g, "")
}