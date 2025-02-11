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
app.get("/", (req, res) => {
  res.render("main");
});

app.get("/join", (req, res) => {
  res.render("join");
});

app.get("/getForm", (req, res) => {
  // get 요청은 req.query에 담겨서 옴
  console.log(req.query, "get요청 왔니?");
  // res.render("result", { title: "GET 요청 결과", userinfo: req.query });
  data = req.query;
  res.render("search", { title: "해당 회원들" });
});

app.post("/postForm", (req, res) => {
  // post 요청은 req.body에 담겨서 옴
  data = req.body; //객체형식으로 들어감(json)
  console.log(req.body, "요청 왔니?");
  // res.render("result", { title: "POST 요청 결과", userinfo: req.body });
  res.render("userlist", { title: "회원 정보 리스트" });
});

app.get("/userinfo", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
