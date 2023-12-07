const reais = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function parseCurrencyValueInCentsToBRL(valueInCents: number) {
  return reais.format(convertCentsToReais(valueInCents))
}

export function convertCentsToReais(valueInCents: number) {
  return valueInCents / 100
}

export function convertReaisToCents(valueInReais: number) {
  return valueInReais * 100
}

// Given any numeric string, mask it to be a currency with the format "0,00"
export function maskNumberToCurrency(stringValue: string | number) {
  // removing all non-numeric characters
  const value = String(stringValue).replaceAll(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const maskedValue = new Intl.NumberFormat("pt-BR", options).format(
    isNaN(parseFloat(value)) ? 0 : parseFloat(value) / 100
  );

  return maskedValue;
}
export function parseMaskedCurrencyValueToNumber(value: string) {
  return parseFloat(value.replaceAll(".", "").replace(",", "."));
}