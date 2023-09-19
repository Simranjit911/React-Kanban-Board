import toast from "react-hot-toast";
import { Context } from "../Context";
import { useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HiTrash } from "react-icons/hi";
const Listtasks = () => {
  const { tasks, todos, settodos, progress, setprogress, done, setdone } =
    useContext(Context);
 
  useEffect(() => {
    let ftodos = tasks.filter((task) => task.status === "todo");
    let fprogress = tasks.filter((task) => task.status === "inprogress");
    let fdone = tasks.filter((task) => task.status === "done");
    settodos(ftodos);
    setprogress(fprogress);
    setdone(fdone);
  }, [tasks]);
  const statuses = ["todo", "inprogress", "done"];
  return (
    <div className="flex px-2 my-2 flex-col gap-2  sm:flex-row">
      {statuses.map((status, idx) => (
        <Section key={idx} status={status} />
      ))}
    </div>
  );
};

export default Listtasks;
function Section({ status }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItem(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  function addItem(id) {
    settasks((prev) => {
      const mtask = prev.map((t) => {
        if (t.id == id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mtask));
      toast.success("Task status Updated!");
      return mtask;
    });
  }
  let {
    settasks,
    tasks,
    todos,
    progress,

    done,
  } = useContext(Context);
  let text = "text";
  let bg = "bg-blue-400";
  let tasktomap = todos;
  if (status === "inprogress") {
    bg = "bg-indigo-700";
    tasktomap = progress;
  }
  if (status === "done") {
    bg = "bg-purple-700";
    tasktomap = done;
  }

  return (
    <div
      ref={drop}
      className={`w-full shadow-2xl rounded-md py-2 sm:w-80 pb-6 h-fit bg-slate-500 mx-auto ${
        isOver ? "bg-gray-900 " : ""
      }`}
    >
      <Header status={status} bg={bg} text={text} count={tasktomap.length} />
      {tasktomap.map((task) => (
        <SingleTask
          key={task.id}
          task={task}
          tasks={tasks}
          settasks={settasks}
        />
      ))}
    </div>
  );
}
function Header({ status, text, bg, count }) {
  let { tasks, todos, settodos, progress, setprogress, done, setdone } =
    useContext(Context);
  return (
    <div className="px-1 flex flex-col items-center  ">
      <h2
        className={`capitalize flex items-center text-xl px-1.5 rounded-md shadow-lg ${bg} text-white w-full`}
      >
        {status}
        <span className="text-sm w-5 h-5 flex justify-center items-center text-gray-800 ml-2 rounded-full bg-white ">
          {" "}
          {count}
        </span>
      </h2>
    </div>
  );
}
function SingleTask({ task, tasks, settasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  function handleRemove(id) {
    const newTask = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    settasks(newTask);
    toast.success("Task Deleted SuccessFully");
  }
  return (
    <div
      ref={drag}
      className={`flex justify-between ${
        isDragging ? "opacity-75 scale-105" : "opacity-100"
      } duration-50 ease-in px-2 mx-1 bg-slate-300 my-1 rounded-md shadow-xl items-center cursor-grab`}
    >
      <p>{task.name}</p>
      <button
        className="text-md font-extrabold cursor-pointer"
        onClick={() => handleRemove(task.id)}
      >
        <HiTrash />
      </button>
    </div>
  );
}
