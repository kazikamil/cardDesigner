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
  tool:string,
  toolTip:string
}
const images:ImgC[]=[
  {image:select,clicked:false,tool:"select",toolTip:"Déplacer un élement"},
  {image:add,clicked:false,tool:"add",toolTip:"Ajouter un élement avec la souris"},
  {image:Resize,clicked:false,tool:"resize",toolTip:"Redimensionner un élement"},
  {image:txt,clicked:false,tool:"txt",toolTip:"Ajouter un texte"},
  {image:Qr,clicked:false,tool:"qr",toolTip:"Ajouter un QrCode"},
  //{image:ImageLib,clicked:false,tool:"",toolTip:""},
  {image:Brc,clicked:false,tool:"barcode",toolTip:"Ajouter un code barre"},
  {image:AImg,clicked:false,tool:"AImg",toolTip:"Ajouter un élement"},
  {image:Garbage,clicked:false,tool:"Supp",toolTip:"Supprimer un élement"},
  //{image:Line,clicked:false,tool:"line",toolTip:"Ajouter une ligne"},
]
export default function SideBar()
{
    //const [option,setOption]=useState("sl")
    return(
        <div className="p-1 w-10  bg-neutral-800 ">
          <ul>
            {images.map((image,index)=>(
              <Btn key={index} image={image.image} tool={image.tool} toolTip={image.toolTip}/>
            ))}   
          </ul>
        </div>
    )
}