import { createSlice } from "@reduxjs/toolkit";
const initialState={
    val:0,
    option:"x",
    backC:{r:255,g:0,b:0,a:1},
    thick:0
}
const sizePosSlice=createSlice({
    name:"sizePos",
    initialState,
    reducers:{
        setOption: (state,action)=>
        {
            state.option=action.payload
        },
        setVal: (state,action)=>
        {
            state.val=action.payload
        },
        setBC:(state,action)=>{
            state.backC=action.payload
        },
        setT:(state,action)=>{
            state.thick=action.payload
        },
    }
})
export const {setOption}=sizePosSlice.actions
export const {setVal}=sizePosSlice.actions
export const {setBC}=sizePosSlice.actions
export const {setT}=sizePosSlice.actions
export default sizePosSlice.reducer