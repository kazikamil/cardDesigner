"use client"
import React from "react"
import Eurequat from "./img/Eurequat.png"
import Image from "next/image";
import Tools from "./Tools";
import Design from "./Design";
export default function WorkSpace()
{
    return(
        <div className="w-full high2">
           <Tools/>
           <Design/>
        </div>
    )
}