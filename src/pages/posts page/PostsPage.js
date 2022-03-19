import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostByUser } from '../../redux/actions/postActions'
import Moment from "react-moment";
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { CLEAR_POST } from '../../redux/types';

export default function PostsPage() {

    useEffect(() => {
        dispatch({ type: CLEAR_POST })
        dispatch(getPostByUser())
    }, [])

    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)

    return (
        <Grid container style={{ marginTop: 10 }} justifyContent="center" alignItems="center">
            <Grid item md></Grid>
            <Grid item xs style={{ padding: 20 }}>
                {posts === null || posts === undefined ?
                    "Posts Not available" :

                    posts.map(post => (<Card sx={{ mb: 1 }} key={post._id}>
                        <CardContent>
                            <Typography variant="h5" color="primary" component="div">
                                {post.title}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                {post.companyName}
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                                {post.location}
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary">
                                <Moment fromNow>{post.date}</Moment>
                            </Typography>
                        </CardContent>
                    </Card>))

                }
            </Grid>
            <Grid item md></Grid>
        </Grid>
    )
}
