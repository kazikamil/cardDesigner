import { createSlice } from "@reduxjs/toolkit";
type action={
    tool:string
}
const initialState={
    tool:"select"
}
const toolSlice=createSlice({
    name:"tool",
    initialState,
    reducers:{
        changeTool: (state,action)=>
        {
            if(action.payload!="")
            state.tool=action.payload
        }
    }
})
export const {changeTool}=toolSlice.actions
export default toolSlice.reducer