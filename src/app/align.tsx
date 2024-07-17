"use client"
import React from "react";
import Image from "next/image";
import Eurequat from "./img/Eurequat.png"
import { useSelector } from "react-redux";
type HeaderParam=
{
    image:typeof Eurequat,
    opt:string
}
export default function Align(prop:HeaderParam)
{
    let alignTable=useSelector((state:any)=>state.align.alignTab)
    function align(opt:string)
    {
        if(alignTable.length==0)
           return;
        let val=0,i;
        switch (opt) {
            case 'ch':
                for(i=0;i<alignTable.length;i++)
                    val+=alignTable[i].current.offsetLeft;
                val=val/alignTable.length;
                for(i=0;i<alignTable.length;i++)
                    alignTable[i].current.style.left=val+'px';
                break;
            case 'cv':
                for(i=0;i<alignTable.length;i++)
                    val+=alignTable[i].current.offsetTop;
                val=val/alignTable.length;
                for(i=0;i<alignTable.length;i++)
                    alignTable[i].current.style.top=val+'px';
                break;
            case 'at':
                val=alignTable[0].current.offsetTop;
                for(i=1;i<alignTable.length;i++)
                    if(val>alignTable[i].current.offsetTop)
                       val=alignTable[i].current.offsetTop;
                for(i=0;i<alignTable.length;i++)
                    alignTable[i].current.style.top=val+'px';
                break;
            case 'al':
                val=alignTable[0].current.offsetLeft;
                for(i=1;i<alignTable.length;i++)
                    if(val>alignTable[i].current.offsetLeft)
                       val=alignTable[i].current.offsetLeft;
                for(i=0;i<alignTable.length;i++)
                    alignTable[i].current.style.left=val+'px';
                break;  
            case 'ab':
                val=alignTable[0].current.offsetTop;
                for(i=1;i<alignTable.length;i++)
                    if(val<alignTable[i].current.offsetLeft)
                       val=alignTable[i].current.offsetLeft;
                for(i=0;i<alignTable.length;i++)
                    alignTable[i].current.style.top=val+'px';
                break;
            case 'ar':
                val=alignTable[0].current.offsetLeft;
                for(i=1;i<alignTable.length;i++)
                    if(val<alignTable[i].current.offsetLeft)
                       val=alignTable[i].current.offsetLeft;
                for(i=0;i<alignTable.length;i++)
                    alignTable[i].current.style.left=val+'px';
                break;
        }
    }
     return(
        <li>
            <button onClick={()=>align(prop.opt)} className="p-1 h-7 w-7 hover:bg-slate-50">
                <Image src={prop.image} alt=""/>
            </button>
        </li>
     )
}