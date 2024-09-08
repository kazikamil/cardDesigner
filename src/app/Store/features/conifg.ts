import { createSlice } from "@reduxjs/toolkit";
interface MonState {
    density:any,
    quality:any,
    number:any,
    height:any,
    width:any,
    max:any,
    elements:any[],
    deletedElements:any[],
    attributes:{},
    lWidth:any,
    lHeight:any,
    containerRef:any,
    deletedRef:any,
    qrCodes:any[],
    barcodes:any[],
    texts:any[],
    images:any[],
}
const initialState:MonState={
    density:'6',
    quality:'Grayscale',
    number:'1',
    height:0,
    width:0,
    max:15,
    elements:[],
    deletedElements:[],
    lWidth:0,
    lHeight:0,
    containerRef:null,
    deletedRef:null,
    qrCodes:[],
    barcodes:[],
    texts:[],
    images:[],
    attributes:{},
}
const configSlice=createSlice({
    name:"config",
    initialState,
    reducers:{
        changeDensity: (state,action)=>
        {
           state.density=action.payload
        },
        changeQuality: (state,action)=>
        {
           state.quality=action.payload
        },
        changeNumber: (state,action)=>
        {
           state.number=action.payload
        },
        setHeight: (state,action)=>
        {
               state.height=action.payload
        },
        setWidth: (state,action)=>
        {
               state.width=action.payload
        },
        setMax: (state,action)=>
        {
                   state.max=action.payload
        },
        addE: (state,action)=>
            {
                console.log(action.payload)
                state.elements[action.payload.id]=action.payload
            },
        setLHeight: (state,action) => {
            state.lHeight=action.payload
        },
        setContainerRef: (state,action) => {
            state.containerRef=action.payload
        },
        setRef: (state,action) => {
            state.deletedRef=action.payload
        },
        setLWidth: (state,action) => {
            state.lWidth=action.payload
            console.log(state.lWidth)
        },
        pushDel:(state,action) => {
            state.deletedElements=[...state.deletedElements,action.payload]
        },
        pushQr:(state,action) => {
            state.qrCodes=[...state.qrCodes,action.payload]
        },
        pushBr:(state,action) => {
            state.barcodes=[...state.barcodes,action.payload]
        },
        pushTxt:(state,action) => {
            state.texts=[...state.texts,action.payload]
        },
        pushImg:(state,action) => {
            state.images=[...state.images,action.payload]
        },
        setAttr:(state,action) => {
            state.attributes=action.payload
        }
    }
})
export const {changeDensity}=configSlice.actions
export const {changeNumber}=configSlice.actions
export const {changeQuality}=configSlice.actions
export const {setWidth}=configSlice.actions
export const {setHeight}=configSlice.actions
export const {setMax}=configSlice.actions
export const {addE}=configSlice.actions
export const {setLHeight}=configSlice.actions
export const {setLWidth}=configSlice.actions
export const {pushDel,pushBr,pushImg,pushQr,pushTxt,setAttr}=configSlice.actions
export const {setContainerRef}=configSlice.actions
export const {setRef}=configSlice.actions
export default configSlice.reducer