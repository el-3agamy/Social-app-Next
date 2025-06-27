"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreatePost = () => {

 const [body , setBody] = useState<any>(null) ;
 const [image , setImage] = useState<any>(null)
 const [imageSrc , setImageSrc] = useState<any>(null)

 function handleImageChange(e : any){
   if (e.target.files[0]) {
        setImage(e.target.files[0])
  const x : any = URL.createObjectURL(e.target.files??[0])
  setImageSrc(x)

   }
 }
    
 function addPost(e : any) {
    e.preventDefault()

    console.log(body , image);
    
 }

  return (
    <>
        <Box component={"form"}  onSubmit={addPost} >
            <TextField
                multiline
                placeholder='Your Post...'
                rows={3}
                fullWidth
                name=''
                value={body}
                onChange={(e)=>setBody(e.target.value)}
            >  </TextField>


        

             <div style={{position : "relative" , maxWidth:"50%" , margin :"auto"}}>
               {
                imageSrc &&  <img 
                src={imageSrc}
                style={{
                    display : "block",
                    width : "100%" ,
                    marginBottom : 2,  
                    marginTop : 2  
                }}
             />
               }
             </div>
       
             
                
    
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      fullWidth
      
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        // accept='imagg/*'
        onChange={handleImageChange}
        multiple
      />
    </Button>
  
    <Button type='submit'>Send</Button>

        </Box>
    </>
  )
}

export default CreatePost