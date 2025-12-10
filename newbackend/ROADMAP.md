# 🎵 Spotify Clone – Proje Yol Haritası

> **Amaç:** Pure HTML, CSS ve Node.js (Express) kullanarak Jamendo API destekli bir müzik çalar uygulaması geliştirmek.

---

## 📁 Proje Klasör Yapısı (Önerilen)

```
newbackend/
├── public/                 # Frontend dosyaları (HTML, CSS, JS)
│   ├── index.html          # Ana sayfa
│   ├── player.html         # Basit oynatıcı (mevcut)
│   ├── css/
│   │   └── style.css       # Stil dosyası
│   └── js/
│       └── app.js          # Frontend JavaScript
├── mp3/                    # Yerel MP3 dosyaları (opsiyonel)
├── resimler/               # Yerel görseller (opsiyonel)
├── server.js               # Backend sunucu (Express)
├── .env                    # Ortam değişkenleri (JAMENDO_CLIENT_ID)
├── .env.example            # Örnek ortam dosyası
├── .gitignore              # Git'ten hariç tutulacaklar
├── package.json            # Bağımlılıklar
└── ROADMAP.md              # Bu dosya
```

---

## 🚀 Geliştirme Aşamaları

### Faz 1: Temel Altyapı ✅ (Tamamlandı)

| Adım | Açıklama | Durum |
|------|----------|-------|
| 1.1 | Node.js + Express kurulumu | ✅ |
| 1.2 | CORS ve statik dosya servisi | ✅ |
| 1.3 | Jamendo API entegrasyonu | ✅ |
| 1.4 | `.env` ile API key yönetimi | ✅ |
| 1.5 | Temel endpoint'ler (`/api/jamendo/*`) | ✅ |

**Mevcut Backend Endpoint'leri:**
- `GET /api/jamendo/search?q=...&limit=...` — Şarkı arama (ham veri)
- `GET /api/jamendo/search-clean?q=...&limit=...` — Şarkı arama (temiz veri)
- `GET /api/jamendo/track/:id` — Tek parça detayı
- `GET /api/jamendo/stream/:id` — Audio URL'e yönlendirme (oynatma için)
- `GET /api/playlists` — Yerel playlist listesi
- `GET /api/popular`, `/api/yeni-cikanlar`, `/api/sana-ozel` — Kategoriler

---

### Faz 2: UI Tasarımı (Frontend HTML/CSS)

| Adım | Açıklama | Durum |
|------|----------|-------|
| 2.1 | Ana sayfa iskelet yapısı (layout) | ⬜ |
| 2.2 | Sol panel: Playlist listesi | ⬜ |
| 2.3 | Orta panel: Şarkı kartları / grid | ⬜ |
| 2.4 | Alt bar: Oynatıcı kontrolü | ⬜ |
| 2.5 | Responsive tasarım (mobil uyum) | ⬜ |

**Önerilen Layout (3 Sütun):**
```
┌─────────────────────────────────────┐
│          ÜST BAR (Arama)            │
├──────────┬──────────────────────────┤
│          │                          │               
│  SOL     │       ORTA PANEL         │  
│  PANEL   │   (Şarkı Kartları)       │  
│(Playlist)│                          │               
│          │                          │              
├──────────┴──────────────────────────┤
│    ALT BAR (Oynatıcı Kontrolleri)   │
└─────────────────────────────────────┘
```

---

### Faz 3: Frontend JavaScript (Logic)

| Adım | Açıklama | Durum |
|------|----------|-------|
| 3.1 | API'den veri çekme (`fetch`) | ⬜ |
| 3.2 | Arama fonksiyonu | ⬜ |
| 3.3 | Şarkı kartlarını render etme | ⬜ |
| 3.4 | Audio oynatma (`<audio>` element) | ⬜ |
| 3.5 | Play/Pause/Next/Previous kontrolleri | ⬜ |
| 3.6 | Progress bar (ilerleme çubuğu) | ⬜ |
| 3.7 | Ses kontrolü (volume slider) | ⬜ |
| 3.8 | Şarkı süresi gösterimi | ⬜ |
| 3.9 | Playlist yönetimi (şarkı seçme) | ⬜ |
| 3.10 | LocalStorage ile favori kaydetme | ⬜ |

**Temel Audio API Kullanımı:**
```javascript
const audio = new Audio();
audio.src = '/api/jamendo/stream/TRACK_ID';
audio.play();
audio.pause();
audio.currentTime = 30; // 30. saniyeye git
audio.volume = 0.5;     // %50 ses
```

---

### Faz 4: Gelişmiş Özellikler

| Adım | Açıklama | Durum |
|------|----------|-------|
| 4.1 | Şarkı kuyruğu (queue) sistemi | ⬜ |
| 4.2 | Shuffle (karışık) modu | ⬜ |
| 4.3 | Repeat (tekrar) modu | ⬜ |
| 4.4 | Favorilere ekleme | ⬜ |
| 4.5 | Playlist oluşturma | ⬜ |
| 4.6 | Kategori filtreleme (rock, pop, vb.) | ⬜ |
| 4.7 | Sanatçı sayfası | ⬜ |
| 4.8 | Albüm sayfası | ⬜ |

---

### Faz 5: Backend Geliştirmeleri

| Adım | Açıklama | Durum |
|------|----------|-------|
| 5.1 | Arama sonuçlarını önbellekleme (cache) | ⬜ |
| 5.2 | Kullanıcı favorilerini kaydetme (JSON/SQLite) | ⬜ |
| 5.3 | Playlist CRUD API'leri | ⬜ |
| 5.4 | Hata yönetimi ve logging | ⬜ |
| 5.5 | Rate limiting (API limit koruması) | ⬜ |

---

## 🎨 UI Bileşenleri Detayı

### 2.1 Ana Sayfa İskeleti (`index.html`)
```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotify Clone</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header class="top-bar">
        <!-- Arama kutusu -->
    </header>
    
    <main class="main-container">
        <aside class="sidebar">
            <!-- Playlist listesi -->
        </aside>
        
        <section class="content">
            <!-- Şarkı kartları -->
        </section>
        
        <aside class="now-playing">
            <!-- Şu an çalan -->
        </aside>
    </main>
    
    <footer class="player-bar">
        <!-- Oynatıcı kontrolleri -->
    </footer>
    
    <script src="/js/app.js"></script>
</body>
</html>
```

### 2.2 Sol Panel (Sidebar)
- Logo
- Ana Sayfa linki
- Arama linki
- Kütüphane başlığı
- Playlist listesi (dinamik)
- Playlist oluştur butonu

### 2.3 Orta Panel (Content)
- Kategori başlıkları (Popüler, Yeni Çıkanlar, vb.)
- Yatay kaydırılabilir şarkı/albüm kartları
- Grid layout ile kart gösterimi

### 2.4 Alt Bar (Player)
- Sol: Şu an çalan şarkı bilgisi (resim, isim, sanatçı)
- Orta: Kontroller (prev, play/pause, next) + progress bar
- Sağ: Ses kontrolü, queue, tam ekran

### 2.5 Şarkı Kartı Bileşeni
```html
<div class="track-card">
    <img src="ALBUM_IMAGE" alt="Albüm">
    <div class="track-info">
        <h4>Şarkı Adı</h4>
        <p>Sanatçı Adı</p>
    </div>
    <button class="play-btn">▶</button>
</div>
```

---

## 🔧 Teknik Notlar

### Jamendo API Kullanımı
```
Base URL: https://api.jamendo.com/v3.0

Endpoints:
- /tracks/     → Şarkı listesi/arama
- /artists/    → Sanatçılar
- /albums/     → Albümler
- /playlists/  → Jamendo playlistleri

Parametreler:
- client_id    → API anahtarı (zorunlu)
- format=json  → JSON formatı
- limit        → Sonuç limiti (max 200)
- namesearch   → İsimle arama
- tags         → Tür/etiket filtresi (rock, pop, electronic)
```

### Örnek Jamendo Tag'leri (Türler)
`rock`, `pop`, `electronic`, `hiphop`, `jazz`, `classical`, `ambient`, `metal`, `folk`, `reggae`

### LocalStorage Kullanımı
```javascript
// Favori kaydetme
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
favorites.push(trackId);
localStorage.setItem('favorites', JSON.stringify(favorites));

// Favori okuma
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
```

---

## 📅 Önerilen Geliştirme Sırası

### Hafta 1: Temel UI
1. `index.html` iskeletini oluştur
2. CSS ile 3 sütunlu layout yap
3. Karanlık tema renklerini uygula
4. Alt bar (player) tasarımını tamamla

### Hafta 2: Şarkı Listesi & Arama
1. Arama kutusunu çalıştır
2. API'den gelen verileri kartlara dönüştür
3. Kartlara tıklanınca şarkı çalsın
4. Progress bar'ı çalıştır

### Hafta 3: Oynatıcı Kontrolleri
1. Play/Pause toggle
2. Next/Previous butonları
3. Ses kontrolü
4. Şarkı süresi gösterimi

### Hafta 4: Gelişmiş Özellikler
1. Shuffle ve Repeat
2. Favoriler (localStorage)
3. Playlist görüntüleme
4. Responsive düzenlemeler

---

## 🎯 İlk Yapılacaklar (Bugün Başla!)

1. **`public/index.html`** oluştur — temel HTML iskeletini yaz
2. **`public/css/style.css`** oluştur — Spotify tarzı karanlık tema
3. **`public/js/app.js`** oluştur — API çağrıları ve audio kontrolü
4. Sunucuyu çalıştır: `node server.js`
5. Tarayıcıda aç: `http://localhost:3000`

---

## 📚 Faydalı Kaynaklar

- [Jamendo API Docs](https://developer.jamendo.com/v3.0)
- [MDN: HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## ✅ Tamamlanan Özellikler

- [x] Express sunucu kurulumu
- [x] Jamendo API entegrasyonu
- [x] Şarkı arama endpoint'i
- [x] Stream/oynatma endpoint'i
- [x] Basit player.html test sayfası
- [x] .env ile API key yönetimi

---

## 🎨 Spotify Renk Paleti (Referans)

```css
:root {
    --bg-base: #121212;        /* Ana arka plan */
    --bg-highlight: #1a1a1a;   /* Kartlar, paneller */
    --bg-elevated: #242424;    /* Hover durumu */
    --text-primary: #ffffff;   /* Ana metin */
    --text-secondary: #b3b3b3; /* İkincil metin */
    --accent-green: #1db954;   /* Spotify yeşili */
    --accent-hover: #1ed760;   /* Hover yeşil */
}
```

---

*Son güncelleme: 28 Kasım 2025*
