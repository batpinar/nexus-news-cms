import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get the latest published post as breaking news
    const { docs: posts } = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit: 1,
      depth: 2, // Include category information
    })

    if (posts.length === 0) {
      return NextResponse.json(null)
    }

    const breakingNews = posts[0]
    
    // Format the response
    const response = {
      id: breakingNews.id,
      title: breakingNews.title,
      slug: breakingNews.slug,
      category: {
        name: (typeof breakingNews.category === 'object' && breakingNews.category?.name) || 'News',
        slug: (typeof breakingNews.category === 'object' && breakingNews.category?.slug) || 'news'
      },
      publishedDate: breakingNews.publishedDate || breakingNews.createdAt,
    }

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Breaking news API error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
