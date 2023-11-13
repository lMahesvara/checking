export const colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'default',
] as const

export type color = (typeof colors)[number]

export interface AsistenciaAlumno {
  alumno: string
  presente: boolean
}

export interface Asistencia {
  _id: string
  fecha: string
  unidad: string
  alumnos: AsistenciaAlumno[]
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

//export constantes en vez de usar magic numbers
export const IS_PRESENT = '✔'
