"use client"
import React from "react"
import { useDispatch} from "react-redux"
import { setQr } from "./Store/features/api"
export default function Qtool(){
    let dispatch =useDispatch()
    return(
        <form className="w-full h-full   flex justify-center ">
           <div className="flex items-center border-b border-slate-500 w-50 m-1 mr-10 *">
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="What you want to code?" aria-label="Full name"
            onChange={(event)=>{dispatch(setQr(event.target.value));console.log(event.target.value)}}/>
           </div>
        </form>
    )
}