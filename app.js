const express = require("express");
const app = express();
const userModel = require("./models/user");
const taskModel = require("./models/task");

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

app.get("/", async (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (user) {
    res.redirect("/login");
    return;
  }

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

app.post("/createtask", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  console.log(user);
  let { task } = req.body;

  let taskcreated = await taskModel.create({
    user: user._id,
    taskdata: task,
  });

  user.tasks.push(taskcreated._id);
  await user.save();

  res.redirect("tasks");
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

app.get("/tasks", isLoggedIn, async (req, res) => {
  let data = await userModel
    .findOne({ email: req.user.email })
    .populate("tasks");

  res.render("tasks", { data });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/deletetask/:id", async (req, res) => {
  let task = await taskModel.findOneAndDelete({ _id: req.params.id });

  res.redirect("/tasks");
});

app.get("/users", async (req, res) => {
  let users = await userModel.find();
  res.send(users);
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("LogIn First");
  else {
    let data = jwt.verify(req.cookies.token, "privatekey");
    req.user = data;
  }
  next();
}

app.listen(3000);
