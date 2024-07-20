// check if date of birth is more than required age
export function checkDobValidity(dateOfBirth, requiredAge) {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let calculatedAge = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    calculatedAge--
  }

  return calculatedAge >= requiredAge
}
