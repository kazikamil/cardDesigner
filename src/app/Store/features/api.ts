import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
const initialState={
    value:"",
    qr:"",
    hidden:false,
    bType:"CODE128",
    displayValue:false
}
const apiSlice=createSlice({
    name:"api",
    initialState,
    reducers:{
       put:(state,action)=>
       {
        state.value=action.payload
       },
       setBType:(state,action)=>
        {
         state.bType=action.payload
        },
       setQr:(state,action)=>
        {
         state.qr=action.payload
        },
        changeHidden: (state) => {
            state.hidden = !state.hidden; // Simplified toggle
          },
        changeDisplay: (state,action) => {
            state.displayValue=action.payload
        }  
    }
})
export const {put,setQr,changeHidden,setBType,changeDisplay}=apiSlice.actions

export default apiSlice.reducer