// API Temel URL'si
const API_BASE = 'http://localhost:3000'; // Backend sunucusu için tam URL

// Audio Player elementi
let audioPlayer = new Audio();
let currentTrackList = [];
let currentTrackIndex = 0;
let isPlaying = false;
let genres = []; // Tür listesi
let allPlaylists = []; // Tüm playlistler (arama için)
let currentView = 'home'; // Mevcut görünüm: 'home', 'library', 'genre', 'playlist', 'search'

// Sayfa yüklendiğinde çalışacak
document.addEventListener('DOMContentLoaded', async () => {
    // Türleri yükle (hem sidebar hem ana sayfa için)
    await loadGenres();

    // Sol paneldeki playlist'leri yükle
    await loadPlaylists();

    // Sidebar navigasyonunu ayarla
    setupSidebarNavigation();

    // Arama fonksiyonlarını bağla
    setupSearch();

    // Playlist arama fonksiyonunu bağla
    setupPlaylistSearch();

    // Player kontrollerini bağla
    setupPlayerControls();

    // Ana sayfayı göster
    showHomeView();
    // YerlI mp3 dosyasını footer oynatıcıya yükle ve çalmayı dene
    loadLocalFooterTrack();
});

// Yerel mp3 dosyasını footer oynatıcıya yükler (backend /mp3/ route'u kullanılarak)
function loadLocalFooterTrack() {
    try {
        const filename = 'Cem Karaca Tamirci Çırağı Ölümsüzler   YouTube.mp3';
        const src = `${API_BASE}/mp3/${encodeURIComponent(filename)}`;

        const track = {
            id: 'local1',
            name: 'Tamirci Çırağı',
            artist_name: 'Cem Karaca',
            album_image: 'resimler/images.jpg',
            audio: src
        };

        // ilk şarkı olarak yerleştir
        currentTrackList = [track, ...currentTrackList];
        currentTrackIndex = 0;

        // alt panel görsellerini güncelle
        const titleEl = document.getElementById('player-song-title');//elementın el
        const artistEl = document.getElementById('player-song-artist');
        const imgEl = document.querySelector('.player-song-info img');
        if (titleEl) titleEl.textContent = track.name;
        if (artistEl) artistEl.textContent = track.artist_name;
        if (imgEl) imgEl.src = track.album_image;

        // ses kaynağını ayarla ve çalmayı dene (tarayıcı otomatik oynatma politikaları nedeniyle engellenebilir)
        audioPlayer.src = track.audio;
        audioPlayer.load();
        audioPlayer.play().then(() => { //basarılı olursa alta gecıyor
            isPlaying = true; // sarkının caldıgı ısaretlenıyor
            updatePlayPauseButton();// Play/Pause butonunun görünümü güncelleniyor (ikon değişiyor).
        }).catch(() => {
            // otomatik oynatma engellendiyse — kullanıcı etkileşimine hazır bırak
            isPlaying = false;//sarkı calmıyor olarak ısaretlenıyor
            updatePlayPauseButton();
        });

    } catch (err) {
        console.error('loadLocalFooterTrack error:', err);
    }
}

// Yardımcı: hex renk kodunu yüzdeyle aç (0-100 arası)
//tek nedenı sarkı degıstıgınde hangı sarkıda dıye gozukmesı gereken rengı ayarlamak ıcın 
function lightenColor(hex, percent) {
    try {
        if (!hex) return hex; // Eğer renk kodu yoksa, olduğu gibi döndür
        const h = hex.replace('#', ''); // # işaretini kaldır.
        if (h.length !== 6) return hex; // Renk kodu 6 karakter değilse, olduğu gibi döndür
        const num = parseInt(h, 16); // Hex kodunu sayıya çevir.
        let r = (num >> 16) & 0xFF; // Kırmızı bileşenini al
        let g = (num >> 8) & 0xFF;  // Yeşil bileşenini al
        let b = num & 0xFF;         // Mavi bileşenini al
        const amt = Math.round(2.55 * percent); // Açma miktarını hesapla (0-100 arası yüzde)
        //percent parametresı demektır
        r = Math.min(255, r + amt); // Kırmızıyı aç, 255'i geçmesin
        g = Math.min(255, g + amt); // Yeşili aç, 255'i geçmesin
        b = Math.min(255, b + amt); // Maviyi aç, 255'i geçmesin // amt ne kadar acmak ıstedıgımızı belırler
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`; // Yeni hex kodunu oluştur ve döndür
    } catch (e) {
        return hex; // Hata olursa, orijinal rengi döndür.
    }
}

//Sidebar navigasyonu 
function setupSidebarNavigation() {
    // Ana Sayfa butonu
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {//htmldeki id kısmındaki bootsrap ıkonu
        homeBtn.addEventListener('click', (e) => {
            e.preventDefault();// sayfanın basa atmasını engeller
            setActiveNavItem(homeBtn);//butonu aktıf secılı yaptırıyoryum 
            showHomeView();
        });
    }

    // Kitaplık butonu
    const libraryBtn = document.getElementById('library-btn');
    if (libraryBtn) {// element var mı kontrol edıyoruz
        libraryBtn.addEventListener('click', (e) => {
            e.preventDefault();//js ozel komutudur oncelıgı api tarafı ya da js tarafıan verir
            setActiveNavItem(libraryBtn);
            showLibraryView();
        });
    }
}

// Aktif nav item'ı ayarla
function setActiveNavItem(activeItem) {// fonks tanımlayıp degısken belirieyıp sonrasında kulanıyoruz
    // Tüm nav-link'lerden active class'ını kaldır
    document.querySelectorAll('.nav-link, .genre-item, .playlist-item').forEach(item => {
        item.classList.remove('active');// hepsi pasiftir
    });
    // sadece tıklanana actıve ekle 
    if (activeItem) {
        activeItem.classList.add('active'); //suan aktif olan
    }
}

// Ana sayfa görünümü
function showHomeView() {
    currentView = 'home';// suan ana sayfadayız
    const title = document.getElementById('musiclistmid');
    if (title) title.textContent = 'Bugün ne dinlemek istersin?';

    // Bölümleri göster/gizle
    showSection('homeSection');//sadece ana sayfa kısmı gorunsun 

    // Arama kutusunu temizle
    const searchInput = document.getElementById('midsearch');
    if (searchInput) searchInput.value = '';
}

// Kitaplık görünümü
function showLibraryView() {
    currentView = 'library';
    const title = document.getElementById('musiclistmid');
    if (title) title.textContent = 'Kitaplığım';

    // Ana içerikte kitaplık görünümünü göster
    showSection('libraryContentSection');

    // Kitaplık playlistlerini doldur
    renderLibraryPlaylists();//playlıstlerı ekrana ciziyoruz 
}

// Kitaplık playlistlerini render et
function renderLibraryPlaylists() {
    const container = document.getElementById('libraryPlaylistsGrid');
    if (!container) return;

    container.innerHTML = '';

    if (allPlaylists.length === 0) {
        container.innerHTML = '<div class="empty-library-msg">Henüz çalma listen yok</div>';
        return; // ← Mesajı yazdık, artık devam etmeye gerek yok
    }

    allPlaylists.forEach(playlist => {
        const card = document.createElement('div');
        card.className = 'library-playlist-card';
        card.innerHTML = `
            <div class="playlist-card-icon">
                <i class="bi bi-music-note-list"></i>
            </div>
            <div class="playlist-card-info">
                <div class="playlist-card-title">${playlist.title}</div>
                <div class="playlist-card-count">${playlist.musicList ? playlist.musicList.length : 0} şarkı</div>
            </div>
        `;
        card.addEventListener('click', () => {
            showPlaylistDetail(playlist);
        });
        container.appendChild(card);//burda olusturdugumuz card htmlden cekmedık  
    });
}

// Playlist arama fonksiyonu
function setupPlaylistSearch() {
    const playlistSearchInput = document.getElementById('playlistSearch');
    if (playlistSearchInput) {
        playlistSearchInput.addEventListener('input', (e) => {
            filterPlaylists(e.target.value);
            // event olay ve ıcındekı sey ınput kutusu valueda ıcındekı yazı 
        });
    }
}

// Playlistleri filtrele
function filterPlaylists(query) {// query metını temsıl eder 
    const container = document.getElementById('musicListHTML');
    if (!container) return;

    if (!query || query.length < 1) { // query bossa ve uzunlugu 1 den kucukse returnla bıter 
        // Tüm playlistleri göster
        renderPlaylists(allPlaylists);
        return;
    }

    const filtered = allPlaylists.filter(playlist =>
        playlist.title.toLowerCase().includes(query.toLowerCase())
        //ıncludes ıle ıcınde gecıyo mu dıye arıyoruz
    );
    renderPlaylists(filtered);
}

// Playlistleri render et
function renderPlaylists(playlists) {
    const container = document.getElementById('musicListHTML');
    if (!container) return;

    container.innerHTML = '';

    if (playlists.length === 0) {
        container.innerHTML = '<div class="empty-playlist-msg">Çalma listesi bulunamadı</div>';
        return;
    }

    playlists.forEach(playlist => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            <i class="bi bi-music-note-list"></i>
            <span>${playlist.title}</span>
        `;
        item.addEventListener('click', () => {
            setActiveNavItem(item);
            showPlaylistDetail(playlist);
        });
        container.appendChild(item);
    });
}

// Bölüm göster/gizle
function showSection(sectionId) {
    const sections = ['homeSection', 'tracksSection', 'searchResultsSection', 'libraryContentSection'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {//null donerse idyi atlar 
            section.style.display = id === sectionId ? 'block' : 'none'; //dısplay.block gorunur olması ıcın
        }
    });
}

// Tür (Gerne=müzik Türleri) fonksıyonları
//asyn sayfada ozgurce hareket et ben arkadakı ıslerı hallederım 
async function loadGenres() {
    try {
        const response = await fetch(API_BASE + '/api/genres');
        genres = await response.json();

        // Sidebar'daki türleri doldur
        const sidebarContainer = document.getElementById('sidebarGenres');
        if (sidebarContainer) { // element yoksa bır sey yapmıyor 
            sidebarContainer.innerHTML = '';
            genres.forEach(genre => { //Tüm türler (genres) için döngü başlatıyor.
                const item = createSidebarGenreItem(genre); // her tür için bir sidebar (html) degıskenı olustuyor
                sidebarContainer.appendChild(item);
                //items sidebarconterın ıcıne gırıyor 
            });
        }

        // Ana sayfadaki tür kartlarını doldur
        const mainContainer = document.getElementById('genresContainer');
        if (mainContainer) {
            mainContainer.innerHTML = '';
            genres.forEach(genre => {// genre muzık turlerı karıstırma
                const card = createGenreCard(genre);
                mainContainer.appendChild(card);
                //mainconterıne burda buyuk dıv card olsuturulan kucuk div appendchıl ıse kucuk kutuyu buyuk kutunun ıcıne ekler 
            });
        }
    } catch (error) {
        console.error('Türler yüklenirken hata:', error);
    }
}

// Sidebar tür öğesi oluştur
function createSidebarGenreItem(genre) {
    const item = document.createElement('div');
    item.className = 'genre-item';// sitebara muzık turu genreyı koyacak kutu
    item.setAttribute('data-genre-id', genre.id);//css stılındırecek jsye cekmek ıcın data kısmını yapıyoruz 
    const letter = (genre.name && genre.name.length) ? genre.name.charAt(0).toUpperCase() : '';
    const bg = genre.color || '#6c5ce7';
    const lighter = lightenColor(bg, 22);
    const bgCss = `linear-gradient(135deg, ${bg}, ${lighter})`;
    item.innerHTML = `
        <span class="genre-item-badge" style="background:${bgCss};" title="${genre.name}" aria-label="${genre.name}">${letter}</span>
        <span class="genre-item-name">${genre.name}</span>
    `;
    //dolar ısareti HTML'e otomatik olarak eklenmesını saglar
    item.addEventListener('click', () => {
        setActiveNavItem(item);//Tıklanan kutuyu aktif (seçili) yapıyor. Sidebar'da görsel olarak öne çıkıyor.
        loadGenreTracks(genre);// o türe ait sarkılaı getırıtıyor
    });

    return item;
}

// Tür kartı oluştur (ana sayfa için)
function createGenreCard(genre) {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3 mb-3';

    col.innerHTML = `
        <div class="genre-card" data-genre-id="${genre.id}" style="background: linear-gradient(135deg, ${genre.color}, ${genre.color}99);">
            <div class="genre-icon">${genre.icon}</div>
            <div class="genre-name">${genre.name}</div>
        </div>
    `;

    col.querySelector('.genre-card').addEventListener('click', () => {
        // Sidebar'daki ilgili türü aktif yap
        const sidebarItem = document.querySelector(`.genre-item[data-genre-id="${genre.id}"]`);
        setActiveNavItem(sidebarItem);
        loadGenreTracks(genre);// sarkıların turlerıne gerne dıyoruz 
    });

    return col;
}

// Türe ait şarkıları yükle
async function loadGenreTracks(genre) {
    currentView = 'genre';//currentview home tusudur

    const titleEl = document.getElementById('musiclistmid');
    const genreTitle = document.getElementById('currentGenreTitle');//ana sayfa tür baslıkları
    const tracksList = document.getElementById('tracksList');// parca listeleri

    if (titleEl) titleEl.textContent = `${genre.icon} ${genre.name}`;
    if (genreTitle) genreTitle.innerHTML = ` ${genre.name} Şarkıları`;

    // Tracks bölümünü göster
    //albumdekı her parcaya track denır
    showSection('tracksSection');//sarkı lıstesı idsi
    // Yükleniyor göster
    if (tracksList) tracksList.innerHTML = '<div class="loading-text"><i class="bi bi-hourglass-split"></i> Şarkılar yükleniyor...</div>';

    try {
        const response = await fetch(API_BASE + `/api/genres/${genre.id}/tracks?limit=20`);
        const tracks = await response.json();

        if (tracks.error) {
            tracksList.innerHTML = `<div class="error-text"><i class="bi bi-exclamation-circle"></i> Hata: ${tracks.error}</div>`;
            return;
        }

        if (tracks.length === 0) {
            tracksList.innerHTML = '<div class="empty-text"><i class="bi bi-music-note"></i> Bu türde şarkı bulunamadı</div>';
            return;
        }

        currentTrackList = tracks;
        tracksList.innerHTML = '';

        tracks.forEach((track, index) => { // index hangı sarkıda hangı numarada oldugunu soyluyo
            const trackItem = createTrackItem(track, index);
            tracksList.appendChild(trackItem);
        });

    } catch (error) {
        console.error('Şarkılar yüklenirken hata:', error);
        if (tracksList) tracksList.innerHTML = '<div class="error-text"><i class="bi bi-exclamation-circle"></i> Şarkılar yüklenemedi</div>';
    }
}

// Şarkı öğesi oluştur
function createTrackItem(track, index) {
    const item = document.createElement('div');
    item.className = 'track-item';
    item.setAttribute('data-track-index', index);// setAttrıbute olmasaydı her kontrol ıcın next ıcın baska sey ıcın html sayfsaı acardı

    const duration = track.duration ? formatTime(track.duration) : '--:--';// duratıon sure demek 
    //track parca
    //genre tur demek sureklı karısıyolar 

    item.innerHTML = `
        <div class="track-number">${index + 1}</div>
        <img class="track-image" src="${track.album_image || 'resimler/default-album.png'}" 
             alt="${track.name}" onerror="this.src='resimler/default-album.png'">
        <div class="track-info">
            <div class="track-name">${track.name}</div>
            <div class="track-artist">${track.artist_name}</div>
        </div>
        <div class="track-duration">${duration}</div>
        <button class="track-play-btn" title="Çal">
            <i class="bi bi-play-fill"></i>
        </button>
    `;

    // Play butonuna tıklanınca — togglePlayTrack fonksiyonunu kullan
    item.querySelector('.track-play-btn').addEventListener('click', (e) => {
        e.stopPropagation();// ılerletmeyı duruduran bır event komutu
        togglePlayTrack(track, index);// aç kapa komutu 
        // track sarkının tum bılgılerı
        // index ise listenın sırası
    });

    // Satıra tıklayınca da togglePlayTrack
    item.addEventListener('click', () => {
        togglePlayTrack(track, index);
    });
    // current suan calan anlamındadır
    // Şarkı satırına veya play ikonuna tıklayınca: Eğer o şarkı çalıyorsa duraklat/oynat togglesı yapar, farklıysa baştan çalar
    function togglePlayTrack(track, index) {
        //Şu an çalan şarkı mı?
        //Şu an hafızada seçili bir şarkı var mı? (Boş mu değil mi?)
        //id === id -> "Varsa, o şarkının kimliği ile senin şimdi tıkladığın şarkının kimliği AYNI MI?
        const isSame = (currentTrackList[currentTrackIndex] && String(currentTrackList[currentTrackIndex].id) === String(track.id));
        //tıkladıgım sey gercekten calan sey mı 
        if (isSame) {
            if (isPlaying) {
                audioPlayer.pause();
                //aduıo kısmı muzık kısmındakı sadece hoparları kapatmak ıcın 
                //false olması sısteme sustum demek ıcın bılgıysarın beynını guncellemek ıcın 
                isPlaying = false;
            } else {
                audioPlayer.play();
                isPlaying = true;
            }
            updatePlayPauseButton();
            highlightCurrentTrack(currentTrackIndex);
        } else {
            playTrack(track, index);
        }
    }

    return item;
}

// Çalan şarkıyı vurgula
function highlightCurrentTrack(index) {
    document.querySelectorAll('.track-item').forEach((item, i) => {
        if (i === index) {//sıfırsa renk ekle yoksa ekleme
            //index o an calmsını ıstedıgımız sarkıdır lıstesını alır
            item.classList.add('playing');
        } else {
            item.classList.remove('playing');
        }
    });
}

// Alt paneli (footer player) aktif et
function activateFooterPlayer() {
    const footer = document.querySelector('.footer-player');
    if (footer) {
        footer.classList.add('active');
        footer.style.opacity = '1';
    }
}

//Sol Panel Playlist'ler
async function loadPlaylists() {
    //async yüzden bu fonksiyon çalışırken diğer işleri kilitleme, cevap gelene kadar bekle der
    try {
        const response = await fetch(API_BASE + '/api/playlists');
        const playlists = await response.json();

        // Tüm playlistleri kaydet (arama için)
        allPlaylists = playlists;

        // Playlistleri render et
        renderPlaylists(playlists);
    } catch (error) {
        console.error('Playlist yüklenirken hata:', error);
    }
}

//  Orta Panel Kartlar 
async function loadMidCards() {
    try {
        // Popüler şarkıları Jamendo'dan çek
        const response = await fetch(API_BASE + '/api/jamendo/search-clean?q=pop&limit=6');
        const tracks = await response.json();

        const container = document.getElementById('midmusic');
        if (!container) return;

        container.innerHTML = '';

        if (tracks.error) {
            container.innerHTML = `<p class="text-danger">API Hatası: ${tracks.error}</p>`;
            return;
        }

        tracks.forEach(track => {
            const card = createMusicCard(track);
            container.appendChild(card);// fızıksel olarak havada durmasın dıye appenchıld ıle kutu ıcıne yerlestırıyoruz
        });

        currentTrackList = tracks;
    } catch (error) {
        console.error('Kartlar yüklenirken hata:', error);
    }
}

// Müzik kartı oluştur
function createMusicCard(track) {// track parca demek genre tür demek cok karıstırıyosun dıkkat et
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-2 mb-3';

    col.innerHTML = `
        <div class="music-card" data-track-id="${track.id}">
            <img src="${track.album_image || 'resimler/default-album.png'}" 
                 alt="${track.name}" 
                 class="card-img-top"
                 onerror="this.src='resimler/default-album.png'">
            <div class="card-body">
                <h6 class="card-title">${track.name}</h6>
                <p class="card-text">${track.artist_name}</p>
            </div>
            <button class="play-btn" title="Çal">
                <i class="bi bi-play-fill"></i>
            </button>
        </div>
    `;

    // Kart tıklanınca şarkıyı çal
    col.querySelector('.music-card').addEventListener('click', () => {
        playTrack(track);
    });

    return col;// hem durdurup hem teslım edıyo 
}

//  Arama Fonksıyonu
function setupSearch() {
    // Orta panel arama
    const midSearchInput = document.getElementById('midsearch');
    if (midSearchInput) {
        let searchTimeout;
        midSearchInput.addEventListener('input', (e) => {// ınput eventı tetıkler 
            clearTimeout(searchTimeout);//searchtımeout arama idsi cleartımeout 500 msten  kucukse arama yapma dur yorma dıyo 
            searchTimeout = setTimeout(() => {// settimeoutu 500 e bagladık arama suresı 500ms oldugunda sonuclar cıkıyo
                searchJamendo(e.target.value);
            }, 500); // 500ms bekle (debounce)// kulanıcının her harfında arama yapmamak ıcın bekletıyoruz
        });
    }
}

// Jamendo'da şarkı ara
async function searchJamendo(query) {//async ekranı dondurma ben bekletırsemde calısan seylerı cevam ettır
    const tracksList = document.getElementById('tracksList');
    const title = document.getElementById('musiclistmid');

    if (!query || query.length < 2) {// kutu bossa veya 2 harften kucukse dıye mı bakıyor 
        // Boşsa ana sayfaya dön
        showHomeView();
        return;
    }

    // Başlığı güncelle
    if (title) title.textContent = `"${query}" için arama sonuçları`;//query detaylandırmak ıcın kulandıgım degısken 

    // Tracks bölümünü göster
    showSection('tracksSection');

    const genreTitle = document.getElementById('currentGenreTitle');
    if (genreTitle) genreTitle.innerHTML = `<i class="bi bi-search"></i> "${query}" Sonuçları`;// tür kısmı emojısı quresyı

    if (tracksList) tracksList.innerHTML = '<div class="loading-text"><i class="bi bi-hourglass-split"></i> Aranıyor...</div>';

    try {
        const response = await fetch(API_BASE + `/api/jamendo/search-clean?q=${encodeURIComponent(query)}&limit=20`);
        //encodeurı kısmı ınternetle konusur kodu ınternetın anlayacagı sekılde acıklar
        const tracks = await response.json(); // burdakı json apıden gelen verılerı lıstelıyo 

        if (tracks.error) {
            tracksList.innerHTML = `<div class="error-text"><i class="bi bi-exclamation-circle"></i> Hata: ${tracks.error}</div>`;
            return;
        }

        if (tracks.length === 0) {
            tracksList.innerHTML = '<div class="empty-text"><i class="bi bi-search"></i> Sonuç bulunamadı</div>';
            return;
        }

        currentTrackList = tracks;
        tracksList.innerHTML = '';

        tracks.forEach((track, index) => {
            const trackItem = createTrackItem(track, index);//index hangı sarkıda hangı numarada oldugunu soyluyo
            tracksList.appendChild(trackItem);//appenchıld mantıgı bunları 1 2 3 dıye sıralıyo sıraya alıyo 
        });

    } catch (error) {
        console.error('Arama hatası:', error);
        if (tracksList) tracksList.innerHTML = '<div class="error-text"><i class="bi bi-exclamation-circle"></i> Arama yapılamadı</div>';
    }
}

// Player kontrollerı
function setupPlayerControls() {

    // Karışık (shuffle) butonu (1. buton)
    const shuffleBtn = document.querySelector('.player-controls button:nth-child(1)');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            if (!currentTrackList || currentTrackList.length === 0) return;
            let rand = Math.floor(Math.random() * currentTrackList.length);
            //matfloor tam sayı olmak zorunda ve mat random ıle rasgele tam sayı cek dıyo 
            // lıtesyıde ona gore degıstır 1 8 13 olsun gıbı 
            playTrack(currentTrackList[rand], rand);
        });
    }

    // Play/Pause butonu (3. buton)
    const playPauseBtn = document.querySelector('.player-controls button:nth-child(3)');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);//toggle ac kapa tusu 
    }

    // Previous butonu
    const prevBtn = document.querySelector('.player-controls button:nth-child(2)');
    if (prevBtn) {
        prevBtn.addEventListener('click', playPrevious);
    }


    // Next butonu (4. buton)
    const nextBtn = document.querySelector('.player-controls button:nth-child(4)');
    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }

    // 10 sn ileri sarma butonu (5. buton, döngü/tekrar ikonu)
    const skip10sBtn = document.querySelector('.player-controls button:nth-child(5)');
    if (skip10sBtn) {
        skip10sBtn.addEventListener('click', () => {
            skipForward10();
        });
    }

    // 10 saniye ileri sarma fonksiyonu
    // Footer player'daki 5. butona tıklanınca mevcut şarkıyı 10 saniye ileri sarar
    function skipForward10() {
        try {
            if (!audioPlayer || !audioPlayer.src) return;//yoksa hıcbırsey yapma 
            const totalDuration = audioPlayer.duration || 0;//Toplam süreyi al (yoksa 0)
            const currentTime = audioPlayer.currentTime || 0;
            const newTime = Math.min(totalDuration, currentTime + 10);
            //mat min sarkının en kucuk olan sayısını alır
            audioPlayer.currentTime = newTime;
            updateProgress();
            // Eğer süre sonuna çok yakınsa doğrudan sonraki parçaya geç
            // sarkı suresı varsa 0 degılse ve suankı zaman 1 sanıyeden azsa dıger sarkıya gec
            if (totalDuration > 0 && audioPlayer.currentTime >= totalDuration - 0.5) {
                playNext();
            }
        } catch (e) {
            console.error('skip10sBtn hata', e);
        }
    }

    // Progress bar(ılerleme cubugu)
    const progressBar = document.getElementById('playerProgress');
    if (progressBar) {
        progressBar.addEventListener('input', (e) => {//tıklayınca tetıklenıyo 
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (e.target.value / 100) * duration;
            // e targetle kutuya ulasırsın value ıle ıcındekı verıye ulasırsın
            //cubuk okur 50 ye getırdıysen 50 der / 100 kodu bunu boler 100/50 =0.5
        });
    }

    // Ses kontrolü
    const volumeSlider = document.querySelector('.player-sound input[type="range"]');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audioPlayer.volume = e.target.value / 100;
            // e targetle kutuya ulasırsın value ıle ıcındekı verıye ulasırsın
        });
    }

    // Ses kapatma/açma (mute) butonu
    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            audioPlayer.muted = !audioPlayer.muted;
            //atama yapıyoruz ac kapa mantıgı true false mantıgıdır
            muteBtn.className = audioPlayer.muted
                ? 'bi bi-volume-mute-fill'
                : 'bi bi-volume-up';
        });
    }

    // Audio player olay dinleyicileri
    audioPlayer.addEventListener('timeupdate', updateProgress);//cubugun sarkıyla beraber akmasını saglar
    audioPlayer.addEventListener('ended', playNext);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);//sarkı daha baslamadan bılgıler gelır
    //sarkının ne kadar dakika sanıye oldugunu sayar
}

// Şarkı çal
function playTrack(track, providedIndex = null) {
    // currentTrackList dizisindeki indeksi (0'dan başlayan sayı). Varsayılan null – eğer verilmezse, fonksiyon şarkının ID'sine göre indeksi bulur.
    // Şarkı bilgilerini güncelle
    const titleEl = document.getElementById('player-song-title');
    const artistEl = document.getElementById('player-song-artist');
    const imgEl = document.querySelector('.player-song-info img');

    if (titleEl) titleEl.textContent = track.name;
    if (artistEl) artistEl.textContent = track.artist_name;
    if (imgEl) {
        imgEl.src = track.album_image || 'resimler/default-album.png';//burdaki src kaynak demek 
        imgEl.onerror = () => imgEl.src = 'resimler/default-album.png'
        // onerror bos cerceveye resım cemezse defualttan cekıyo
    }

    // Footer player'ı aktif et
    activateFooterPlayer();

    // Şarkıyı yükle ve çal
    const audioUrl = track.audio || `/api/jamendo/stream/${track.id}`;
    audioPlayer.src = audioUrl;
    audioPlayer.play();
    isPlaying = true;

    // Play butonunu güncelle
    updatePlayPauseButton();

    // currentTrackIndex'i belirle: Eğer providedIndex verildiyse onu kullan, yoksa id/string ile eşleşeni bul
    if (providedIndex !== null && Number.isInteger(providedIndex)) {
        currentTrackIndex = providedIndex;
    } else {// Şarkı listesindeki id ile eşleşen şarkının index'ini bul
        const found = currentTrackList.findIndex(t => String(t.id) === String(track.id));
        currentTrackIndex = found !== -1 ? found : 0;
    }

    // Ensure UI highlights the active row
    try { highlightCurrentTrack(currentTrackIndex); } catch (e) { /* hata olursa görmezden gel */ }
}

// Play/Pause toggle
function togglePlayPause() {
    if (audioPlayer.src) {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseButton();
    }
}

// Play/Pause buton ikonunu güncelle
function updatePlayPauseButton() {
    const btn = document.querySelector('.player-controls button:nth-child(3) i');
    if (btn) {
        btn.className = isPlaying ? 'bi bi-pause-circle-fill' : 'bi bi-play-circle-fill';
    }
}

// Önceki şarkı
function playPrevious() {
    if (currentTrackList.length === 0) return;
    currentTrackIndex = (currentTrackIndex - 1 + currentTrackList.length) % currentTrackList.length;
    playTrack(currentTrackList[currentTrackIndex], currentTrackIndex);
}

// Sonraki şarkı
// Next tuşu: Eğer ilk şarkıdaysak API'den rastgele şarkı çal, değilse sıradaki şarkıyı çal
async function playNext() {
    if (currentTrackList.length === 0) return;
    // Eğer ilk şarkıdaysak (index 0), API'den rastgele şarkı çek
    if (currentTrackIndex === 0) {
        try {
            // API'den 50 şarkı çekip rastgele birini seçiyoruz (limit artırılabilir)
            const response = await fetch(`${API_BASE}/api/jamendo/search-clean?q=&limit=50`);
            const tracks = await response.json();
            if (Array.isArray(tracks) && tracks.length > 0) {
                const rand = Math.floor(Math.random() * tracks.length);
                const randomTrack = tracks[rand];
                playTrack(randomTrack, null); // index önemli değil, rastgele
                return;
            }
        } catch (e) {
            console.error('API üzerinden rastgele şarkı alınamadı:', e);
        }
    }
    // Diğer durumlarda sıradaki şarkıyı çal
    currentTrackIndex = (currentTrackIndex + 1) % currentTrackList.length;
    playTrack(currentTrackList[currentTrackIndex], currentTrackIndex);
}

// Progress bar güncelle
function updateProgress() {
    const progressBar = document.getElementById('playerProgress');
    const currentTimeEl = document.getElementById('playerTimeStart');

    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        if (progressBar) progressBar.value = percent;

        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        }
    }
}

// Toplam süreyi güncelle
function updateDuration() {
    const durationEl = document.getElementById('playerTimeEnd');
    if (durationEl && audioPlayer.duration) {
        durationEl.textContent = formatTime(audioPlayer.duration);
    }
}

// Süreyi formatla (mm:ss)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Playlist detayını göster
async function showPlaylistDetail(playlist) {
    currentView = 'playlist';

    const title = document.getElementById('musiclistmid');
    const genreTitle = document.getElementById('currentGenreTitle');
    const tracksList = document.getElementById('tracksList');

    if (title) title.textContent = playlist.title;
    if (genreTitle) genreTitle.innerHTML = `<i class="bi bi-music-note-list"></i> ${playlist.title}`;

    // Tracks bölümünü göster
    showSection('tracksSection');

    // Playlist şarkılarını göster
    if (playlist.musicList && playlist.musicList.length > 0) {
        currentTrackList = playlist.musicList.map(track => ({
            id: track.id,
            name: track.title.split(' - ')[1] || track.title,
            artist_name: track.title.split(' - ')[0] || 'Bilinmeyen Sanatçı',
            album_image: track.avatar,
            audio: track.file,
            duration: track.duration
        }));

        tracksList.innerHTML = '';
        currentTrackList.forEach((track, index) => {
            const trackItem = createTrackItem(track, index);
            tracksList.appendChild(trackItem);
        });
    } else {
        tracksList.innerHTML = '<div class="empty-text"><i class="bi bi-music-note"></i> Bu listede şarkı yok</div>';
    }
}

// ================== EK ÖZELLİKLER ==================

// Kategorilere göre müzik yükle
async function loadByCategory(category) {
    const title = document.getElementById('musiclistmid');
    if (title) {
        title.textContent = category;
    }
    await searchJamendo(category);
}