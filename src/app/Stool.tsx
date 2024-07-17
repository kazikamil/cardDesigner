"use client"
import React, { useState } from "react"
import Align from "./align"
import ab from "./img/ab.png"
import ar from "./img/ar.png"
import al from "./img/al.png"
import at from "./img/at.png"
import cv from "./img/cv.png"
import ch from "./img/ch.png"
import { useDispatch, useSelector } from "react-redux"
import { setBC, setOption, setVal } from "./Store/features/sizePos"
import { setColor } from "./Store/features/textSlice"
import { ChromePicker } from "react-color"
export default function Stool(){
    let color=useSelector((state:any)=>state.sizePos.backC)
    let [display,setD]=useState('hidden')

    let dispatch=useDispatch()
    function handleChange(event:any,opt:string)
    {
        dispatch(setOption(opt))
        dispatch(setVal(event.target.value))
    }
    function handleC()
    {
      setD(display=='hidden'?'':'hidden')
    }
    function handleCo(newC:any)
    {
       dispatch(setBC(newC.rgb))
    }
    return(
        <ul className="flex items-center justify-center w-full h-full">
          <ul className="md:flex md:items-center h-full ml-60 ">
              <Align image={al} opt='al'/>
              <Align image={cv} opt='cv'/>
              <Align image={ar} opt='ar'/>
              <Align image={at} opt='at'/>
              <Align image={ch} opt='ch'/>
              <Align image={ab} opt='ab'/>
          </ul>
          <form className="w-full max-w-sm h-full ml-20  flex">
           <div className="flex items-center border-b border-slate-500 w-20 m-1 ">
            <input onChange={(event)=>{handleChange(event,'x')}} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="X" aria-label="Full name"/>
           </div>
           <div className="flex items-center border-b border-slate-500 w-20  m-1 ml-10 ">
            <input onChange={(event)=>{handleChange(event,'y')}} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Y" aria-label="Full name"/>
           </div>
           <div className="flex items-center mt-1.5 h-5 w-5 w-50 ml-10" >
             <div onClick={handleC} className="h-5 w-5" style={{backgroundColor:`rgba(${color.r},${color.g},${color.b},${color.a})`,border:'solid',borderColor:'black',borderWidth:'1px'}}> </div>
             <ChromePicker onChange={handleCo} color={color} className={display=='hidden'?'hidden':'chrome'}/>
           </div>
          </form>
        </ul>
    )
}