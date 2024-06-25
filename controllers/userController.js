require("dotenv").config();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  let { email, password, first_name, last_name } = req.body;

  let checkUser = await userModel.findOne({ email: email });

  if (checkUser) {
    return res.status(200).json({ msg: "User Already Registered" });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const createdUser = await userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hash,
      });

      let token = jwt.sign({ email }, process.env.PRIVATE_KEY);
      res.cookie("token", token);
      return res
        .status(200)
        .json({ msg: "User Registered Successfully", createdUser });
    });
  });
};

const userLogin = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (!user) return res.status(200).json({ msg: "User Not Registered" });

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) return res.status(200).json({ msg: "Wrong Password" });

    let token = jwt.sign({ email: user.email }, process.env.PRIVATE_KEY);
    res.cookie("token", token);
    return res.status(200).json({ msg: "Successfully Login", user });
  });
};

const userLogout = (req, res) => {
  res.cookie("token", "");
  return res.status(200).json({ msg: "Logged out Successfully" });
};

const getUsers = async (req, res) => {
  let users = userModel.find();

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 5;

  let skip = (page - 1) * limit;

  users = users.skip(skip).limit(limit);

  let data = await users;

  return res.status(200).json({ All_Users: data });
};

module.exports = { userRegister, userLogout, userLogin, getUsers };
