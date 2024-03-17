const express = require("express");
const router = express.Router();

const { addTask } = require("../controller/addTask");
const { getTask } = require("../controller/getTask");
const {deleteTask} = require("../controller/deleteTask");
const {updateTask} = require("../controller/updateTask");

router.post("/addTasks", addTask);
router.get("/getAllTasks", getTask);
router.delete("/deleteTask/:id",deleteTask);
router.put('/updateTask/:taskId', updateTask);

module.exports = router;
