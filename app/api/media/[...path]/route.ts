import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Handle Payload's /file/ URL structure
    let filePath = params.path.join('/')
    
    // If the path starts with 'file/', remove it since that's Payload's URL structure
    // but the actual files are stored directly in the media folder
    if (filePath.startsWith('file/')) {
      filePath = filePath.substring(5) // Remove 'file/' prefix
    }
    
    console.log('Requesting media file:', filePath)
    const fullPath = path.join(process.cwd(), 'public', 'media', filePath)
    console.log('Full file path:', fullPath)
    
    // Check if file exists
    try {
      await fs.access(fullPath)
    } catch {
      return new NextResponse('File not found', { status: 404 })
    }

    // Read the file
    const fileBuffer = await fs.readFile(fullPath)
    
    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.webp':
        contentType = 'image/webp'
        break
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving media file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}