const memos = [];
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
  const title = document.querySelector('.title').value.trim() || '제목 없음';
  const text = document.querySelector('.text').value.trim();
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '.'); // 날짜 형식을 2024.10.31로 변경

  if (text === '') {
    alert('텍스트를 입력해주세요.');
    return;
  }

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

// DOM 조작 방식 개선: DocumentFragment 사용하여 메모 렌더링 최적화
function renderMemos() {
  const memoBox = document.querySelector('.memo-box');
  const fragment = document.createDocumentFragment();

  memos.forEach(memo => {
    const li = document.createElement('li');
    li.className = 'memo-list';
    li.style.backgroundColor = memo.color;

    li.innerHTML = `
      <div class="memo-paper">
        <div class="header">
          <span class="date">${escapeHTML(memo.date)}</span>
          <h3 class="title">${escapeHTML(memo.title)}</h3>
        </div>
        <p class="text">${escapeHTML(memo.text)}</p>
        <div class="button-group">
          <button class="edit-btn"></button>
          <button class="del-btn"></button>
        </div>
      </div>
    `;
    
    // Fragment에 li 요소 추가
    fragment.appendChild(li);
  });

  // 기존 내용을 비우고, Fragment를 사용하여 DOM 업데이트
  memoBox.innerHTML = '';
  memoBox.appendChild(fragment);

  // 이벤트 바인딩: onclick 속성 제거하고 addEventListener 사용
  document.querySelectorAll('.edit-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => editMemo(memos[index].id));
  });

  document.querySelectorAll('.del-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => deleteMemo(memos[index].id));
  });
}

// 메모 삭제
function deleteMemo(id) {
  memos.splice(memos.findIndex(memo => memo.id === id), 1);
  saveMemosToLocalStorage();
  renderMemos();
}

// 메모 수정 모드 활성화
function editMemo(id) {
  editingMemoId = id;
  renderMemos();
}

// 메모 수정 저장
function saveMemo(id) {
  const editTextarea = document.querySelector('.edit-text');
  const memo = memos.find(memo => memo.id === id);
  if (memo) {
    memo.text = editTextarea.value;
    editingMemoId = null; // 수정 모드 종료
    saveMemosToLocalStorage();
    renderMemos();
  }
}

// 로컬 스토리지에 메모를 저장
function saveMemosToLocalStorage() {
  localStorage.setItem('memos', JSON.stringify(memos));
}

// 로컬 스토리지에서 메모 불러오기
function loadMemosFromLocalStorage() {
  const storedMemos = localStorage.getItem('memos');
  if (storedMemos) {
    memos.push(...JSON.parse(storedMemos));
    renderMemos();
  }
}

// XSS 방지 함수
function escapeHTML(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}