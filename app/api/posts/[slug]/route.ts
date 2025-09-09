import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../../src/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const searchParams = request.nextUrl.searchParams
    const locale = searchParams.get('locale') || 'mn'

    const { slug } = await params
    
    const posts = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' }
      },
      limit: 1,
      locale,
    })

    if (posts.docs.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(posts.docs[0])
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}