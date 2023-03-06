window.onload = function(){
const idInput = document.getElementById('user_id'),
pwInput = document.getElementById('user_pw');
const loginBtn = document.getElementById('loginBtn');
loginBtn.disabled = true;
loginBtn.style.opacity = .3;


const isActiveLogin = () => {
  let idValue = idInput.value;
  let pwValue = pwInput.value;

  if(
      (idValue && pwValue) && 
      (pwValue.length >= 1) &&
      (idValue.length >= 1) 
      ) {
      loginBtn.disabled = false;
      loginBtn.style.opacity = 1;
      loginBtn.style.cursor = 'pointer';
  } else {
      loginBtn.disabled = true;
      loginBtn.style.opacity = .3;
  }
}

const init = () => {
  idInput.addEventListener('input', isActiveLogin);
  pwInput.addEventListener('input', isActiveLogin);
  idInput.addEventListener('keyup', isActiveLogin);
  pwInput.addEventListener('keyup', isActiveLogin);
}

init();
}

function login(){
    // if(idInput.value == "dd" || pwInput.value == "dd"){
    //     alert("ID 혹은 PW 를 확인해주세요")
    // } else {
        location.href= 'index.html';
    // }


}

    
    
