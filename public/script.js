const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const imgEl = document.getElementById("catImg");

async function loadCat() {
  btn.disabled = true;
  statusEl.textContent = "불러오는 중...";

  try {
    const res = await fetch("/cat");
    if (!res.ok) throw new Error("서버 응답 오류");
    const data = await res.json();

    imgEl.src = data.url;
    imgEl.alt = "Random cat image";
    statusEl.textContent = data.breed ? `품종: ${data.breed}` : "랜덤 고양이 😺";
  } catch (e) {
    console.error(e);
    statusEl.textContent = "❌ 불러오기 실패. 다시 시도해주세요.";
  } finally {
    btn.disabled = false;
  }
}

btn.addEventListener("click", loadCat);
window.addEventListener("load", loadCat);
