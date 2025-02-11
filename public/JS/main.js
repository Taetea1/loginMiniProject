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
const findid = () => {
  window.location.href = "/findid";
};
const findpw = () => {
  window.location.href = "/findpw";
};
const join = () => {
  window.location.href = "/join";
};
