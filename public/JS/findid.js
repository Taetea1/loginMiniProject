const idinfo = document.querySelector(".idinfo");
let isGood = false;
// 휴대번호 유효성 검사
const checkPhone = (id) => {
  let pattern;
  if (id === 1) {
    pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})$/;
  } else if (id === 2) {
    pattern = /^[0-9]{3,4}$/;
  } else {
    pattern = /^[0-9]{4}$/;
  }

  const phonecheck = document.querySelector(`.phonecheck${id}`);
  const checkphone = document.querySelector(`.checkphone${id}`);

  if (phonecheck.value.length > phonecheck.maxLength) {
    phonecheck.value = phonecheck.value.slice(0, phonecheck.maxLength);
  }

  if (phonecheck.value.length === 0) {
    checkphone.innerHTML = ``;
    isGood = false;
  } else if (pattern.test(phonecheck.value) === false) {
    checkphone.innerHTML = `${id}번째 칸에 올바른 번호로 입력해주세요.`;
    isGood = false;
  } else {
    checkphone.innerHTML = ``;
    isGood = true;
  }
};

// 실패
// const checkid = () => {
//   let arr = [];
//   document.getElementById("sub").submit();
//   // 백엔드에 요청 보냄
//   fetch("/getData")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       let base_data = [];
//       base_data = JSON.parse(localStorage.getItem("userinfo")) || [];

//       let filterid = base_data.filter((item) => item.phone === data);
//       if (filterid.length === 0) {
//         idinfo.innerHTML = `회원가입을 하지 않은 전화번호입니다.`;
//       } else {
//         idinfo.innerHTML = `해당 전화번호의 아이디는 `;
//         filterid.map((x) => {
//           arr.push(x.id);
//         });
//         idinfo.innerHTML += `${arr} 입니다.`;
//       }
//     })
//     .catch((e) => {
//       console.log("에러");
//     });
// };

// 기다리기
const checkid = () => {
  if (isGood === true) {
    let arr = [];

    document.getElementById("sub").submit();

    setTimeout(() => {
      fetch("/getData")
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
  }
};

// 서버 안 사용
// const checkid = () => {
//   let arr = [];
//   let base_data = [];
//   base_data = JSON.parse(localStorage.getItem("userinfo")) || [];
//   const phone1 = document.querySelector(".phonecheck1").value;
//   const phone2 = document.querySelector(".phonecheck2").value;
//   const phone3 = document.querySelector(".phonecheck3").value;

//   let phone = `${phone1}${phone2}${phone3}`;

//   let filterid = base_data.filter((item) => item.phone === phone);
//   console.log(phone, "DD", filterid);
//   if (filterid.length === 0) {
//     idinfo.innerHTML = `회원가입을 하지 않은 전화번호입니다.`;
//   } else {
//     idinfo.innerHTML = `해당 전화번호의 아이디는 `;
//     filterid.map((x) => {
//       arr.push(x.id);
//     });
//     idinfo.innerHTML += `${arr} 입니다.`;
//   }
// };
