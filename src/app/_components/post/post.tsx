'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import { getAllPosts, getSinglePost, PostInterface } from '@/lib/slices/postSlice';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface ValuesI {
    content: string,
    post: string
}


export default function Post({ post, deletPost }: { post: PostInterface, deletPost: any }) : any {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)
    const { userData } = useSelector((state: any) => state.auth)





    const dispatch = useDispatch<any>()

    const initialValues: ValuesI = {
        content: "",
        post: post._id
    }
    async function onSubmit(values: ValuesI, { resetForm }: { resetForm: any }) {
        setLoading(true)
        const { data } = await axios.post(`https://linked-posts.routemisr.com/comments`, values, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
         resetForm()
        await dispatch(getAllPosts())
        await dispatch(getSinglePost(post._id))
        setLoading(false)
        console.log(data);


        console.log('comment');

    }

    const { values, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues,
        onSubmit
    })

    async function deleteComment(id: string) {
            setDeleteLoading(true)
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
       await dispatch(getAllPosts())
       setDeleteLoading(false)
        console.log(data);


    }

   
    return (<>
      

        <Box component={"div"} >
            <Card   >
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: red[500] }}
                            src={post?.user.photo}
                            alt={post?.user.name}
                        />

                    }
                    action={

                        userData._id == post.user._id &&
                        (<IconButton aria-label="settings" onClick={() => deletPost(post._id)}>
                            <DeleteIcon />
                        </IconButton>)
                    }
                    title={post?.user.name}
                    subheader={post?.createdAt.split("T")[0]}


                />

                {/* ____________________________  Card Body _________________ */}

                {
                    post?.body && <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {post?.body}
                        </Typography>
                    </CardContent>
                }

                {
                    post?.image && <CardMedia
                        component="img"
                        height="194"
                        image={post?.image}
                        alt={post?.user.name}
                    />
                }

                <CardActions sx={{ justifyContent: "space-evenly" }} disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <Link href={`/posts/${post?._id}`}>
                        <IconButton aria-label="comment">
                            <Stack direction={"row"} spacing={1}>
                                <CommentIcon />
                                <Typography>
                                    {
                                        post?.comments.length
                                    }
                                </Typography>
                            </Stack >
                        </IconButton>
                    </Link>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>

                </CardActions>
                {/*    */}
                <Box sx={{ bgcolor: "#eee" }}>
                    {/* {
                        post?.comments[0]?.commentCreator &&

                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    src={post?.comments[0]?.commentCreator.photo}
                                    alt={post?.comments[0]?.commentCreator.name}
                                />

                            }
                            action={
                               post.comments.some((comment: any) => comment.commentCreator._id === userData._id) &&
                                (<IconButton aria-label="settings" onClick={() => deleteComment(comment._id)}>
                                    <DeleteIcon />
                                </IconButton>)
                            }
                            title={post?.comments[0]?.commentCreator.name}
                            subheader={post?.comments[0]?.createdAt.split("T")[0]}


                        />
                    }
                    {
                        post?.comments[0]?.content && <CardContent>
                            <Typography  >
                                {post?.comments[0]?.content}
                            </Typography>
                        </CardContent>
                    } */}
                    {post?.comments.map((comment: any) => (
                        <Box key={comment._id} sx={{ bgcolor: "#eee", mb: 2 }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{ bgcolor: red[500] }}
                                        src={comment.commentCreator.photo}
                                        alt={comment.commentCreator.name}
                                    />
                                }
                                action={
                                    comment.commentCreator._id === userData._id && (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => deleteComment(comment._id)}
                                            loading = {deleteLoading}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )
                                }
                                title={comment.commentCreator.name}
                                subheader={comment.createdAt?.split("T")[0]}
                            />
                            {comment.content && (
                                <CardContent>
                                    <Typography>{comment.content}</Typography>
                                </CardContent>
                            )}
                        </Box>
                    ))}

                </Box>

            </Card>
            <Box component={'form'} onSubmit={handleSubmit}>
                <TextField
                    type='text'
                    value={values.content}
                    name='content'
                    onChange={handleChange}
                    fullWidth
                    placeholder='Comment ...'
                    variant='outlined' />

                <Button type='submit' variant='contained' loading={loading}>Comment</Button>
            </Box>

        </Box>


    </>)
}
