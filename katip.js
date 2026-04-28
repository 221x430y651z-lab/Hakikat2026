(function() {
    // Senin formun ve kutucuğun (Nokta atışı)
    const formURL = "https://google.com";
    const entryID = "entry.1361057805"; 

    // Saati alalım
    const suAnkiSaat = new Date().toLocaleTimeString('tr-TR');
    const raporMetni = "Ziyaretçi Geldi - Saat: " + suAnkiSaat;

    // Veriyi hazırla
    const veri = new FormData();
    veri.append(entryID, raporMetni);

    // Tabloya (Forma) fırlat
    fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: veri
    });
})();
