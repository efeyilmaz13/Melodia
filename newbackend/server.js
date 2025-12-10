const express = require('express'); //expersse kutuphane diyebılırız
const cors = require('cors');//CORS kutuphanesini projeye dahil etmedir
const path = require('path')// Dosya yollarını yonetmek icin gerekli
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const app = express();//app uygulama experss kutuphane
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/mp3', express.static(path.join(__dirname, 'mp3')));
app.use('/resimler', express.static(path.join(__dirname, 'resimler')));
app.use(express.static(path.join(__dirname, 'public')));

// ================== JAMENDO API AYARLARI ==================
const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID || 'YOUR_CLIENT_ID';
const JAMENDO_BASE = 'https://api.jamendo.com/v3.0';

// Muzik turleri (Jamendo tag'leri)
const MUSIC_GENRES = [
    { id: 'rock', name: 'Rock', icon: '🎸', color: '#e74c3c' },
    { id: 'pop', name: 'Pop', icon: '🎤', color: '#e91e63' },
    { id: 'electronic', name: 'Elektronik', icon: '🎧', color: '#9b59b6' },
    { id: 'hiphop', name: 'Hip Hop', icon: '🎹', color: '#3498db' },
    { id: 'jazz', name: 'Jazz', icon: '🎷', color: '#f39c12' },
    { id: 'classical', name: 'Klasik', icon: '🎻', color: '#1abc9c' },
    { id: 'metal', name: 'Metal', icon: '🤘', color: '#2c3e50' },
    { id: 'reggae', name: 'Reggae', icon: '🌴', color: '#27ae60' },
    { id: 'blues', name: 'Blues', icon: '🎺', color: '#2980b9' },
    { id: 'folk', name: 'Folk', icon: '🪕', color: '#d35400' },
    { id: 'ambient', name: 'Ambient', icon: '🌙', color: '#8e44ad' },
    { id: 'indie', name: 'Indie', icon: '🎵', color: '#16a085' }
];

// Jamendo'dan sarki cekme fonksiyonu
async function jamendoRequest(params) {
    params.client_id = JAMENDO_CLIENT_ID;
    params.format = 'json';
    const url = `${JAMENDO_BASE}/tracks/`;
    const resp = await axios.get(url, { params });
    return (resp.data && resp.data.results) ? resp.data.results : [];
}

// Jamendo sarkilarini bizim formatimiza cevir
function formatJamendoTracks(tracks) {
    return tracks.map(t => ({
        id: t.id,
        title: `${t.artist_name} - ${t.name}`,
        file: t.audio,
        avatar: t.album_image || t.image,
        duration: t.duration
    }));
}

// ================== PLAYLIST TANIMLARI ==================
const playlistDefinitions = [
    { id: 1, title: 'Bulamaç gibi herşey', search: 'rock alternative' },
    { id: 2, title: 'Sabaha kadar dinledigim müziklerim', search: 'chill night' },
    { id: 3, title: 'Pentagram konser zamanı!!', search: 'metal heavy' },
    { id: 4, title: 'Murder King sevdam', search: 'punk hardcore' },
    { id: 5, title: 'Rastafarilya ve Idex Listesi', search: 'reggae dub' },
    { id: 6, title: 'Anadoluda Dinlediklerim', search: 'folk acoustic' },
    { id: 7, title: 'Volkan konak klasikleri', search: 'world traditional' },
    { id: 8, title: 'Evrim agaci ile bilime dair hersey', search: 'electronic ambient' },
    { id: 9, title: 'Tanrıverdinin dinledikleri', search: 'jazz blues' }
];

const midCardDefinitions = [
    { id: 11, title: 'Populer Sarkilar', search: 'pop hits' },
    { id: 12, title: '90s rock music', search: 'rock 90s' },
    { id: 13, title: 'Chill Vibes', search: 'chill lofi' },
    { id: 14, title: 'Electronic Beats', search: 'electronic dance' },
    { id: 15, title: 'Acoustic Sessions', search: 'acoustic guitar' },
    { id: 16, title: 'Hip Hop Classics', search: 'hiphop rap' }
];

const popularDefinitions = [
    { id: 21, title: 'Populer Liste 1', search: 'popular hits' },
    { id: 22, title: 'Populer Liste 2', search: 'top songs' },
    { id: 23, title: 'Sana Ozel Kesif', search: 'indie discover' },
    { id: 24, title: 'Moduna Gore', search: 'mood relaxing' },
    { id: 25, title: 'Dans Pistinde', search: 'dance party' },
    { id: 26, title: 'Gece Gezmesi', search: 'night driving' }
];

const yeniCikanlarDefinitions = [
    { id: 31, title: 'Yeni Cikan Album 1', search: 'new release' },
    { id: 32, title: 'Yeni Cikan Album 2', search: 'fresh music' },
    { id: 33, title: 'Bu Hafta Trend', search: 'trending' },
    { id: 34, title: 'Kesfet', search: 'discover new' },
    { id: 35, title: 'Yukselen Yildizlar', search: 'rising artists' },
    { id: 36, title: 'Alternatif Sahne', search: 'alternative indie' }
];

const sanaOzelDefinitions = [
    { id: 41, title: 'Sana Ozel Kesif', search: 'recommended' },
    { id: 42, title: 'Moduna Gore', search: 'mood happy' },
    { id: 43, title: 'Rahatlatici', search: 'relaxing calm' },
    { id: 44, title: 'Enerjik Baslangic', search: 'energetic workout' },
    { id: 45, title: 'Odaklanma Zamani', search: 'focus study' },
    { id: 46, title: 'Romantik Anlar', search: 'romantic love' }
];

// ================== CACHE SISTEMI ==================
const cache = { playlists: null, midcards: null, popular: null, yeniCikanlar: null, sanaOzel: null, lastFetch: {} };
const CACHE_DURATION = 10 * 60 * 1000;

async function buildMusicList(definitions, cacheKey) {
    const now = Date.now();
    if (cache[cacheKey] && cache.lastFetch[cacheKey] && (now - cache.lastFetch[cacheKey] < CACHE_DURATION)) {
        return cache[cacheKey];
    }
    const results = [];
    for (const def of definitions) {
        try {
            if (def.musicList) {
                // Local musicList varsa, direkt kullan
                results.push({ id: def.id, title: def.title, musicList: def.musicList });
            } else {
                // Yoksa Jamendo'dan çek
                const tracks = await jamendoRequest({ namesearch: def.search, limit: 6 });
                results.push({ id: def.id, title: def.title, musicList: formatJamendoTracks(tracks) });
            }
        } catch (err) {
            console.error(`${cacheKey} ${def.id} hata:`, err.message);
            results.push({ id: def.id, title: def.title, musicList: [] });
        }
    }
    cache[cacheKey] = results;
    cache.lastFetch[cacheKey] = now;
    return results;
}

// ================== API ENDPOINTS ==================
app.get('/api/playlists', async (req, res) => {
    try { res.json(await buildMusicList(playlistDefinitions, 'playlists')); }
    catch (err) { res.status(500).json({ error: 'Playlist yuklenemedi' }); }
});

app.get('/api/midcardmusic', async (req, res) => {
    try { res.json(await buildMusicList(midCardDefinitions, 'midcards')); }
    catch (err) { res.status(500).json({ error: 'Kartlar yuklenemedi' }); }
});

app.get('/api/popular', async (req, res) => {
    try { res.json(await buildMusicList(popularDefinitions, 'popular')); }
    catch (err) { res.status(500).json({ error: 'Populer liste yuklenemedi' }); }
});

app.get('/api/yeni-cikanlar', async (req, res) => {
    try { res.json(await buildMusicList(yeniCikanlarDefinitions, 'yeniCikanlar')); }
    catch (err) { res.status(500).json({ error: 'Yeni cikanlar yuklenemedi' }); }
});

app.get('/api/sana-ozel', async (req, res) => {
    try { res.json(await buildMusicList(sanaOzelDefinitions, 'sanaOzel')); }
    catch (err) { res.status(500).json({ error: 'Sana ozel yuklenemedi' }); }
});

app.get('/api/cache/clear', (req, res) => {
    cache.playlists = null; cache.midcards = null; cache.popular = null;
    cache.yeniCikanlar = null; cache.sanaOzel = null; cache.genres = {}; cache.lastFetch = {};
    res.json({ message: 'Cache temizlendi' });
});

// ================== GENRE (TUR) ENDPOINTS ==================
// Tum turleri getir
app.get('/api/genres', (req, res) => {
    res.json(MUSIC_GENRES);
});

// Belirli bir ture ait sarkilari getir
app.get('/api/genres/:genreId/tracks', async (req, res) => {
    const genreId = req.params.genreId;
    const limit = parseInt(req.query.limit) || 20;

    // Cache kontrolu
    if (!cache.genres) cache.genres = {};
    const now = Date.now();
    if (cache.genres[genreId] && cache.lastFetch[`genre_${genreId}`] &&
        (now - cache.lastFetch[`genre_${genreId}`] < CACHE_DURATION)) {
        return res.json(cache.genres[genreId]);
    }

    try {
        const tracks = await jamendoRequest({ tags: genreId, limit, order: 'popularity_total' });
        const formatted = tracks.map(t => ({
            id: t.id,
            name: t.name,
            artist_name: t.artist_name,
            duration: t.duration,
            audio: t.audio,
            audiodownload: t.audiodownload,
            album_image: t.album_image || t.image
        }));

        cache.genres[genreId] = formatted;
        cache.lastFetch[`genre_${genreId}`] = now;

        res.json(formatted);
    } catch (err) {
        console.error('Genre tracks error:', err.message);
        res.status(500).json({ error: 'Sarkilar yuklenemedi' });
    }
});

// ================== JAMENDO SEARCH & STREAM ==================
app.get('/api/jamendo/search', async (req, res) => {
    const q = req.query.q || '';
    const limit = parseInt(req.query.limit) || 10;
    if (!JAMENDO_CLIENT_ID || JAMENDO_CLIENT_ID === 'YOUR_CLIENT_ID') {
        return res.status(500).json({ error: 'JAMENDO_CLIENT_ID not set' });
    }
    try { res.json(await jamendoRequest({ namesearch: q, limit })); }
    catch (err) { res.status(500).json({ error: 'Jamendo API error' }); }
});

app.get('/api/jamendo/search-clean', async (req, res) => {
    const q = req.query.q || '';
    const limit = parseInt(req.query.limit) || 10;
    if (!JAMENDO_CLIENT_ID || JAMENDO_CLIENT_ID === 'YOUR_CLIENT_ID') {
        return res.status(500).json({ error: 'JAMENDO_CLIENT_ID not set' });
    }
    try {
        const results = await jamendoRequest({ namesearch: q, limit });
        res.json(results.map(t => ({
            id: t.id, name: t.name, artist_name: t.artist_name, duration: t.duration,
            audio: t.audio, audiodownload: t.audiodownload, album_image: t.album_image || t.image
        })));
    } catch (err) { res.status(500).json({ error: 'Jamendo API error' }); }
});

app.get('/api/jamendo/track/:id', async (req, res) => {
    try {
        const results = await jamendoRequest({ id: req.params.id });
        if (!results.length) return res.status(404).json({ error: 'Track not found' });
        res.json(results[0]);
    } catch (err) { res.status(500).json({ error: 'Jamendo API error' }); }
});

app.get('/api/jamendo/stream/:id', async (req, res) => {
    try {
        const results = await jamendoRequest({ id: req.params.id });
        if (!results.length) return res.status(404).json({ error: 'Track not found' });
        const audioUrl = results[0].audio || results[0].audiodownload;
        if (!audioUrl) return res.status(404).json({ error: 'No audio URL' });
        res.redirect(audioUrl);
    } catch (err) { res.status(500).json({ error: 'Jamendo API error' }); }
});

app.listen(port, () => {
    console.log(`Muzik API http://localhost:${port} adresinde calisiyor`);
    console.log(`Jamendo: ${JAMENDO_CLIENT_ID === 'YOUR_CLIENT_ID' ? 'AYARLANMADI!' : 'OK'}`);
});