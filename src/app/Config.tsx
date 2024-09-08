"use client"
import React, { useEffect, useState } from "react"
import Eurequat from "./img/Eurequat.png"
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { changeDensity, changeNumber, changeQuality, pushBr, pushImg, pushQr, pushTxt, setAttr, setMax } from "./Store/features/conifg";
export default function Config()
{
    let max:any=useSelector((state:any)=>state.config.max)
    let dispatch=useDispatch()
    let [xml,setXml]=useState<any>()
    const handleFileChange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const xmlString = e.target.result as string;
    
          // Parser la chaîne XML en un document XML
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    
          // Fonction pour convertir un XML en JSON
          const xmlToJson = (xml: any) => {
            let obj: any = {};
    
            // Si l'élément a des enfants, on les parcourt
            if (xml.nodeType === 1) { // Élement
              // Attributs
              if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                  const attribute = xml.attributes.item(j);
                  obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
              }
            } else if (xml.nodeType === 3) { // Texte
              obj = xml.nodeValue;
            }
    
            // Traiter les enfants
            if (xml.hasChildNodes()) {
              for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;
                if (typeof obj[nodeName] === "undefined") {
                  obj[nodeName] = xmlToJson(item);
                } else {
                  if (typeof obj[nodeName].push === "undefined") {
                    const old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xmlToJson(item));
                }
              }
            }
            return obj;
          };
    
          const jsonResult = xmlToJson(xmlDoc);
          console.log("JSON Result:", jsonResult);
    
          // Vous pouvez stocker le JSON ou l'utiliser
          setXml(jsonResult);
          let thermalLabel=jsonResult.ThermalLabel['@attributes'];
          let qrCode=jsonResult.ThermalLabel.qrCode
          let barcodeItem=jsonResult.ThermalLabel.barcode
          let image=jsonResult.ThermalLabel.image
          let textItem=jsonResult.ThermalLabel.textItem
          dispatch(pushBr(barcodeItem))
          dispatch(pushImg(image))
          dispatch(pushQr(qrCode))
          dispatch(pushTxt(textItem))
          dispatch(setAttr(thermalLabel))
        }
      };
    
      reader.readAsText(file); // Lire le fichier comme texte brut
    };
    
    
    
    function handleClick()
    {
       document.getElementById(`fileInput`)?.click();
    }
    useEffect(()=>{
      console.log({xml})
    },[xml])
    return(
        <div className="w-80 high2 bg-white items-center flex flex-col justify-center space-y-10 font-semibold" >
            <div className="flex flex-col items-center space-y-3">
             <div className="font-bold">Densité d'impression</div>  
             <div> 
              <select onChange={(event)=>{dispatch(changeDensity(event.target.value))}} className="block appearance-none w-30  border-b border-slate-500 hover:border-gray-500 px-4 pr-8 text-xs  leading-tight focus:outline-none focus:shadow-outline m-1">
               <option value={'6.33'}>6 dpmm (152 dpi)</option>
               <option value={'9'}>8 dpmm (203 dpi)</option>
               <option value={'12'}>12 dpmm (300 dpi)</option>
               <option value={'24.33'}>24 dpmm (600 dpi)</option>
              </select>
              <div className="inline-block relative w-30 px-20 bottom-8 "> 
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
             </div> 
             </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
             <div className="font-bold">Qualite d'impression</div> 
             <div>
              <select onChange={(event)=>{dispatch(changeQuality(event.target.value))}} className="block appearance-none w-30  border-b border-slate-500 hover:border-gray-500 px-4 pr-8 text-xs  leading-tight focus:outline-none focus:shadow-outline m-1">
              <option value={'Grayscale'}>Grayscale</option>
              <option value={'Bitonal'}>Bitonal</option>
              </select>
             </div>  
             <div className="inline-block relative w-30 px-14 bottom-6 "> 
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
             </div> 
            </div>
            <div className="flex flex-col items-center space-y-3">
             <div className="font-bold">Nombre de labels</div>   
             <div className="flex items-center border-b border-slate-500 w-20 ">
             <input onChange={(event)=>{dispatch(changeNumber(event.target.value))}} className="appearance-none bg-transparent border-none w-full text-gray-700  leading-tight focus:outline-none" type="number" placeholder="0px" aria-label="Full name"/>
           </div>
           </div>
          { <div className="flex flex-col items-center space-y-3">
             <div className="font-bold">Zoom</div>   
             <div className="flex items-center border-b border-slate-500 w-20 ">
             <input value={max} min={5} max={15} step={5} onChange={(event)=>{dispatch(setMax(event.target.value))}} className="appearance-none bg-transparent border-none w-full text-gray-700  leading-tight focus:outline-none" type="number" placeholder="15" aria-label="Full name"/>
           </div>
            </div>
            }
            <div>
            <input  id={`fileInput`} type="file" style={{display:'none'}} onChange={handleFileChange} />
           <button onClick={handleClick} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-1 px-6 rounded-full">Upload Your Design</button>
           </div>
        </div>
    )
}