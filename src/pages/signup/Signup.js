import React from 'react'
import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import { signupUser } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

export default function Signup() {

    let navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, serverError, errors } = useSelector(state => state.UI)

    const onSubmit = (values) => {
        console.log(values, "formik")
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role
        }
        dispatch(signupUser(userData, navigate))
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Please enter your name!"),
            email: yup.string().email('Invalid email').required("Please enter your email!"),
            password: yup.string().required("Please enter your password!").min(6),
            role: yup.string().required("Please mark your role!")
        }),
        onSubmit
    })

    return (
        <Grid container style={{ marginTop: 25 }} justifyContent="center" alignItems="center">
            <Grid item sm></Grid>
            <Grid item sm direction="column" justifyContent="center" textAlign="center">
                <Typography variant="h4" sx={{ my: 3 }}>
                    Signup
                </Typography>

                <form noValidate onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 15 }}>


                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                        error={formik.touched.name && formik.errors.name ? true : false}
                    />

                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        error={formik.touched.email && formik.errors.email ? true : false}
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                        error={formik.touched.password && formik.errors.password ? true : false}
                    />

                    <FormControl style={{ textAlign: 'left' }}>
                        <FormLabel >Role</FormLabel>
                        <RadioGroup row value={formik.values.role} onChange={formik.handleChange} name="role" id="role">
                            <FormControlLabel value="candidate" control={<Radio />} label="Candidate" />
                            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                        </RadioGroup>
                    </FormControl>

                    {errors && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {errors}
                        </Typography>
                    )}

                    {serverError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {"server error, please try again"}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                        disabled={loading}
                    >
                        Signup
                        {loading && (
                            <CircularProgress size={30} />
                        )}
                    </Button>
                    <br />
                    <small >
                        Already have an account ? Login <Link to="/login">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}
