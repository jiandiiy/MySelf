document.addEventListener("DOMContentLoaded", () => {
  let isIdChecked = false; // 중복 체크 완료 여부

  // 로컬 스토리지에서 사용자 정보 불러오기 (예외 처리 추가)
  let users;
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch (error) {
    console.error("로컬 스토리지에서 데이터를 불러오는 중 오류 발생:", error);
    users = [];
  }

  // 중복 체크 함수
  function checkDuplicateId() {
    const u_id = document.getElementById("u_id");
    const err_txt = document.querySelector(".err_id");

    console.log("checkDuplicateId() 호출됨");

    if (u_id.value.trim() === "") {
      manageError("err_id", "아이디를 입력하세요.");
      return;
    }

    if (users.some(user => user.id === u_id.value.trim())) {
      manageError("err_id", "이미 사용 중인 아이디입니다.");
      isIdChecked = false;
    } else {
      err_txt.textContent = "사용 가능한 아이디입니다.";
      err_txt.style.color = "green";
      u_id.disabled = true;
      document.querySelector(".check").disabled = true;
      isIdChecked = true; // 중복 체크 완료 상태로 변경
    }
  }

  // 오류 메시지 관리 함수 (showError와 clearError 통합)
  function manageError(errorClass, message = "") {
    const err_txt = document.querySelector(`.${errorClass}`);
    if (err_txt) {
      err_txt.textContent = message;
      if (message) {
        err_txt.classList.add("error"); // 에러 메시지가 있을 때 error 클래스 추가
      } else {
        err_txt.classList.remove("error"); // 에러 메시지가 없을 때 error 클래스 제거
      }
    }
  }

  // 폼 제출 시 검증 함수
  function form_check(event) {
    event.preventDefault();
    console.log("form_check() 호출됨");

    const u_id = document.getElementById("u_id");
    const u_password = document.getElementById("pwd");
    const repwd = document.getElementById("repwd");

    // 필수 항목 검사
    if (u_id.value.trim() === "" || u_password.value.trim() === "" || repwd.value.trim() === "") {
      alert("필수 항목을 모두 입력해주세요.");

      if (u_id.value.trim() === "") manageError("err_id", "아이디를 입력하세요.");
      if (u_password.value.trim() === "") manageError("err_pwd", "비밀번호를 입력하세요.");
      if (repwd.value.trim() === "") manageError("err_repwd", "비밀번호 확인을 입력하세요.");

      return false;
    }

    // 아이디 중복 체크 확인
    if (!isIdChecked) {
      console.log("중복 체크 필요");
      manageError("err_id", "아이디 중복 체크를 해주세요.");
      return false;
    }

    // 비밀번호 유효성 검사 (보안 강화를 위한 정규식)
    const pwdValue = u_password.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(pwdValue)) {
      manageError("err_pwd", "비밀번호는 최소 8자, 숫자, 영문자 및 특수문자를 포함해야 합니다.");
      return false;
    } else {
      manageError("err_pwd"); // 오류 메시지 지우기
    }

    if (pwdValue !== repwd.value) {
      manageError("err_repwd", "비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      manageError("err_repwd"); // 오류 메시지 지우기
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

  // 이벤트 리스너 설정
  document.querySelector(".check").addEventListener("click", checkDuplicateId);
  document.getElementById("signupForm").addEventListener("submit", (event) => {
    form_check(event);
    isIdChecked = false;  // 중복 체크 상태 초기화
  });
});