/* --- TEMEL KONTROL FONKSİYONLARI --- */
function hepsiniAc() {
    const tumMenuler = document.querySelectorAll('details');
    tumMenuler.forEach(menu => menu.setAttribute('open', ''));
    // Hızlandırmak için bekleme süresini kısalttık
    setTimeout(barGuncelle, 100);
}

function hepsiniKapat() {
    const tumAciklar = document.querySelectorAll('details[open]');
    tumAciklar.forEach(menu => menu.removeAttribute('open'));
    // Smooth yerine direkt atlama yaparak kasmayı engelledik
    window.scrollTo(0, 0);
    setTimeout(barGuncelle, 100);
}

function arama() { 
    alert('CTRL+F tuşuna basın veya sağ üstteki üç noktadan "Sayfada Bul" seçeneğini kullanın.'); 
}

function yardimAc() {
    alert("Arama yapmak için CTRL+F tuşlarını veya tarayıcı menüsünü kullanın.");
}

/* --- IŞIK HIZINDA RADAR SİSTEMİ (6800 SAYFA DOSTU) --- */
function barGuncelle() {
    const sAlan = document.getElementById('bar-sayfa-metni');
    const zAlan = document.getElementById('baslik-zinciri');
    const dolum = document.getElementById('durum-cubugu-doluluk');
    
    if (!sAlan || !zAlan) return;

    // 1. Sayfa İlerleme Çubuğu (Daha stabil hesaplama)
    const toplamYukseklik = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const yuzde = (window.scrollY / (toplamYukseklik || 1)) * 100;
    if (dolum) dolum.style.width = yuzde + "%";

    // 2. RADAR: Binlerce sayfayı taramak yerine ekrandaki koordinata odaklanıyoruz
    const radarY = 75; 
    // Tam orta noktadaki elemanı yakala (En hızlı yöntem budur)
    const hedef = document.elementFromPoint(window.innerWidth / 2, radarY + 10);
    
    if (hedef) {
        // En yakın sayfa bilgisini bul (querySelectorAll döngüsüne girmeden)
        const sayfaEl = hedef.closest('.sayfa') || 
                        hedef.querySelector('.sayfa') || 
                        hedef.previousElementSibling?.closest('.sayfa');
        
        if (sayfaEl) sAlan.innerText = sayfaEl.innerText.trim();

        // 3. HİYERARŞİ (ZAMİR ZİNCİRİ)
        let d = hedef.closest('details'), zincir = [];
        while (d) {
            const baslik = d.querySelector('summary')?.innerText;
            if (baslik) zincir.unshift(baslik);
            d = d.parentElement.closest('details');
        }
        if (zincir.length > 1) zincir.shift();
        
        zAlan.innerHTML = zincir.map(b => `<span class="zincir-parca">${b}</span>`).join('');
    }
}

/* --- OLAY TETİKLEYİCİLERİ --- */

let kaydirmaZamanlayici;
window.addEventListener('scroll', () => {
    if (!kaydirmaZamanlayici) {
        kaydirmaZamanlayici = setTimeout(() => {
            barGuncelle();
            kaydirmaZamanlayici = null;
        }, 100); // 100ms; hem akıcı hem de işlemciyi yormayan hız
    }
}, { passive: true });

// Sayfa yüklendiğinde ve tıklandığında hızlıca güncelle
window.addEventListener('load', barGuncelle);
document.addEventListener('click', () => setTimeout(barGuncelle, 100));
