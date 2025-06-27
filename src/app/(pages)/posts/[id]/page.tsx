"use client"
import Post from '@/app/_components/post/post';
import { getSinglePost } from '@/lib/slices/postSlice';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PostDetails = () => {
const {id} = useParams  <any>()
  console.log(id);
  const dispatch = useDispatch <any>() ;
  const {post , isLoading} = useSelector((state : any) => state.posts)
  

  useEffect(()=>{

    dispatch(getSinglePost(id))
  } , [])

  if (isLoading) {
    return(<>
        <div style={{height : "100vh"}}>Loadin ...</div>
    </>)
  }

  return (
    <>
        <div>PostDetails</div>
        {
          post ?
          <Post post={post} />
          :
         <div style={{height : "100vh"}}>
            <h1>Loading ...</h1>
         </div>
      }
    </>
  )
}

export default PostDetails