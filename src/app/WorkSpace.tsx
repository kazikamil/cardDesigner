"use client"
import React, { useEffect, useState } from "react"
import Eurequat from "./img/Eurequat.png"
import Image from "next/image";
import Tools from "./Tools";
import Design from "./Design";
import { useDispatch, useSelector } from "react-redux";
import { setMax } from "./Store/features/conifg";
export default function WorkSpace()
{
    let [key,setKey]=useState('')
    let [press,setPress]=useState(0)
    let max=useSelector((state:any)=>state.config.max)
  let dispatch=useDispatch()
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      
      if (event.key === '+') {
           setKey(event.key)
      } else if (event.key === '-') {
          setKey(event.key)
      }
      setPress((prev:any)=>prev+1)
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])
  useEffect(()=>{
    if(key==='+')
    {
      if(max<15)
        dispatch(setMax(max+5))
    }
    else if(key==='-')
    {
      if(max>5)
        dispatch(setMax(max-5))
    }
  },[press])
    return(
        <div className="w-full high2">
           <Tools/>
           <Design/>
        </div>
    )
}