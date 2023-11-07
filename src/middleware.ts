import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.SECRET })

  const { pathname } = request.nextUrl
  if (!session && pathname !== '/auth/login' && pathname !== '/auth/register') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/home', request.url))
  }

  if (
    (pathname === '/auth/login' || pathname === '/auth/register') &&
    session
  ) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/courses/:path*',
    '/profile/:path*',
    '/',
    '/auth/login',
    '/auth/register',
  ],
}
