export const cellPhonePattern = "+55 (##) 9 #### ####"

// We need to remove the country code and the 9 from the raw phone string because when we pass it to the 
// react-number-format lib, the pattern (above) will automatically add them already
export function removeCountryCodeAnd9FromRawPhone(rawPhone: string) {
  let length = rawPhone.length
  let result = rawPhone.slice(2, length) // removed country code: 55

  length = rawPhone.length
  result = result.slice(0, 2) + result.slice(3, length) // removed 9
  return result
}