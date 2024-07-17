"use client"
import React from "react"
import Image from "next/image"
import Stool from "./Stool"
import Qtool from "./Qtool"
import Btool from "./Btool"
import Ttool from "./Ttool"
import Rtool from "./Rtool"
import { useSelector } from "react-redux"

export default function Tools()
{
    let tool:string=useSelector((state:any)=>state.tool.tool)
    switch(tool)
    {
        case "select":return(
                      <nav className="h-8 bg-white shadow md:flex md:justify-between md:items-center">
                       <Stool/>
                      </nav> 
                      )
        case "resize":return(
                      <nav className="h-8 bg-white shadow md:flex md:justify-between md:items-center">
                      <Rtool />
                      </nav> 
                      )
        case "barcode":return(
                      <nav className="h-8 bg-white shadow md:flex md:justify-between md:items-center">
                      <Btool/>
                      </nav> 
                      )   
        case "qr":return(
                      <nav className="h-8 bg-white shadow md:flex md:justify-between md:items-center">
                      <Qtool/>
                      </nav> 
                      )     
        case "txt":return(
                      <nav className="h-8 bg-white shadow md:flex md:justify-between md:items-center">
                      <Ttool/>
                      </nav> 
                      )                                                         
    }  
}