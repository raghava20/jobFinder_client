import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../../redux/actions/postActions'
import Moment from "react-moment";
import { useNavigate } from 'react-router-dom'
import { getPostById } from "../../redux/actions/postActions"
import { CLEAR_POST } from '../../redux/types';

export default function Dashboard() {

    useEffect(() => {
        dispatch(getAllPost())
    }, [])
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    const { authenticated } = useSelector(state => state.auth)
    let navigate = useNavigate()

    const openPostHandler = (id) => {
        dispatch({ type: CLEAR_POST })
        dispatch(getPostById(id))
        navigate(`/post/${id}`)
    }

    return (authenticated ?
        <Grid container style={{ marginTop: 10 }} justifyContent="center" alignItems="center" >
            <Grid item md></Grid>
            <Grid item xs style={{ padding: 20 }}>
                {posts.map(post => (<Card sx={{ mb: 1 }} key={post._id} onClick={() => openPostHandler(post._id)} style={{ cursor: 'pointer' }}>
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
                </Card>))}
            </Grid>
            <Grid item md></Grid>
        </Grid >
        :
        <CircularProgress />
    )
}
