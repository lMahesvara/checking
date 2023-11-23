import { colors } from '@/types'

export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

export const validatePassword = (password: string): boolean => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return re.test(password)
}

export const pickRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)]

export const getFirstLetter = (str: string) => str.charAt(0).toUpperCase()

export const getShortDate = (str: string) => {
  const [year, month, day] = str.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleString('es-mx', {
    timeZone: 'America/hermosillo',
    month: 'short',
    day: 'numeric',
  })
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
