const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const toggleLoopBtn = document.getElementById("toggleLoopBtn");
const addTextBtn = document.getElementById("addTextBtn");
const speedRange = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");

let textArray = [
    "Bir", "sabah", "erkenden", "uyanıp", "dışarı", "çıktım,", "güneş", "henüz", 
    "doğmamıştı", "ama", "hava", "serindi.", "Birkaç", "ağaç", "yavaşça", "sallanıyordu", 
    "rüzgarla.", "Caddede", "kimse", "yoktu.", "Sadece", "uzaktan", "birkaç", "köpek", 
    "havlıyordu.", "Yavaşça", "yürürken", "yerde", "gümüş", "renginde", "biri", "yaprak", 
    "gördüm.", "Gökyüzü", "mavi", "bir", "tondaydı,", "bulutlar", "yavaşça", "süzüldü", 
    "yukarıda.", "Birkaç", "dakika", "sonra", "sesler", "gelmeye", "başladı,", "ilk", 
    "araba", "geçti,", "ardından", "yavaşça", "adımlar", "atılmaya", "başladı.", 
    "Gün", "yavaşça", "açılıyordu,", "ama", "her", "şey", "hala", "sakin", "ve", 
    "sessizdi.", "Bütün", "şehir", "sanki", "uykuda", "gibiydi."
  ];
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

        if (!isLoopActive && index >= textArray.length) {
            index = 0;
            display.textContent = textArray[index];
        }

        startReading();
        startStopBtn.innerHTML = '<i class="fas fa-pause"></i>Durdur';
        isExerciseRunning = true;
    }
});

// Döngüyü aç/kapat
toggleLoopBtn.addEventListener("click", () => {
    isLoopActive = !isLoopActive;
    toggleLoopBtn.innerHTML = `<i class="fas fa-repeat"></i> ${isLoopActive ? "Açık" : "Kapalı"}`;
});

// Metin ekleme
addTextBtn.addEventListener("click", () => {
    const userText = prompt("Metninizi girin:");
    if (userText) {
        textArray = userText.split(" ");
        index = 0;
        display.textContent = textArray[index];
        if (isExerciseRunning) {
            clearInterval(interval);
            startReading();
        }
    }
});

// Hız ayarı
speedRange.addEventListener("input", () => {
    if (isExerciseRunning) {
        clearInterval(interval);
        startReading();
    }

    const wordsPerMinute = speedRange.value;
    speedValue.textContent = `${wordsPerMinute} k/dk`;  // Hızı k/dk formatında güncelle
});

function startReading() {
    const wordsPerMinute = speedRange.value;
    const speed = 60000 / wordsPerMinute;

    clearInterval(interval);
    interval = setInterval(() => {
        if (index < textArray.length) {
            display.textContent = textArray[index];
            index++;
        } else if (isLoopActive) {
            index = 0;
            display.textContent = textArray[index];
            index++;
        } else {
            clearInterval(interval);
            startStopBtn.innerHTML = '<i class="fas fa-play"></i>Başlat';
            isExerciseRunning = false;
        }
    }, speed);
}

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    index = 0;
    display.textContent = textArray[index];
    if (isExerciseRunning) {
        clearInterval(interval);
        startStopBtn.innerHTML = '<i class="fas fa-play"></i>Başlat';
        isExerciseRunning = false;
    }
});
