import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import { PostInterface } from '@/lib/slices/postSlice';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import CreatePost from '../CreatePost/CreatePost';
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}


export default function Post({post} : {post : PostInterface}) {


   
   
    return (
            <Box component={"div"} >
                <CreatePost />
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
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
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
                        
                        <CardActions sx={{justifyContent:"space-evenly"}} disableSpacing>
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

                        <Box sx={{bgcolor :"#eee"}}>
                             <CardHeader
                            avatar={
                                <Avatar 
                                 sx={{ bgcolor: red[500] }}  
                                 src={post?.comments[0].commentCreator.photo}
                                 alt={post?.comments[0].commentCreator.name}
                                 />
                                   
                            }
                           
                            title={post?.comments[0].commentCreator.name}
                            subheader={post?.comments[0].createdAt.split("T"[0])}
                            

                        />
                             {
                            post?.comments[0].content && <CardContent>
                            <Typography  >
                                {post?.comments[0].content}
                            </Typography>
                        </CardContent>
                        }
                            
                        </Box>
                        
                    </Card>
                
        </Box>
    );
}
