import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CircularProgress, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserProfileById } from '../../redux/actions/profileAction';
import BusinessIcon from '@mui/icons-material/Business';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ApplicantsPage() {

    const [profileData, setProfileData] = useState([])
    const [usersAppliedJob, setUsersAppliedJob] = useState([])

    const dispatch = useDispatch()
    const { post } = useSelector(state => state.post)
    const { profiles, profile } = useSelector(state => state.profile)

    let navigate = useNavigate()
    useEffect(() => {
        console.log(post, "post")
        getDataFromDb()

    }, [])

    const openPostHandler = (id) => {
        console.log(id, "id")
        setUsersAppliedJob("")
        dispatch(getUserProfileById(id))
        setUsersAppliedJob(profile)

    }

    const getDataFromDb = async () => {
        const data = []
        let result = await post?.apply?.map(posts => posts)

        result = result?.map(post => post.user)
        console.log(result, "result")
        profiles?.map(profile => {
            return result?.map(result => {
                if (profile._id === result) {
                    data.push(profile)
                }
                return ""
            })

        })
        console.log(data, "data")
        setProfileData(data)
        console.log(profiles)
    }

    return (
        <Grid container style={{ marginTop: 10 }} justifyContent="center" alignItems="center">
            <Grid item md></Grid>
            <Grid item xs style={{ padding: 20 }} disabled>
                {profileData === undefined || !profileData || profileData === null ?
                    profileData.length === 0 ? "No profiles" : <CircularProgress /> :
                    <>
                        <IconButton onClick={() => navigate(-1)}>
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        {profileData.map(profile => (<Accordion onClick={() => openPostHandler(profile._id)}>

                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}

                            >
                                <Typography variant="h6" color="primary" component="div">
                                    {profile.name} <Typography color="text.secondary" gutterBottom>
                                        {profile.email}
                                    </Typography>
                                </Typography>

                            </AccordionSummary>

                            <AccordionDetails>
                                {usersAppliedJob?.map(data => (<>
                                    <Typography color="text.secondary" key={data.title} gutterBottom>
                                        {data.jobPost.title}
                                    </Typography>
                                    <Typography color="text.secondary" variant="caption" gutterBottom>
                                        <BusinessIcon style={{ position: "relative", top: 6 }} fontSize="small" /> {data.jobPost.companyName}
                                    </Typography>
                                </>
                                ))}
                            </AccordionDetails>
                        </Accordion>))
                        }
                    </>
                }

            </Grid>
            <Grid item md>
            </Grid>
        </Grid >
    )
}
