let memos = [];

const pastelColors = [
  '#E0BBE4', '#BFE1B0', '#FFD8B1', '#B2E0D8', '#FFC0CB', '#D7A9E3'
];

document.querySelector('.new-memo-btn').addEventListener('click', togglePopup);
document.querySelector('.add-btn').addEventListener('click', (e) => {
  e.preventDefault();
  addMemo();
  togglePopup(); // 팝업 닫기
});

// 팝업을 나타내거나 숨기는 함수
function togglePopup() {
  document.querySelector('.write-note').classList.toggle('hidden');
  document.querySelector('.black-bg').classList.toggle('visible');
}

function addMemo() {
  const text = document.querySelector('.text').value;
  const date = new Date().toISOString().slice(0, 10);

  if (text === '') {
    alert('텍스트를 입력해주세요.');
    return;
  }

  const memo = {
    id: Date.now(),
    text,
    date,
    color: pastelColors[Math.floor(Math.random() * pastelColors.length)]
  };

  memos.push(memo);
  document.querySelector('.text').value = ''; // 입력 필드 초기화

  renderMemos();
}

function renderMemos() {
  const memoBox = document.querySelector('.memo-box');
  memoBox.innerHTML = memos.map(memo => `
    <li class="memo-list" style="background-color: ${memo.color}">
      <div class="memo-paper">
        <span class="date">${memo.date}</span>
        <p class="text">${memo.text}</p>
        <button class="edit-btn" onclick="editMemo(${memo.id})">수정</button>
        <button class="del-btn" onclick="deleteMemo(${memo.id})">삭제</button>
      </div>
    </li>
  `).join('');
}

function deleteMemo(id) {
  memos = memos.filter(memo => memo.id !== id);
  renderMemos();
}

function editMemo(id) {
  const memo = memos.find(memo => memo.id === id);
  document.querySelector('.text').value = memo.text;
  deleteMemo(id);
}