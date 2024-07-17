import { createSlice } from "@reduxjs/toolkit";
interface MonState {
    alignTab:any[]
}
const initialState:MonState={
    alignTab:[]
}
const alignSlice=createSlice({
    name:"align",
    initialState,
    reducers:{
        add: (state,action)=>
        {
           state.alignTab.push(action.payload)
        },
        remove:(state,action)=>
        {
         console.log("exec")
         state.alignTab.splice(action.payload,1)
        }
    }
})
export const {remove}=alignSlice.actions
export const {add}=alignSlice.actions
export default alignSlice.reducer