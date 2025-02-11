const checkpw = () => {
  let arr = [];

  document.getElementById("sub").submit();

  setTimeout(() => {
    fetch("/getPhone")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let base_data = [];
        base_data = JSON.parse(localStorage.getItem("userinfo")) || [];

        let filterid = base_data.filter((item) => item.phone === data);
        if (filterid.length === 0) {
          idinfo.innerHTML = `회원가입을 하지 않은 전화번호입니다.`;
        } else {
          idinfo.innerHTML = `해당 전화번호의 아이디는 `;
          filterid.map((x) => {
            arr.push(x.id);
          });
          idinfo.innerHTML += `${arr} 입니다.`;
        }
      })
      .catch((e) => {
        console.log("에러");
      });
  }, 100); // 대기 후 fetch 실행
};
