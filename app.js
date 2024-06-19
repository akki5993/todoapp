const express = require("express");
const app = express();
const userModel = require("./connection/conn");

app.get("/", (req, res) => {
  res.send("WElcome to Todo App");
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

app.listen(3000);
