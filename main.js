let users = []; // 회원 정보를 저장하는 배열

// 아이디 중복 체크 함수
function checkDuplicateId() {
  const u_id = document.getElementById("u_id");
  const err_txt = document.querySelector(".err_id");

  // 아이디 중복 여부를 배열에서 확인
  if (users.some(user => user.id === u_id.value.trim())) {
    err_txt.textContent = "* 이미 사용 중인 아이디입니다.";
    err_txt.style.color = "red";
    return false;
  } else {
    err_txt.textContent = "사용 가능한 아이디입니다.";
    err_txt.style.color = "green";
    return true;
  }
}

// 회원가입 폼 유효성 검사 함수
function form_check() {
  console.log("form_check() 호출됨"); // 디버깅용
  const u_id = document.getElementById("u_id");
  const u_name = document.getElementById("u_name");
  const u_password = document.getElementById("pwd");
  const repwd = document.getElementById("repwd");
  const agree = document.getElementById("agree");

  function showError(element, message) {
    const err_txt = document.querySelector(`.err_${element.id}`);
    err_txt.textContent = message;
    err_txt.style.color = "red";
    element.focus();
  }

  // 아이디 유효성 검사
  if (u_id.value.trim() === "") {
    showError(u_id, " 아이디를 입력하세요.");
    return false;
  }
  if (!checkDuplicateId()) { // 중복 확인
    u_id.focus();
    return false;
  }

  // 이름 유효성 검사
  if (u_name.value.trim() === "") {
    showError(u_name, " 이름을 입력하세요.");
    return false;
  }

  // 비밀번호 규칙 검사 (최소 8자, 숫자와 영문자 포함)
  const pwdValue = u_password.value;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 문자와 숫자 포함
  if (!passwordRegex.test(pwdValue)) {
    showError(u_password, " 비밀번호는 최소 8자, 숫자와 영문자를 포함해야 합니다.");
    return false;
  }

  // 비밀번호 확인 검사
  if (pwdValue !== repwd.value) {
    showError(repwd, " 비밀번호가 일치하지 않습니다.");
    return false;
  }

  // 약관 동의 확인
  if (!agree.checked) {
    alert("약관 동의가 필요합니다.");
    agree.focus();
    return false;
  }

  // 유효성 검사를 통과하면 회원 정보를 배열에 저장
  const newUser = {
    id: u_id.value.trim(),
    name: u_name.value.trim(),
    password: pwdValue
  };
  users.push(newUser); // 배열에 사용자 추가

  // 폼 초기화 및 성공 메시지
  alert("회원가입이 완료되었습니다!");
  console.log("회원가입 완료 메시지 출력"); // 디버깅용
  document.getElementById("signupForm").reset();
  return false; // 페이지 리로드 방지
}

// 중복 체크 버튼 클릭 이벤트 리스너 추가
document.querySelector(".check").addEventListener("click", checkDuplicateId);