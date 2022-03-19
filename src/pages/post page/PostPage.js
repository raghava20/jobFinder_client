import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardContent, CircularProgress, Grid, IconButton, Link, Typography } from '@mui/material'
import Moment from "react-moment";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import { green } from '@mui/material/colors';
import { appliedPostOnUser, applyJobOnPost, getPostById } from '../../redux/actions/postActions';
import { getAllProfiles } from '../../redux/actions/profileAction';

const color = green[500];
export default function PostPage() {

    const [applyBtn, setApplyBtn] = useState(false)
    const [applicantTotal, setApplicantTotal] = useState(0)
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const { post } = useSelector(state => state.post)
    const { user: { account: { role, _id } } } = useSelector(state => state.auth)

    useEffect(() => {
        console.log("post", post)
        dispatch(getAllProfiles())
        getDataFromDb()
    }, [post])


    const getDataFromDb = async () => {
        const result = await post?.apply?.find(post => post.user === _id)
        console.log("came", post.apply)
        if (result) {
            console.log("came2")
            setApplyBtn(true)
        }

        setApplicantTotal(post.apply.length)
    }
    const applyHandler = (id) => {
        dispatch(applyJobOnPost(id))
        dispatch(appliedPostOnUser(id))
    }

    const getApplicants = (id) => {
        navigate("/profile/applicants")
        dispatch(getPostById(id))
    }

    return (role === null || post === null || _id === null ?
        <CircularProgress /> :
        <Grid container style={{ marginTop: 10 }} justifyContent="center" alignItems="center">
            <Grid item md></Grid>
            <Grid item xs style={{ padding: 20 }}>
                <IconButton onClick={() => navigate("/jobs")}>
                    <KeyboardBackspaceIcon />
                </IconButton>
                <Card >
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5" color="primary" component="div">
                                {post.title}
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary">
                                <Moment fromNow>{post.date}</Moment>
                            </Typography>
                        </div>

                        <Typography color="text.secondary" gutterBottom style={{ padding: 4, marginTop: 10 }}>
                            <BusinessCenterIcon style={{ position: "relative", top: 6 }} /> {post.jobType}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom sx={{ mb: 1.5, fontSize: 13 }}>
                            <DescriptionIcon style={{ position: "relative", top: 6 }} /> {post.description}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            <AttachMoneyIcon style={{ position: "relative", top: 6 }} /> {post.salary}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            <BusinessIcon style={{ position: "relative", top: 6 }} /> {post.companyName}, {post.location}
                        </Typography>


                        {role === "candidate" ?
                            <Button variant="contained" disabled={applyBtn} onClick={() => applyHandler(post._id)}>
                                {applyBtn ? "Applied" : "Apply"}
                            </Button> :
                            <Typography sx={{ mt: 2, fontSize: 14 }} >
                                <Link color={color} onClick={() => getApplicants(post._id)} style={{ cursor: 'pointer' }}>Applicants({applicantTotal})</Link>

                            </Typography>}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md></Grid>
        </Grid>
    )
}
