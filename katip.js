(function() {
    // 1. KATİP CEVAT'IN DEFTERİ (Bilgiler burada toplanıyor)
    let katipDefteri = {
        zaman: "",
        sehir: "Tespit ediliyor...",
        aranan: "---",
        kitap: "---"
    };

    // 2. TABLOYA YAZDIRAN ANA FONKSİYON (Mermi gibi çalışır)
    function raporaYaz(islem) {
        katipDefteri.zaman = new Date().toLocaleString('tr-TR');
        
        // Tabloya gidecek satırın formatı
        const raporMetni = `${katipDefteri.zaman} | ${katipDefteri.sehir} | [${islem}] | Ara: ${katipDefteri.aranan} | Kitap: ${katipDefteri.kitap}`;

        // Senin Google Form Bilgilerin
        const formURL = "https://google.com";
        const entryID = "entry.1361057805"; 

        const veri = new FormData();
        veri.append(entryID, raporMetni);

        // Veriyi gizlice senin "Külliyat Günlüğü" tablosuna gönderir
        fetch(formURL, {
            method: "POST",
            mode: "no-cors",
            body: veri
        });
    }

    // 3. SİTEYE GİRİŞTE ÇALIŞAN KISIM
    fetch('https://ipapi.co')
        .then(res => res.json())
        .then(data => { 
            katipDefteri.sehir = (data.city || "Bilinmiyor") + " / " + (data.country_name || ""); 
            raporaYaz("ZİYARETÇİ GELDİ"); 
        })
        .catch(() => {
            katipDefteri.sehir = "Konum Alınamadı";
            raporaYaz("ZİYARETÇİ GELDİ");
        });

    // 4. TIKLAMALARI VE ARAMALARI TAKİP ET
    document.addEventListener('click', function(e) {
        let el = e.target.closest('.kitap-kart') || e.target.closest('a');
        if (el && el.innerText.trim().length > 0) {
            katipDefteri.kitap = el.innerText.trim().substring(0, 50);
            raporaYaz("KİTABA BAKTI");
        }
    });

    document.addEventListener('change', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.type === 'text') {
            katipDefteri.aranan = e.target.value;
            raporaYaz("ARAMA YAPTI");
        }
    });
})();
