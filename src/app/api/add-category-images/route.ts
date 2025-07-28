import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Category-specific background images
const categoryBackgrounds = {
  teknoloji: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&h=400&fit=crop',
  spor: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400&h=400&fit=crop', 
  siyaset: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1400&h=400&fit=crop',
  ekonomi: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&h=400&fit=crop',
  kultur: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1400&h=400&fit=crop',
  saglik: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&h=400&fit=crop',
  egitim: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1400&h=400&fit=crop',
  cevre: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=400&fit=crop',
  bilim: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1400&h=400&fit=crop',
  dunya: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&h=400&fit=crop'
}

// Function to fetch image and create media entry
async function createMediaFromUrl(payload: any, imageUrl: string, categoryName: string, categorySlug: string) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }
    
    const imageBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(imageBuffer)
    
    // Generate filename
    const filename = `category-bg-${categorySlug}.jpg`
    
    // Create media entry
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `${categoryName} kategori arka plan görseli`,
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

    // Get all categories
    const { docs: categories } = await payload.find({
      collection: 'categories',
      limit: 50,
    })

    const results = []

    for (const category of categories) {
      try {
        // Skip if category already has an image
        if (category.image) {
          results.push({
            categoryId: category.id,
            categoryName: category.name,
            categorySlug: category.slug,
            success: true,
            skipped: true,
            message: 'Category already has an image',
          })
          continue
        }

        // Get background image URL for this category
        const imageUrl = categoryBackgrounds[category.slug as keyof typeof categoryBackgrounds]
        
        if (!imageUrl) {
          results.push({
            categoryId: category.id,
            categoryName: category.name,
            categorySlug: category.slug,
            success: false,
            error: 'No background image defined for this category',
          })
          continue
        }
        
        // Create media entry
        const media = await createMediaFromUrl(payload, imageUrl, category.name, category.slug)
        
        if (media) {
          // Update category with background image
          await payload.update({
            collection: 'categories',
            id: category.id,
            data: {
              image: media.id,
            },
          })

          results.push({
            categoryId: category.id,
            categoryName: category.name,
            categorySlug: category.slug,
            imageUrl: imageUrl,
            mediaId: media.id,
            success: true,
          })
        } else {
          results.push({
            categoryId: category.id,
            categoryName: category.name,
            categorySlug: category.slug,
            success: false,
            error: 'Failed to create media',
          })
        }
      } catch (error) {
        results.push({
          categoryId: category.id,
          categoryName: category.name,
          categorySlug: category.slug,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      message: `Processed ${categories.length} categories`,
      results,
      successCount: results.filter(r => r.success && !r.skipped).length,
      skippedCount: results.filter(r => r.skipped).length,
      errorCount: results.filter(r => !r.success).length,
    })

  } catch (error) {
    console.error('Error adding category background images:', error)
    return NextResponse.json(
      { error: 'Failed to add category background images' },
      { status: 500 }
    )
  }
}
