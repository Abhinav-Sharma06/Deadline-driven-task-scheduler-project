import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddTaskForm.css"
import {toast} from "react-toastify";


const AddTaskForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const addTask = async (data) => {

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/addTasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }
    );

    console.log("FORM RESPONSE......", savedUserResponse);
    toast.success("Task added successfully")
    navigate("/")
  };

  return (
    <div>
      <form onSubmit={handleSubmit(addTask)} className="mt-8">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Task name{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter Task name"
                {...register("name")}
              ></input>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Task description{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                placeholder="Enter Task description"
                {...register("description")}
              ></input>
            </div>
          </div>

          <div>
            <label
              htmlFor="deadline"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Deadline date
            </label>
            <div className="mt-2.5">
              <input
              type="date"
                className=" h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 
                 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                

                {...register("deadline")}
              ></input>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
              Add Task
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
