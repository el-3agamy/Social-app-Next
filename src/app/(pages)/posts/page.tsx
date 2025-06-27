"use client"
import Post from '@/app/_components/post/post'
import { getAllPosts, PostInterface } from '@/lib/slices/postSlice'
import Container from '@mui/material/Container'

import Stack from '@mui/material/Stack'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// ككككككككككككككككككككككككككككككككككككككككك




// ككككككككككككككككككككككككككككككككككككككككك

 
const Posts = () => {

const {posts} :{posts : PostInterface[]} =useSelector((state : any) => state.posts)
const dispatch = useDispatch<any>()

  useEffect(()=>{
    dispatch(getAllPosts())
  } , [])



  return (
    <>
    <Container maxWidth={'sm'}>
      <Stack spacing={3} width={"100%"}   justifyContent={"center"} >
        
            {
              posts.map((post)=><Post post={post} />)
            }
      

      </Stack >
    </Container>
    </>
  )
}

export default Posts