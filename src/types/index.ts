export const colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'default',
] as const

export type color = (typeof colors)[number]

export interface StudentAttendance {
  student: string
  present: boolean
}

export interface Attendance {
  _id: string
  date: string
  unit: string
  students: StudentAttendance[]
}

export interface Course {
  _id: string
  name: string
  color: color
  teacher: string
  students: string[]
  units: Unit[]
  attendances: Attendance[]
}

export interface Unit {
  _id: string
  name: string
}

//export constantes en vez de usar magic numbers
export const IS_PRESENT = '✔'
export const IS_ABSENT = '✘'

export interface AttendanceTableEntry {
  key: string
  student: string
  [date: string]: string
}
