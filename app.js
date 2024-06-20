const express = require("express");
const app = express();
const userModel = require("./connection/usermodel");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//const session = require("express-session");

app.use(cookieParser());
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

app.post("/create", async (req, res) => {
  let { email, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const userCreated = await userModel.create({
        email: email,
        password: hash,
      });

      let token = jwt.sign({ email }, "privatekey");
      res.cookie("token", token);
      res.redirect("/tasks");
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.redirect("/login");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email }, "privatekey");
      res.cookie("token", token);
      res.redirect("tasks");
    }
  });
});

app.get("/tasks", (req, res) => {
  res.render("tasks");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});
// app.get("/register", async (req, res) => {
//   let { email, password } = req.query;

//   const userCreated = await userModel.create({
//     email: email,
//     password: password,
//   });
//   res.send(userCreated);
// });

// app.get("/allusers", async (req, res) => {
//   const allusers = await userModel.find();
//   res.send(allusers);
// });

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
