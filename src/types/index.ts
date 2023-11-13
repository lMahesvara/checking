export const colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'default',
] as const

export type color = (typeof colors)[number]

export interface Asistencia {
  _id: string
  fecha: string
  unidad: string
  alumnos: {
    alumno: string
    presente: boolean
  }[]
}

export interface Course {
  _id: string
  name: string
  color: color
  maestro: string
  alumnos: string[]
  unidades: Unidad[]
  asistencias: Asistencia[]
}

export interface Unidad {
  _id: string
  name: string
}
