const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const toggleLoopBtn = document.getElementById("toggleLoopBtn");
const addTextBtn = document.getElementById("addTextBtn");
const speedRange = document.getElementById("speedRange");
const wordCount = document.getElementById("wordCount");

let textArray = ["Bir", "sabah", "erkenden", "uyanıp", "dışarı", "çıktım,", "güneş", "henüz", "doğmamıştı", "ama", "hava", "serindi.", "Kuşlar", "sabahın", "erken", "saatlerinde", "cıvıldayarak", "yeni", "güne", "başlamıştı.", "Sokaklar", "sessizdi", "ve", "yalnızca", "rüzgarın", "sesi", "duyuluyordu.", "Şehirdeki", "kalabalık", "henüz", "uyandığından,", "sokaklarda", "yalnızdım.", "Yavaşça", "yürümeye", "başladım,", "aklımda", "pek", "çok", "düşünce", "vardı", "ama", "bir", "yandan", "da", "sessizlik", "ve", "sakinlik", "beni", "rahatlatıyordu.", "Her", "adımda", "etrafımdaki", "manzara", "bir", "başka", "güzellik", "sunuyordu,", "doğanın", "taptaze", "havasını", "derin", "derin", "içime", "çekiyordum.", "Yavaşça", "ilerlerken,", "birden", "karşıma", "çıkan", "çiçekler", "ve", "ağaçlar,", "doğanın", "her", "anında", "farklı", "bir", "renk", "ve", "enerjiyle", "hayat", "bulduğunu", "hatırlatıyordu.", "Günün", "bu", "erken", "saatlerinde,", "sadece", "doğanın", "sesine", "odaklanarak", "her", "şeyin", "ne", "kadar", "huzurlu", "olduğunu", "düşündüm."];
let index = 0;
let interval = null;
let isLoopActive = false;
let isExerciseRunning = false;

// Başlangıçta varsayılan metinle başla
display.textContent = textArray[index];

// Egzersizi başlat/durdur
startStopBtn.addEventListener("click", () => {
    if (isExerciseRunning) {
        clearInterval(interval);
        interval = null;
        startStopBtn.innerHTML = '<i class="fas fa-play"></i>Başlat';
        isExerciseRunning = false;
    } else {
        if (textArray.length === 0) {
            alert("Lütfen önce bir metin ekleyin.");
            return;
        }

        // Eğer döngü kapalıysa ve kelimeler bitmişse, başa dön
        if (!isLoopActive && index >= textArray.length) {
            index = 0;  // Başlangıca dön
            display.textContent = textArray[index];  // Hemen yeni kelimeyi göster
        }

        startReading();
        startStopBtn.innerHTML = '<i class="fas fa-pause"></i>Durdur';
        isExerciseRunning = true;
    }
});

// Döngüyü aç/kapat
toggleLoopBtn.addEventListener("click", () => {
    isLoopActive = !isLoopActive;
    toggleLoopBtn.innerHTML = `<i class="fas fa-repeat"></i> ${isLoopActive ?"Açık" : "Kapalı"}`;
});

// Metin ekleme
addTextBtn.addEventListener("click", () => {
    const userText = prompt("Metninizi girin:");
    if (userText) {
        textArray = userText.split(" "); // Yeni metni al ve mevcut metni sıfırla
        index = 0; // Döngüyü baştan başlat
        display.textContent = textArray[index];
        if (isExerciseRunning) {
            clearInterval(interval);
            startReading();
        }
    }
});

// Hız ayarı (kelime sayısına göre)
speedRange.addEventListener("input", () => {
    if (isExerciseRunning) {
        clearInterval(interval);
        startReading();
    }
    
    // Hız (kelime sayısı) değeri
    const wordsPerMinute = speedRange.value;
    
    // Dakikada kaç kelime okunuyor hesapla
    document.getElementById("wordCount").textContent = `Dakikada ${wordsPerMinute} kelime okuyorsunuz.`;
});

// Döngüyü başlat
function startReading() {
    const wordsPerMinute = speedRange.value;
    const speed = 60000 / wordsPerMinute;  // 60000 ms = 1 dakika

    clearInterval(interval);
    interval = setInterval(() => {
        // Eğer kelime sayısı bitti ve döngü açıksa başa dön
        if (index < textArray.length) {
            display.textContent = textArray[index];
            index++;
        } else if (isLoopActive) {
            index = 0; // Döngü açıkken başa dön
            display.textContent = textArray[index];  // Hemen yeni kelimeyi göster
            index++;
        } else {
            clearInterval(interval); // Döngü kapalıysa dur
            startStopBtn.innerHTML = '<i class="fas fa-play"></i>Başlat';
            isExerciseRunning = false;
        }
    }, speed);  // Kelime başına geçen süre
}

const resetBtn = document.getElementById("resetBtn");

// Sıfırlama butonuna tıklandığında
resetBtn.addEventListener("click", () => {
    // Başlangıç değerlerine sıfırlama
    index = 0;
    display.textContent = textArray[index];
    if (isExerciseRunning) {
        clearInterval(interval);
        startStopBtn.innerHTML = '<i class="fas fa-play"></i>Başlat';
        isExerciseRunning = false;
    }
});
