export const colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'default',
] as const

export type color = (typeof colors)[number]

export interface Course {
  _id: string
  name: string
  color: color
}
