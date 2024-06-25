const express = require("express");
const router = express.Router();
const {
  addTask,
  deleteTask,
  userTasks,
  getTasks,
} = require("../controllers/taskController");

router.route("/addtask").post(addTask);
router.route("/deletetask/:id").delete(deleteTask);
router.route("/tasks").get(userTasks);
router.route("/alltasks").get(getTasks);

module.exports = router;
