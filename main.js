let memos = [];
let editingMemoId = null; // 현재 수정 중인 메모 ID 저장

const pastelColors = [
  '#E0BBE4', '#BFE1B0', '#FFD8B1', '#B2E0D8', '#FFC0CB', '#D7A9E3'
];

document.querySelector('.new-memo-btn').addEventListener('click', togglePopup);
document.querySelector('.add-btn').addEventListener('click', (e) => {
  e.preventDefault();
  addMemo();
  togglePopup(); // 팝업 닫기
});

// 페이지 로드 시 로컬 스토리지에서 메모 불러오기
window.addEventListener('load', loadMemosFromLocalStorage);

// 팝업을 나타내거나 숨기는 함수
function togglePopup() {
  document.querySelector('.write-note').classList.toggle('hidden');
  document.querySelector('.black-bg').classList.toggle('visible');
  document.querySelector('.title').value = '';
  document.querySelector('.text').value = ''; // 입력 필드 초기화
  editingMemoId = null; // 팝업 닫을 때 수정 모드 초기화
}

function addMemo() {
  const title = document.querySelector('.title').value;
  const text = document.querySelector('.text').value;
  let date = new Date().toISOString().slice(0, 10);

  if (text === '') {
    alert('텍스트를 입력해주세요.');
    return;
  }

  date = date.replace(/-/g, '.'); // 날짜 형식을 2024.10.31로 변경

  const memo = {
    id: Date.now(),
    title,
    text,
    date,
    color: pastelColors[Math.floor(Math.random() * pastelColors.length)] // 파스텔 색상 랜덤 선택
  };

  memos.push(memo);
  saveMemosToLocalStorage(); // 로컬 스토리지에 저장
  renderMemos();
}

function renderMemos() {
  const memoBox = document.querySelector('.memo-box');
  memoBox.innerHTML = memos.map(memo => `
    <li class="memo-list" style="background-color: ${memo.color}">
      <div class="memo-paper">
         <div class="header">
          <span class="date">${memo.date}</span>
          <h3 class="title">${memo.title || '제목 없음'}</h3>
        </div>
        ${editingMemoId === memo.id ? `
          <textarea class="edit-text">${memo.text}</textarea>
          <button class="save-btn" onclick="saveMemo(${memo.id})">수정 완료</button>
        ` : `
          <p class="text">${memo.text}</p>
          <div class="button-group">
          <button class="edit-btn" onclick="editMemo(${memo.id})"></button>
          <button class="del-btn" onclick="deleteMemo(${memo.id})"></button>
        `}
      </div>
    </li>
  `).join('');
}

function deleteMemo(id) {
  memos = memos.filter(memo => memo.id !== id);
  saveMemosToLocalStorage(); // 로컬 스토리지에 변경된 메모 목록 저장
  renderMemos();
}

function editMemo(id) {
  editingMemoId = id; // 현재 수정 중인 메모 ID 설정
  renderMemos(); // 메모 렌더링을 다시 하여 수정 필드 표시
}

function saveMemo(id) {
  const editTextarea = document.querySelector('.edit-text');
  const memo = memos.find(memo => memo.id === id);
  memo.text = editTextarea.value; // 수정된 내용 반영
  editingMemoId = null; // 수정 모드 종료
  saveMemosToLocalStorage(); // 로컬 스토리지에 저장
  renderMemos();
}

// 로컬 스토리지에 메모를 저장하는 함수
function saveMemosToLocalStorage() {
  localStorage.setItem('memos', JSON.stringify(memos));
}

// 로컬 스토리지에서 메모를 불러오는 함수
function loadMemosFromLocalStorage() {
  const storedMemos = localStorage.getItem('memos');
  if (storedMemos) {
    memos = JSON.parse(storedMemos);
    renderMemos(); // 저장된 메모를 화면에 렌더링
  }
}