"use client"
import React, { use, useState } from "react"
import { useRef,useEffect } from "react";
import {Resizable} from "react-resizable"
import 'react-resizable/css/styles.css'
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "./Store/features/align";
import textSlice from "./Store/features/textSlice";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
type HeaderParam={
  containerRef:any
}
export default function Picture(props:HeaderParam)
{
    let Bcolor=useSelector((state:any)=>state.sizePos.backC)
    let [Bco,setBco]=useState({r:255,g:0,b:0,a:1})
    let color=useSelector((state:any)=>state.text.color) 
    let hidden=useSelector((state:any)=>state.api.hidden) 
    let [cl,setCl]=useState('black')
    let value=useSelector((state:any)=>state.api.value)
    let [valueC,setValue]=useState('')
    let qr=useSelector((state:any)=>state.api.qr)
    let [cuQr,setCuQr]=useState('')
    let font=useSelector((state:any)=>state.text.font)
    let [fn,setFont]=useState('')
    let px=useSelector((state:any)=>state.text.size)
    let [size,setS]=useState(0)
    let [ImageSrc,SetSrc]=useState<string|ArrayBuffer|null>('')
    let alignTable=useSelector((state:any)=>state.align.alignTab)
    let [index,setInd]=useState(0)
    let dispatch=useDispatch()
    let [Clicked,setClicked]=useState(false)
    let val=useSelector((state:any)=>state.sizePos.val)
    let opt=useSelector((state:any)=>state.sizePos.option)
    let txt=useSelector((state:any)=>state.text.text)
    let tool:string=useSelector((state:any)=>state.tool.tool)
    let display:string="";
    let style:string="";
    let [text,setText]=useState('') 
    let [cWidth,setCWidth]=useState(0)
    let [cHeight,setCHeight]=useState(0)
    let [cY,setCY]=useState(0)
    let [cX,setCX]=useState(0)
    if (tool=="resize"&&Clicked)
       {style="border-dashed border-black border-2"
       }
    else if(Clicked)
       {
        display='hidden'
        style="border-solid border-black border-2"        
       }       
    else style=""    
    const ref = useRef(null);
    const refLeft = useRef(null);
    const refTop = useRef(null);
    const refRight = useRef(null);
    const refBottom = useRef(null);
    const containerRef = props.containerRef
    
    
  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })
  
    useEffect(() => {
      console.log(tool+"hi")
      if(tool=='select') return;
      const resizeableEle:any = ref.current;
      const styles = window.getComputedStyle(resizeableEle);
      let width = parseInt(styles.width, 10);
      let height = parseInt(styles.height, 10);
      setCWidth(width);
      setCHeight(height)
      let x = 0;
      let y = 0;
  
      // Right resize
      const onMouseMoveRightResize = (event:any) => {
        const dx = event.clientX - x;
        x = event.clientX;
        setCX(x)
        width = width + dx;
        resizeableEle.style.width = `${width}px`;
        setCWidth(width);
      };
  
      const onMouseUpRightResize = (event:any) => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
      };
  
      const onMouseDownRightResize = (event:any) => {
        x = event.clientX;
        setCX(x)
        resizeableEle.style.left = styles.left;
        resizeableEle.style.right = null;
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };
  
      // Top resize
      const onMouseMoveTopResize = (event:any) => {
        const dy = event.clientY - y;
        height = height - dy;
        setCHeight(height)
        y = event.clientY;
        setCY(y)
        resizeableEle.style.height = `${height}px`;
        
      };
  
      const onMouseUpTopResize = (event:any) => {
        document.removeEventListener("mousemove", onMouseMoveTopResize);
      };
  
      const onMouseDownTopResize = (event:any) => {
        y = event.clientY;
        const styles = window.getComputedStyle(resizeableEle);
        setCY(y)
        resizeableEle.style.bottom = styles.bottom;
        resizeableEle.style.top = null;
        document.addEventListener("mousemove", onMouseMoveTopResize);
        document.addEventListener("mouseup", onMouseUpTopResize);
      };
  
      // Bottom resize
      const onMouseMoveBottomResize = (event:any) => {
        const dy = event.clientY - y;
        height = height + dy;
        y = event.clientY;
        setCY(y)
        setCHeight(height)
        resizeableEle.style.height = `${height}px`;
      };
  
      const onMouseUpBottomResize = (event:any) => {
        document.removeEventListener("mousemove", onMouseMoveBottomResize);
      };
  
      const onMouseDownBottomResize = (event:any) => {
        y = event.clientY;
        setCY(y)
        const styles = window.getComputedStyle(resizeableEle);
        resizeableEle.style.top = styles.top;
        resizeableEle.style.bottom = null;
        document.addEventListener("mousemove", onMouseMoveBottomResize);
        document.addEventListener("mouseup", onMouseUpBottomResize);
      };
  
      // Left resize
      const onMouseMoveLeftResize = (event:any) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width - dx;
        setCWidth(width)
        resizeableEle.style.width = `${width}px`;
      };
  
      const onMouseUpLeftResize = (event:any) => {
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
      };
  
      const onMouseDownLeftResize = (event:any) => {
        x = event.clientX;
        resizeableEle.style.right = styles.right;
        resizeableEle.style.left = null;
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        document.addEventListener("mouseup", onMouseUpLeftResize);
      };
  
      // Add mouse down event listener
      const resizerRight:any = refRight.current;
      resizerRight.addEventListener("mousedown", onMouseDownRightResize);
      const resizerTop:any = refTop.current;
      resizerTop.addEventListener("mousedown", onMouseDownTopResize);
      const resizerBottom:any = refBottom.current;
      resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
      const resizerLeft:any = refLeft.current;
      resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
  
      return () => {
        resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
        resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
        resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
        resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
      };
    }, [tool]);
    useEffect(()=>{
      if(Clicked&&tool=='select'&&ref.current)
      {
         let Ele:any=ref.current
         switch (opt) {
          case 'y':
               Ele.style.top=val+"px"
               setCY(val)
              // console.log("top:"+Ele.style.top)
            break;
          case 'x':
               Ele.style.left=val+'px'
               setCX(val)
               //console.log("left:"+Ele.style.left)
            break;    
         }
      }
    },[val])
    useEffect(()=>{
      if(Clicked&&tool=='resize'&&ref.current)
      {
         let Ele:any=ref.current
         switch (opt) {
          case 'w':
               Ele.style.width=val+"px"
               setCWidth(val)
              // console.log("top:"+Ele.style.top)
            break;
          case 'h':
               Ele.style.height=val+'px'
               setCHeight(val)
               //console.log("left:"+Ele.style.left)
            break;    
         }
      }
    },[val])
    useEffect(()=>{
      if(Clicked) setBco(Bcolor)
    },[Bcolor])
    useEffect(() => {
      if (!ref.current || !containerRef.current || tool=='resize') return;
  
      const box :any = ref.current;
      const container = containerRef.current;
  
  
      const onMouseDown = (e: MouseEvent) => {
        isClicked.current = true;
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;
      }
  
      const onMouseUp = (e: MouseEvent) => {
        isClicked.current = false;
        coords.current.lastX = box.offsetLeft;
        coords.current.lastY = box.offsetTop;
      }
  
      const onMouseMove = (e: MouseEvent) => {
        if (!isClicked.current) return;
  
        const nextX = e.clientX - coords.current.startX + coords.current.lastX;
        const nextY = e.clientY - coords.current.startY + coords.current.lastY;
  
        box.style.top = `${nextY}px`;
        box.style.left = `${nextX}px`;
        setCY(nextY)
        setCX(nextX)
      }
  
      box.addEventListener('mousedown', onMouseDown);
      box.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseUp);
  
      const cleanup = () => {
        box.removeEventListener('mousedown', onMouseDown);
        box.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseUp);
      }
  
      return cleanup;
    }, [tool])
    useEffect(()=>{
      if(Clicked&&tool=='txt')
        { setText(txt); SetSrc('')}
    },
    [txt])
    useEffect(()=>{
      if(Clicked) setS(px)
    },[px])
    useEffect(()=>{
      if(Clicked) setFont(fn)
    },[font])
    useEffect(()=>{
      if(Clicked) setValue(value)
        console.log(valueC)
    },[value])
    useEffect(()=>{
      if(Clicked) setCuQr(qr)
        console.log(qr)
    },[qr])
    useEffect(()=>{
      if(Clicked) setCl(color)
    },[color])
    function changeC()
    {
      if(Clicked){
          setClicked(false)
          dispatch(remove(index))
        }
      else if(!Clicked){
         setClicked(true);
         dispatch(add(ref))
         index=alignTable.length-1
         console.log('h'+alignTable[0]+alignTable[1])
        }  
    } 
    function handleClick()
    {
       document.getElementById("fileInput")?.click();
    }
    function handleFileChange(event:any)
    {
      const file=event.target.files[0];
      const reader= new FileReader()
      reader.onload=(e)=>{
        if(e.target&&e.target.result)
           SetSrc(e.target.result)
           setText('')
      }
      reader.readAsDataURL(file)
    }
    return (
       //<div ref={containerRef} className="container">
        <div ref={ref} className={"resizeable "+style} onClick={()=>changeC()} onDoubleClick={handleClick} style={{backgroundColor:`rgba(${Bcolor.r},${Bcolor.g},${Bcolor.b},${Bcolor.a})`}}>
          <input id="fileInput" type="file" style={{display:'none'}} onChange={handleFileChange} />
          <p className={text==''?'hidden':''} style={{fontSize:size+'px',fontFamily:font,color:cl}}>{text}</p>
          <img className={ImageSrc==""? 'hidden':''} src={ImageSrc?(typeof ImageSrc==='string'?ImageSrc:''):''} style={{width:'100%',height:'100%',objectFit:'contain'}} />
          <div width={cWidth} height={cHeight} x={cX} y={cY} title="barcode" className={(valueC==""||hidden)? 'hidden':''}>
            <Barcode value={valueC}/>
          </div>
          <div height={cHeight} title="qrcode" x={cX} y={cY} className={(cuQr==""||hidden)? 'hidden':'w-full h-full'}>
             <QRCode className="w-full h-full" value={cuQr} />
          </div>
          <div ref={refLeft} className={"resizer resizer-l "+display}></div>
          <div ref={refTop} className={"resizer resizer-t "+display}></div>
          <div ref={refRight} className={"resizer resizer-r "+display}></div>
          <div ref={refBottom} className={"resizer resizer-b "+display}></div>
        </div>
       
    );
}