import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Stock images mapped by category and content keywords
const stockImages = {
  teknoloji: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
  ],
  spor: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544547606-5f4c0b75cc8c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&h=600&fit=crop'
  ],
  siyaset: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586039077773-4cf5b4189ac4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1562159278-1253a58da141?w=800&h=600&fit=crop'
  ],
  ekonomi: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&h=600&fit=crop'
  ],
  kultur: [
    'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1471269461316-64c2dd6a91b0?w=800&h=600&fit=crop'
  ],
  saglik: [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&h=600&fit=crop'
  ],
  egitim: [
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop'
  ],
  cevre: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop'
  ],
  bilim: [
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=800&h=600&fit=crop'
  ],
  dunya: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop'
  ]
}

// Function to get random image for a category
function getRandomImageForCategory(categorySlug: string): string {
  const images = stockImages[categorySlug as keyof typeof stockImages] || stockImages.dunya
  return images[Math.floor(Math.random() * images.length)]
}

// Function to fetch image and create media entry
async function createMediaFromUrl(payload: any, imageUrl: string, title: string, categorySlug: string) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }
    
    const imageBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(imageBuffer)
    
    // Generate filename
    const timestamp = Date.now()
    const filename = `${categorySlug}-${timestamp}.jpg`
    
    // Create media entry
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `${title} - ${categorySlug} haberi görseli`,
      },
      file: {
        data: uint8Array,
        mimetype: 'image/jpeg',
        name: filename,
        size: uint8Array.length,
      },
    })
    
    return media
  } catch (error) {
    console.error('Error creating media:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get all posts without featured images
    const { docs: posts } = await payload.find({
      collection: 'posts',
      where: {
        featuredImage: {
          exists: false,
        },
      },
      depth: 2,
      limit: 50,
    })

    const results = []

    for (const post of posts) {
      try {
        const category = post.category as any
        if (!category || !category.slug) {
          console.log(`Skipping post ${post.title} - no category`)
          continue
        }

        // Get random image for this category
        const imageUrl = getRandomImageForCategory(category.slug)
        
        // Create media entry
        const media = await createMediaFromUrl(payload, imageUrl, post.title, category.slug)
        
        if (media) {
          // Update post with featured image
          await payload.update({
            collection: 'posts',
            id: post.id,
            data: {
              featuredImage: media.id,
            },
          })

          results.push({
            postId: post.id,
            postTitle: post.title,
            category: category.name,
            imageUrl: imageUrl,
            mediaId: media.id,
            success: true,
          })
        } else {
          results.push({
            postId: post.id,
            postTitle: post.title,
            category: category.name,
            success: false,
            error: 'Failed to create media',
          })
        }
      } catch (error) {
        results.push({
          postId: post.id,
          postTitle: post.title,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      message: `Processed ${posts.length} posts`,
      results,
      successCount: results.filter(r => r.success).length,
      errorCount: results.filter(r => !r.success).length,
    })

  } catch (error) {
    console.error('Error adding post images:', error)
    return NextResponse.json(
      { error: 'Failed to add post images' },
      { status: 500 }
    )
  }
}
