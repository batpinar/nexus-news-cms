import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

const categories = [
  { name: 'Teknoloji', slug: 'teknoloji', description: 'Teknoloji ve dijital dünya haberleri', color: '#3b82f6' },
  { name: 'Spor', slug: 'spor', description: 'Spor haberleri ve müsabaka sonuçları', color: '#ef4444' },
  { name: 'Siyaset', slug: 'siyaset', description: 'Güncel siyasi gelişmeler ve analizler', color: '#6366f1' },
  { name: 'Ekonomi', slug: 'ekonomi', description: 'Ekonomi ve finans dünyasından haberler', color: '#10b981' },
  { name: 'Kültür', slug: 'kultur', description: 'Kültür, sanat ve yaşam haberleri', color: '#f59e0b' },
  { name: 'Sağlık', slug: 'saglik', description: 'Sağlık ve tıp alanındaki son gelişmeler', color: '#06b6d4' },
  { name: 'Eğitim', slug: 'egitim', description: 'Eğitim sistemi ve akademik haberler', color: '#8b5cf6' },
  { name: 'Çevre', slug: 'cevre', description: 'Çevre ve doğa koruma haberleri', color: '#22c55e' },
  { name: 'Bilim', slug: 'bilim', description: 'Bilimsel araştırmalar ve keşifler', color: '#f97316' },
  { name: 'Dünya', slug: 'dunya', description: 'Dünyadan haberler ve uluslararası gelişmeler', color: '#84cc16' }
]

const authors = [
  { name: 'Ahmet Yılmaz', email: 'ahmet.yilmaz@nexusnews.com', bio: 'Teknoloji editörü. 10 yıllık deneyim.', role: 'editor' },
  { name: 'Fatma Demir', email: 'fatma.demir@nexusnews.com', bio: 'Spor muhabiri ve analisti.', role: 'reporter' },
  { name: 'Mehmet Kaya', email: 'mehmet.kaya@nexusnews.com', bio: 'Siyaset köşe yazarı.', role: 'columnist' },
  { name: 'Ayşe Çelik', email: 'ayse.celik@nexusnews.com', bio: 'Ekonomi editörü ve analisti.', role: 'editor' },
  { name: 'Murat Özkan', email: 'murat.ozkan@nexusnews.com', bio: 'Kültür ve sanat yazarı.', role: 'writer' },
  { name: 'Zeynep Arslan', email: 'zeynep.arslan@nexusnews.com', bio: 'Sağlık muhabiri.', role: 'reporter' },
  { name: 'Emre Doğan', email: 'emre.dogan@nexusnews.com', bio: 'Eğitim editörü.', role: 'editor' },
  { name: 'Selin Yurtsever', email: 'selin.yurtsever@nexusnews.com', bio: 'Çevre muhabiri.', role: 'reporter' },
  { name: 'Burak Şahin', email: 'burak.sahin@nexusnews.com', bio: 'Bilim yazarı ve araştırmacı.', role: 'writer' },
  { name: 'Deniz Aktaş', email: 'deniz.aktas@nexusnews.com', bio: 'Uluslararası muhabir.', role: 'reporter' }
]

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    
    const results = {
      categories: [] as any[],
      authors: [] as any[],
      posts: [] as any[],
      siteSettings: null as any
    }
    
    // Kategorileri oluştur
    for (const category of categories) {
      try {
        const created = await payload.create({
          collection: 'categories',
          data: category
        })
        results.categories.push(created)
      } catch (error: any) {
        console.log(`Kategori oluşturulamadı: ${category.name}`, error.message)
      }
    }
    
    // Yazarları oluştur  
    for (const author of authors) {
      try {
        const created = await payload.create({
          collection: 'authors',
          data: author
        })
        results.authors.push(created)
      } catch (error: any) {
        console.log(`Yazar oluşturulamadı: ${author.name}`, error.message)
      }
    }
    
    // Örnek haberler oluştur
    if (results.categories.length > 0 && results.authors.length > 0) {
      const sampleNews = [
        {
          title: 'Yapay Zeka Teknolojileri Hızla Gelişiyor',
          content: 'AI ve machine learning alanındaki son gelişmeler...',
          category: 'teknoloji'
        },
        {
          title: 'Galatasaray Şampiyonlar Liginde İddialı',
          content: 'Sarı-kırmızılıların Avrupa hedefleri...',
          category: 'spor'
        },
        {
          title: 'Ekonomide Yeni Dönem Başlıyor',
          content: 'Para politikası değişiklikleri...',
          category: 'ekonomi'
        }
      ]
      
      for (let i = 0; i < sampleNews.length; i++) {
        const news = sampleNews[i]
        const category = results.categories.find(cat => cat.slug === news.category)
        const author = results.authors[i % results.authors.length]
        
        if (category && author) {
          try {
            const created = await payload.create({
              collection: 'posts',
              data: {
                title: news.title,
                slug: news.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-'),
                author: author.id,
                category: category.id,
                content: {
                  root: {
                    children: [{
                      children: [{
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: news.content,
                        type: 'text',
                        version: 1
                      }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      type: 'paragraph',
                      version: 1
                    }],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'root',
                    version: 1
                  }
                },
                excerpt: news.content.substring(0, 100) + '...',
                status: 'published',
                publishedDate: new Date().toISOString()
              }
            })
            results.posts.push(created)
          } catch (error: any) {
            console.log(`Haber oluşturulamadı: ${news.title}`, error.message)
          }
        }
      }
    }
    
    // Site ayarlarını güncelle
    try {
      const siteSettings = await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          siteName: 'Nexus News',
          siteDescription: 'Güncel haberler ve analizler',
          dailyQuote: {
            enabled: true,
            quote: 'Bilgi güçtür, doğru bilgi ise özgürlüktür.',
            author: 'Nexus News'
          }
        }
      })
      results.siteSettings = siteSettings
    } catch (error: any) {
      console.log('Site ayarları güncellenemedi:', error.message)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Fake data başarıyla oluşturuldu!',
      results: {
        categories: results.categories.length,
        authors: results.authors.length,
        posts: results.posts.length,
        siteSettings: results.siteSettings ? 'Güncellendi' : 'Güncellenemedi'
      }
    })
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Hata oluştu: ' + error.message
    }, { status: 500 })
  }
}
