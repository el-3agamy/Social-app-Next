import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CommentCreatorInterface {
                "_id": string,
                name: string,
                photo?:  string ,
} ;

interface CommentDetailsInterface {
    "_id" : string ,
    content : string ,
    commentCreator : CommentCreatorInterface ,
    post : string ,
    createdAt : string , 
    id : string
}

const initialState = {
    comments : []
}

const getAllComments = createAsyncThunk("getAllComments/comment" , async ()=>{

        const {data } = await axios.get(``) ;
        console.log(data);
        return data.comments
        
})

const commentSlice = createSlice({
    name : "comment" ,
    initialState , 
    reducers :{
        setComment : (state , action)=>{
                state.comments = action.payload
        }
    } ,

    extraReducers(builder) {
        builder.addCase(getAllComments.fulfilled , (state , action)=>{
                state.comments =action.payload
        })
    },
})


export const commentReducer = commentSlice.reducer ;
export const {setComment} = commentSlice.actions