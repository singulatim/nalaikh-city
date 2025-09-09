import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')
    
    if (token) {
      // Call Payload's logout endpoint
      try {
        await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'}/api/payload/users/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Error calling Payload logout:', error)
        // Continue with clearing cookie even if API call fails
      }
    }

    // Clear the authentication cookie
    cookieStore.delete('payload-token')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}