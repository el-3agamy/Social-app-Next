import { createSlice } from "@reduxjs/toolkit";

interface AuthSliceInitialState {
    isUserLoggedIn : boolean
}

export const initialState : AuthSliceInitialState = {
        isUserLoggedIn : !!localStorage.getItem("token")
    } 


const authSlice = createSlice({

    name : "auth" ,

    initialState ,
    reducers :{
        setIsUserLoggedIn :(state , action)=>{
            state.isUserLoggedIn = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const {setIsUserLoggedIn}=authSlice.actions
