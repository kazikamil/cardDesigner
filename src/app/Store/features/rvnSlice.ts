import { createSlice } from "@reduxjs/toolkit";

const initialState={
    nr:0,
    nv:0,
    rectVers:"r"
}
const rvnSlice=createSlice({
    name:"rvn",
    initialState,
    reducers:{
        inc: (state)=>
        {
           if(state.rectVers=='r')
              {state.nr++;console.log("nr:"+state.nr)}
           else state.nv++; 
        },
        changeS:(state)=>
        {
            console.log("change")
         if(state.rectVers=='r')
            state.rectVers='v';
         else state.rectVers='r';
        }
    }
})
export const {inc}=rvnSlice.actions
export const {changeS}=rvnSlice.actions
export default rvnSlice.reducer