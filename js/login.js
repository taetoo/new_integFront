// 페이지의 모든 요소들이 로드되어야 호출되는 함수이다.
window.onload = function () {
  const idInput = document.getElementById("user_id"),
    pwInput = document.getElementById("user_pw");
  const loginBtn = document.getElementById("loginBtn");
  loginBtn.disabled = true;
  loginBtn.style.opacity = 0.3;

  // 로그인 버튼 활성화
  const isActiveLogin = () => {
    let idValue = idInput.value;
    let pwValue = pwInput.value;

    if (idValue && pwValue && pwValue.length >= 1 && idValue.length >= 1) {
      loginBtn.disabled = false;
      loginBtn.style.opacity = 1;
      loginBtn.style.cursor = "pointer";
    } else {
      loginBtn.disabled = true;
      loginBtn.style.opacity = 0.3;
    }
  };
  // 인풋에 데이터를 지웠을 때 비활성화 시켜주는 함수
  const init = () => {
    idInput.addEventListener("input", isActiveLogin);
    pwInput.addEventListener("input", isActiveLogin);
    idInput.addEventListener("keyup", isActiveLogin);
    pwInput.addEventListener("keyup", isActiveLogin);
  };

  init();
};

// 로그인 유효성
function login() {
  if (user_id.value == "admin" && user_pw.value == "incu0301!") {
    alert("로그인에 성공했습니다.");
    console.log("로그인성공");
    location.href = "index.html";
  } else {
    alert("ID 혹은 PW 를 확인해주세요");
    console.log("로그인 실패");

    //로그인 인풋 리셋
    // $("#login-form").each(function () {
    //   this.reset();
    // });
    window.location.reload();
  }
}

// 비밀번호 감추기
$(document).ready(function () {
  $(".password i").on("click", function () {
    $("input").toggleClass("active");
    if ($("input").hasClass("active")) {
      $(this)
        .attr("class", "fa fa-eye-slash fa-lg")
        .prev("input")
        .attr("type", "text");
    } else {
      $(this)
        .attr("class", "fa fa-eye fa-lg")
        .prev("input")
        .attr("type", "password");
    }
  });
});

// 로그인 버튼 ENTER 활성화
$("#login-form").keypress(function (e) {
  if (e.keyCode === 13) {
    login();
  }
});
