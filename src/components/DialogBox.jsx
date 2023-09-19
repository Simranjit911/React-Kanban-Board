import React from "react";
import { RxCross2 } from "react-icons/rx";
import img from "../assets/img.webp";
import { useContext } from "react";
import { Context } from "../Context";

const DialogBox = () => {
  let {setshowmsg}=useContext(Context)
  return (
    <div className="flex flex-col px-3 py-3 items-center bg-white h-full justify-center">
      <div className="bg-gray-600 shadow-2xl flex flex-col rounded-md px-3 py-2">
      <button className="self-end scale:hover-110 duration-200 text-lg font-semibold" onClick={()=>setshowmsg(false)}>
        <RxCross2 />
      </button>
        <p className="text-lg font-bold text-center  text-black">
          Attention!{" "}
        </p>
        <p className="font-medium ">
          It is recommended to use this site on PC or Desktop to get better User
          Experience.Currently If you don't have Desktop,You Can <span className="font-semibold">
            Enable Desktop
          Site </span> on Your Mobile Device.
        </p>
        <img src={img} alt="" className="my-3" />
      </div>
    </div>
  );
};

export default DialogBox;
