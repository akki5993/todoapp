const express = require("express");
const app = express();
const userModel = require("./connection/conn");
const ejs = require("ejs");
const path = require("path");
//const cookieParser = require("cookie-parser");
//const session = require("express-session");

//app.use(cookieParser());
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "akshaypatel",
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", async (req, res) => {
  let { email, password } = req.query;

  const userCreated = await userModel.create({
    email: email,
    password: password,
  });
  res.send(userCreated);
});

app.get("/allusers", async (req, res) => {
  const allusers = await userModel.find();
  res.send(allusers);
});

// app.get("/sessionset", (req, res) => {
//   req.session.name = "Akshay";
//   res.send("Hello");
// });

// app.get("/sessionget", (req, res) => {
//   console.log(req.session);
// });

// app.get("/cookieset", (req, res) => {
//   res.cookie("name", "akshay");
//   res.send("Set Cookies");
// });

// app.get("/cookieget", (req, res) => {
//   console.log(req.cookies);
//   res.send(req.cookies);
//});

app.listen(3000);
