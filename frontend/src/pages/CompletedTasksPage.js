import React from "react";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";

const CompletedTasksPage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getAllTasks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      
      const res = await response.json();
      const completeTasks = res.data.filter(task => task.completed);
      setCompletedTasks(completeTasks);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  useEffect(() => {
    fetchCompletedTasks()
},[])
  
  return (
    <>
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-medium text-gray-800 dark:text-yellow-500 mt-2">
              Completed Tasks
            </h2>
            
          </div>

          <div className="flex gap-3 mt-4">

          <Link to={"/"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-lg font-medium leading-7 text-white hover:bg-indigo-500 ">
                All Tasks
              </button>
            </div>
          </Link>

          <Link to={"/addTask"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-lg font-medium leading-7 text-white hover:bg-indigo-500 ">
                Add Tasks
              </button>
            </div>
          </Link>

          <Link to={{
                pathname: "/completedTasks",
                state: { completedTasks }
                  }}
          >
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
          <div className="flex items-center justify-between w-7/12 text-white text-xl font-semibold ">
            <h3>Task name and description</h3>
            <h3>Deadline date</h3>
          </div>
        </div>

        <div >
          {
            completedTasks.length === 0 ? <div className="text-gray-400 shadow-sm shadow-lime-200 rounded-md w-[95%] mx-auto flex justify-center items-center h-[380px] text-3xl font-semibold">No completed tasks yet.</div> :
            completedTasks?.map((task) => (
              
              <div className="w-[95%] my-2 mx-auto px-4 py-2 rounded-md shadow-sm shadow-lime-200  text-white flex items-center justify-between" >
              <div className="flex items-center justify-between w-[56.8%] text-white text-lg">
                <div>
                  <h4 className="text-purple-400 font-semibold text-xl">{task.name}</h4>
                  <p >{task.description}</p>
                </div>
                <div>{
                  task.deadline.replace("T00:00:00.000Z","")}</div>
              </div>
              <div className="flex items-center justify-center gap-10 pr-6 text-lg font-medium">
                <button className="bg-green-500 px-6 py-1 rounded-md ">Completed task</button>
               
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

export default CompletedTasksPage;

