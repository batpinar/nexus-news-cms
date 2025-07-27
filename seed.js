const { getPayload } = require('payload')
const config = require('./src/payload.config.ts')

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
  { name: 'Deniz Aktaş', email: 'deniz.aktas@nexusnews.com', bio: 'Uluslararası muhabir.', role: 'reporter' },
  { name: 'Can Türkmen', email: 'can.turkmen@nexusnews.com', bio: 'Teknoloji analisti.', role: 'writer' },
  { name: 'Gizem Erdoğan', email: 'gizem.erdogan@nexusnews.com', bio: 'Spor editörü.', role: 'editor' },
  { name: 'Okan Yıldız', email: 'okan.yildiz@nexusnews.com', bio: 'Siyaset muhabiri.', role: 'reporter' },
  { name: 'Neslihan Koç', email: 'neslihan.koc@nexusnews.com', bio: 'Ekonomi yazarı.', role: 'writer' },
  { name: 'Serkan Avcı', email: 'serkan.avci@nexusnews.com', bio: 'Kültür editörü.', role: 'editor' },
  { name: 'Pınar Güneş', email: 'pinar.gunes@nexusnews.com', bio: 'Sağlık editörü.', role: 'editor' },
  { name: 'Tolga Ateş', email: 'tolga.ates@nexusnews.com', bio: 'Eğitim muhabiri.', role: 'reporter' },
  { name: 'Ece Çağlar', email: 'ece.caglar@nexusnews.com', bio: 'Çevre yazarı.', role: 'writer' },
  { name: 'Kaan Bulut', email: 'kaan.bulut@nexusnews.com', bio: 'Bilim editörü.', role: 'editor' },
  { name: 'İrem Özdemir', email: 'irem.ozdemir@nexusnews.com', bio: 'Dünya muhabiri.', role: 'reporter' },
  { name: 'Bora Çetin', email: 'bora.cetin@nexusnews.com', bio: 'Teknoloji köşe yazarı.', role: 'columnist' },
  { name: 'Lale Demirci', email: 'lale.demirci@nexusnews.com', bio: 'Spor analisti.', role: 'writer' },
  { name: 'Arda Yıldırım', email: 'arda.yildirim@nexusnews.com', bio: 'Siyaset analisti.', role: 'writer' },
  { name: 'Ezgi Kaplan', email: 'ezgi.kaplan@nexusnews.com', bio: 'Ekonomi muhabiri.', role: 'reporter' },
  { name: 'Kerem Taş', email: 'kerem.tas@nexusnews.com', bio: 'Kültür muhabiri.', role: 'reporter' },
  { name: 'Sibel Korkmaz', email: 'sibel.korkmaz@nexusnews.com', bio: 'Sağlık yazarı.', role: 'writer' },
  { name: 'Onur Akın', email: 'onur.akin@nexusnews.com', bio: 'Eğitim analisti.', role: 'writer' },
  { name: 'Yasemin Uçar', email: 'yasemin.ucar@nexusnews.com', bio: 'Çevre editörü.', role: 'editor' },
  { name: 'Barış Öztürk', email: 'baris.ozturk@nexusnews.com', bio: 'Bilim muhabiri.', role: 'reporter' },
  { name: 'Gamze Polat', email: 'gamze.polat@nexusnews.com', bio: 'Uluslararası editör.', role: 'editor' }
]

const newsTemplates = [
  // Teknoloji
  { title: 'Yapay Zeka Artık Günlük Hayatımızın Bir Parçası', category: 'teknoloji', excerpt: 'AI teknolojilerinin günlük yaşama entegrasyonu hızla artıyor.' },
  { title: 'Yeni iPhone Modeli Rekor Satış Rakamlarına Ulaştı', category: 'teknoloji', excerpt: 'Apple\'ın son iPhone modeli piyasaya çıktığı ilk hafta rekor kırdı.' },
  { title: 'Blockchain Teknolojisi Finans Sektörünü Dönüştürüyor', category: 'teknoloji', excerpt: 'Kripto para ve blockchain teknolojileri bankacılık sektöründe devrim yaratıyor.' },
  { title: '5G Ağları Türkiye\'de Yaygınlaşmaya Başladı', category: 'teknoloji', excerpt: 'Telekomünikasyon operatörleri 5G yatırımlarını artırıyor.' },
  { title: 'Metaverse Konsepti Sosyal Yaşamı Değiştirecek', category: 'teknoloji', excerpt: 'Sanal gerçeklik dünyaları geleceğin sosyal etkileşim platformu olarak görülüyor.' },
  { title: 'Siber Güvenlik Tehditleri Artış Gösterdi', category: 'teknoloji', excerpt: 'Uzmanlar dijital güvenlik önlemlerinin artırılması gerektiğini belirtiyor.' },
  
  // Spor
  { title: 'Galatasaray Avrupa Kupasında Finale Yükseldi', category: 'spor', excerpt: 'Sarı-kırmızılılar büyük mücadele sonucu finale kalmayı başardı.' },
  { title: 'Milli Takım Hazırlık Maçında Galibiyet Aldı', category: 'spor', excerpt: 'A Milli Futbol Takımı önemli bir galibiyetle moral buldu.' },
  { title: 'NBA Finallerinde Heyecan Dorukta', category: 'spor', excerpt: 'Amerikan basketbol liginde final serisi büyük ilgi görüyor.' },
  { title: 'Wimbledon Tenis Turnuvası Başladı', category: 'spor', excerpt: 'Dünyanın en prestijli tenis turnuvası heyecanla takip ediliyor.' },
  { title: 'Formula 1 Türkiye Grand Prix Tarihi Açıklandı', category: 'spor', excerpt: 'İstanbul Park Pisti yeniden F1 takviminde yerini aldı.' },
  { title: 'Basketbol Süper Ligi Play-off Heyecanı', category: 'spor', excerpt: 'Türk basketbolunun en iyi takımları şampiyonluk için mücadele ediyor.' },
  
  // Siyaset
  { title: 'Yeni Anayasa Tartışmaları Sürüyor', category: 'siyaset', excerpt: 'Siyasi partiler anayasa değişikliği konusunda görüş bildirmeye devam ediyor.' },
  { title: 'Ekonomi Politikaları Meclis\'te Görüşüldü', category: 'siyaset', excerpt: 'Milletvekilleri yeni ekonomik tedbirleri değerlendirdi.' },
  { title: 'Belediye Seçim Hazırlıkları Başladı', category: 'siyaset', excerpt: 'Siyasi partiler yerel seçimler için adaylarını belirlemeye başladı.' },
  { title: 'Dış Politika Stratejileri Güncellendi', category: 'siyaset', excerpt: 'Türkiye uluslararası ilişkilerde yeni yaklaşımlar benimsiyor.' },
  { title: 'Adalet Reformu Paketi Onaylandı', category: 'siyaset', excerpt: 'Yargı sisteminde önemli değişiklikler yapılacak.' },
  
  // Ekonomi
  { title: 'Enflasyon Rakamları Açıklandı', category: 'ekonomi', excerpt: 'TÜİK tarafından açıklanan veriler ekonomi çevrelerince yakından takip ediliyor.' },
  { title: 'Merkez Bankası Faiz Kararını Duyurdu', category: 'ekonomi', excerpt: 'Para politikası kurulu toplantısı sonrası önemli kararlar alındı.' },
  { title: 'İhracat Rakamlarında Rekor Artış', category: 'ekonomi', excerpt: 'Türk ihracatçıları yeni pazarlarda başarılı olmaya devam ediyor.' },
  { title: 'Kripto Para Düzenlemeleri Netleşiyor', category: 'ekonomi', excerpt: 'Dijital varlıklar konusunda yeni yasal çerçeve oluşturuluyor.' },
  { title: 'Borsada Yükseliş Trendi Sürüyor', category: 'ekonomi', excerpt: 'Borsa İstanbul\'da pozitif hava devam ediyor.' },
  
  // Kültür
  { title: 'İstanbul Film Festivali Başlıyor', category: 'kultur', excerpt: 'Dünyanın dört bir yanından sinema severler İstanbul\'da buluşuyor.' },
  { title: 'Yeni Müze Kapılarını Halka Açtı', category: 'kultur', excerpt: 'Modern sanat müzesi ziyaretçilerini bekliyor.' },
  { title: 'Kitap Fuarı Rekor Katılımla Gerçekleşti', category: 'kultur', excerpt: 'Okurlar ve yazarlar büyük buluşmada bir araya geldi.' },
  { title: 'Geleneksel El Sanatları Sergisi Açıldı', category: 'kultur', excerpt: 'Anadolu\'nun zengin kültürel mirası sergileniyor.' },
  { title: 'Opera Sezonu Gala ile Başladı', category: 'kultur', excerpt: 'Klasik müzik severler için yeni sezon heyecanla bekleniyor.' },
  
  // Sağlık
  { title: 'Yeni Kanser Tedavi Yöntemi Geliştirildi', category: 'saglik', excerpt: 'Türk doktorlar tarafından geliştirilen yöntem umut veriyor.' },
  { title: 'Aşı Programı Güncellemesi Yapıldı', category: 'saglik', excerpt: 'Sağlık Bakanlığı yeni aşı takvimini açıkladı.' },
  { title: 'Dijital Sağlık Uygulamaları Yaygınlaşıyor', category: 'saglik', excerpt: 'Mobil sağlık uygulamaları hasta takibinde devrim yaratıyor.' },
  { title: 'Organ Nakli Sayılarında Artış', category: 'saglik', excerpt: 'Organ bağışı bilincinin artmasıyla nakil oranları yükseliyor.' },
  { title: 'Beslenme Alışkanlıkları Araştırması Sonuçlandı', category: 'saglik', excerpt: 'Uzmanlar sağlıklı beslenme önerilerini paylaştı.' },
  
  // Eğitim
  { title: 'Uzaktan Eğitim Sisteminde Yenilikler', category: 'egitim', excerpt: 'Pandemi sonrası eğitim teknolojileri gelişmeye devam ediyor.' },
  { title: 'Üniversite Sınav Sistemi Değişiyor', category: 'egitim', excerpt: 'YÖK yeni sınav modeli hakkında açıklamalarda bulundu.' },
  { title: 'STEM Eğitimi Programları Genişliyor', category: 'egitim', excerpt: 'Bilim, teknoloji, mühendislik ve matematik eğitimi önem kazanıyor.' },
  { title: 'Öğretmen Yetiştirme Programları Güncellendi', category: 'egitim', excerpt: 'Eğitim fakültesi müfredatları modern ihtiyaçlara göre yenileniyor.' },
  { title: 'Okul Öncesi Eğitimde Kapsamlı Reform', category: 'egitim', excerpt: 'Erken çocukluk eğitimi için yeni standartlar belirleniyor.' },
  
  // Çevre
  { title: 'Yenilenebilir Enerji Yatırımları Artıyor', category: 'cevre', excerpt: 'Rüzgar ve güneş enerjisi projeleri hız kazanıyor.' },
  { title: 'Plastik Atık Azaltma Kampanyası Başlatıldı', category: 'cevre', excerpt: 'Çevre koruma bilinci artırılmaya yönelik çalışmalar sürüyor.' },
  { title: 'Orman Alanlarında Koruma Tedbirleri Artırıldı', category: 'cevre', excerpt: 'Doğal yaşam alanlarının korunması için yeni önlemler alınıyor.' },
  { title: 'İklim Değişikliği Toplantısı Düzenlendi', category: 'cevre', excerpt: 'Uzmanlar küresel ısınmayla mücadele stratejilerini görüştü.' },
  { title: 'Sürdürülebilir Tarım Projeleri Destekleniyor', category: 'cevre', excerpt: 'Çevre dostu tarım uygulamaları teşvik ediliyor.' },
  
  // Bilim
  { title: 'Mars Keşif Misyonundan Yeni Bulgular', category: 'bilim', excerpt: 'Kızıl gezegen hakkında önemli bilgiler elde edildi.' },
  { title: 'Gen Terapisinde Çığır Açan Gelişme', category: 'bilim', excerpt: 'Nadir hastalıkların tedavisinde yeni umutlar.' },
  { title: 'Kuantum Bilgisayar Teknolojisinde İlerleme', category: 'bilim', excerpt: 'Gelecek nesil bilgi işlem teknolojileri gelişiyor.' },
  { title: 'Yapay Organ Üretiminde Başarı', category: 'bilim', excerpt: '3D biyobaskı teknolojisiyle organ üretimi mümkün hale geliyor.' },
  { title: 'Uzay Çöpü Temizleme Projesi Başlatıldı', category: 'bilim', excerpt: 'Dünya yörüngesindeki atıkların temizlenmesi için çalışmalar sürüyor.' },
  
  // Dünya
  { title: 'G20 Liderler Zirvesi Sonuç Bildirisi', category: 'dunya', excerpt: 'Dünya liderleri küresel sorunlar hakkında mutabakat sağladı.' },
  { title: 'Avrupa Birliği Yeni Politikalar Açıkladı', category: 'dunya', excerpt: 'AB üye ülkeleri için yeni düzenlemeler kabul edildi.' },
  { title: 'Uluslararası Ticaret Anlaşması İmzalandı', category: 'dunya', excerpt: 'Ülkeler arası ekonomik işbirliği güçleniyor.' },
  { title: 'BM İklim Konferansı Başladı', category: 'dunya', excerpt: 'Dünya liderleri çevre sorunlarını görüşmek için bir araya geldi.' },
  { title: 'Afganistan\'da İnsani Yardım Çalışmaları', category: 'dunya', excerpt: 'Uluslararası toplum yardım kampanyalarını sürdürüyor.' }
]

async function seedData() {
  const payload = await getPayload({ config: config.default || config })
  
  console.log('🌱 Fake data oluşturuluyor...')
  
  // Kategorileri oluştur
  console.log('📂 Kategoriler oluşturuluyor...')
  const createdCategories = []
  for (const category of categories) {
    try {
      const created = await payload.create({
        collection: 'categories',
        data: category
      })
      createdCategories.push(created)
      console.log(`✅ Kategori oluşturuldu: ${category.name}`)
    } catch (error) {
      console.log(`❌ Kategori oluşturulamadı: ${category.name}`, error.message)
    }
  }
  
  // Yazarları oluştur
  console.log('👥 Yazarlar oluşturuluyor...')
  const createdAuthors = []
  for (const author of authors) {
    try {
      const created = await payload.create({
        collection: 'authors',
        data: author
      })
      createdAuthors.push(created)
      console.log(`✅ Yazar oluşturuldu: ${author.name}`)
    } catch (error) {
      console.log(`❌ Yazar oluşturulamadı: ${author.name}`, error.message)
    }
  }
  
  // Haberleri oluştur
  console.log('📰 Haberler oluşturuluyor...')
  for (let i = 0; i < 55; i++) {
    const template = newsTemplates[i % newsTemplates.length]
    const randomCategory = createdCategories.find(cat => cat.slug === template.category)
    const randomAuthor = createdAuthors[Math.floor(Math.random() * createdAuthors.length)]
    
    if (!randomCategory || !randomAuthor) continue
    
    const publishDate = new Date()
    publishDate.setDate(publishDate.getDate() - Math.floor(Math.random() * 30)) // Son 30 gün içinde
    
    const newsData = {
      title: `${template.title} ${i > newsTemplates.length - 1 ? `(${Math.floor(i / newsTemplates.length) + 1})` : ''}`,
      slug: template.title.toLowerCase()
        .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[ğüşıöçĞÜŞİÖÇ]/g, (match) => {
          const map = { 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'İ': 'i', 'Ö': 'o', 'Ç': 'c' }
          return map[match] || match
        }) + (i > newsTemplates.length - 1 ? `-${i}` : ''),
      author: randomAuthor.id,
      category: randomCategory.id,
      content: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: `${template.excerpt} Bu haberin detayları aşağıda yer almaktadır.`,
                  type: 'text',
                  version: 1
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: `Bu konu hakkında uzmanlar şunları söylüyor: "Gelişmeler oldukça önemli ve yakından takip edilmesi gerekiyor." Sektör temsilcileri de konuya ilişkin olumlu görüşlerini paylaştılar.`,
                  type: 'text',
                  version: 1
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1
            },
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: `Gelecek dönemde bu alanda daha fazla gelişme bekleniyor. Uzmanlar konunun önemini vurgulayarak, sürecin yakından takip edilmesi gerektiğini belirtiyorlar.`,
                  type: 'text',
                  version: 1
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'root',
          version: 1
        }
      },
      excerpt: template.excerpt,
      status: 'published',
      publishedDate: publishDate.toISOString(),
      tags: ['güncel', 'önemli', template.category],
      meta: {
        title: template.title + ' - Nexus News',
        description: template.excerpt,
        keywords: `${template.category}, haberler, güncel`
      }
    }
    
    try {
      await payload.create({
        collection: 'posts',
        data: newsData
      })
      console.log(`✅ Haber oluşturuldu: ${newsData.title}`)
    } catch (error) {
      console.log(`❌ Haber oluşturulamadı: ${newsData.title}`, error.message)
    }
  }
  
  // Site ayarlarını oluştur
  console.log('⚙️ Site ayarları oluşturuluyor...')
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'Nexus News',
        siteDescription: 'Güncel haberler, analizler ve köşe yazıları ile Türkiye\'nin önde gelen haber sitesi',
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
          quote: 'Bilgi güçtür, doğru bilgi ise özgürlüktür.',
          author: 'Nexus News Editörü'
        },
        seo: {
          metaTitle: 'Nexus News - Güncel Haberler ve Analizler',
          metaDescription: 'Türkiye ve dünyadan son dakika haberleri, spor, ekonomi, teknoloji ve daha fazlası Nexus News\'te.'
        }
      }
    })
    console.log('✅ Site ayarları güncellendi')
  } catch (error) {
    console.log('❌ Site ayarları güncellenemedi:', error.message)
  }
  
  console.log('🎉 Fake data oluşturma işlemi tamamlandı!')
  console.log(`📊 Oluşturulan veri:`)
  console.log(`   - ${createdCategories.length} kategori`)
  console.log(`   - ${createdAuthors.length} yazar`)
  console.log(`   - 55 haber yazısı (hedef)`)
  console.log(`   - Site ayarları yapılandırıldı`)
  
  process.exit(0)
}

seedData().catch(console.error)
