"use client"
import React, { useRef, useState } from "react";
import Rec from "./img/recver.png"
import Rot from  "./img/rotate.png"
import Change from "./Change";
import { useDispatch, useSelector } from "react-redux";
import Picture from "./Picture";
import { useEffect } from "react";
import { setContainerRef, setHeight, setLHeight, setLWidth, setWidth } from "./Store/features/conifg";
import { Icon } from '@iconify/react';
export default function Design()
{

   let svgRef=useRef(null)
   let svgRef1=useRef(null)
   let rangeRef1=useRef(null)
   let rangeRef2=useRef(null)
   let rangeRef3=useRef(null)
   let rangeRef4=useRef(null)
   let designRef=useRef(null)
   let [composantsR,setComp]=useState<any>([])
   let composantsV=[]
   let [values,setValues]=useState([5,50,5,50])
   let containerRef=useRef<HTMLDivElement>(null)
   let cla:string=useSelector((state:any)=>state.rotate.class)
   let deletedElements=useSelector((state:any)=>state.config.deletedElements)
   let clas:string=`border border-solid border-black ${cla} absolute`
   let rv:string=useSelector((state:any)=>state.rvn.rectVers)
   let hidden:any=useSelector((state:any)=>state.api.hidden)
   let lWidth:any=useSelector((state:any)=>state.config.lWidth)
   let lHeight:any=useSelector((state:any)=>state.config.lHeight)
   let nr=useSelector((state:any)=>state.rvn.nr)
   let nv=useSelector((state:any)=>state.rvn.nv)
   let max=useSelector((state:any)=>state.config.max)
   let dispatch=useDispatch()
   function handleChangeRange(event:any,ref:any)
   {
     let top,left,width,height;
     let design:any=designRef.current
     const range:any=ref.current
     const rect = range.getBoundingClientRect();
     if(rangeRef1==ref||ref==rangeRef2)
     {
      let r1:any=rangeRef1.current
      let r11=r1.getBoundingClientRect()
      let r2:any=rangeRef2.current
      let r22=r2.getBoundingClientRect()
      var thumbX1 = r11.left + (r1.value / r1.max) * r11.width;
      var thumbX2 = r22.left + (r2.value / r2.max) * r22.width;
      var thumbY = rect.top;
      let left=thumbX1<thumbX2?thumbX1:thumbX2;
      let width=(thumbX1-thumbX2)>0?(thumbX1-thumbX2):(thumbX2-thumbX1)
      console.log("ref1")
      console.log({left,width,left1:thumbX1,left2:thumbX2})
      design.style.width=width+'px'
      dispatch(setLWidth(Math.round(width*max*2/1000)))
      dispatch(setWidth(width))
      let design1=design.getBoundingClientRect()
      design.style.left=(design.offsetLeft+(left-design1.left))+'px'
      console.log({newLeft:design.style.left})
    }
     else
     {
      let r3:any=rangeRef3.current
      let r33=r3.getBoundingClientRect()
      let r4:any=rangeRef4.current
      let r44=r4.getBoundingClientRect()
      var thumbY1 = r33.top + (r3.value / r3.max) * r33.height;
      var thumbY2 = r44.top + (r4.value / r4.max) * r44.height;
      var thumbX = rect.left;
      let top=thumbY1<thumbY2?thumbY1:thumbY2;
      let height=(thumbY1-thumbY2)>0?(thumbY1-thumbY2):(thumbY2-thumbY1)
      console.log("ref1")
      console.log({left,height,left1:thumbY1,left2:thumbY2})
      design.style.height=height+'px'
      dispatch(setLHeight(Math.round(height*max*2/1000)))
      dispatch(setHeight(height))
      let design1=design.getBoundingClientRect()
      design.style.top=(design.offsetTop+(top-design1.top))+'px'
      console.log({newLeft:design.style.top})
     }
      /*console.log({top:rect.top,left:rect.left,value:range.value,width:range.width,max:range.max})
      console.log({thumbX1,thumbY})*/
   }
   useEffect(() => {
    if (svgRef.current) {
      let svg:any=svgRef.current
      svg.innerHTML = ''; // Clear the SVG content
    }
    if(svgRef1.current)
    {
      let svg:any=svgRef1.current
      svg.innerHTML = '';
    }
      let win:any=window
      console.log({max})
      let d3:any=win.d3
      const margin = { top: 20, right: 10, bottom: 10, left:40 };
    const width = 1000 - margin.left  - margin.right;  // Largeur ajustée pour plus d'espace
    const height = 1000 - margin.top - margin.bottom;  // Hauteur ajustée pour plus d'espace

    // Créer le conteneur SVG
    let svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Définir les échelles pour les axes X et Y
    const scale = d3.scaleLinear()
      .domain([-max, max])  // Domaine des données
      .range([0, width]);  // Domaine des pixels

    // Créer les axes sans lignes de grille internes
    const xAxis = d3.axisTop(scale)
      .ticks(max==5?20:max*2)  // Ajuste le nombre de ticks affichés
      .tickSize(3)  // Supprimer les lignes de grille
      .tickFormat((d:any) => d);  // Affiche les ticks à chaque unité

    

    // Ajouter les axes au SVG
    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);
    svg = d3.select(svgRef1.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);  
    const yAxis = d3.axisLeft(scale)
      .ticks(max==5?20:max*2)  // Ajuste le nombre de ticks affichés
      .tickSize(3)  // Supprimer les lignes de grille
      .tickFormat((d:any) => d);  // Affiche les ticks à chaque unité
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(0, 0)`)
      .call(yAxis);

    
    }, [max]);
    useEffect(()=>{
      console.log({deletedElements})
    },[deletedElements])
    useEffect(() => {
      const newComponents = []; // Créez un tableau temporaire pour accumuler les composants
      for (let i = 0; i < nr; i++) {
          if (deletedElements.includes(i)) continue;
          newComponents.push(<Picture id={i} key={i}  />);
      }
      setComp(newComponents); // Mettez à jour l'état une seule fois
  }, [nr, deletedElements]);  
   /*for(let i=0;i<nv;i++)
      {
         composantsV.push(<Picture key={i} containerRef={containerRef}/>)
      }   */
     useEffect(()=>{
      dispatch(setContainerRef(containerRef))
     },[containerRef])
   return(
   <div id="ref" ref={containerRef} className="overflow-y-scroll custom-scrollbar overflow-x-hidden h-full w-full flex p-20 justify-center h-screen relative">
        {<svg className=" fixed  top-20 left-[33px]" ref={svgRef} width={1000} height={1000}></svg>
        
        }
        {
          <svg className=" absolute top-0 left-0" ref={svgRef1} width={1000} height={1000}></svg>
        }
        {<input ref={rangeRef1} className=" fixed z-40 top-[100px] left-[70px] " type="range" min={0} max={100} onChange={(e)=>{handleChangeRange(e,rangeRef1)}}  />
}
        {<input ref={rangeRef3} className=" absolute z-50 top-2 left-10  rotated-range" type="range" min={0} max={100} onChange={(e)=>{handleChangeRange(e,rangeRef3)}}/>
}
        {<input ref={rangeRef2} className=" fixed z-40 top-[105px] left-[545px]  " type="range" max={100}  onChange={(e)=>{handleChangeRange(e,rangeRef2)}}/>
        }
        {<input ref={rangeRef4} className=" absolute z-50 top-[485px] left-11  rotated-range" max={100} type="range" onChange={(e)=>{handleChangeRange(e,rangeRef4)}}/>
}
        <div ref={designRef} className={clas+' bg-white'}>
        
        <div id="recto" className={rv==='v'?'hidden bg-white':'bg-white'}>
        {hidden&&<Icon className="absolute w-20 h-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " icon="svg-spinners:blocks-shuffle-2"  style={{color: '#116fd4'}} />}
        {Array.from({ length: nr }, (_, index) => (
          !(deletedElements.includes(index))&&<Picture id={index} key={index}/>
        ))}
        </div>
       
          
          {/*<div id="verso" className={rv==='r'?'hidden':''}>
          {composantsV}
          </div>
          
        <Change image={Rec} class="position1 right-0" />
        <Change image={Rot} class="position2 top-0" />*/}
        </div>
        
   </div>)
}
