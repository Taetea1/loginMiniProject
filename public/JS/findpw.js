const pwinfo = document.querySelector(".pwinfo");
const emailinput = document.querySelector(".emailinput");

const checkpw = () => {
  if (emailinput.value.includes("@")) {
    let arr = [];

    document.getElementById("sub").submit();

    setTimeout(() => {
      fetch("/getData")
        .then((response) => response.json())
        .then((data) => {
          let base_data = [];
          base_data = JSON.parse(localStorage.getItem("userinfo")) || [];
          let filterpw = base_data.filter((item) => item.id === data.id);
          if (filterpw.length === 0) {
            pwinfo.innerHTML = `<div class="infotext">회원가입을 하지 않은 아이디입니다.</div>`;
          } else {
            filterpw.map((x) => {
              pwinfo.innerHTML = `<div class="infotext">해당 아이디의 비밀번호는 ${x.pw}입니다.</div>`;
            });
          }
        })
        .catch((e) => {
          console.log("에러");
        });
    }, 100); // 대기 후 fetch 실행
  } else {
    pwinfo.innerHTML = ``;
  }
};

const checke = () => {
  if (emailinput.value.length <= 0) {
    pwinfo.innerHTML = ``;
  }
};
