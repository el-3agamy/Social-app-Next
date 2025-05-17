import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { log } from "console";


const getProducts = createAsyncThunk("counter" , ()=>{
    axios.get(`https://`)
})
 export const counterSlice = createSlice({
    initialState:{
        counter : 0  ,
        isLoading : false
    } ,
    name : "counter",
    reducers:{
        incerment : function(state){
                state.counter++
        } ,
        decerment : function(state , action){
                state.counter = state.counter + action.payload 
        }
    } ,

    extraReducers : bulider=>{
        bulider.addCase(getProducts.pending , (state , action)=>{
            console.log("pending");
            state.isLoading = true ;
            
        }) ,
        bulider.addCase(getProducts.fulfilled , (state , action)=>{
            console.log("fullfilled");
            state.isLoading = false ;
            
        }) ,
        bulider.addCase(getProducts.rejected , (state , action)=>{
            console.log("rejected");
            state.isLoading = false
            
        })
    } 
    

    }
) ;
export let {decerment , incerment}=counterSlice.actions

export const counterReducer = counterSlice.reducer