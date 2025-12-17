# MELODIA

Küçük bir müzik uygulaması/örnek proje — frontend statik dosyalar ve basit bir Node.js backend içerir.

Özet
-
Melodia, yerel mp3 dosyalarını barındırıp oynatmaya uygun basit bir frontend ile birlikte geleneksel bir Node.js backend örneğidir. Proje eğitim amaçlıdır ve kendi müzik koleksiyonunuzu düzenleyip test etmeniz için hazırlanmıştır.

Özellikler
-
- Statik frontend (HTML/CSS/JS) — `frontend/index.html`
- Basit Node.js sunucusu — `newbackend/server.js`
- Yerel medya klasörleri için örnek yapılar (`frontend/muzikler`, `newbackend/mp3`, `müzikler`)

Hızlı kurulum
-
Gereksinimler: Node.js (14+ tercih edilir)

Backend
1. `cd newbackend`
2. `npm install`
3. `node server.js` veya `npm start` (varsa)

Frontend
- Dosyayı doğrudan açmak için `frontend/index.html` dosyasını tarayıcıda açabilirsiniz.
- Veya basit bir statik sunucu ile servis edebilirsiniz, örn:

```bash
npx serve frontend
```

Klasör yapısı (ana hatları)
-
- `frontend/` — statik site dosyaları, medya ve deneme sayfaları
- `newbackend/` — Node.js sunucusu ve backend içerikleri
- `resimler/`, `müzikler/` — proje genel medya dosyaları

Katkıda bulunma
-
Kontribütör olmak isterseniz bir issue açın veya pull request gönderin. Lütfen büyük medya dosyalarını doğrudan repoya commit etmeyin; alternatif olarak bir depolama hizmeti veya Git LFS kullanın.

Lisans
-
Proje için lisans belirtilmemiştir. İsterseniz `LICENSE` dosyası ekleyerek örn. MIT lisansı uygulayabilirsiniz.

İpuçları
-
- Büyük medya dosyalarının repoya girmediğinden emin olmak için `.gitignore` dosyasını kontrol edin.
- Geliştirme sırasında backend loglarını izleyin ve gerekli portların (ör. 3000) açık olduğundan emin olun.
