const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxLength:25,
	},
	description: {
		type: String,
		required: true,
		maxLength:50,
	},

	deadline:{
		type:Date,
		required: true,
	},

	completed: {
		type: Boolean,
		default: false 
	  },
	
});

module.exports = mongoose.model("Task", taskSchema);
