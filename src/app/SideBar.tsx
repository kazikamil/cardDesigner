"use client"
import React, { useState } from "react"
import Eurequat from "./img/Eurequat.png"
import Image, { StaticImageData } from "next/image";
import Btn from "./Btn";
import add from "./img/Add.png"
import AImg from "./img/AImg.png"
import Brc from "./img/Brc.png"
import Resize from "./img/Resize.png"
import txt from "./img/Txt.png"
import ImageLib from "./img/ImgLib.png"
import Qr from "./img/Qr.png"
import Garbage from "./img/garbage.svg"
import Line from './img/Line.png'
import select from './img/Select.svg'
type ImgC=
{
  image:typeof Eurequat
  clicked:boolean
  tool:string
}
const images:ImgC[]=[
  {image:select,clicked:false,tool:"select"},
  {image:add,clicked:false,tool:"add"},
  {image:Resize,clicked:false,tool:"resize"},
  {image:txt,clicked:false,tool:"txt"},
  {image:Qr,clicked:false,tool:"qr"},
  {image:ImageLib,clicked:false,tool:""},
  {image:Brc,clicked:false,tool:"barcode"},
  {image:AImg,clicked:false,tool:"AImg"},
  {image:Garbage,clicked:false,tool:"Supp"},
  {image:Line,clicked:false,tool:"line"},
]
export default function SideBar()
{
    //const [option,setOption]=useState("sl")
    return(
        <div className="p-1 w-10  bg-neutral-800 ">
          <ul>
            {images.map((image,index)=>(
              <Btn key={index} image={image.image} tool={image.tool}/>
            ))}   
          </ul>
        </div>
    )
}