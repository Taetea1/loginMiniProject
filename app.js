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

// 회원가입 정보 보냄
app.post("/postForm", (req, res) => {
  data = req.body;
  console.log(req.body, "회원가입정보post요청 왔니?");
});

// 회원가입 요청
app.get("/joinuser", (req, res) => {
  console.log(req.query, "회원가입get요청 왔니?");
  res.json(data);
  // res.render("main");
});

// app.get("/getForm", (req, res) => {
//   console.log(req.query, "getssssss요청 왔니?");
//   data = req.query;
// });
app.get("/", (req, res) => {
  res.render("main");
});

app.get("/join", (req, res) => {
  res.render("join");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
