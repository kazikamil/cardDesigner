import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
const initialState={
    value:"",
    qr:"",
    hidden:false
}
const apiSlice=createSlice({
    name:"api",
    initialState,
    reducers:{
       put:(state,action)=>
       {
        state.value=action.payload
       },
       setQr:(state,action)=>
        {
         state.qr=action.payload
        },
       changeHidden:(state)=>
        {
         state.hidden? state.hidden=false : state.hidden=true
        } 
    }
})
export const {put,setQr,changeHidden}=apiSlice.actions

export default apiSlice.reducer