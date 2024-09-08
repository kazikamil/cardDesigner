import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
const initialState={
    value:"",
    qr:"",
    hidden:false,
    bType:"CODE128",
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
          }
    }
})
export const {put,setQr,changeHidden,setBType}=apiSlice.actions

export default apiSlice.reducer