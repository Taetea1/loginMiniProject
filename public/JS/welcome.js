const info = document.querySelector(".info");
let username = JSON.parse(localStorage.getItem("nowuser")) || [];
info.innerHTML = `${username}님 환영합니다.`;
