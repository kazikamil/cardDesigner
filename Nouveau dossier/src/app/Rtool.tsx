"use client"
import React from "react";
import { useDispatch } from "react-redux";
import { setOption, setVal } from "./Store/features/sizePos";
export default function Rtool()
{
    let dispacth=useDispatch()
    function handleChange(event:any,opt:string)
    {
        dispacth(setOption(opt))
        dispacth(setVal(event.target.value))
    }
    return(
        <form className="w-full h-full   flex justify-center ">
           <div className="flex items-center border-b border-slate-500 w-20 m-1 mr-10 ">
            <input onChange={(event)=>handleChange(event,"h")} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="H" aria-label="Full name"/>
           </div>
           <div className="flex items-center border-b border-slate-500 w-20  m-1 ml-10 ">
            <input onChange={(event)=>handleChange(event,"w")} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="W" aria-label="Full name"/>
           </div>
        </form>
    )
}