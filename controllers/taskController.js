require("dotenv").config();
const userModel = require("../models/user");
const taskModel = require("../models/task");
const jwt = require("jsonwebtoken");

const addTask = async (req, res) => {
  console.log(req.body);

  if (req.cookies.token === "") res.status(200).json({ msg: "Login First" });

  let data = jwt.verify(req.cookies.token, process.env.PRIVATE_KEY);
  console.log(data);
  req.user = data;
  console.log(req.user);

  let user = await userModel.findOne({ email: req.user.email });

  let { task } = req.body;

  let createTask = await taskModel.create({
    user: user._id,
    task: task,
  });

  user.tasks.push(createTask._id);
  await user.save();

  return res.status(200).json({ msg: "Task Created Successfully", createTask });
};

const deleteTask = async (req, res) => {
  if (req.cookies.token === "") res.status(200).json({ msg: "Login First" });

  let data = jwt.verify(req.cookies.token, process.env.PRIVATE_KEY);

  req.user = data;

  let task = await taskModel.findOneAndDelete({ _id: req.params.id });

  return res.status(200).json({ msg: "Task Deleted", task });
};

const userTasks = async (req, res) => {
  if (req.cookies.token === "") res.status(200).json({ msg: "Login First" });

  let data = jwt.verify(req.cookies.token, process.env.PRIVATE_KEY);

  req.user = data;

  let tasks = await userModel
    .findOne({ email: req.user.email })
    .populate("tasks");

  let obj = {
    tasks: tasks.tasks,
    email: req.user.email,
  };

  // console.log(tasks);

  // let page = Number(req.query.page) || 1;
  // let limit = Number(req.query.limit) || 2;

  // let skip = (page - 1) * limit;

  // tasks = tasks.skip(skip).limit(limit);

  // let allTasks = await tasks;

  return res.status(200).json({ User: obj.email, Tasks: obj.tasks });
};

const getTasks = async (req, res) => {
  let tasks = taskModel.find();
  //  {
  //   task: { $regex: req.query.task, $options: "i" },
  // }
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;

  let skip = (page - 1) * limit;

  tasks = tasks.skip(skip).limit(limit);

  let data = await tasks;

  return res.status(200).json({ AllTasks: data });
};

module.exports = { addTask, deleteTask, userTasks, getTasks };
