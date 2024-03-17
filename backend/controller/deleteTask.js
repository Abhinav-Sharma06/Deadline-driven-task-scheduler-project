const Task = require("../models/Task");

exports.deleteTask = async (req, res) => {
    const taskId = req.params.id; 

    try {        
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.json({ success: true, message: "Task deleted successfully", deletedTask });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};