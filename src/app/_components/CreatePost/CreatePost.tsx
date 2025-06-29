"use client"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getAllPosts } from '@/lib/slices/postSlice'

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

  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<any>(null)
  const [imageSrc, setImageSrc] = useState<any>(null)
  const [loading, setLoading] = useState(false)

 const dispatch = useDispatch<any>()

 

  function handleImageChange(e: any) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      const x: any = URL.createObjectURL(e.target.files[0])
      setImageSrc(x)

    }
  }


  async function addPost(e: any) {
      setLoading(true)

    e.preventDefault()

    const formData = new FormData();

    if (body.trim() != "" ) {
      formData.append("body", body) }

     if ( image != null) {
      formData.append("image", image)}
     


      const { data } = await axios.post(`https://linked-posts.routemisr.com/posts`,

        formData
        , {
          headers: {
            token: localStorage.getItem("token")
          }
        })


    
      await dispatch(getAllPosts())

      deleteImage()
      setBody("")
    setLoading(false)


    }



  

  function deleteImage() {
    setImage(null)
    setImageSrc(null)
  }



  return (
    <>
      <Box component={"form"} onSubmit={addPost} >
        <TextField
          multiline
          placeholder='Your Post...'
          rows={3}
          fullWidth
          name=''
          value={body}
          onChange={(e) => setBody(e.target.value)}
        >  </TextField>




        <div style={{ position: "relative", maxWidth: "50%", margin: "auto" }}>
          {
            imageSrc && <>
              <img
                src={imageSrc}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: 2,
                  marginTop: 2
                }}
              />
              <button>
                <span style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  padding: "10px",
                  background: "red",
                  borderRadius: "50%",
                  border: "1px solid black",

                }}

                  onClick={deleteImage}

                >X</span>
              </button>
            </>

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
            accept='image/*'
            onChange={handleImageChange}
            multiple
          />
        </Button>

        <Button type='submit' variant='contained' disabled={body.trim() == "" && image == null} loading={loading}>Send</Button>

      </Box>
    </>
  )
}

export default CreatePost