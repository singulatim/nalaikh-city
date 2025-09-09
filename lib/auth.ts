import { cookies } from 'next/headers'

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
}

/**
 * Get the current user from Payload CMS authentication
 * Uses the payload-token cookie set by Payload CMS
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')
    
    if (!token) {
      return null
    }

    // Use Payload's me endpoint to get current user
    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/payload/users/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const userData = await response.json()
    
    return {
      id: userData.user?.id,
      email: userData.user?.email,
      firstName: userData.user?.firstName,
      lastName: userData.user?.lastName,
      role: userData.user?.role,
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Check if user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

/**
 * Check if user has admin or editor role
 */
export async function canEditContent(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin' || user?.role === 'editor'
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/payload/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Authentication failed'
      }
    }

    // Set cookie for authentication
    if (data.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: data.user.role,
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error occurred'
    }
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')
    
    if (token) {
      // Call Payload's logout endpoint
      await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/payload/users/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      })
    }

    // Clear the authentication cookie
    cookieStore.delete('payload-token')
  } catch (error) {
    console.error('Error during logout:', error)
    // Still clear the cookie even if the API call fails
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')
  }
}