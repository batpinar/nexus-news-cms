import { NextResponse } from 'next/server'

// TypeScript interface for quote data
interface Quote {
  text: string
  author: string
}

// Türkçe güzel sözler havuzu
const turkishQuotes: Quote[] = [
  {
    text: "Hayatta en hakiki mürşit ilimdir.",
    author: "Mustafa Kemal Atatürk"
  },
  {
    text: "Bilgi, hayatın en gerçek rehberidir.",
    author: "Mustafa Kemal Atatürk"
  },
  {
    text: "Düşünen ve taşınan her şey güzeldir.",
    author: "Mustafa Kemal Atatürk"
  },
  {
    text: "İnsanlık tarihinde olduğu gibi, her milletin hayatında da en büyük mürşit ve rehber ilimdir.",
    author: "Mustafa Kemal Atatürk"
  },
  {
    text: "Mutluluk kendi işini seven insanın hakkıdır.",
    author: "Leonardo da Vinci"
  },
  {
    text: "Bugün yapmayı ertelediğin şey, yarın da ertelenecek.",
    author: "Konfüçyüs"
  },
  {
    text: "Hayat, pedal çevirmeye devam ettiğin sürece dengede kalırsın.",
    author: "Albert Einstein"
  },
  {
    text: "Başarı, son değil; başarısızlık ölümcül değil: devam etme cesareti önemli olan.",
    author: "Winston Churchill"
  },
  {
    text: "Hayatta en zor şey kendini bilmektir.",
    author: "Sokrates"
  },
  {
    text: "Güçlü olan, güçsüze yardım edebilen kişidir.",
    author: "Hz. Ali"
  },
  {
    text: "İlim tahsil edin, Çin'de bile olsa.",
    author: "Hz. Muhammed"
  },
  {
    text: "Bir kitap, bin dosttan daha iyi arkadaştır.",
    author: "Hz. Ali"
  },
  {
    text: "Sabır, başarının anahtarıdır.",
    author: "Hz. Ali"
  },
  {
    text: "En büyük zafer, kendini yenmektir.",
    author: "Lao Tzu"
  },
  {
    text: "Hayal kurmaktan asla vazgeçmeyin.",
    author: "Albert Einstein"
  },
  {
    text: "Değişim, hayatın tek sabiti.",
    author: "Herakleitos"
  },
  {
    text: "Her gün yeni bir başlangıçtır.",
    author: "T.S. Eliot"
  },
  {
    text: "Cesaretiniz olsun ve nazik olun.",
    author: "Sindirella"
  },
  {
    text: "Başarı, hazırlık ile fırsatın buluşmasıdır.",
    author: "Oprah Winfrey"
  },
  {
    text: "Kendine güven, başarının ilk sırrıdır.",
    author: "Ralph Waldo Emerson"
  }
]

// Cache için değişkenler
let cachedQuote: Quote | null = null
let lastFetchTime: number = 0
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 saat

export async function GET() {
  try {
    const now = Date.now()
    
    // Cache kontrolü - 24 saat boyunca aynı söz dönülür
    if (cachedQuote && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        quote: cachedQuote,
        cached: true
      })
    }

    // Günün tarihine göre deterministik seçim
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    const quoteIndex = dayOfYear % turkishQuotes.length
    
    const selectedQuote = turkishQuotes[quoteIndex]
    
    // Cache'i güncelle
    cachedQuote = selectedQuote
    lastFetchTime = now

    return NextResponse.json({
      success: true,
      quote: selectedQuote,
      cached: false,
      date: today.toISOString().split('T')[0]
    })

  } catch (error) {
    console.error('Daily quote API error:', error)
    
    // Hata durumunda rastgele bir söz dön
    const fallbackQuote = turkishQuotes[Math.floor(Math.random() * turkishQuotes.length)]
    
    return NextResponse.json({
      success: true,
      quote: fallbackQuote,
      fallback: true
    })
  }
}

// POST endpoint - Manual quote refresh (admin için)
export async function POST() {
  try {
    // Cache'i sıfırla
    cachedQuote = null
    lastFetchTime = 0
    
    // Yeni quote al
    return GET()
  } catch (error) {
    console.error('Quote refresh error:', error)
    return NextResponse.json({
      success: false,
      error: 'Quote refresh failed'
    }, { status: 500 })
  }
}
