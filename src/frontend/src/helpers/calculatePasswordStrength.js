export default function calculatePasswordStrength(password) {
  const regexes = [
    /.{15,}/, // At least 15 characters. Optional
    /[\w]/, // With letters and numbers. API requirement
    /.{8,}/, // At least 8 characters. API requirement
    /\W+/, // With special characters. API requirement
  ]
  return regexes.reduce((acc, regex) => acc + regex.test(password), 0)
}
