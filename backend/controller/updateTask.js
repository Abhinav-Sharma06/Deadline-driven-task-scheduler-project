const Task = require("../models/Task");

exports.updateTask = async (req, res) => {
    const { taskId } = req.params;
    const updatedTaskData = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };