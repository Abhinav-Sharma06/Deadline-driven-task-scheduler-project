const Task = require("../models/Task");

exports.addTask = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { name, description, deadline } = req.body;
    if (!name || !description || !deadline) {
      console.log("not all fields...");
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }
    const task = await Task.create({
      name,
      description,
      deadline,
    });

    return res.status(200).json({
      status: 201,
      message: "User created successfully",
      data: task,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
