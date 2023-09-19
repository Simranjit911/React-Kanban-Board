import  { useEffect,  useState } from "react";
import Createtask from "./components/Createtask";
import toast from "react-hot-toast";
import { Context } from "./Context";
import DialogBox from "./components/DialogBox";
import Listtasks from "./components/Listtasks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'
import Header from "./components/Header";
import DarkModeComponent from "./components/DarkModeComponent";

const App = () => {
  const [todos, settodos] = useState([]);
  const [progress, setprogress] = useState([]);
  const [done, setdone] = useState([]);
  const [tasks, settasks] = useState([]);
  const [task,settask]=useState({
    id:"",
    name:"",
    status:"todo",
  })
  const [showmsg, setshowmsg] = useState(false);

  //Window
  let [screenW, setscreenW] = useState(window.innerWidth);

function run(){

  if(screenW>450){
    return
  }else{
    setshowmsg(true)
  }
  setTimeout(()=>{
    setshowmsg(false)
    console.log("clear")
  },15000)
}
useEffect(()=>{
  run()
},[])
const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  return (
    <DndProvider backend={isTouchDevice? TouchBackend:HTML5Backend}>
      <DarkModeComponent/>
      <Context.Provider value={{ task, setshowmsg,settask,tasks,settasks,todos,settodos,progress,setprogress,done,setdone }}>
        <div className="bg-slate-200 h-screen w-screen">
          {showmsg ? (
            <DialogBox />
          ) : (
            <>
            <Header/>
              <Createtask />
              <Listtasks />
            </>
          )}
        </div>
      </Context.Provider>
      </DndProvider>
  );
};

export default App;
