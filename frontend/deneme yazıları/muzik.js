
// Şarkıların bilgisini tutan bir liste (array) oluşturuyoruz.
// Her eleman bir "nesne (object)" ve içinde şarkıya ait bilgiler var.
let musicLib = [
    {
        id: 1, // şarkının kimliği (benzersiz numara gibi)
        title: 'Bulamaç gibi herşey', // şarkının adı
        musicList: [
            { id: 101, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 102, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 103, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 104, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 105, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
        ]

    },
    {
        id: 2,
        title: 'Sabaha kadar dinlediğim müziklerim',
        musicList: [
            { id: 106, title: " mjurderking", file: "murdr", avatar: "mujrdrking.jpg" },
            { id: 107, title: " mjurderking", file: "murdr", avatar: "mujrdrking.jpg" },
            { id: 108, title: " mjurderking", file: "murdr", avatar: "mujrdrking.jpg" },
            { id: 109, title: " mjurderking", file: "murdr", avatar: "mujrdrking.jpg" },
            { id: 110, title: " mjurderking", file: "murdr", avatar: "mujrdrking.jpg" },

        ]
    },
    {
        id: 3, // şarkının kimliği (benzersiz numara gibi)
        title: 'Pentagram konser zamanı!!', // şarkının adı
        musicList: [
            { id: 111, title: "orer", file: "oan", avatar: "musasxxa.jpg" },
            { id: 112, title: "orar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 113, title: "ear", file: "oan", avatar: "musasxxa.jpg" },
            { id: 114, title: "oar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 115, title: "rar", file: "oan", avatar: "musasxxa.jpg" },
        ]
    },
    {
        id: 4,
        title: 'Murder King sevdam',
        musicList: [
            { id: 116, title: "orenadddr", file: "oan", avatar: "musasxxa.jpg" },
            { id: 117, title: "oewwwrensar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 118, title: "orenadadar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 119, title: "orena233r", file: "oan", avatar: "musasxxa.jpg" },
            { id: 120, title: "orenae332r", file: "oan", avatar: "musasxxa.jpg" },
        ]
    }, {
        id: 5,
        title: 'Rastafarilya ve İdex Listesi',
        musicList: [
            { id: 121, title: "o22rena42111r", file: "oan", avatar: "musasxxa.jpg" },
            { id: 122, title: "en444ar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 123, title: "3321nar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 124, title: "o11a2211r", file: "oan", avatar: "musasxxa.jpg" },
            { id: 125, title: "221n23199r", file: "oan", avatar: "musasxxa.jpg" },
        ]
    }, {
        id: 6,
        title: 'Anadoluda Dinledıklerim',
        musicList: [
            { id: 126, title: "orenaadr", file: "oan", avatar: "musasxxa.jpg" },
            { id: 127, title: "oredasdasnar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 128, title: "odar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 129, title: "oadasr", file: "oan", avatar: "musasxxa.jpg" },
            { id: 130, title: "orendadsar", file: "oan", avatar: "musasxxa.jpg" },
        ]
    }, {
        id: 7,
        title: 'volkan konak klasıklerı',
        musicList: [
            { id: 131, title: "or!!r", file: "oan", avatar: "musasxxa.jpg" },
            { id: 132, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 133, title: "ore9u097870", file: "oan", avatar: "musasxxa.jpg" },
            { id: 134, title: "or?????r", file: "oan", avatar: "musasxxa.jpg" },
            { id: 135, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
        ]
    }, {
        id: 8,
        title: 'Evrim agacı ile bilime dair hersey',
        musicList: [
            { id: 136, title: "askam", file: "oan", avatar: "musasxxa.jpg" },
            { id: 137, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 138, title: "o65354nar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 139, title: "osadasdar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 140, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
        ]
    }, {
        id: 9,
        title: 'Tanrıveri\'nin dinledıklerı',
        musicList: [
            { id: 141, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 142, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 143, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 144, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
            { id: 145, title: "orenar", file: "oan", avatar: "musasxxa.jpg" },
        ]
    }
];
//icerdeki divi yakalıyoruz 
//Sonuç: JS değişkeni olarak sana o DOM elementini döndürür.
const musicListHTML = document.getElementById("musicListHTML");

// musıchtml icini temızlemek ıcın kualnırız 
//innerHTML ile ıstersek boslatıyoruz ıstersek bı sey ekslıtıp ekleyebılıyoruz htmnlını degıstırmeden yapabılıyoruz 
musicListHTML.innerHTML = "";

//her albumu tek tek ele alır foreach 
//value her alvum ıcın sunu yap gıbı calısır 
//album degısse bıle manuel degıstırmeye gerek kalmaz 
musicLib.forEach((value) => {
    //ablumun ıdsını eklıyosun
    //Backtick (`) ile Template Literal
    //Backtick ile yazınca, içine ${...} ile JS değişkeni veya kodu ekleyebilirsin.
    musicListHTML.innerHTML += `
    <div class="sol-card mb-3 playlist-item" data-playlist-id="${value.id}" style="max-width: 540px; cursor:pointer;">
        <div class="row g-0">
            <div class="col-md-10">
                <div class="card-body">
                    <!-- Şarkı başlığı -->
                    <p class="card-title">${value.title}</p>
                </div>
            </div>
        </div>
     </div>
     `;
});
function renderSongsForPlaylist(playlistId) {
    const midmid0 = document.querySelector(".midmid0")
    //midmid0 daki divler chilren olarak gosterılır 
    child =>
        Array.from(midmid0.children).forEach(child => {
            if (child.id !== "midContainer") {
                child.style.display = "none";
            }
        });

    let midContainer = document.getElementById("midContainer");
    if (!midContainer) {
        //bu isaret "!"eger midconterı ıcınde degılse yanlıs de varsa dogru de    
        midContainer = document.createElement("div");
        midContainer.id = "midContainer";
        midmid0.appendChild(midContainer);
    }
    midContainer.style.display = "flex";
    midContainer.style.flexDirection = 'column';
    midContainer.style.justifyContent = 'flex-start';
    midContainer.style.alignItems = 'center';
    midContainer.style.position = 'absolute';
    midContainer.style.top = '0';
    midContainer.style.left = '0';
    midContainer.style.width = '100%';
    midContainer.style.height = '89%';
    midContainer.style.background = '#fff';
    //önde mi arkada mı duracagını belırler 
    midContainer.style.zIndex = '999';
    midContainer.style.padding = '0px 0 32px 0';
    midContainer.style.borderRadius = '0';
    midContainer.style.boxShadow = 'none';
    midContainer.style.marginBottom = '0';
    // 4. Albüm sayfasının içeriğini temizliyoruz
    midContainer.innerHTML = '';

    // 5. Albüm bilgisini buluyoruz (hangi albüm açıldı?)
    //fin sırayla kontrol edıyoruz ilk eslesenı buluyor
    const album = musicLib.find(a => a.id == playlistId);
    if (!album) return;

    // 6. Albüm sayfasının sol üstüne "Geri Dön" butonu ekliyoruz
    midContainer.innerHTML += `<button id="albumBackBtn" style="position:absolute;top:24px;left:24px;background:#d63384;color:#fff;border:none;border-radius:8px;padding:6px 13px;font-size:1.5em;z-index:1000;"<i class="bi bi-arrow-left-short"></i></button>`;

    // 7. Albüm başlığını ekliyoruz
    //${...}` → template literal yani JS’de değişkeni string içine gömmek için kullanılır.
    midContainer.innerHTML += `<h2 style="color:#d63384; font-weight:700; margin-bottom:28px; margin-top:24px; font-size:2.2em;">${album.title}</h2>`;
    // 8. Albümdeki şarkıları listeliyoruz
    // sarkıları toplu olması ıcın songu degısken olarak 
    album.musicList.forEach(song => {
        midContainer.innerHTML += `
            <div style="display:flex;align-items:center;gap:24px;margin-bottom:18px;padding:16px 0;border-bottom:1px solid #eee;width:70%;max-width:600px;">
                <img src="resimler/${song.avatar}" style="width:64px;height:64px;border-radius:12px;object-fit:cover;">
                <div style="flex:1;">
                    <div style="font-weight:600;font-size:1.15em;">${song.title}</div>
                    <div style="font-size:1em;color:#888;">${song.file}</div>
                </div>
                <button style="background:#d63384;color:#fff;border:none;border-radius:35px;padding:9px 12px;font-size:1em;"><i class="bi bi-play-fill"></i></button>
            </div>
        `;
    });
    // 9. Geri Dön butonuna tıklanınca ana sayfa tekrar görünsün
    //fonksıyonu bellıu bır sure sonra calıstırır
    setTimeout(() => {
        const backBtn = document.getElementById('albumBackBtn');
        //sayfada buton var mı kontrol edıyoruz ıf kısımda 
        if (backBtn) {
            backBtn.onclick = function () {
                midContainer.style.display = 'none'; // Albüm sayfasını gizle
                //children yanlız basına kulandıgı ıcın array.fromla htmlcolleıdan arraye cevırıor
                //Dizideki her bir şeyi al ve bana söyle, ben de bir şey yapayım foreach
                //child degısken gıbı davranıyor
                Array.from(midmid0.children).forEach(child => {
                    //idsi midconteaıner olmayanları sec dıyor 
                    if (child.id !== 'midContainer') {
                        child.style.display = ''; // Ana sayfa içeriğini geri getir
                    }
                });
            };
        }
        //100 milisanıye sonra calısır 
    }, 100);
}
// Sol paneldeki albüm başlıklarına click event ekle
setTimeout(() => {
    // Sol paneldeki albüm başlıklarına tıklanınca albüm sayfası açılır
    //quenselectorall tum eslesen playlıst-ıtemlerı sec dıyolar
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', function () {
            const playlistId = this.getAttribute('data-playlist-id');
            renderSongsForPlaylist(playlistId); // Albüm açma fonksiyonu
        });
    });
}, 100);

//sol panel sarkılar fıltreleme ve gızleme 
const aramaKutusu2 = document.getElementById("search");

// Kullanıcı input'a yazdıkça çalışacak
aramaKutusu2.addEventListener("keyup", function () {
    // Kullanıcının yazdığı metni alıyoruz ve küçük harfe çeviriyoruz
    //value ınputu cagrıyo ıcaz ıcındekı metnı alabılmek ıcın
    let aranan = aramaKutusu2.value.toLowerCase();


    // Sadece sol paneldeki kartları seçiyoruz
    let sarkilar = Array.from(document.querySelectorAll(".sol-card"));

    // Her şarkıyı kontrol edip eşleşme derecesine göre puan veriyoruz

    let sonuc = sarkilar
        .map(function (sarki) {
            /*Döngüye Sokar: Bir dizinin tüm elemanlarını teker teker dolaşır.
Dönüştürür: Her eleman için senin tanımladığın fonksiyonu çalıştırır ve o fonksiyonun return ettiği değeri alır.
Yeni Dizi Verir: Tüm bu return edilen değerleri toplar ve yepyeni bir dizi olarak geri verir. Orijinal dizine asla dokunmaz.*/
            // Şarkının metin kısmını alıyoruz
            let metin = sarki.innerText.toLowerCase();

            // Varsayılan puan (eşleşme yoksa -1 yapalım)
            let puan = -1;

            // Eğer hiç eşleşme yoksa -1 kalır, yani hiç göstermeyeceğiz
            if (metin.includes(aranan)) {
                // Eğer arama boş değilse ve eşleşme varsa puan hesaplıyoruz
                // Başta eşleşirse daha yüksek puan verelim
                if (metin.startsWith(aranan)) {
                    puan = 2; // başta eşleşirse en yüksek puan
                } else {
                    puan = 1; // ortada/geçen bir yerde eşleşirse daha düşük puan
                }
            }

            // Hem şarkı elementini hem puanını döndür
            return { element: sarki, score: puan };
        })
        // Şarkıları puana göre sırala (yüksek puan öne)
        //Bir diziyi alır ve onu sıralanmış bir halde geri döndürür. Ancak varsayılan davranışı string'leri alfabetik olarak sıralamaktır.
        //  Sayıları doğru sıralamaz.
        .sort((a, b) => b.score - a.score);

    // Şimdi sayfada görüntülemeyi güncelleyelim
    sonuc.forEach(function (sarkiObj) {
        if (sarkiObj.score === -1) {
            // Hiç eşleşme yoksa gizle
            sarkiObj.element.style.display = "none";
        } else {
            // Eşleşme varsa göster
            sarkiObj.element.style.display = "flex";
            // Ve sıralamayı değiştirmek için bulunduğu ebeveyn elemana tekrar ekle
            // bir elemanın ebeveynine yeni bir şey ekle
            sarkiObj.element.parentNode.appendChild(sarkiObj.element);
        }
    });
});



let midcardmusicList = [
    {
        id: 11, // şarkının kimliği (benzersiz numara gibi)
        title: 'Bulamaç gibi herşey', // şarkının adı
        midmusicList: [
            { id: 201, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 202, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 203, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 204, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 205, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
        ]

    },
    {
        id: 12, // şarkının kimliği (benzersiz numara gibi)
        title: 'Bulamaç gibi herşey', // şarkının adı
        midmusicList: [
            { id: 206, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 207, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 208, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 209, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 210, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
        ]

    },
    {
        id: 13, // şarkının kimliği (benzersiz numara gibi)
        title: 'Bulamaç gibi herşey', // şarkının adı
        midmusicList: [
            { id: 211, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 212, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 213, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 214, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 215, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
        ]

    },
    {
        id: 14, // şarkının kimliği (benzersiz numara gibi)
        title: 'Bulamaç gibi herşey', // şarkının adı
        midmusicList: [
            { id: 221, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 222, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 223, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 224, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 225, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
        ]

    }, {
        id: 15, // şarkının kimliği (benzersiz numara gibi)
        title: 'Bulamaç gibi herşey', // şarkının adı
        midmusicList: [
            { id: 226, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 227, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 228, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 229, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 230, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
        ]

    },
    {
        id: 16, // şarkının kimliği (benzersiz numara gibi)
        title: 'Bulamaç gibi herşey', // şarkının adı
        midmusicList: [
            { id: 231, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 232, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 233, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 234, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
            { id: 235, title: "Ceza - Derin", file: "ceza-derin.mp3", avatar: "ceza-derin.jpg" },
        ]

    }

]
// Orta paneldeki albümleri listele
let midmusicList = document.getElementById("midmusicList");
midmusic.innerHTML = "";

midcardmusicList.forEach((midalbum) => {
    midmusic.innerHTML += `
        <div class="col-lg-2 col-md-4 mb-4">
            <div class="card h-100 orta-play-item" data-play-id="${midalbum.id}" style="cursor:pointer;">
                <img src="resimler/866-536x354.jpg" class="card-img-top" alt="...">
                <div class="card-body2">
                    <p class="card-title">${midalbum.title}</p>
                </div>
            </div>
        </div>
    `;
});
// Orta paneldeki kutulara tıklama olayı ekle
setTimeout(() => {
    document.querySelectorAll('.orta-play-item').forEach(item => {
        item.addEventListener('click', function () {
            const playId = this.getAttribute('data-play-id');
            renderSongsForMidPanel(playId);
        });
    });
}, 100);

// Orta panelde albüm açınca şarkı listesini gösteren fonksiyon
function renderSongsForMidPanel(playId) {
    const midmid0 = document.querySelector('.midmid0');
    Array.from(midmid0.children).forEach(child => {
        if (child.id !== 'midCont') {
            child.style.display = 'none';
        }
    });

    let midCont = document.getElementById("midCont");
    if (!midCont) {
        midCont = document.createElement("div");
        midCont.id = "midCont";
        midmid0.appendChild(midCont);
    }
    midCont.style.display = "flex";
    midCont.style.flexDirection = 'column';
    midCont.style.alignItems = 'center';
    midCont.style.position = 'absolute';
    midCont.style.top = '0';
    midCont.style.left = '0';
    midCont.style.width = '100%';
    midCont.style.height = '89%';
    midCont.style.background = '#fff';
    midCont.style.zIndex = '999';
    midCont.style.padding = '0px 0 32px 0';
    midCont.innerHTML = '';

    // Doğru albümü bul
    const midalbum = midcardmusicList.find(a => a.id == playId);
    if (!midalbum) return;

    midCont.innerHTML += `<button id="albumBackBtn" style="position:absolute;top:24px;left:24px;background:#d63384;color:#fff;border:none;border-radius:8px;padding:8px 20px;font-size:1.1em;z-index:1000;">&#8592; Geri Dön</button>`;
    midCont.innerHTML += `<h2 style="color:#d63384; font-weight:700; margin-bottom:28px; margin-top:24px; font-size:2.2em;">${midalbum.title}</h2>`;

    midalbum.midmusicList.forEach(song => {
        midCont.innerHTML += `
            <div style="display:flex;align-items:center;gap:24px;margin-bottom:18px;padding:16px 0;border-bottom:1px solid #eee;width:70%;max-width:600px;">
                <img src="resimler/${song.avatar}" style="width:64px;height:64px;border-radius:12px;object-fit:cover;">
                <div style="flex:1;">
                    <div style="font-weight:600;font-size:1.15em;">${song.title}</div>
                    <div style="font-size:1em;color:#888;">${song.file}</div>
                </div>
                <button style="background:#d63384;color:#fff;border:none;border-radius:8px;padding:8px 24px;font-size:1em;">Çal</button>
            </div>
        `;
    });

    setTimeout(() => {
        const backBtn = document.getElementById('albumBackBtn');
        if (backBtn) {
            backBtn.onclick = function () {
                midCont.style.display = 'none';
                Array.from(midmid0.children).forEach(child => {
                    if (child.id !== 'midCont') {
                        child.style.display = '';
                    }
                });
            };
        }
    }, 100);
}


/* let midmusic = document.getElementById("midmusic");

midmusic.innerHTML += "";

midcardmusicList.forEach((midalbum) => {
    midmusic.innerHTML += `
   <div class="col-lg-2 col-md-4 mb-4">
            <div class="card h-100 play-item" data-play-id="${midalbum.id}" style="cursor:pointer;">
                <img src="resimler/866-536x354.jpg" class="card-img-top" alt="...">
                <div class="card-body2">
                    <p class="card-title">${midalbum.title}</p>
                </div>
            </div>
        </div>
    `;
}); */
/* function renderSongsForPlay(playId) {
    const midmid0 = document.querySelector('.midmid0');
    Array.from(midmid0.children).forEach(child => {
        if (child.id !== 'midCont') {
            child.style.display = 'none'; // Sadece albüm sayfası görünsün
        }
    });

    let midCont = document.getElementById("midCont");
    if (!midCont) {
        midCont = document.createElement("div");
        midCont.id = "midCont";
        midmid0.appendChild(midCont);
    }
    midCont.style.display = "flex";
    midCont.style.flexDirection = 'column';
    midCont.style.justifyContent = 'flex-start';
    midCont.style.alignItems = 'center';
    midCont.style.position = 'absolute';
    midCont.style.top = '0';
    midCont.style.left = '0';
    midCont.style.width = '100%';
    midCont.style.height = '89%';
    midCont.style.background = '#fff';
    //önde mi arkada mı duracagını belırler 
    midCont.style.zIndex = '999';
    midCont.style.overflowY = 'auto';
    midCont.style.padding = '48px 0 32px 0';
    midCont.style.borderRadius = '0';
    midCont.style.boxShadow = 'none';
    midCont.style.marginBottom = '0';
    // 4. Albüm sayfasının içeriğini temizliyoruz
    midCont.innerHTML = '';


    const midalbum = midcardmusic1.find(a => a.id == playId);
    if (!midalbum) return;

    midCont.innerHTML += `<button id="albumBackBtn" style="position:absolute;top:24px;left:24px;background:#d63384;color:#fff;border:none;border-radius:8px;padding:8px 20px;font-size:1.1em;z-index:1000;">&#8592; Geri Dön</button>`;

    midCont.innerHTML += `<h2 style="color:#d63384; font-weight:700; margin-bottom:28px; margin-top:24px; font-size:2.2em;">${midalbum.title}</h2>`;

    midalbum.midcardmusic1.forEach(song => {
        midCont.innerHTML += `
            <div style="display:flex;align-items:center;gap:24px;margin-bottom:18px;padding:16px 0;border-bottom:1px solid #eee;width:70%;max-width:600px;">
                <img src="resimler/${song.avatar}" style="width:64px;height:64px;border-radius:12px;object-fit:cover;">
                <div style="flex:1;">
                    <div style="font-weight:600;font-size:1.15em;">${song.title}</div>
                    <div style="font-size:1em;color:#888;">${song.file}</div>
                </div>
                <button style="background:#d63384;color:#fff;border:none;border-radius:8px;padding:8px 24px;font-size:1em;">Çal</button>
            </div>
        `;
    });
    setTimeout(() => {
        const backBtn = document.getElementById('midalbumBackBtn');
        //sayfada buton var mı kontrol edıyoruz ıf kısımda 
        if (backBtn) {
            backBtn.onclick = function () {
                midCont.style.display = 'none'; // Albüm sayfasını gizle
                //children yanlız basına kulandıgı ıcın array.fromla htmlcolleıdan arraye cevırıor
                //child degısken gıbı davranıyor
                Array.from(midmid0.children).forEach(child => {
                    //idsi midconteaıner olmayanları sec dıyor 
                    if (child.id !== 'midCont') {
                        child.style.display = ''; // Ana sayfa içeriğini geri getir
                    }
                });
            };
        }
        //100 milisanıye sonra calısır 
    }, 100);
}
// Sol paneldeki albüm başlıklarına click event ekle
setTimeout(() => {
    // Sol paneldeki albüm başlıklarına tıklanınca albüm sayfası açılır
    //quenselectorall tum eslesen playlıst-ıtemlerı sec dıyolar
    document.querySelectorAll('.play-item').forEach(item => {
        item.addEventListener('click', function () {
            //clasın ıcıncekını cagırmak ıcın gettribute             
            const playId = this.getAttribute('data-play-id');
            renderSongsForPlaylist(playId); // Albüm açma fonksiyonu
        });
    });


}, 300); */
