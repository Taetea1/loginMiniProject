// 비밀번호 유효성 확인
const checkPw = () => {
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  let pass = document.querySelector(".pass");
  const checkpw = document.querySelector(".checkpw");

  console.log(pass.value);
  if (reg.test(pass.value)) {
    checkpw.innerHTML = ``;
  } else {
    checkpw.innerHTML = `비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.`;
  }
};
