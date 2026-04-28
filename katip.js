(function() {
    // Katip Cevat'ın Defteri
    let katipDefteri = {
        zaman: "",
        sehir: "Tespit ediliyor...",
        aranan: "---",
        kitap: "---"
    };

    // 1. Konum Bilgisini Al
    fetch('https://ipapi.co')
        .then(res => res.json())
        .then(data => { 
            katipDefteri.sehir = (data.city || "Bilinmiyor") + " / " + (data.country_name || ""); 
            raporaYaz("SİTEYE GİRİŞ"); 
        });

    // 2. Excel'e (Forma) Gönderen Fonksiyon
    function raporaYaz(islem) {
        katipDefteri.zaman = new Date().toLocaleString('tr-TR');
        
        const raporMetni = `${katipDefteri.zaman} | ${katipDefteri.sehir} | Ara: ${katipDefteri.aranan} | Kitap: ${katipDefteri.kitap} | [${islem}]`;

        // Nokta atışı güncellenmiş URL ve ID
        const formURL = "https://google.com";
        const entryID = "entry.1361057805"; 

        const veri = new URLSearchParams();
        veri.append(entryID, raporMetni);

        fetch(formURL, {
            method: "POST",
            mode: "no-cors",
            body: veri
        }).then(() => {
            console.log("Rapor gönderildi: " + islem);
        });
    }

    // 3. Kitap Tıklamalarını Yakala
    document.addEventListener('click', function(e) {
        let el = e.target.closest('.kitap-kart'); // Kitap kutularının sınıfı bu değilse burayı düzeltiriz
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
