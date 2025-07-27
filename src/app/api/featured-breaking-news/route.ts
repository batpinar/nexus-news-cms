import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get a random recent post as featured breaking news
    const { docs: posts } = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit: 5, // Get top 5 recent posts
      depth: 2, // Include category and featured image
    })

    if (posts.length === 0) {
      return NextResponse.json(null)
    }

    // Select a random post from the recent ones to make it dynamic
    const randomIndex = Math.floor(Math.random() * posts.length)
    const featuredNews = posts[randomIndex]
    
    // Format the response
    const response = {
      id: featuredNews.id,
      title: featuredNews.title,
      slug: featuredNews.slug,
      excerpt: featuredNews.excerpt,
      category: {
        name: (typeof featuredNews.category === 'object' && featuredNews.category?.name) || 'Breaking News',
        slug: (typeof featuredNews.category === 'object' && featuredNews.category?.slug) || 'breaking'
      },
      publishedDate: featuredNews.publishedDate || featuredNews.createdAt,
      featuredImage: (typeof featuredNews.featuredImage === 'object' && featuredNews.featuredImage?.url) ? {
        url: featuredNews.featuredImage.url,
        alt: featuredNews.featuredImage.alt || featuredNews.title
      } : null,
    }

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Featured breaking news API error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
