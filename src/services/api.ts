import axios from 'axios'

const API_URL = process.env.API_URL

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
