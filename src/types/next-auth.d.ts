import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      username: string
      email: string
      token: string
      _id: string
    }
  }
}
