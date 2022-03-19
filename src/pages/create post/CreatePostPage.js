import { Button, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useForm from "../../hooks/useForm"
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../redux/actions/postActions'
import { useNavigate } from 'react-router-dom'
import { CLEAR_POST } from '../../redux/types'

export default function CreatePostPage() {

    const dispatch = useDispatch()
    let navigate = useNavigate()
    const { error } = useSelector(state => state.post)

    useEffect(() => {
        dispatch({ type: CLEAR_POST })
    }, [])
    const postJobHandler = () => {
        const postData = {
            title: inputs.title,
            jobType: inputs.jobType,
            description: inputs.description,
            salary: inputs.salary,
            companyName: inputs.companyName,
            location: inputs.location
        }
        dispatch(addPost(postData, navigate))
    }

    const { inputs, handleInputChange, handleSubmit } = useForm(
        {
            title: "",
            jobType: "",
            description: "",
            salary: "",
            companyName: "",
            location: ""
        },
        postJobHandler
    )
    return (
        <Grid container style={{ marginTop: 10 }} justifyContent="center" alignItems="center">
            <Grid item md></Grid>
            <Grid item xs textAlign="center" style={{ padding: 20 }}>
                <Typography variant="h5" style={{ marginBottom: 20 }}>
                    Post a Job
                </Typography>

                <form noValidate onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 15 }}>
                    <TextField
                        name="title"
                        label="Job Title*"
                        type="text"
                        value={inputs.title}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                    />
                    <TextField
                        name="jobType"
                        label="Job Type"
                        type="text"
                        value={inputs.jobType}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                    />
                    <TextareaAutosize
                        name="description"
                        placeholder="Description*"
                        type="text"
                        value={inputs.description}
                        onChange={handleInputChange}
                        fullWidth
                        minRows={5}
                        style={{ padding: 4 }}
                    />
                    <TextField
                        name="salary"
                        label="Salary"
                        type="text"
                        value={inputs.salary}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                    />
                    <TextField
                        name="companyName"
                        label="Company Name*"
                        type="text"
                        value={inputs.companyName}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                    />
                    <TextField
                        name="location"
                        label="Location"
                        type="text"
                        value={inputs.location}
                        onChange={handleInputChange}
                        fullWidth
                        size="small"
                    />
                    {error && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {"Please fill required field"}
                        </Typography>
                    )}

                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form>
            </Grid>
            <Grid item md></Grid>
        </Grid>
    )
}
