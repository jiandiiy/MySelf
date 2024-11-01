document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let isIdChecked = false; // 중복 체크 완료 여부

  function checkDuplicateId() {
    users = JSON.parse(localStorage.getItem("users")) || [];
    const u_id = document.getElementById("u_id");
    const err_txt = document.querySelector(".err_id"); // 아이디 중복 체크 오류 메시지

    console.log("checkDuplicateId() 호출됨");

    if (u_id.value.trim() === "") {
      showError("err_id", "아이디를 입력하세요.");
      return;
    }

    if (users.some(user => user.id === u_id.value.trim())) {
      showError("err_id", "이미 사용 중인 아이디입니다.");
      isIdChecked = false;
    } else {
      err_txt.textContent = "사용 가능한 아이디입니다.";
      err_txt.style.color = "green";
      u_id.disabled = true;
      document.querySelector(".check").disabled = true;
      isIdChecked = true; // 중복 체크 완료 상태로 변경
    }
  }

  function showError(errorClass, message) {
    const err_txt = document.querySelector(`.${errorClass}`);
    if (err_txt) {
      err_txt.textContent = message;
      err_txt.style.color = "red";
    } else {
      console.error(`Error element '.${errorClass}' not found.`);
    }
  }

  function clearError(errorClass) {
    const err_txt = document.querySelector(`.${errorClass}`);
    if (err_txt) {
      err_txt.textContent = "";
    }
  }

  function form_check(event) {
    event.preventDefault();
    console.log("form_check() 호출됨");

    const u_id = document.getElementById("u_id");
    const u_password = document.getElementById("pwd");
    const repwd = document.getElementById("repwd");

    // 필수 항목 검사
    if (u_id.value.trim() === "" || u_password.value.trim() === "" || repwd.value.trim() === "") {
      alert("필수 항목을 모두 입력해주세요.");
      
      if (u_id.value.trim() === "") showError("err_id", "아이디를 입력하세요.");
      if (u_password.value.trim() === "") showError("err_pwd", "비밀번호를 입력하세요.");
      if (repwd.value.trim() === "") showError("err_repwd", "비밀번호 확인을 입력하세요.");
      
      return false;
    }

    // 아이디 중복 체크 확인
    if (!isIdChecked) {
      console.log("중복 체크 필요");
      showError("err_id", "아이디 중복 체크를 해주세요.");
      return false;
    }

    // 비밀번호 유효성 검사
    const pwdValue = u_password.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(pwdValue)) {
      showError("err_pwd", "비밀번호는 최소 8자, 숫자와 영문자를 포함해야 합니다.");
      return false;
    } else {
      clearError("err_pwd");
    }

    if (pwdValue !== repwd.value) {
      showError("err_repwd", "비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      clearError("err_repwd");
    }

    const newUser = {
      id: u_id.value.trim(),
      password: pwdValue
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    alert("회원가입이 완료되었습니다!");
    document.getElementById("signupForm").reset();

    // 중복 체크 상태 초기화
    u_id.disabled = false;
    document.querySelector(".check").disabled = false;
    isIdChecked = false;

    return false;
  }

  document.querySelector(".check").addEventListener("click", checkDuplicateId);
  document.getElementById("signupForm").addEventListener("submit", form_check);
});