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
        let components:any=[]
        
        if(alignTable.length==0)
           return;
        for(let component of alignTable)
        {
            let e:any=document.getElementById(component)
            components.push(e)
        }
        let val=0,i;
        switch (opt) {
            case 'ch':
                for(i=0;i<alignTable.length;i++)
                    val+=components[i].offsetLeft;
                val=val/alignTable.length;
                for(i=0;i<alignTable.length;i++)
                    components[i].style.left=val+'px';
                break;
            case 'cv':
                for(i=0;i<alignTable.length;i++)
                    val+=components[i].offsetTop;
                val=val/alignTable.length;
                for(i=0;i<alignTable.length;i++)
                    components[i].style.top=val+'px';
                break;
            case 'at':
                val=components[0].offsetTop;
                for(i=1;i<alignTable.length;i++)
                    if(val>components[i].offsetTop)
                       val=components[i].offsetTop;
                for(i=0;i<alignTable.length;i++)
                    components[i].style.top=val+'px';
                break;
            case 'al':
                val=components[0].offsetLeft;
                for(i=1;i<alignTable.length;i++)
                    if(val>components[i].offsetLeft)
                       val=components[i].offsetLeft;
                for(i=0;i<alignTable.length;i++)
                    components[i].style.left=val+'px';
                break;  
            case 'ab':
                val=components[0].offsetTop;
                for(i=1;i<alignTable.length;i++)
                    if(val<components[i].offsetLeft)
                       val=components[i].offsetLeft;
                for(i=0;i<alignTable.length;i++)
                    components[i].style.top=val+'px';
                break;
            case 'ar':
                val=components[0].offsetLeft;
                for(i=1;i<alignTable.length;i++)
                    if(val<components[i].offsetLeft)
                       val=components[i].offsetLeft;
                for(i=0;i<alignTable.length;i++)
                    components[i].style.left=val+'px';
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