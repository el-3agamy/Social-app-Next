"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Posts = () => {

  const [allPosts, setAllPosts] = useState<any>([])
  async function getAllPosts(limit : number) {
    const {data} = await axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit}` , {
      headers : {
        token : localStorage.getItem('token')
      }
    })

    setAllPosts(data.posts)
    // console.log(data);
  }

  useEffect(()=>{
    getAllPosts(50)
  } , [])
  return (
    <>
    <div>
      <Container>
        {/* <Button onClick={()=>getAllPosts(50)}  sx={{ my: 2, color: 'black', display: 'block'  }} variant='outlined'>
          

          Get All posts
          
        </Button> */}
        <Stack
        direction={"row"}
        spacing={3}
        width={"33%"}
        >
            <Box>
              {
                allPosts.map((post : any)=>{
                  return(
                    <Stack key={post?._id} maxWidth={"100%"}>
                        <Typography 
                            sx={{bgcolor : "red" , width : "100%"}}                        
                        >{post?.body}</Typography>
                    </Stack>
                  )
                })
              }
            </Box>
        </Stack>
      </Container>
    </div>
    </>
  )
}

export default Posts