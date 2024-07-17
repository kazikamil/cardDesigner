import { createSlice } from "@reduxjs/toolkit";
const initialState={
    class:"h-80 card1"
}
const rotateSlice=createSlice({
    name:"rotate",
    initialState,
    reducers:{
        rotate: (state)=>
        {
            if(state.class=="h-80 card1")
               state.class="w-80 card2"
            else
               state.class="h-80 card1"
        }
    }
})
export const {rotate}=rotateSlice.actions
export default rotateSlice.reducer