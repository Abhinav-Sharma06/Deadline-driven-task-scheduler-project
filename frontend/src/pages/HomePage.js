import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";


const HomePage = () => {
  const [tasks, setTask] = useState([]);


  const getAllData = async () => {
    try {
      const getTasks = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getallTasks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getTasks.json();
      const incompleteTasks = res.data.filter(task => !task.completed);
      setTask(incompleteTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  },[]);
  

  const handleRemoveTask = async (taskId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteTask/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the task from the tasks state
        setTask(tasks =>
          tasks.filter(task => task._id !== taskId))
          toast.warning("Task removed")
      } else {
        console.error("Failed to remove task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAsDone = async (taskId) => {
    try {
      // Make a PUT request to update the task's completion status
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/updateTask/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }), 
      });
  
      
    if (response.ok) {
      
      setTask((prevTasks) => prevTasks.filter(task => task._id !== taskId));
      toast.success("Task Completed!!")
    } else {
      console.error('Failed to mark task as done');
    }
  } catch (error) {
    console.error('Error marking task as done:', error);
  }
};

  return (
    <>
      <section className="container px-4 mx-auto py-4">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h2 className="text-4xl font-medium text-gray-800 dark:text-yellow-500 mt-4">
              Deadline Driven Task Scheduler
            </h2>
            <p className="mt-1 text-lg text-gray-500 dark:text-gray-300">
            Meet Every Deadline with Precision: Your Task Scheduling Solution.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-1">
          <Link to={"/addTask"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-lg font-medium leading-7 text-white hover:bg-indigo-500 ">
                Add Tasks
              </button>
            </div>
          </Link>

          <Link to={"/completedTasks"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-lg font-medium leading-7 text-white hover:bg-indigo-500 ">
                Completed Tasks
              </button>
            </div>
          </Link>
          </div>
        </div>
       
       <div className="mt-12">
        <div className="w-[95%] bg-indigo-600 mx-auto px-4 py-2 rounded-md shadow-sm shadow-gray-300">
          <div className="flex flex-wrap items-center justify-between w-7/12 text-white text-xl font-semibold ">
            <h3>Task name and description</h3>
            <h3>Deadline date</h3>
          </div>
        </div>

        <div >
          {
            tasks.length === 0 ? <div className="text-gray-400 shadow-sm shadow-lime-200 rounded-md w-[95%] mx-auto flex flex-wrap justify-center items-center h-[380px] text-3xl font-semibold">Great work! Your task list is now empty.</div> :
            tasks?.map((task) => (
              
              <div className="w-[95%] my-4 mx-auto px-4 py-2 rounded-md shadow-sm shadow-lime-200  text-white flex flex-wrap items-center justify-between" >
              <div className="flex  flex-wrap items-center justify-between w-[56.8%] text-white text-lg">
                <div className="max-w-[70%]">
                  <h4 className="text-purple-400 font-semibold text-xl">{task.name}</h4>
                  <p >{task.description}</p>
                </div>
                <div className={(new Date(task.deadline.replace("T00:00:00.000Z",""))- new Date())/(1000 * 3600 * 24) < 3 ? ("text-red-500") : ("text-white")}>{
                  task.deadline.replace("T00:00:00.000Z","")}</div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-10 pr-6 text-lg">
                <button onClick={() => handleRemoveTask(task._id)} className="bg-red-600 px-4 py-1 rounded-md  hover:bg-red-400">Remove task</button>
                <button onClick={() => handleMarkAsDone(task._id)} className="bg-indigo-600 px-4 py-1 rounded-md  hover:bg-indigo-400">Mark as done</button>
              </div>
              </div>

            ))
          }
        </div>
       </div>
      </section>
    </>
  );
};

export default HomePage;
