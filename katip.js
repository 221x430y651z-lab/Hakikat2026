(function() {
    let katipDefteri = {
        zaman: "",
        sehir: "Tespit ediliyor...",
        aranan: "---",
        kitap: "---"
    };

    // 1. Konum Bilgisini Al (Hata payına karşı kontrol eklendi)
    fetch('https://ipapi.co')
        .then(res => res.json())
        .then(data => { 
            katipDefteri.sehir = (data.city || "Bilinmiyor") + " / " + (data.country_name || ""); 
            raporaYaz("SİTEYE GİRİŞ"); 
        }).catch(() => {
            katipDefteri.sehir = "Konum Alınamadı";
            raporaYaz("SİTEYE GİRİŞ (Konumsuz)");
        });

    // 2. Google Tabloya Gönderen Garanti Fonksiyon
    function raporaYaz(islem) {
        katipDefteri.zaman = new Date().toLocaleString('tr-TR');
        const raporMetni = `${katipDefteri.zaman} | ${katipDefteri.sehir} | Ara: ${katipDefteri.aranan} | Kitap: ${katipDefteri.kitap} | [${islem}]`;

        const formURL = "https://google.com";
        const entryID = "entry.1361057805"; 

        // En sağlam veri gönderme formatı budur
        const params = new URLSearchParams();
        params.append(entryID, raporMetni);

        fetch(formURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params.toString()
        }).then(() => {
            console.log("✔ Tabloya gönderildi: " + islem);
        }).catch(err => {
            console.error("❌ Hata oluştu:", err);
        });
    }

    // 3. Kitap Tıklama ve Arama Yakalayıcılar
    document.addEventListener('click', function(e) {
        let el = e.target.closest('.kitap-kart') || e.target.closest('a'); 
        if (el && el.innerText.trim().length > 0) {
            katipDefteri.kitap = el.innerText.trim().substring(0, 50);
            raporaYaz("KİTABA GİRDİ");
        }
    });

    document.addEventListener('change', function(e) {
        if (e.target.tagName === 'INPUT') {
            katipDefteri.aranan = e.target.value;
            raporaYaz("ARAMA YAPTI");
        }
    });
})();
