// Paneli göster/gizle
function toggleControlBox() {
    const panel = document.getElementById('controlBox');
    if (panel) {
        panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    }
}

// Tüm details etiketlerini açan veya kapatan fonksiyon (HIZLANDIRILMIŞ)
function controlDetails(isOpen) {
    const allDetails = document.querySelectorAll('details');
    
    // Kapatırken (isOpen false ise) hiç bekleme, direkt kapat
    if (!isOpen) {
        allDetails.forEach(detail => {
            detail.open = false;
        });
        return; // İşlemi bitir
    }

    // Açarken ise telefonu dondurmamak için çok hızlı (100'er 100'er) aç
    let i = 0;
    function hizliAc() {
        let son = Math.min(i + 100, allDetails.length);
        for (; i < son; i++) {
            allDetails[i].open = true;
        }
        if (i < allDetails.length) {
            requestAnimationFrame(hizliAc);
        }
    }
    hizliAc();
}
