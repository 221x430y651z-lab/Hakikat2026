(function() {
    // Katip Cevat'ın Defteri
    let katipDefteri = {
        zaman: "",
        sehir: "Tespit ediliyor...",
        aranan: "---",
        kitap: "---"
    };

    // 1. Konum Bilgisini Al (İzmir mi, başka yer mi?)
    fetch('https://ipapi.co')
        .then(res => res.json())
        .then(data => { 
            katipDefteri.sehir = (data.city || "Bilinmiyor") + " / " + (data.country_name || ""); 
            raporaYaz("SİTEYE GİRİŞ"); 
        });

    // 2. Excel'e Gönderen Ana Fonksiyon
    function raporaYaz(islem) {
        katipDefteri.zaman = new Date().toLocaleTimeString('tr-TR');
        
        // Senin Excel Satırın: Saat | Şehir | Aranan | Kitap | İşlem
        const raporMetni = `${katipDefteri.zaman} | ${katipDefteri.sehir} | Ara: ${katipDefteri.aranan} | Kitap: ${katipDefteri.kitap} | [${islem}]`;

        // Senin Google Form Adresin (Nokta atışı güncelledim)
        const formURL = "https://google.com";
        const entryID = "entry.1361057805"; // Senin Excel'deki sütun kimliği

        const veri = new FormData();
        veri.append(entryID, raporMetni);

        fetch(formURL, {
            method: "POST",
            mode: "no-cors",
            body: veri
        });
    }

    // 3. Kitap Tıklamalarını Yakala
    document.addEventListener('click', function(e) {
        let el = e.target.closest('.kitap-kart');
        if (el) {
            katipDefteri.kitap = el.innerText.trim();
            raporaYaz("KİTABA GİRDİ");
        }
    });

    // 4. Arama Yapılırsa Yakala
    document.addEventListener('change', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.type === 'text') {
            katipDefteri.aranan = e.target.value;
            raporaYaz("ARAMA YAPTI");
        }
    });
})();
