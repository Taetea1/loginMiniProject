const { render } = require("ejs");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// body-parser
// x-www-form-urlencoded 방식, 객체 형태로 결과가 나옴(객체형태: {})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views");

let data = {};

// 화면 렌더링
app.get("/", (req, res) => {
  res.render("main");
});
app.get("/join", (req, res) => {
  res.render("join");
});
app.get("/findid", (req, res) => {
  res.render("findid");
});
app.get("/findpw", (req, res) => {
  res.render("findpw");
});
app.get("/welcome", (req, res) => {
  res.render("welcome");
});

// 정보요청
app.get("/getData", (req, res) => {
  console.log(req.query, "회원가입get요청 왔니?");
  res.json(data);
});

// 회원가입 정보 보냄
app.post("/postForm", (req, res) => {
  // 클라이언트에서 전송한 데이터 추출
  let { id, pw, name, birth1, birth2, birth3, gender, phone1, phone2, phone3 } =
    req.body;

  // 휴대전화 번호(서버에서 합침)
  let phone = `${phone1}${phone2}${phone3}`;
  let birth;
  // 생년월일(서버에서 합침)
  if (birth2.length === 1) {
    birth2 = 0 + birth2;
  }
  if (birth3.length === 1) {
    birth3 = 0 + birth3;
  }
  birth = `${birth1}${birth2}${birth3}`;
  // 가공한 데이터
  let newUser = {
    id,
    pw,
    name,
    birth,
    gender,
    phone,
  };
  data = newUser;
  console.log(req.body, "회원가입정보post요청 왔니?");
});

// 휴대번호 정보 보냄
app.post("/postPhone", (req, res) => {
  // 클라이언트에서 전송한 데이터 추출
  let { phone1, phone2, phone3 } = req.body;

  // 휴대전화 번호 합침
  let phone = `${phone1}${phone2}${phone3}`;

  data = phone;
  console.log(data, "회원가입정보post요청 왔니?");
});

// 아이디 정보 보냄
app.post("/postId", (req, res) => {
  data = req.body;
  console.log(data, "회원가입정보post요청 왔니?");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
