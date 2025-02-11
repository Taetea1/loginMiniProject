let pass = document.querySelector(".pass");
const emailinput = document.querySelector(".emailinput");
const checkemail = document.querySelector(".checkemail");

// 중복확인
let duplecheck = false;

// 이메일 중복 확인
document.querySelector(".checkbtn").addEventListener("click", () => {
  // 백엔드에 요청
  fetch("/getData")
    .then((response) => response.json())
    .then((data) => {
      let base_data = [];
      base_data = JSON.parse(localStorage.getItem("userinfo")) || [];
      let filterdata = base_data.filter((item) => item.id === emailinput.value);
      console.log(filterdata);
      if (emailinput.value.length > 0 && emailinput.value.includes("@")) {
        if (filterdata.length <= 0) {
          checkemail.innerHTML = `사용 가능한 이메일입니다.`;
          duplecheck = true;
        } else {
          checkemail.innerHTML = `중복된 이메일입니다.`;
          duplecheck = false;
        }
      } else {
        checkemail.innerHTML = ``;
        duplecheck = false;
      }
    })
    .catch((e) => {
      console.log("에러");
    });
});
const checke = () => {
  if (emailinput.value.length === 0) {
    checkemail.innerHTML = ``;
    duplecheck = false;
  }
};

// 비밀번호 유효성 확인
const checkPw = () => {
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const checkpw = document.querySelector(".checkpw");

  if (reg.test(pass.value)) {
    checkpw.innerHTML = ``;
  } else if (pass.value.length === 0) {
    checkpw.innerHTML = ``;
  } else {
    checkpw.innerHTML = `비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.`;
  }
};

// 비밀번호 같은지 확인
const checkSame = () => {
  let passcheck = document.querySelector(".passcheck");
  let checkpw2 = document.querySelector(".checkpw2");
  if (pass.value !== passcheck.value) {
    checkpw2.innerHTML = `비밀번호를 다시 확인해주세요.`;
  } else if (passcheck.value.length === 0) {
    checkpw2.innerHTML = ``;
  } else {
    checkpw2.innerHTML = ``;
  }
};

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
  } else if (pattern.test(phonecheck.value) === false) {
    checkphone.innerHTML = `${id}번째 칸에 올바른 번호로 입력해주세요.`;
  } else {
    checkphone.innerHTML = ``;
  }
};

// 회원가입 요청(버튼 클릭)
const joinreq = () => {
  let joinForm = document.joinForm;
  let email = joinForm.id.value;
  let pass = joinForm.pw.value;
  let pass2 = joinForm.pw2.value;
  let name = joinForm.name.value;
  let birth = joinForm.birth.value;
  let phone1 = joinForm.phone1.value;
  let phone2 = joinForm.phone2.value;
  let phone3 = joinForm.phone3.value;
  let gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (
    !email ||
    !pass ||
    !pass2 ||
    !name ||
    !birth ||
    !phone1 ||
    !phone2 ||
    !phone3 ||
    !gender
  ) {
    alert("모두 입력해주세요");
  } else if (duplecheck === false) {
    checkemail.innerHTML = `중복 확인해주세요.`;
  } else {
    // 휴대폰 번호 합치기
    const phone = `${phone1}-${phone2}-${phone3}`;
    joinForm.submit();

    Swal.fire({
      title: `회원가입이 완료되었습니다.`,
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        test();
      }
    });
  }
};

const test = () => {
  // 백엔드에 요청
  fetch("/getData")
    .then((response) => response.json())
    .then((data) => {
      let base_data = [];
      base_data = JSON.parse(localStorage.getItem("userinfo")) || [];

      // 기존 데이터에 동일한 항목이 있는지 확인
      const isDuplicate = base_data.some(
        (item) => JSON.stringify(item) === JSON.stringify(data)
      );
      if (!isDuplicate) {
        const update_data = JSON.parse(JSON.stringify(data));
        base_data.push(update_data);
        localStorage.setItem("userinfo", JSON.stringify(base_data));
      }
      window.location.href = "/";
    })
    .catch((e) => {
      console.log("에러");
    });
};
