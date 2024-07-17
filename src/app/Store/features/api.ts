import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
const initialState={
    value:"",
    qr:""
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
        }
    }
})
export const {put,setQr}=apiSlice.actions

export default apiSlice.reducer