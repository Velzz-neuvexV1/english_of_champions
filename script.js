const narrationText = "Selamat datang para pejuang di arena English of Champions! Ini adalah platform web game interaktif, tempat kecerdasan, kecepatan, dan strategi kalian diuji secara nyata. Bersiaplah untuk berebut membuka Vault, menakhlukkan tantangan Bahasa Inggris, dan mengumpulkan poin sebanyak-banyaknya! Siapkan tim kalian, masuk ke arena, dan buktikan siapa sang juara sejati!";

// SOAL DENGAN JAWABAN ISIAN TEKS
const vaultQuestions = [
  // EASY LEVEL (100 PTS)
  { id: 1, pts: 100, text: "Bahasa Inggris dari 'segelas teh manis/es teh' adalah a ... of iced tea.", ans: "GLASS" },
  { id: 2, pts: 100, text: "Bahasa Inggris dari 'sebotol air' adalah a ... of water.", ans: "BOTTLE" },
  { id: 3, pts: 100, text: "Bahasa Inggris dari 'secangkir kopi' adalah a ... of coffee.", ans: "CUP" },
  { id: 4, pts: 100, text: "Bahasa Inggris dari 'sepotong pizza' adalah a ... of pizza.", ans: "SLICE" },
  { id: 5, pts: 100, text: "Bahasa Inggris dari 'sekarung gula' adalah a ... of sugar.", ans: "SACK" },
  { id: 6, pts: 100, text: "Bahasa Inggris dari 'seikat bayam' adalah a ... of spinach.", ans: "BUNCH" },
  { id: 7, pts: 100, text: "Bahasa Inggris dari 'semangkuk sup' adalah a ... of soup.", ans: "BOWL" },
  { id: 8, pts: 100, text: "Bahasa Inggris dari 'sebatang cokelat' adalah a ... of chocolate.", ans: "BAR" },
  { id: 9, pts: 100, text: "Bahasa Inggris dari 'sesendok gula' adalah a ... of sugar.", ans: "SPOON" },
  { id: 10, pts: 100, text: "Bahasa Inggris dari 'sebungkus jagung' adalah a ... of corn.", ans: "BAG" },

  // MEDIUM LEVEL (200 PTS)
  { id: 11, pts: 200, text: "Kata penakar khusus untuk satu siung bawang putih adalah a ... of garlic.", ans: "CLOVE" },
  { id: 12, pts: 200, text: "Kata penakar khusus untuk sebatang seledri adalah a ... of celery.", ans: "STALK" },
  { id: 13, pts: 200, text: "Kata penakar khusus untuk sebongkol kubis/kubis bulat adalah a ... of cabbage.", ans: "HEAD" },
  { id: 14, pts: 200, text: "Isilah titik-titik berikut: A ... of bread (Sebuah/sepotong roti tawar utuh).", ans: "LOAF" },
  { id: 15, pts: 200, text: "Isilah titik-titik berikut: A ... of milk (Susu dalam kemasan kotak/karton).", ans: "CARTON" },
  { id: 16, pts: 200, text: "Isilah titik-titik berikut: A ... of soft drink (Minuman dalam kemasan kaleng).", ans: "CAN" },
  { id: 17, pts: 200, text: "Benda seperti milk, water, dan bread termasuk dalam kelompok benda ... nouns.", ans: "UNCOUNTABLE" },
  { id: 18, pts: 200, text: "Benda seperti tomato, onion, dan chili termasuk dalam kelompok benda ... nouns.", ans: "COUNTABLE" },
  { id: 19, pts: 200, text: "Berdasarkan bacaan, makanan bergizi membantu kita tumbuh sehat dan tetap kuat (stay ...).", ans: "STRONG" },
  { id: 20, pts: 200, text: "Isilah kata satuan jamak yang tepat: I have four ... of cucumber (4 iris mentimun).", ans: "SLICES" },

  // HARD LEVEL (300 PTS)
  { id: 21, pts: 300, text: "Berdasarkan percakapan Rina & Liza, berapa piring nasi goreng di atas meja?", ans: "THREE" },
  { id: 22, pts: 300, text: "Berdasarkan dialog, Liza sedang menyiapkan makanan untuk waktu makan siang (bahasa Inggris).", ans: "LUNCH" },
  { id: 23, pts: 300, text: "Irisan tomat dan mentimun digunakan sebagai pelengkap di atas nasi goreng yang disebut ...", ans: "TOPPING" },
  { id: 24, pts: 300, text: "Lengkapi kalimat dialog Rina: Vegetables are good for our ...", ans: "BODIES" },
  { id: 25, pts: 300, text: "Lengkapi kalimat dari gambar: She cooked three ... (3 kentang).", ans: "POTATOES" },
  { id: 26, pts: 300, text: "Lengkapi kalimat dari gambar: My mother added five ... (5 siung bawang putih).", ans: "GARLICS" },
  { id: 27, pts: 300, text: "Lengkapi kalimat dari gambar: We bought some fresh ... (beberapa tahu segar).", ans: "TOFU" },
  { id: 28, pts: 300, text: "Bentuk jamak (plural) kata benda dari 'tomato' jika ada dua adalah two ...", ans: "TOMATOES" },
  { id: 29, pts: 300, text: "Lengkapi kalimat: He eats a ... of noodles for lunch (sepiring mi).", ans: "PLATE" },
  { id: 30, pts: 300, text: "Lengkapi kalimat: I drink a ... of milk every day (segelas susu).", ans: "GLASS" }
];

let registeredTeams = [];
let currentVaultIndex = null;
let timerInterval = null;
let timeLeft = 30;
let gameTimeLeft = 1200;
let mainGameInterval = null;
let typeIdx = 0;

// FUNGSI AKTIFKAN FULLSCREEN
function requestFullscreenMode() {
  let elem = document.documentElement;
  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
}

function playAudioFile(elementId) {
  const audio = document.getElementById(elementId);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Autoplay dicegat browser:", err));
  }
}

function stopAudioFile(elementId) {
  const audio = document.getElementById(elementId);
  if (audio) { audio.pause(); audio.currentTime = 0; }
}

function initGameWithAudio() {
  requestFullscreenMode();
  document.getElementById('start-overlay').classList.add('hidden');
  document.getElementById('narration-screen').classList.remove('hidden');
  const bgm = document.getElementById('sfx-bgm');
  if (bgm) {
    bgm.volume = 0.3; 
    bgm.play().catch(err => console.log(err));
  }
  startTypingEffect();
}

function startTypingEffect() {
  const textElem = document.getElementById('typing-text');
  const btnNext = document.getElementById('btn-narration-next');
  playAudioFile('sfx-narasi');

  function typeChar() {
    if (typeIdx < narrationText.length) {
      textElem.textContent += narrationText.charAt(typeIdx);
      typeIdx++;
      setTimeout(typeChar, 40);
    } else {
      btnNext.classList.remove('hidden');
    }
  }
  typeChar();
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('user-answer-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });
});

function goToRegistration() {
  stopAudioFile('sfx-narasi');
  document.getElementById('narration-screen').classList.add('hidden');
  document.getElementById('entry-screen').classList.remove('hidden');
}

function addTeamInput() {
  const list = document.getElementById('team-inputs-list');
  const count = list.children.length + 1;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'team-name-input';
  input.value = `Tim ${count}`;
  list.appendChild(input);
}

function startSetupWithCountdown() {
  const inputs = document.querySelectorAll('.team-name-input');
  registeredTeams = [];
  inputs.forEach((inp, idx) => {
    const val = inp.value.trim();
    if (val !== "") {
      registeredTeams.push({ id: idx, name: val, score: 0 });
    }
  });

  if (registeredTeams.length === 0) {
    alert("Minimal masukkan 1 tim!");
    return;
  }

  document.getElementById('entry-screen').classList.add('hidden');
  const cdScreen = document.getElementById('countdown-screen');
  const cdNum = document.getElementById('cd-num');
  
  cdScreen.classList.remove('hidden');
  playAudioFile('sfx-countdown');

  let count = 3;

  const cdInterval = setInterval(() => {
    count--;
    if (count > 0) {
      cdNum.textContent = count;
    } else if (count === 0) {
      cdNum.textContent = "GAME DIMULAI!";
    } else {
      clearInterval(cdInterval);
      cdScreen.classList.add('hidden');
      document.getElementById('arena-screen').classList.remove('hidden');

      renderLeaderboard();
      renderVaultGrid();
      populateTeamSelect();
      start10MinGameTimer();
    }
  }, 1000);
}

function start10MinGameTimer() {
  const timerDisplay = document.getElementById('game-timer');
  
  mainGameInterval = setInterval(() => {
    gameTimeLeft--;
    let minutes = Math.floor(gameTimeLeft / 60);
    let seconds = gameTimeLeft % 60;
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    timerDisplay.textContent = `${minutes} : ${seconds}`;

    if (gameTimeLeft <= 0) {
      clearInterval(mainGameInterval);
      showBubble("WAKTU PERTANDINGAN HABIS! 🏁", "wrong");
      alert("Waktu Pertandingan 10 Menit Telah Selesai!");
    }
  }, 1000);
}

function renderLeaderboard() {
  const board = document.getElementById('scores-board');
  board.innerHTML = '';
  
  const sorted = [...registeredTeams].sort((a, b) => b.score - a.score);

  sorted.forEach((t, index) => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <div class="team-info">
        <div class="rank-label">RANK ${index + 1}</div>
        <div class="team-name">${t.name}</div>
      </div>
      <div class="team-pts-box">
        <div class="team-tag">TEAM</div>
        <div class="pts-value">${t.score} <span>PTS</span></div>
      </div>
    `;
    board.appendChild(card);
  });
}

function renderVaultGrid() {
  const grid = document.getElementById('vault-grid');
  grid.innerHTML = '';

  vaultQuestions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = `vault-card ${q.locked ? 'locked' : ''}`;
    
    const vaultNum = q.id < 10 ? '0' + q.id : q.id;

    if (q.locked) {
      card.innerHTML = `
        <div class="vault-header">
          <div class="vault-name">VAULT #${vaultNum}</div>
          <div class="vault-badge-pts">${q.pts} PTS</div>
        </div>
        <div class="vault-action-text">✓ ${q.claimedBy}</div>
      `;
    } else {
      card.innerHTML = `
        <div class="vault-header">
          <div class="vault-name">VAULT #${vaultNum}</div>
          <div class="vault-badge-pts">${q.pts} PTS</div>
        </div>
        <div class="vault-action-text">Buka Kuis</div>
      `;
      card.onclick = () => openQuizModal(idx);
    }

    grid.appendChild(card);
  });
}

function populateTeamSelect() {
  const select = document.getElementById('answering-team-select');
  select.innerHTML = '';
  registeredTeams.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.name;
    select.appendChild(opt);
  });
}

function openQuizModal(index) {
  currentVaultIndex = index;
  const q = vaultQuestions[index];
  const vaultNum = q.id < 10 ? '0' + q.id : q.id;

  document.getElementById('modal-vault-title').textContent = `VAULT #${vaultNum} (${q.pts} PTS)`;
  document.getElementById('q-text').textContent = q.text;
  
  const inputField = document.getElementById('user-answer-input');
  inputField.value = '';

  document.getElementById('quiz-modal').classList.remove('hidden');
  setTimeout(() => inputField.focus(), 100);

  clearInterval(timerInterval);
  timeLeft = 30;
  document.getElementById('timer-sec').textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer-sec').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showBubble("WAKTU HABIS! ⏱️", "wrong");
      playAudioFile('sfx-salah');
      closeModal('quiz-modal');
    }
  }, 1000);
}

function closeModal(modalId) {
  if (modalId === 'quiz-modal') clearInterval(timerInterval);
  document.getElementById(modalId).classList.add('hidden');
}

function openPrivacyModal() {
  document.getElementById('privacy-modal').classList.remove('hidden');
}

function openAboutModal() {
  document.getElementById('about-modal').classList.remove('hidden');
}

function confirmExitGame() {
  if (confirm("Apakah Anda yakin ingin keluar dari pertandingan? Sesi saat ini akan diulang.")) {
    location.reload();
  }
}

function submitAnswer() {
  clearInterval(timerInterval);
  const q = vaultQuestions[currentVaultIndex];
  const selectedTeamId = parseInt(document.getElementById('answering-team-select').value);
  const team = registeredTeams.find(t => t.id === selectedTeamId);
  
  const userAns = document.getElementById('user-answer-input').value.trim().toUpperCase();
  const correctAns = q.ans.trim().toUpperCase();

  if (userAns !== "" && userAns === correctAns) {
    playAudioFile('sfx-benar');
    showBubble(`BENAR! +${q.pts} PTS UNTUK ${team.name} 🎯`, "correct");
    
    team.score += q.pts;
    q.locked = true;
    q.claimedBy = team.name;

    renderLeaderboard();
    renderVaultGrid();
    closeModal('quiz-modal');
  } else {
    playAudioFile('sfx-salah');
    showBubble(`SALAH!`, "wrong");
    closeModal('quiz-modal');
  }
}

function showBubble(text, type) {
  const bubble = document.getElementById('bubble-notif');
  bubble.textContent = text;
  bubble.className = `bubble-popup bubble-${type} show`;

  setTimeout(() => {
    bubble.classList.remove('show');
  }, 1800);
}