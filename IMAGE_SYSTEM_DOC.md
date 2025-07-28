# Stock Image Management System

Bu sistem, Nexus News CMS için otomatik olarak stock görseller ekler ve kategori header'larını kategori-özel arka plan görselleriyle güzelleştirir.

## Özellikler

### 1. Post Resimleri
- Öne çıkan görseli olmayan postlar için kategori-uyumlu stock resimler ekler
- Her kategori için farklı görsel teması kullanır
- Unsplash API'den yüksek kaliteli görseller alır

### 2. Kategori Header Arka Planları
- Her kategori için özel arka plan görseli
- Güzel gradyan overlayler ile metin okunabilirliği sağlar
- Responsive tasarım

## Kategori-Görsel Eşleştirmeleri

| Kategori | Görsel Teması |
|----------|---------------|
| Teknoloji | Bilgisayar, kod, teknoloji |
| Spor | Spor aktiviteleri, stadyum |
| Siyaset | Meclis, toplantı, kurumsal |
| Ekonomi | Finans, para, grafik |
| Kültür | Müze, sanat, etkinlik |
| Sağlık | Hastane, doktor, sağlık |
| Eğitim | Okul, kitap, öğrenci |
| Çevre | Doğa, yeşil, çevre |
| Bilim | Laboratuvar, araştırma |
| Dünya | Dünya haritası, küre |

## API Endpoint'leri

### 1. Post Resimlerini Ekle
```
POST /api/add-post-images
```
Öne çıkan görseli olmayan tüm postlara kategori-uyumlu stock resimler ekler.

### 2. Kategori Arka Plan Resimlerini Ekle
```
POST /api/add-category-images
```
Kategorilere özel arka plan resimleri ekler.

### 3. Tüm Resimleri Kur (Toplu İşlem)
```
POST /api/setup-images
```
Hem post resimlerini hem de kategori arka planlarını tek seferde kurar.

### 4. Admin Panel
```
POST /api/admin/setup-images
```
Admin paneli üzerinden görsel kurulumu yapar.

## Kullanım

### Manuel Kurulum
```bash
curl -X POST https://your-domain.com/api/setup-images
```

### Kod İçinden Kullanım
```javascript
const response = await fetch('/api/setup-images', {
  method: 'POST'
});
const result = await response.json();
console.log(result);
```

## CSS Özellikleri

### Kategori Header Stilleri
- **Background**: Kategori-özel arka plan görseli ile dinamik arka plan
- **Overlay**: Koyu gradyan overlay ile metin okunabilirliği
- **Responsive**: Mobil cihazlarda uyumlu tasarım
- **Typography**: Büyük, etkileyici başlıklar

### Fallback Sistemleri
- Görsel yüklenmeyen durumlarda emoji-based fallback
- Gradyan arka planlar
- Loading skeleton animasyonları

## Görsellerin Güncellenmesi

Yeni görseller eklemek veya mevcut görselleri değiştirmek için:

1. `src/app/api/add-post-images/route.ts` dosyasındaki `stockImages` nesnesini güncelleyin
2. `src/app/api/add-category-images/route.ts` dosyasındaki `categoryBackgrounds` nesnesini güncelleyin
3. API endpoint'ini çağırın

## Önemli Notlar

- Görseller Unsplash'ten alınır ve yüksek kalitededir
- Her çağrıda farklı görseller seçilir (rastgele)
- Mevcut görseli olan kategoriler atlanır
- Hata durumunda detaylı log verir
- Media collection'a görseller kaydedilir

## Troubleshooting

### Görsel Yüklenmiyor
1. İnternet bağlantısını kontrol edin
2. Unsplash URL'lerinin erişilebilir olduğunu kontrol edin
3. Payload CMS media upload ayarlarını kontrol edin

### Kategori Arka Planı Görünmüyor  
1. Kategori'nin `image` field'ının dolu olduğunu kontrol edin
2. CSS'deki inline style'ların doğru uygulandığını kontrol edin
3. Browser developer tools ile background-image property'sini kontrol edin

### API Hataları
1. Payload CMS connection'ını kontrol edin
2. Server loglarını inceleyin
3. API response'larını console'da kontrol edin
