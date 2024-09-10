"use client"
import React, { use, useState } from "react"
import { useRef,useEffect } from "react";
import {Resizable} from "react-resizable"
import 'react-resizable/css/styles.css'
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "./Store/features/align";
import textSlice, { setTxt } from "./Store/features/textSlice";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { addE, pushDel, setRef } from "./Store/features/conifg";

import '@fontsource/cairo/500.css'
import { setBType } from "./Store/features/api";
type HeaderParam={
  id:any,
  containerRef:any,
  cuQr?:any,
  x?:any,
  y?:any,
  valueC?:any,
  width?:any,
  type?:any,
  height?:any,
  text?:any,
  size?:any,
}
export default function Picture(props:HeaderParam)
{
    let pRef=useRef<any>(null)
    let imgRef=useRef<any>(null)
    let bRef=useRef<any>(null)
    let [textY,setTextY]=useState(0)
    let Bcolor=useSelector((state:any)=>state.sizePos.backC)
    let density=useSelector((state:any)=>state.config.density)
    let [imgData,setImgData]=useState('')
    let [thikness,setThikness]=useState(0)
    let [Bco,setBco]=useState({r:255,g:0,b:0,a:1})
    let [dotsX,setDotsX]=useState(0)
    let [dotsY,setDotsY]=useState(0)
    let [dotsHeight,setDotsHeight]=useState(0)
    let [dotsWidth,setDotsWidth]=useState(0)
    let [fWeight,setWeight]=useState('100')
    let weight=useSelector((state:any)=>state.text.weight) 
    let bType=useSelector((state:any)=>state.api.bType) 
    let [type,setType]=useState<any>('CODE128')
    let thick=useSelector((state:any)=>state.sizePos.thick) 
    let color=useSelector((state:any)=>state.text.color) 
    let height=useSelector((state:any)=>state.config.height)
    let max=useSelector((state:any)=>state.config.max) 
    let hidden=useSelector((state:any)=>state.api.hidden) 
    let [cl,setCl]=useState('black')
    let value=useSelector((state:any)=>state.api.value)
    let [valueC,setValue]=useState('')
    let qr=useSelector((state:any)=>state.api.qr)
    let [cuQr,setCuQr]=useState('')
    let font=useSelector((state:any)=>state.text.font)
    let [fn,setFont]=useState('')
    let px=useSelector((state:any)=>state.text.size)
    let [size,setS]=useState(20)
    let [ImageSrc,SetSrc]=useState<string|ArrayBuffer|null>('')
    let alignTable=useSelector((state:any)=>state.align.alignTab)
    let [index,setInd]=useState(0)
    let dispatch=useDispatch()
    let [Clicked,setClicked]=useState(false)
    let deletedElements=useSelector((state:any)=>state.config.deletedElements)
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
       {style="outline outline-[2px] outline-dashed outline-black"
       }
    else if(Clicked)
       {
        display='hidden'
        style="shadow-[0_0_0_2px_rgba(0,0,0,1)]"        
       }       
    else style=""    
    const ref = useRef<any>(null);
    const refLeft = useRef<any>(null);
    const refTop = useRef<any>(null);
    const refRight = useRef<any>(null);
    const refBottom = useRef<any>(null);
    const containerRef =props.containerRef
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
      if(!ref.current) return;
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
        width = width + dx;
        resizeableEle.style.width = `${width}px`;
        setCWidth(width);
      };
  
      const onMouseUpRightResize = (event:any) => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
      };
  
      const onMouseDownRightResize = (event:any) => {
        x = event.clientX;
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
        resizeableEle.style.height = `${height}px`;
      };
  
      const onMouseUpTopResize = (event:any) => {
        document.removeEventListener("mousemove", onMouseMoveTopResize);
      };
  
      const onMouseDownTopResize = (event:any) => {
        y = event.clientY;
        const styles = window.getComputedStyle(resizeableEle);
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
        setCHeight(height)
        resizeableEle.style.height = `${height}px`;
      };
  
      const onMouseUpBottomResize = (event:any) => {
        document.removeEventListener("mousemove", onMouseMoveBottomResize);
      };
  
      const onMouseDownBottomResize = (event:any) => {
        y = event.clientY;
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
      if(!refRight.current||!refTop.current||!refLeft.current||!refBottom.current) return;
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
        console.log(val)
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
      if (!ref.current || !containerRef.current || tool==='resize') { console.log({tool:'no select'}); return;}
  
      const box :any = ref.current;
      const container = document.getElementById('ref')
      if(!container) return
  
      const onMouseDown = (e: MouseEvent) => {
        try{
        if(!ref.current) return
        if(isClicked.current===null)return;
        isClicked.current = true;
        if(!coords.current) return
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;
        }
        catch {
          console.log('mouseDown')
        }
      }
  
      const onMouseUp = (e: MouseEvent) => {
        try {
        if(!ref.current) return
        console.log("event")
        if(!isClicked.current)return;
        isClicked.current = false;
        if(!coords.current) return
        if(!box) return;
        coords.current.lastX = box.offsetLeft;
        coords.current.lastY = box.offsetTop;
        }
        catch {
          console.log('onMouseUp')
        }
      }
  
      const onMouseMove = (e: MouseEvent) => {
        try {
        if(!ref.current) return
        if (!isClicked.current) return;
        if(!coords.current) return
        const nextX = e.clientX - coords.current.startX + coords.current.lastX;
        const nextY = e.clientY - coords.current.startY + coords.current.lastY;
        if(!box) return;
        box.style.top = `${nextY}px`;
        box.style.left = `${nextX}px`;
        setCY(nextY)
        setCX(nextX)
        }
        catch {
          console.log('on Mouse mouve')
        }
      }
      if(!box) return
      try {
      box.addEventListener('mousedown', onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseUp);
      }
      catch {
        console.log('add Event')
      }
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
        { setText(txt);
          setCuQr('')
          setValue('')
           SetSrc('')
        }
    },
    [txt])
    useEffect(()=>{
      if(Clicked)
        { setBco({r:255,g:0,b:0,a:0})
          console.log("finish")
          console.log(Bco)
          if(txt)
          {
            if (pRef.current && ref.current) {
              let p :any= pRef.current;
              p.innerText=txt
              let rect = p.getBoundingClientRect();
              let pi :any= ref.current;
              pi.style.height = rect.height+ "px";
              pi.style.width = rect.width + "px";
            }
          }
        }
    },[txt])
    useEffect(()=>{
      if(Clicked){ setS(px)
        if (pRef.current && ref.current) {
          let p :any= pRef.current;
          let rect = p.getBoundingClientRect();
          let pi :any= ref.current;
          pi.style.height = p.offsetHeight+ "px";
          pi.style.width = p.offsetWidth + "px";
          setCWidth(rect.width)
          setCHeight(rect.height)
        }
      }
    },[px])
    useEffect(()=>{
      console.log({thick})
      if(Clicked) setThikness(thick)
        console.log({thikness})
    },[thick])
    useEffect(()=>{
      if(Clicked) setFont(fn)
    },[font])
    useEffect(() => {
      if (Clicked) {
        setValue(value);
        let rect;
        
        if (value) {
          console.log({ value });
         
            
            setCuQr('');
            setText('');
            setImgData('');
            setBco({r:255,g:0,b:0,a:0})
        }
      }
    }, [value]);
    useEffect(()=>{
           
           if(Clicked) {setCuQr(qr);setText('');setValue('');setImgData('');setBco({r:255,g:0,b:0,a:0})}
        console.log(qr)
    },[qr])
    useEffect(()=>{
      if(Clicked) setCl(color)
    },[color])
    useEffect(()=>{
      console.log({weight})
      if(Clicked){console.log('weight'); setWeight(weight)}
    },[weight])
    function changeC()
    {
      if(tool==='Supp'){ dispatch(pushDel(props.id));return; }
      if(Clicked){
          setClicked(false)
          if(ref.current)
          dispatch(remove(index))
        }
      else if(!Clicked){
         setClicked(true);
         if(ref.current)
         {dispatch(add(props.id))
         index=alignTable.length-1}
         //console.log('h'+alignTable[0]+alignTable[1])
        }  
    } 
    function handleClick()
    {
       document.getElementById(`fileInput${props.id}`)?.click();
    }
    function handleFileChange(event:any)
    {
      let win:any=window
      const file=event.target.files[0];
      const reader= new FileReader()
      reader.onload=(e)=>{
        if(e.target&&e.target.result)
           {SetSrc(e.target.result)
           console.log('before')
           win.BrowserPrint.convert(e.target.result,
            null,{toFormat:'zpl',action:'return',resize:{width:cWidth,height:cHeight}},(data:any)=>{
             console.log(data.data)
             setImgData(data.data)
             console.log('after')
            },null
            )
           
           setText('')
           setBco({r:255,g:0,b:0,a:0})
           setCuQr('')
           setValue('')
           }
      }
      reader.readAsDataURL(file)
    }
    useEffect(()=>{
      if(ImageSrc)
      {let img:any=imgRef.current;
      let rect:any=img.getBoundingClientRect()
      let div:any=ref.current;
      div.style.height=rect.height+"px";
      div.style.width=rect.width+"px";}
    },[ImageSrc])


    useEffect(()=>{
      console.log({density})
      let d= parseFloat(density);
      let cmY
      let cmX=cX*2*max/1000;
      
      setDotsX(cmX*10*d+45)
      if(text)
      { let hTextH:any=size/80

       cmY=cY*2*max/959+hTextH;
      }
      else cmY=cY*max*2/1000;
      setDotsY(cmY*10*d)
      let cmWidth=cWidth*max*2/1000
      setDotsWidth(cmWidth*10*d)
      let cmHeight=cHeight*max*2/1000
      setDotsHeight(cmHeight*10*d)
      console.log({textY,cmY})
      console.log({cmHeight,cmWidth})
      console.log({cX,cY,cmX,cmY,d})
    },[cY,cHeight,cWidth,cX,density,max])
    useEffect(()=>{
      if(cuQr)
      {if(cWidth>cHeight)
      {
        let div:any=ref.current
        div.style.height=cWidth+"px"
      }
      else
      {
        let div:any=ref.current
        div.style.width=cHeight+"px"
      }}

    },[cWidth,cHeight])
    useEffect(()=>{
      if(text)
      {
        
        setTextY((cHeight-size)/2+cY)
      }
    },[cY])
    useEffect(()=>{
      let win:any=window
      if(ImageSrc)
      {
          console.log('before')
          console.log({cHeight,cWidth})
          win.BrowserPrint.convert(ImageSrc,
           null,{toFormat:'zpl',action:'return',resize:{width:500,height:500}},(data:any)=>{
            console.log(data.data)
            setImgData(data.data)
            console.log('after')
           },null
           )
      }
    },[cHeight,cWidth])
    useEffect(()=>{
      dispatch(addE({id:props.id,dotsX,dotsWidth,dotsY,dotsHeight,text,imgData,valueC,cuQr,bType:valueC?bType:null}))
    },[dotsX,dotsWidth,dotsHeight,dotsY,valueC,cuQr,text,imgData,bType])
    function handleInput(event:any)
    {
      setText(event.target.innerText)
      dispatch(setTxt(event.target.innerText))
    }
    
    const handleDragStart = (event:any) => {
      console.log({index})
      event.dataTransfer.setData("text/plain", parseInt(event.target.id));
      if(Bco)
        event.target.style.opacity = Bco.r;
      else  
      event.target.style.opacity ='1';
      };
    
    const handleDragEnd = (event:any) => {
      if(Bco)
        event.target.style.opacity = Bco.r;
      else  
      event.target.style.opacity ='1';
      };
      useEffect(()=>{
        if(props.cuQr)
        {
          let Ele:any=ref.current
          let cmheight=props.height/60
          let cmX=props.x/60
          let cmY=props.y/60
          let px=cmX*1000/(max*2)
          let py=cmY*1000/(max*2)
          let pHeight=cmheight*1000/(max*2)
          Ele.style.top=py+'px'
          Ele.style.left=px+'px'
          Ele.style.height=pHeight+'px'
          Ele.style.width=pHeight+'px'
          setCuQr(props.cuQr)
          setCHeight(pHeight)
          setCWidth(pHeight)
          setCX(px)
          setCY(py)
          return;
        }
        if(props.valueC)
        {
          let Ele:any=ref.current
          let cmheight=props.height/60
          let cmWidth=props.width/60
          let cmX=props.x/60
          let cmY=props.y/60
          let px=cmX*1000/(max*2)
          let py=cmY*1000/(max*2)
          let pHeight=cmheight*1000/(max*2)
          let pWidth=cmWidth*1000/(max*2)
          Ele.style.top=py+'px'
          Ele.style.left=px+'px'
          Ele.style.height=pHeight+'px'
          Ele.style.width=pWidth+'px'
          setValue(props.valueC)
          setType(props.type)
          setCHeight(pHeight)
          setCWidth(pWidth)
          setCX(px)
          setCY(py)
          console.log(props.valueC)
          setBco({r:255,g:0,b:0,a:0})
        }
        if(props.text)
        {
          let Ele:any=ref.current
          let cmWidth=props.width/60
          let cmX=props.x/60
          let cmY=props.y/60
          let px=cmX*1000/(max*2)
          let py=cmY*1000/(max*2)
          let pWidth=cmWidth*1000/(max*2)
          Ele.style.top=py+'px'
          Ele.style.left=px+'px'
          Ele.style.width=pWidth+'px'
          setText(props.text)
          setCWidth(pWidth)
          setCX(px)
          setCY(py)
          console.log(props.valueC)
          setBco({r:255,g:0,b:0,a:0})
        }

      },[])
      useEffect(()=>{
        if(Clicked) setType(bType)
      },[bType])
    return (
       //<div ref={containerRef} className="container">
        <div 
        onDragEnd={handleDragEnd} id={props.id} draggable={Clicked?"false":"true"}  onDragStart={(event:any)=>{handleDragStart(event)}} ref={ref} className={` resizeable ${(hidden&&(valueC||cuQr))?'opacity-0':''}`+style} onClick={()=>changeC()} onDoubleClick={()=>{handleClick(); }} style={{backgroundColor:`rgba(${Bco.r},${Bco.g},${Bco.b},${Bco.a})`}} >
         {
             hidden==false&&
            <input  id={`fileInput${props.id}`} type="file" style={{display:'none'}} onChange={handleFileChange} />
          }
          {
            text&&<div title="text" data-content={text} data-width={Math.round(dotsWidth)} data-x={Math.round(dotsX)} data-y={Math.round(dotsY)}>
              <p  onInput={handleInput} data-font={font.replace(/ /g,"_")} contentEditable="true" ref={pRef} title="text"  /*height={(size*30/1000)*density*10}*/  style={{fontWeight:`${fWeight}`,fontSize:size+'px',fontFamily:font+',monospace',color:cl,whiteSpace:"nowrap", outline:'none'}}></p>
            </div>
            
          } 
          {
             thikness!=0&&
             (<hr className="w-full" style={{ borderTop: `${thikness}px solid #000` }}></hr>)
            }
          {
            ImageSrc&&
            (<div style={{width:'100%',height:'100%',}} title="img" data-content={imgData} data-x={dotsX} data-y={dotsY}>
              {!hidden &&<img style={{width:'100%',height:'100%',objectFit:'inherit'}} className="border border-blue-400"  ref={imgRef} src={ImageSrc?(typeof ImageSrc==='string'?ImageSrc:''):''} data-content={imgData}  />}
            </div>)
          }
          
            
            {
              valueC&&
              <div  className="h-full w-full " data-format={type} ref={bRef} data-width={Math.round(dotsWidth/(valueC.length*11+33))} data-height={Math.round(dotsHeight)} data-x={Math.round(dotsX)} data-y={Math.round(dotsY)} data-content={valueC} title="barcode">
              {
                !hidden&&
            <Barcode format={type} width={Math.round(cWidth/(valueC.length*11+type==='EAN8'?45:type==='codabar'?70:67))}  height={cHeight-30}   margin={0}     value={valueC}
            />
              }
            </div>
            }
            {
              cuQr&&
              <div data-height={Math.round(cHeight*22/height)} title="qrcode" data-x={Math.round(dotsX)} data-y={Math.round(dotsY)} data-content={cuQr} className={(cuQr==""||hidden)? 'hidden':'w-full h-full'}>
             {
            (!hidden)&&
              <QRCode className="w-full h-full" value={cuQr} />
             }
             
            </div>
            
            }
            
          
          {
            !hidden&&<div ref={refLeft} className={`resizer resizer-l ${(tool!='resize'||!Clicked)?'hidden':''}`}></div>
          }
          {
            !hidden&&<div ref={refTop} className={`resizer resizer-t ${(tool!='resize'||!Clicked)?'hidden':''}`}></div>
          }
          {
          !hidden&&<div ref={refBottom} className={`resizer resizer-b ${(tool!='resize'||!Clicked)?'hidden':''}`}></div>
          }
          {
            !hidden&&<div ref={refRight} className={`resizer resizer-r ${(tool!='resize'||!Clicked)?'hidden':''} `}></div>
          }
          
        </div>
    );
}
/* à faire
-- image prend tout le espace du div //fait
-- couper les rangées en deux //fait
-- former xml du design //fait
-- inserer les fonts en visuel et en zpl //99% fait
-- supprimer un element//fait
-- add list of printers //fait
-- delete a comppnent with click //fait
-- ajouter dans le design la line et le rectangle (hr [border top(thikness)]) //fait
-- ajouter les types de code barres et renover le xml et xslt //99% data matrix
-- regler align ref // 99% check align bottom and click and don't align
-- uploader un xml 
-- add undo redo
-- regler l'affichage des barcodes //99% 
-- grammaire xml 
-- ajoute une div d'erreur
*/