"use client"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { put, setBType } from "./Store/features/api";
export default function Btool(){
    let [type,Stype]=useState('C128')
    let bType=useSelector((state:any)=>state.api.bType) 
    let [code,setC]=useState('')
    let data;
    let dispatch=useDispatch()
    function Brequest(e:any){
        e.preventDefault();
        dispatch(put(e.target.value))
    }
    return(
        <form className="w-full h-full flex justify-center ">
           <div className="flex items-center border-b border-slate-500 w-50 m-1 mr-10 ">
            <input pattern={bType==="EAN8"?'^\d{7,8}$':`${bType==='pharmacode'?"^[3-9]\d{0,4}|1[01]\d{0,4}|12[0-7]\d{0,3}|130[0-9]\d{0,2}|1310[0-6]\d|131070$":`${bType==='codabar'?'^[ABCD][0-9\-\$\:\/\.\+]+[ABCD]$':'.*'}`}`}
             onChange={(event)=>dispatch(put(event.target.value))} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="What you want to code?" aria-label="Full name"/>
           </div>
            <select onChange={(event)=>dispatch(setBType(event.target.value))} className="block appearance-none w-30  border-b border-slate-500 hover:border-gray-500 px-4 pr-8 text-xs  leading-tight focus:outline-none focus:shadow-outline m-1">
              <option value={'CODE128'}>Code 128</option>
              <option value={'CODE39'}>Code 39</option>
              <option value={'EAN13'}>EAN-13</option>
              <option value={'EAN8'}>EAN-8</option>
              <option value={'pharmacode'}>pharmacode</option>
              <option value={'codabar'}>codabar</option>
            </select>
           <div className="inline-block relative w-30 "> 
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
           </div> 
        </form>
    )
}