"use client"
import React, { use } from "react"
import Image from "next/image"
import Eurequat from "./img/Eurequat.png"
import { useDispatch, useSelector } from "react-redux"
import { changeTool } from "./Store/features/toolSlice"
import { stat } from "fs"
import { inc } from "./Store/features/rvnSlice"
type HeaderParam =
{
    image:typeof Eurequat;
    tool:string
}
export default function Btn(props:HeaderParam)
{ 
  const dispatch=useDispatch()
  function add()
  {
    dispatch(inc())
  }
  return(
    <li className="my-3">
     <button onClick={()=>{dispatch(changeTool(props.tool)); if(props.tool=='AImg') add();} }  className="hover:bg-blue-800 rounded py-1 px-1 flex items-center justify-content">
      <Image src={props.image} alt="" />
     </button>
    </li> 
  )
}