export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

export const validatePassword = (password: string): boolean => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return re.test(password)
}
