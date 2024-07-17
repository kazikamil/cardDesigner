"use client"
import React from "react"
import Eurequat from "./img/Eurequat.png"
import Image from "next/image";
import { Xslt, XmlParser } from 'xslt-processor'
import { toPng } from "html-to-image";
var htmlString:any;
var xsltString:string=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>
    
    <!-- Template to match the root element -->
    <xsl:template match="/">
        ^XA
        <xsl:apply-templates/>
        ^XZ
    </xsl:template>
    
    <!-- Template to match the div with id 'qrcode' -->
    <xsl:template match="div[@title='qrcode']">
        <xsl:text>^FO</xsl:text><xsl:value-of select="@x"/><xsl:text>,</xsl:text><xsl:value-of select="@y"/>
        <xsl:text>&#10;</xsl:text>
        <xsl:text>^BQN,</xsl:text><xsl:value-of select="@width"/><xsl:text>,</xsl:text><xsl:value-of select="@height"/>
        <xsl:text>&#10;</xsl:text>
        <xsl:text>^FDQA,</xsl:text>
        <xsl:value-of select="@data-content"/>
        <xsl:text>^FS</xsl:text>
        <xsl:text>&#10;</xsl:text>
    </xsl:template>
    <xsl:template match="div[@title='barcode']">
        <xsl:text>^FO</xsl:text><xsl:value-of select="@x"/><xsl:text>,</xsl:text><xsl:value-of select="@y"/>
        <xsl:text>&#10;</xsl:text>
        <xsl:text>^BY</xsl:text><xsl:value-of select="@width"/>
        <xsl:text>&#10;</xsl:text>
        <xsl:text>^BCN,100,Y,N</xsl:text>
        <xsl:text>^FD; </xsl:text>
        <xsl:value-of select="@data-content"/>
        <xsl:text>^FS</xsl:text>
        <xsl:text>&#10;</xsl:text>
    </xsl:template>
</xsl:stylesheet>`;
const xslt = new Xslt();
const xmlParser = new XmlParser();
export default function Navbar(){
    const getZpl=async()=>{
        htmlString=document.getElementById('recto')?.innerHTML
        let zpl=await xslt.xsltProcess(
            xmlParser.xmlParse(htmlString),
            xmlParser.xmlParse(xsltString)
        );

    }
    const convertHtmlToPng = async (element:any) => {
        try {
          const dataUrl = await toPng(element);
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
        let blob=await convertHtmlToPng(element)
        return blob;
    }
    const print = async () => {
        let zpl=await getZpl()
        let blob= await getBlob()
    }
    return(
      <nav className="h-12 bg-white shadow md:flex md:justify-between md:items-center">
       <a href="https://www.eurequat-algerie.com/"><Image src={Eurequat} alt="Eurequat" className="ml-6 inline cursor-pointer"/></a>
       <ul className="md:flex md:items-center mr-5">
        <li className="mx-4">
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded-full">Download</button>
        </li>
        <li className="mx-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-1 px-6 rounded-full" onClick={print}>Print</button>
        </li>
       </ul>
      </nav>
    );
}