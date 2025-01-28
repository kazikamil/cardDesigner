import { createSlice } from "@reduxjs/toolkit";
const initialState={
    text:'',
    size:20,
    font:'Zebra 0',
    color:'black',
    weight:'100'
}
const textSlice=createSlice({
    name:"text",
    initialState,
    reducers:{
        setTxt: (state,action)=>
        {
            state.text=action.payload
        },
        setSize:(state,action)=>
        {
            state.size=action.payload
        },
        setF:(state,action)=>
        {
            state.font=action.payload
        },
        setColor:(state,action)=>
        {
            state.color=action.payload
        },
        setWeight:(state,action)=>
            {
                state.weight=action.payload
            }
    }
})
export const {setTxt}=textSlice.actions
export const {setSize}=textSlice.actions
export const {setF}=textSlice.actions
export const {setColor}=textSlice.actions
export const {setWeight}=textSlice.actions
export default textSlice.reducer