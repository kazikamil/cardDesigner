"use client"
import React, { useRef } from "react";
import Rec from "./img/recver.png"
import Rot from  "./img/rotate.png"
import Change from "./Change";
import { useDispatch, useSelector } from "react-redux";
import Picture from "./Picture";
export default function Design()
{

   let composantsR=[]
   let composantsV=[]
   let containerRef=useRef<HTMLDivElement>(null)
   let cla:string=useSelector((state:any)=>state.rotate.class)
   let clas:string=`border border-solid border-black ${cla} relative`
   let rv:string=useSelector((state:any)=>state.rvn.rectVers)
   let nr=useSelector((state:any)=>state.rvn.nr)
   let nv=useSelector((state:any)=>state.rvn.nv)
   for(let i=0;i<nr;i++)
      {
         composantsR.push(<Picture key={i} containerRef={containerRef}/>)
      }
   for(let i=0;i<nv;i++)
      {
         composantsV.push(<Picture key={i} containerRef={containerRef}/>)
      }   

   return(
   <div ref={containerRef} className="h-full w-full flex p-20 justify-center h-screen">
        <div className={clas}>
          <div id="recto" className={rv=='v'?"hidden":""}>
             {composantsR}
          </div>
          <div id="verso" className={rv=='r'?"hidden":""}>
              {composantsV}
          </div>
        <Change image={Rec} class="position1 right-0" />
        <Change image={Rot} class="position2 top-0" />
        </div>
        
   </div>)
}
