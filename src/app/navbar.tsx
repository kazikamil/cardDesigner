"use client"
import React, { useEffect, useState } from "react"
import Eurequat from "./img/Eurequat.png"
import Restart from "./img/rotate.png"
import Image from "next/image";
import { Xslt, XmlParser } from 'xslt-processor'
import { toPng } from "html-to-image";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { changeHidden } from "./Store/features/api";
var htmlString:any;
export default function Navbar(){
    let dispatch = useDispatch()
    let hidden=useSelector((state:any)=>state.api.hidden)
    let elements=useSelector((state:any)=>state.config.elements)
    let lWidth=useSelector((state:any)=>state.config.lWidth)
    let lHeight=useSelector((state:any)=>state.config.lHeight)
    let density=useSelector((state:any)=>state.config.density)
    let [printer,setPrinter]=useState<any>({})
    let [printers,setPrinters]=useState<any>([])
    var device :any
    let [deviceName,setName]=useState('')
    const getZpl=async()=>{
        let rect=document.getElementById('recto')
        htmlString=rect?.innerHTML
        htmlString=`<root>${htmlString}</root>`
        console.log(htmlString)
    try {
    const response = await fetch('http://127.0.0.1:5000/transform', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml'
        },
        body: htmlString
    });
    if (response.ok) {
        const result = await response.text();
        return result
    } else {
        const errorText = await response.text();
        console.log(errorText)
    }
} catch (error) {
    console.log(error)
}
        
    }
    const convertHtmlToPng = async (element:any) => {
        try {
          console.log("hi")
          console.log({element})
          element.style.height = '500px'; // or any other fixed height for testing

          console.log('Element dimensions:', element.offsetWidth, element.offsetHeight);
          console.log('Element visibility:', getComputedStyle(element).display);
          const dataUrl = await toPng(element);
          console.log("hello")
          console.log(dataUrl)
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          return blob;
        } catch (error) {
          console.error('Erreur lors de la conversion HTML en PNG :', error);
          throw error;
        }
      };
    const getBlob = async () => {
        let element=document.getElementById('recto')
        console.log("elem")
        let blob=await convertHtmlToPng(element)
        console.log(blob)
        return blob;
    }
    function writeToSelectedPrinter(dataToWrite:any ) {
        console.log(device)
        printer.send(dataToWrite, undefined, errorCallback)
    }
    var errorCallback = function(errorMessage:any) {
        alert("Error: " + errorMessage);
    }
    function sendImage(blob:any) {
        printer.convertAndSendFile(blob, undefined, errorCallback);
    }
    const print = async () => {
        dispatch(changeHidden())
        console.log({printer})
        console.log("moi")
        let zpl:any
        setTimeout(async()=>{
        console.log({hidden})
        zpl=await getZpl()
        console.log({zpl})
        //writeToSelectedPrinter(zpl);
        dispatch(changeHidden())
        },3000)
        //dispatch(changeHidden())
       
        

        /*setTimeout(function() {
            sendImage(blob);
            dispatch(changeHidden())
        }, 1000); // Delay to ensure the barcode prints before the image*/
    }
    useEffect(()=>{
        const script = document.createElement('script');
    script.src = 'http://localhost:3000/BrowserPrint-3.1.250.min.js';
    script.onload = () => {
      // Initialisation du SDK Zebra Browser Print
      console.log('Zebra Browser Print SDK Loaded');
      // Vous pouvez ajouter d'autres configurations ou initialisations ici
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
    },[])
    const connect=()=>
    {
        let win:any=window
        console.log(win.BrowserPrint)
        win.BrowserPrint.getLocalDevices((devices:any) => {
            console.log({devices})
            setPrinters(devices.printer)
            device= devices.printer[0];
            console.log(device)
            console.log(device.name)
            setName(device.name)
            setPrinter(device)
          }, () => {
            console.error('Failed to get printers');
          });
    }
    useEffect(()=>{
        connect()
        }
    ,
    [])
    const download = ()=>{
        let xml=`<?xml version="1.0" encoding="utf-8"?>
        <ThermalLabel Density="${density}" UnitType="Cm" Width="${lWidth}" Height="${lHeight}"> \n`
        console.log(elements)
        for(let element of elements)
        {
            console.log(element)
            if(element.cuQr)
            {
                xml+=`<qrCode Symbology="QrCode" X="${element.cmX}" Y="${element.cmY}" Height="${element.cmHeight}" Code="${element.cuQr}"/>\n`
            }
            else if(element.valueC)
            {
                xml+=`<barcodeItem Symbology="${element.bType}" X="${element.cmX}" Y="${element.cmY}" Height="${element.cmHeight}" Width="${element.cmWidth}" Code="${element.valueC}"/>\n`
            }
            else if (element.text)
            {
                xml+=`<textItem X="${element.cmX}" Y="${element.cmY}" Height="${element.cmHeight}" Width="${element.cmWidth}"  Text="${element.text}" Font="${element.fn}"/>\n`
            }
            else if (element.imgData)
            {
                xml+=`<image X="${element.cmX}" Y="${element.cmY}" src="${element.ImageSrc}"
                data="${element.imgData}"/>\n`
            }
        }
        xml+='</ThermalLabel>'
        console.log({xml})
        const blob = new Blob([xml], { type: 'application/xml' });

        // Créer un lien de téléchargement
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'file.xml'; // Nom du fichier à télécharger

        // Ajouter le lien au document et déclencher le téléchargement
        document.body.appendChild(a);
        a.click();

        // Nettoyer le document après le téléchargement
        document.body.removeChild(a);
    }
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch('/api');
              const result = await response.json();
              console.log({result})
              setTimeout(async () =>{
                if(printer.send)
                {
                    console.log('send')
                    writeToSelectedPrinter(result)
                }
            },10000)
            } catch (error) {
              console.error('Error fetching file data:', error);
            }
          };
          fetchData();
    },[printer])
    return(
      <nav className="h-12 bg-white shadow md:flex md:justify-between md:items-center">
       <a href="https://www.eurequat-algerie.com/"><Image src={Eurequat} alt="Eurequat" className="ml-6 inline cursor-pointer"/></a>
       <ul className="md:flex md:items-center mr-5">
        <li className="mx-4 flex space-x-2 items-center ">
            
            {
                deviceName?
                <div className="flex flex-col items-center">
                  <select onChange={(event)=>{setPrinter(printers[event.target.value])}}  className="block appearance-none text-base h-7 w-30  border-b border-slate-500 hover:border-gray-500 px-4 pr-8 text-xs  leading-tight focus:outline-none focus:shadow-outline m-1">
                  {printers.map((item:any, index:number) => (
                    <option value={index}>{item.name}</option>
                   ))}
                  </select>
                  <div className="inline-block  left-28 relative w-30 px-14 bottom-5 "> 
                    <div className="pointer-events-none absolute left-[55px] inset-y-0 right-0 flex items-center px-0 text-gray-700">
                      <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                 </div>
                </div>

                
                : <div>any device available</div>
            }
            <Image src={Restart} alt="Restart" className="w-5 h-5" onClick={connect}/>
        </li>
        <li className="mx-4">
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded-full" onClick={download}>Download</button>
        </li>
        <li className="mx-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-1 px-6 rounded-full" onClick={print}>Print</button>
        </li>
       </ul>
      </nav>
    );
}