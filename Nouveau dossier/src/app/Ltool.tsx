"use client"
import React from "react";
import { useDispatch } from "react-redux";
import { setOption, setT, setVal } from "./Store/features/sizePos";
export default function Ltool()
{
    let dispacth=useDispatch()
    function handleChange(event:any)
    {
        dispacth(setT(event.target.value))
    }
    return(
        <form className="w-full h-full   flex justify-center ">
           
           <div className="flex items-center border-b border-slate-500 w-32  m-1 ml-10 ">
            <input onChange={(event)=>handleChange(event)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Thikness" aria-label="Full name"/>
           </div>
        </form>
    )
}