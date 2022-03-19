import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from "react-moment";
import { getAllPost } from "../../redux/actions/postActions"
import { green } from '@mui/material/colors';

const color = green[500];
export default function ProfilesPage() {

    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    const { user: { account } } = useSelector(state => state.auth)
    const [data, setData] = useState([])


    useEffect(() => {
        dispatch(getAllPost())
        getDataFromDb()
    }, [])

    const getDataFromDb = async () => {
        const data = []
        await posts.map(post => {
            console.log(post)
            console.log(account._id)
            return post.apply.map(allPost => {
                if (allPost.user === account._id) {
                    data.push(post)
                }
                return ""
            })
        })
        setData(data)
    }

    return (
        <Grid container style={{ marginTop: 10 }} justifyContent="center" alignItems="center">
            <Grid item md></Grid>
            <Grid item xs style={{ padding: 20 }}>
                {data === null || data === undefined ?
                    "No applicants" :
                    <>
                        {data.map(post => (<Card sx={{ mb: 1 }} key={post._id}>

                            <CardContent>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h5" color="primary" component="div">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color={color} component="div">
                                        Applied
                                    </Typography>
                                </div>
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
                    </>
                }
            </Grid>
            <Grid item md></Grid>
        </Grid>
    )
}
