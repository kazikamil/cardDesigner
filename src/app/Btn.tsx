"use client"
import React, { use, useState } from "react"
import Image from "next/image"
import Eurequat from "./img/Eurequat.png"
import { useDispatch, useSelector } from "react-redux"
import { changeTool } from "./Store/features/toolSlice"
import { stat } from "fs"
import { inc } from "./Store/features/rvnSlice"
import { pushDel } from "./Store/features/conifg"
type HeaderParam =
{
    image:typeof Eurequat;
    tool:string
}
export default function Btn(props:HeaderParam)
{ 
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const dispatch=useDispatch()
  let tool:any=useSelector((state:any)=>state.tool.tool)
  let ref:any=useSelector((state:any)=>state.config.deletedRef)
  function add()
  {
    dispatch(inc())
  }
  function handleDrop(event:any)
  {
    
      event.preventDefault();
        setIsDraggedOver(false)
        console.log({drop:'j'})
        const data = event.dataTransfer.getData("text/plain");
        console.log({data})
        dispatch(pushDel(parseInt(data)))
      
  }
  return(
    <li className="my-3">
    <button
      onDrop={handleDrop}
      onDragOver={(event:any)=>{setIsDraggedOver(true);event.preventDefault();}}
      onDragLeave={()=>setIsDraggedOver(false)}
      onClick={() => {
        dispatch(changeTool(props.tool));
        if (props.tool === 'AImg') add();
      }}
      className={`${isDraggedOver?'bg-red-600':''} ${props.tool!='Supp'?'hover:bg-blue-800':''} ${(props.tool === tool)&&tool!='Supp' ? "bg-blue-800" : ""} ${(props.tool === tool)&&tool=='Supp' ? "bg-red-600" : ""} rounded py-1 px-1 flex items-center justify-content`}
    >
      <Image src={props.image} alt="" />
    </button>
  </li>
  )
}