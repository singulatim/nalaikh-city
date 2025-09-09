import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../src/payload.config'
import { NextRequest, NextResponse } from 'next/server'
import { Where } from 'payload'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const searchParams = request.nextUrl.searchParams
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const locale = searchParams.get('locale') || 'mn'

    const where: Where = {
      status: { equals: 'published' }
    }

    if (category) {
      where.category = { equals: category }
    }

    const posts = await payload.find({
      collection: 'posts',
      where,
      limit,
      page,
      sort: '-publishedDate',
      locale,
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}