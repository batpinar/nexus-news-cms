import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

const moreNews = [
  // Teknoloji
  { title: 'Yeni iPhone 16 Tanıtıldı', category: 'teknoloji', excerpt: 'Apple\'ın yeni amiral gemisi önemli yeniliklerle geliyor.' },
  { title: 'ChatGPT-5 Beta Testleri Başladı', category: 'teknoloji', excerpt: 'OpenAI\'ın yeni dil modeli test aşamasında.' },
  { title: 'Tesla Robot Taksi Projesi', category: 'teknoloji', excerpt: 'Otonom araç teknolojisinde yeni adım.' },
  { title: 'Quantum İnternet Denemeleri', category: 'teknoloji', excerpt: 'Kuantum iletişim ağı gerçek oluyor.' },
  { title: 'Meta VR Gözlükleri Güncellendi', category: 'teknoloji', excerpt: 'Sanal gerçeklik deneyimi daha da gelişti.' },
  
  // Spor
  { title: 'Fenerbahçe Transfer Bombası Patlattı', category: 'spor', excerpt: 'Sarı-lacivertliler dünya yıldızıyla anlaştı.' },
  { title: 'Beşiktaş Avrupa Kupasında İlerliyor', category: 'spor', excerpt: 'Kartal Avrupa\'da iddialı gidiyor.' },
  { title: 'Milli Takım Kadrosu Açıklandı', category: 'spor', excerpt: 'A Milli Takım\'da sürpriz isimler var.' },
  { title: 'NBA\'de Lakers Şampiyonluk İddialısı', category: 'spor', excerpt: 'Los Angeles ekibi güçlü kadrosuyla öne çıkıyor.' },
  { title: 'Dünya Kupası Hazırlıkları Sürüyor', category: 'spor', excerpt: 'Katar 2024 için geri sayım başladı.' },
  
  // Ekonomi  
  { title: 'Dolar Kuru Düşüş Trendinde', category: 'ekonomi', excerpt: 'Türk Lirası son haftalarda değer kazanıyor.' },
  { title: 'Kripto Para Piyasası Hareketlendi', category: 'ekonomi', excerpt: 'Bitcoin ve Ethereum\'da önemli hareketler.' },
  { title: 'Borsa İstanbul Rekor Kırdı', category: 'ekonomi', excerpt: 'Endeks tüm zamanların en yüksek seviyesinde.' },
  { title: 'Merkez Bankası Faiz İndirdi', category: 'ekonomi', excerpt: 'Para politikasında önemli karar.' },
  { title: 'İhracat Rakamları Açıklandı', category: 'ekonomi', excerpt: 'Türkiye ihracatta hedeflerini aştı.' },
  
  // Siyaset
  { title: 'Yerel Seçim Tarihleri Belli Oldu', category: 'siyaset', excerpt: 'Belediye seçimleri için tarih açıklandı.' },
  { title: 'Anayasa Komisyonu Toplandı', category: 'siyaset', excerpt: 'Yeni anayasa çalışmaları devam ediyor.' },
  { title: 'Dış Politikada Yeni Hamle', category: 'siyaset', excerpt: 'Türkiye diplomaside aktif rol oynuyor.' },
  { title: 'Parlamentoda Önemli Görüşme', category: 'siyaset', excerpt: 'Milletvekilleri kritik konuları ele aldı.' },
  { title: 'Yerel Yönetimler Reformu', category: 'siyaset', excerpt: 'Belediyecilik anlayışı değişiyor.' },
  
  // Kültür
  { title: 'İstanbul Bienali Kapılarını Açtı', category: 'kultur', excerpt: 'Dünya sanatçıları İstanbul\'da buluştu.' },
  { title: 'Türk Filmi Oscar\'a Aday', category: 'kultur', excerpt: 'Ulusal sinema dünya sahnesinde.' },
  { title: 'Müze Kartı 2024 Başlıyor', category: 'kultur', excerpt: 'Kültür turizminde yeni dönem.' },
  { title: 'Kitap Okuma Oranları Arttı', category: 'kultur', excerpt: 'Türkiye\'de okuma alışkanlığı gelişiyor.' },
  { title: 'Geleneksel Sanatlar Festivali', category: 'kultur', excerpt: 'El sanatları sergisi büyük ilgi gördü.' },
  
  // Sağlık
  { title: 'Yeni Kanser İlacı Onaylandı', category: 'saglik', excerpt: 'Türk hastaları için umut verici gelişme.' },
  { title: 'Aşı Takvimi Güncellendi', category: 'saglik', excerpt: 'Sağlık Bakanlığı\'ndan yeni program.' },
  { title: 'Dijital Hastane Dönemi', category: 'saglik', excerpt: 'Sağlık hizmetleri dijitalleşiyor.' },
  { title: 'Organ Nakli Rekoru', category: 'saglik', excerpt: 'Türkiye organ naklinde Avrupa lideri.' },
  { title: 'Beslenme Rehberi Yenilendi', category: 'saglik', excerpt: 'Uzmanlardan yeni öneriler.' },
  
  // Eğitim
  { title: 'YKS Sistemi Değişiyor', category: 'egitim', excerpt: 'Üniversite sınavında yeni model.' },
  { title: 'Uzaktan Eğitim Kalıcı Oluyor', category: 'egitim', excerpt: 'Hibrit eğitim modeli yaygınlaşıyor.' },
  { title: 'STEM Okulları Açılıyor', category: 'egitim', excerpt: 'Bilim ve teknoloji odaklı eğitim.' },
  { title: 'Öğretmen Atama Sonuçları', category: 'egitim', excerpt: 'Binlerce öğretmen göreve başlıyor.' },
  { title: 'Okul Öncesi Eğitim Zorunlu', category: 'egitim', excerpt: 'Anaokulu eğitimi zorunlu hale geliyor.' },
  
  // Çevre
  { title: 'Güneş Enerjisi Yatırımları Arttı', category: 'cevre', excerpt: 'Yenilenebilir enerji alanında büyük adım.' },
  { title: 'Orman Alanları Genişliyor', category: 'cevre', excerpt: 'Ağaçlandırma çalışmaları meyvesini veriyor.' },
  { title: 'Plastik Yasağı Genişletiliyor', category: 'cevre', excerpt: 'Tek kullanımlık ürünlere yeni kısıtlamalar.' },
  { title: 'Elektrikli Araç Teşvikleri', category: 'cevre', excerpt: 'Çevre dostu ulaşım destekleniyor.' },
  { title: 'Karbon Nötr Hedefi 2053', category: 'cevre', excerpt: 'Türkiye iklim hedeflerini açıkladı.' },
  
  // Bilim
  { title: 'TÜBİTAK Yeni Projeler Destekliyor', category: 'bilim', excerpt: 'Bilimsel araştırmalara rekor destek.' },
  { title: 'Uzay Programı İlerliyor', category: 'bilim', excerpt: 'Türkiye uzayda yeni başarılar elde ediyor.' },
  { title: 'Gen Tedavisi Çalışmaları', category: 'bilim', excerpt: 'Nadir hastalıklarda umut verici sonuçlar.' },
  { title: 'Yapay Zeka Araştırma Merkezi', category: 'bilim', excerpt: 'AI teknolojilerinde milli hamle.' },
  { title: 'Nükleer Güç Santrali Projesi', category: 'bilim', excerpt: 'Akkuyu NGS\'de önemli gelişmeler.' },
  
  // Dünya
  { title: 'G20 Zirvesi İstanbul\'da', category: 'dunya', excerpt: 'Dünya liderleri Türkiye\'de buluşacak.' },
  { title: 'AB Müzakereleri Hızlandı', category: 'dunya', excerpt: 'Avrupa Birliği ile ilişkilerde yeni dönem.' },
  { title: 'NATO Zirvesi Kararları', category: 'dunya', excerpt: 'İttifak güvenlik politikalarını güncelledi.' },
  { title: 'BM İklim Kongresi Sonuçları', category: 'dunya', excerpt: 'Küresel ısınmayla mücadelede yeni adımlar.' },
  { title: 'Uluslararası Ticaret Anlaşması', category: 'dunya', excerpt: 'Yeni ekonomik işbirliği protokolü imzalandı.' }
]

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    
    // Mevcut kategorileri ve yazarları al
    const { docs: categories } = await payload.find({
      collection: 'categories',
      limit: 100
    })
    
    const { docs: authors } = await payload.find({
      collection: 'authors', 
      limit: 100
    })
    
    if (categories.length === 0 || authors.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Önce kategoriler ve yazarlar oluşturulmalı. /api/seed endpoint\'ini çağırın.'
      })
    }
    
    const createdPosts = []
    
    // Her haber için post oluştur
    for (let i = 0; i < moreNews.length; i++) {
      const news = moreNews[i]
      const category = categories.find(cat => cat.slug === news.category)
      const author = authors[i % authors.length]
      
      if (category && author) {
        const publishDate = new Date()
        publishDate.setDate(publishDate.getDate() - Math.floor(Math.random() * 15)) // Son 15 gün içinde
        publishDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
        
        const slug = news.title
          .toLowerCase()
          .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/[ğüşıöçĞÜŞİÖÇ]/g, (match) => {
            const map: { [key: string]: string } = { 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'İ': 'i', 'Ö': 'o', 'Ç': 'c' }
            return map[match] || match
          }) + `-${i + 1}`
        
        const newsContent = `${news.excerpt}

Bu konuda uzmanlar şunları belirtiyor: "Gelişmeler son derece önemli ve dikkatle takip edilmesi gerekiyor. Sektörde yaşanan değişimler uzun vadede olumlu sonuçlar doğuracak."

Konu hakkında yapılan araştırmalar, bu alandaki gelişmelerin devam edeceğini ve yakın gelecekte daha da önemli adımlar atılacağını gösteriyor. Uzmanlar, bu sürecin hem ulusal hem de uluslararası düzeyde takip edilmesi gerektiğini vurguluyor.

İlgili kurumlar konuya ilişkin çalışmalarını sürdürürken, vatandaşların da gelişmeleri yakından takip etmesi öneriliyor. Bu alandaki ilerlemeler, gelecek dönemde daha da hız kazanacak gibi görünüyor.`
        
        const postData = {
          title: news.title,
          slug: slug,
          author: author.id,
          category: category.id,
          content: {
            root: {
              children: newsContent.split('\n\n').map(paragraph => ({
                children: [{
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: paragraph,
                  type: 'text',
                  version: 1
                }],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1
              })),
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1
            }
          },
          excerpt: news.excerpt,
          status: 'published' as const,
          publishedDate: publishDate.toISOString(),
          tags: ['güncel', news.category, 'haberler'],
          meta: {
            title: news.title + ' - Nexus News',
            description: news.excerpt,
            keywords: `${news.category}, haberler, güncel, türkiye`
          }
        }
        
        try {
          const created = await payload.create({
            collection: 'posts',
            data: postData as any
          })
          createdPosts.push(created)
        } catch (error: any) {
          console.log(`Haber oluşturulamadı: ${news.title}`, error.message)
        }
      }
    }
    
    // Site ayarlarını da güncelle
    try {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          siteName: 'Nexus News',
          siteDescription: 'Türkiye\'nin önde gelen haber sitesi - Güncel haberler, analizler ve köşe yazıları',
          siteUrl: 'https://nexusnews.com',
          theme: {
            primaryColor: '#2563eb',
            secondaryColor: '#64748b', 
            accentColor: '#f59e0b'
          },
          socialMedia: {
            twitter: 'https://twitter.com/nexusnews',
            facebook: 'https://facebook.com/nexusnews',
            instagram: 'https://instagram.com/nexusnews',
            youtube: 'https://youtube.com/nexusnews'
          },
          contact: {
            email: 'info@nexusnews.com',
            phone: '+90 212 123 45 67',
            address: 'İstanbul, Türkiye'
          },
          dailyQuote: {
            enabled: true,
            quote: 'Doğru haber, özgür toplumun temelidir.',
            author: 'Nexus News Editörü'
          },
          seo: {
            metaTitle: 'Nexus News - Güncel Haberler ve Analizler',
            metaDescription: 'Türkiye ve dünyadan son dakika haberleri, spor, ekonomi, teknoloji ve daha fazlası Nexus News\'te.'
          }
        }
      })
    } catch (error: any) {
      console.log('Site ayarları güncellenemedi:', error.message)
    }
    
    return NextResponse.json({
      success: true,
      message: `${createdPosts.length} adet haber başarıyla oluşturuldu!`,
      results: {
        createdPosts: createdPosts.length,
        totalCategories: categories.length,
        totalAuthors: authors.length
      }
    })
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Hata oluştu: ' + error.message
    }, { status: 500 })
  }
}
