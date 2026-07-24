import { createSlice } from "@reduxjs/toolkit";
const requsetSlice = createSlice({
    name:"request",
    initialState:[],
    reducers:{
        addRequest:(state,action)=>action.payload,
        removeRequest :()=>[],
    }
})

export const {addRequest,removeRequest} = requsetSlice.actions;
export default requsetSlice.reducer;