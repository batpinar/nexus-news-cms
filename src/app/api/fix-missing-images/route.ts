import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

// Başlık bazlı akıllı resim seçimi
function getImageByTitle(title: string, category?: string): string {
  const titleLower = title.toLowerCase()
  
  // Teknoloji konuları
  if (titleLower.includes('iphone') || titleLower.includes('apple')) {
    return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('android') || titleLower.includes('samsung')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('bitcoin') || titleLower.includes('kripto') || titleLower.includes('crypto')) {
    return 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('ai') || titleLower.includes('yapay zeka') || titleLower.includes('chatgpt')) {
    return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('tesla') || titleLower.includes('elektrikli')) {
    return 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop'
  }
  
  // Spor konuları
  if (titleLower.includes('futbol') || titleLower.includes('fifa') || titleLower.includes('uefa')) {
    return 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('basketbol') || titleLower.includes('nba')) {
    return 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('olimpiyat') || titleLower.includes('atletizm')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
  }
  
  // Siyaset konuları
  if (titleLower.includes('seçim') || titleLower.includes('parlamento')) {
    return 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('nato') || titleLower.includes('ab') || titleLower.includes('avrupa')) {
    return 'https://images.unsplash.com/photo-1494790108755-2616c93d5a23?w=800&h=600&fit=crop'
  }
  
  // Sağlık konuları
  if (titleLower.includes('covid') || titleLower.includes('aşı') || titleLower.includes('sağlık')) {
    return 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('dna') || titleLower.includes('gen') || titleLower.includes('tedavi')) {
    return 'https://images.unsplash.com/photo-1559757171-a35b4c1e8d6d?w=800&h=600&fit=crop'
  }
  
  // Ekonomi konuları
  if (titleLower.includes('borsa') || titleLower.includes('ekonomi') || titleLower.includes('piyasa')) {
    return 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('dolar') || titleLower.includes('euro') || titleLower.includes('altın')) {
    return 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&h=600&fit=crop'
  }
  
  // Bilim konuları
  if (titleLower.includes('uzay') || titleLower.includes('nasa') || titleLower.includes('mars')) {
    return 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop'
  }
  if (titleLower.includes('araştırma') || titleLower.includes('bilim') || titleLower.includes('laboratuvar')) {
    return 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop'
  }
  
  // Çevre konuları
  if (titleLower.includes('iklim') || titleLower.includes('çevre') || titleLower.includes('sürdürülebilir')) {
    return 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=600&fit=crop'
  }
  
  // Kategori bazlı fallback - Type güvenli approach
  const categoryLower = category?.toLowerCase() || ''
  
  const categoryImages: Record<string, string> = {
    'teknoloji': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    'technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    'spor': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    'sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    'siyaset': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=600&fit=crop',
    'politics': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=600&fit=crop',
    'ekonomi': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    'business': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    'sağlık': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'saglik': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'health': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'kültür': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    'kultur': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    'culture': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    'bilim': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
    'science': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
    'dünya': 'https://images.unsplash.com/photo-1494790108755-2616c93d5a23?w=800&h=600&fit=crop',
    'dunya': 'https://images.unsplash.com/photo-1494790108755-2616c93d5a23?w=800&h=600&fit=crop',
    'world': 'https://images.unsplash.com/photo-1494790108755-2616c93d5a23?w=800&h=600&fit=crop',
    'çevre': 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=600&fit=crop',
    'cevre': 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=600&fit=crop',
    'environment': 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=600&fit=crop',
    'eğitim': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    'egitim': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    'education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop'
  }
  
  return categoryImages[categoryLower] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop'
}

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Tüm postları al
    const posts = await payload.find({
      collection: 'posts',
      limit: 200,
      depth: 2
    })

    let updatedCount = 0
    let processedCount = 0

    for (const post of posts.docs) {
      processedCount++
      
      // Post'u any olarak cast et veya mevcut alanları kontrol et
      const currentPost = post as any
      
      // Resim eksik olan postları tespit et (hem featuredImageUrl hem de featuredImage kontrol et)
      if ((!currentPost.featuredImageUrl || currentPost.featuredImageUrl === '') && 
          (!currentPost.featuredImage || currentPost.featuredImage === null)) {
        
        const categoryName = typeof post.category === 'object' && post.category ? (post.category as any).name : ''
        const imageUrl = getImageByTitle(post.title, categoryName)
        
        // Post'u güncelle - featuredImageUrl alanını kullan
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            featuredImageUrl: imageUrl
          } as any
        })
        
        updatedCount++
        console.log(`Updated post "${post.title}" with image`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `${updatedCount} posts updated with images out of ${processedCount} total posts`,
      updatedCount,
      processedCount
    })

  } catch (error: any) {
    console.error('Error fixing missing images:', error)
    return NextResponse.json(
      { error: 'Failed to fix missing images', details: error.message },
      { status: 500 }
    )
  }
}