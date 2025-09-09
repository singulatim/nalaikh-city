import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only protect admin routes (excluding the Payload admin interface)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/api') && 
      !request.nextUrl.pathname.includes('_payload')) {
    
    const token = request.cookies.get('payload-token')
    
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verify token by calling Payload's me endpoint
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || request.nextUrl.origin}/api/payload/users/me`, {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        // Invalid token, redirect to login
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }

      const userData = await response.json()
      
      // Check if user has permission to access admin
      if (!userData.user || (userData.user.role !== 'admin' && userData.user.role !== 'editor')) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }

    } catch (error) {
      console.error('Auth middleware error:', error)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all admin routes except API routes
    '/admin/((?!api).*)',
    // Don't match API routes, static files, login, or unauthorized pages
    '/((?!api|_next/static|_next/image|favicon.ico|login|unauthorized).*)',
  ]
}