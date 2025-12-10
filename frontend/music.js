// API Base URL
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
});

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
    item.innerHTML = `
        <span class="genre-item-icon">${genre.icon}</span>
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
        loadGenreTracks(genre);
    });

    return col;
}

// Türe ait şarkıları yükle
async function loadGenreTracks(genre) {
    currentView = 'genre';

    const titleEl = document.getElementById('musiclistmid');
    const genreTitle = document.getElementById('currentGenreTitle');
    const tracksList = document.getElementById('tracksList');

    if (titleEl) titleEl.textContent = `${genre.icon} ${genre.name}`;
    if (genreTitle) genreTitle.innerHTML = `${genre.icon} ${genre.name} Şarkıları`;

    // Tracks bölümünü göster
    showSection('tracksSection');

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

        tracks.forEach((track, index) => {
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
    item.setAttribute('data-track-index', index);

    const duration = track.duration ? formatTime(track.duration) : '--:--';

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

    // Play butonuna tıklanınca
    item.querySelector('.track-play-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        playTrack(track);
        highlightCurrentTrack(index);
    });

    // Satıra tıklanınca da çal
    item.addEventListener('click', () => {
        playTrack(track);
        highlightCurrentTrack(index);
    });

    return item;
}

// Çalan şarkıyı vurgula
function highlightCurrentTrack(index) {
    document.querySelectorAll('.track-item').forEach((item, i) => {
        if (i === index) {
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
            container.appendChild(card);
        });

        currentTrackList = tracks;
    } catch (error) {
        console.error('Kartlar yüklenirken hata:', error);
    }
}

// Müzik kartı oluştur
function createMusicCard(track) {
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

    return col;
}

//  Arama Fonksıyonu
function setupSearch() {
    // Orta panel arama
    const midSearchInput = document.getElementById('midsearch');
    if (midSearchInput) {
        let searchTimeout;
        midSearchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchJamendo(e.target.value);
            }, 500); // 500ms bekle (debounce)
        });
    }
}

// Jamendo'da şarkı ara
async function searchJamendo(query) {
    const tracksList = document.getElementById('tracksList');
    const title = document.getElementById('musiclistmid');

    if (!query || query.length < 2) {
        // Boşsa ana sayfaya dön
        showHomeView();
        return;
    }

    // Başlığı güncelle
    if (title) title.textContent = `"${query}" için arama sonuçları`;

    // Tracks bölümünü göster
    showSection('tracksSection');

    const genreTitle = document.getElementById('currentGenreTitle');
    if (genreTitle) genreTitle.innerHTML = `<i class="bi bi-search"></i> "${query}" Sonuçları`;

    if (tracksList) tracksList.innerHTML = '<div class="loading-text"><i class="bi bi-hourglass-split"></i> Aranıyor...</div>';

    try {
        const response = await fetch(API_BASE + `/api/jamendo/search-clean?q=${encodeURIComponent(query)}&limit=20`);
        const tracks = await response.json();

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
            const trackItem = createTrackItem(track, index);
            tracksList.appendChild(trackItem);
        });

    } catch (error) {
        console.error('Arama hatası:', error);
        if (tracksList) tracksList.innerHTML = '<div class="error-text"><i class="bi bi-exclamation-circle"></i> Arama yapılamadı</div>';
    }
}

// Player kontrollerı
function setupPlayerControls() {
    // Play/Pause butonu
    const playPauseBtn = document.querySelector('.player-controls button:nth-child(3)');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    // Previous butonu
    const prevBtn = document.querySelector('.player-controls button:nth-child(2)');
    if (prevBtn) {
        prevBtn.addEventListener('click', playPrevious);
    }

    // Next butonu
    const nextBtn = document.querySelector('.player-controls button:nth-child(4)');
    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }

    // Progress bar
    const progressBar = document.getElementById('playerProgress');
    if (progressBar) {
        progressBar.addEventListener('input', (e) => {
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (e.target.value / 100) * duration;
        });
    }

    // Ses kontrolü
    const volumeSlider = document.querySelector('.player-sound input[type="range"]');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audioPlayer.volume = e.target.value / 100;
        });
    }

    // Audio player event listeners
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', playNext);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
}

// Şarkı çal
function playTrack(track) {
    // Şarkı bilgilerini güncelle
    const titleEl = document.getElementById('player-song-title');
    const artistEl = document.getElementById('player-song-artist');
    const imgEl = document.querySelector('.player-song-info img');

    if (titleEl) titleEl.textContent = track.name;
    if (artistEl) artistEl.textContent = track.artist_name;
    if (imgEl) {
        imgEl.src = track.album_image || 'resimler/default-album.png';
        imgEl.onerror = () => imgEl.src = 'resimler/default-album.png';
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

    // Mevcut index'i bul
    currentTrackIndex = currentTrackList.findIndex(t => t.id === track.id);
    if (currentTrackIndex === -1) currentTrackIndex = 0;
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
    playTrack(currentTrackList[currentTrackIndex]);
}

// Sonraki şarkı
function playNext() {
    if (currentTrackList.length === 0) return;
    currentTrackIndex = (currentTrackIndex + 1) % currentTrackList.length;
    playTrack(currentTrackList[currentTrackIndex]);
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