import { useContext, useEffect } from "react";
import { Context } from "../Context";
import { v4 as uuidv4 } from "uuid";
import {IoMdAdd}from "react-icons/io"
import toast from "react-hot-toast";
const Createtask = () => {
  const { task, settask, tasks, settasks } = useContext(Context);
  useEffect(() => {
    settasks(JSON.parse(localStorage.getItem("tasks"))||[]);
  }, []);
  
  function handleSubmit(e) {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("Enter Aleast 3 Characters", { duration: 900 });
    if (task.name.length > 100)
      return toast.error("Task Must not greater than 100 characters", { duration: 900 });
    settasks((tasks) => {
      let list = [...tasks, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      toast.success("Task Created");
      return list;
    })
    settask({
      name:"",
      id:"",
      status:"todo"
    })
  }

  return (
    <form className="flex my-4 items-center justify-center " onSubmit={handleSubmit}>
      <input
        type="text"
        className="shadow-xl placeholder:text-slate-600 rounded-md focus:outline-slate-500 px-2 py-0.5 "
        value={task.name}
        placeholder="Enter Task!"
        onChange={(e) => {
          settask({ ...task, id: uuidv4(), name: e.target.value });
        }}
      />
      <button type="submit" className="text-lg shadow-xl flex items-center justify-center h-6 ml-1 rounded-full w-6 bg-gray-400 font-bold hover:scale-110 duration-100 text-slate-950"><IoMdAdd/> </button>
    </form>
  );
};

export default Createtask;
