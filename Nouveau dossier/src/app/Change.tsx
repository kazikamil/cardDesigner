"use client"
import React from "react";
import Eurequat from "./img/Eurequat.png"
import Image from "next/image"
import { rotate } from "./Store/features/rotateSlice"
import { useDispatch } from "react-redux";
import { changeS } from "./Store/features/rvnSlice";
type HeaderParams=
{
    image:typeof Eurequat,
    class:string
}
export default function Change(props:HeaderParams)
{
  const dispatch=useDispatch()
  let name=`absolute ${props.class} bg-white p-2 h-10 w-10`  
  function change()
  {
    if(props.class=="position2 top-0")
       dispatch(changeS());
    else
       dispatch(rotate());
       
  }
  return(
    <button className={name} onClick={()=>change()}>
        <Image src={props.image} alt=""/>
    </button>
  )
}
