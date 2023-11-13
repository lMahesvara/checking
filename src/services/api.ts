import axios from 'axios'
import data from '/public/data/cursos.json'
import { Asistencia, Course } from '@/types'

const API_URL = process.env.API_URL

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export const getCourses = async (userId: string): Promise<Course[]> => {
  try {
    /* const {data} = await axios.get(`${API_URL}/cursos/${userId}`)
    return data */
    //Using local data while API is not ready
    return data
  } catch (error) {
    return []
  }
}

export const getCourse = async (courseId: string): Promise<Course> => {
  try {
    /* const {data} = await axios.get(`${API_URL}/cursos/curso/${courseId}`)
    return data */
    //Using local data while API is not ready
    return data.find((course: Course) => course._id === courseId)
  } catch (error) {
    return {} as Course
  }
}

export const postAsistencia = async ({
  courseId,
  asistencia,
}: {
  courseId: string
  asistencia: Asistencia
}): Promise<void> => {
  try {
    /* await axios.post(`${API_URL}/cursos/curso/${courseId}/asistencia`, {
      asistencia,
    }) */
    //Using local data while API is not ready
    console.log('Asistencia guardada')
  } catch (error: any) {
    throw new Error()
  }
}
