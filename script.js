const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const startHint = document.getElementById("startHint");

function updateMusicButton() {
  const playing = bgMusic && !bgMusic.paused;
  if (musicButton) {
    musicButton.textContent = playing ? "❚❚ MUSIC" : "♫ MUSIC";
    musicButton.classList.toggle("playing", playing);
  }
  if (playing && startHint) startHint.classList.add("hide");
}

async function playMusic() {
  if (!bgMusic) return;
  try {
    await bgMusic.play();
    updateMusicButton();
  } catch (error) {
    updateMusicButton();
  }
}

function toggleMusic(event) {
  event.stopPropagation();
  if (!bgMusic) return;
  if (bgMusic.paused) playMusic();
  else {
    bgMusic.pause();
    updateMusicButton();
  }
}

musicButton?.addEventListener("click", toggleMusic);
bgMusic?.addEventListener("play", updateMusicButton);
bgMusic?.addEventListener("pause", updateMusicButton);

window.addEventListener("load", playMusic);

// Jika autoplay diblokir browser HP, musik otomatis mencoba mulai
// pada sentuhan pertama di halaman.
document.addEventListener("pointerdown", (event) => {
  if (event.target.closest("#musicButton")) return;
  if (bgMusic?.paused) playMusic();
}, { once:true, passive:true });

updateMusicButton();
