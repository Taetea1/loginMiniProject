// 비효율적
// const findid = () => {
//   fetch("/id")
//     .then((response) => response.text()) // 응답을 HTML로 변환
//     .then((html) => {
//       document.open(); // 문서를 열고
//       document.write(html); // 새 HTML을 씀
//       document.close(); // 문서를 닫음
//     })
//     .catch((error) => console.error("에러 발생:", error));
// };
const info = document.querySelector(".info");
const emailinput = document.querySelector(".emailinput");
const pass = document.querySelector(".pass");
const move = (path) => {
  window.location.href = `/${path}`;
};
const loginreq = () => {
  if (emailinput.value.includes("@") && pass.value.length > 0) {
    document.getElementById("sub").submit();

    setTimeout(() => {
      fetch("/getData")
        .then((response) => response.json())
        .then((data) => {
          let base_data = [];
          let username;
          base_data = JSON.parse(localStorage.getItem("userinfo")) || [];

          let filters = base_data.filter(
            (item) => item.id === data.id && item.pw === data.pw
          );
          filters.map((x) => {
            username = x.name;
          });

          if (filters.length === 0) {
            info.innerHTML = `아이디 또는 비밀번호가 틀렸습니다. 다시 확인해주세요.`;
          } else {
            info.innerHTML = ``;
            localStorage.setItem("nowuser", JSON.stringify(username));
            window.location.href = "/welcome";
          }
        })
        .catch((e) => {
          console.log("에러");
        });
    }, 100); // 대기 후 fetch 실행
  } else {
    info.innerHTML = `올바르게 입력해주세요.`;
  }
};
