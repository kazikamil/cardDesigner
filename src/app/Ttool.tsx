"use client"
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, setF, setSize, setTxt } from "./Store/features/textSlice";
import {ChromePicker} from 'react-color'
export default function Ttool()
{
    let color=useSelector((state:any)=>state.text.color)
    let [display,setD]=useState('hidden')
    let dispatch=useDispatch();
    function handleChange(event:any)
    {
      dispatch(setTxt(event.target.value))
    }
    function handleP(event:any)
    {
      dispatch(setSize(event.target.value))
    }
    function handleF(event:any)
    {
      dispatch(setF(event.target.value))
    }
    function handleC()
    {
      setD(display=='hidden'?'':'hidden')
    }
    function handleCo(newC:any)
    {
       dispatch(setColor(newC.hex))
    }
    return(
        <form className="w-full h-full   flex justify-center ">
           <div className="flex items-center border-b border-slate-500 w-50 m-1 mr-10 ">
            <input onChange={(event)=>{handleChange(event)}} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="text" aria-label="Full name"/>
           </div>
           <div className="flex items-center border-b border-slate-500 w-20 m-1 mr-10 ">
            <input onChange={(event)=>handleP(event)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="0px" aria-label="Full name"/>
           </div>
            <select onChange={handleF} className="block appearance-none w-30  border-b border-slate-500 hover:border-gray-500 px-4 pr-8  leading-tight focus:outline-none focus:shadow-outline m-1">
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier New</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Palatino Linotype">Palatino Linotype</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
           <div className="inline-block relative w-30 "> 
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
           </div> 
           <div className="flex items-center mt-1.5 h-5 w-5 w-50 ml-10" >
             <div onClick={handleC} className="h-5 w-5" style={{backgroundColor:color=='#ffffff'?'black':color,border:'solid',borderColor:'black',borderWidth:'1px'}}> </div>
             <ChromePicker onChange={handleCo} color={color} className={display=='hidden'?'hidden':'chrome'}/>
           </div>
        </form>
    )
}