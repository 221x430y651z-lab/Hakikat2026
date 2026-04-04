/* Tüm Kitapları/Başlıkları Açar */
function hepsiniAc() {
    // Sayfadaki tüm <details> etiketlerini bulur
    const tumMenuler = document.querySelectorAll('details');
    
    // Hepsine "open" niteliğini ekleyerek açar
    tumMenuler.forEach(menu => {
        menu.setAttribute('open', '');
    });
}

/* Tüm Kitapları/Başlıkları Kapatır */
function hepsiniKapat() {
    // Sadece şu an açık olanları bulur
    const tumAciklar = document.querySelectorAll('details[open]');
    
    // Hepsinden "open" niteliğini kaldırarak kapatır
    tumAciklar.forEach(menu => {
        menu.removeAttribute('open');
    });

    // Sayfayı en üste yumuşakça kaydırır
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function yardimAc() {
    alert("︾ butonu tüm başlıkları açar, ︽ butonu ise hepsini kapatıp sizi en üste taşır.");
}
