import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import { login } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailIcon from '@mui/icons-material/Mail';

export default function Login() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, signupSuccess, serverError, errors } = useSelector(state => state.UI)
    console.log(errors)

    const onSubmit = (values) => {
        console.log(values, "formik")
        const userData = {
            email: values.email,
            password: values.password
        }
        dispatch(login(userData, navigate))
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email').required("Please enter your email"),
            password: yup.string().required("Please enter your password!")
        }),
        onSubmit
    })


    return (
        <Grid container style={{ marginTop: 25 }} justifyContent="center" alignItems="center">
            <Grid item sm></Grid>
            <Grid item sm direction="column" justifyContent="center" textAlign="center">
                <Typography variant="h4" sx={{ my: 3 }}>
                    Login
                </Typography>

                <form noValidate onSubmit={formik.handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 15 }}>
                    {signupSuccess && (
                        <Typography variant="body2" sx={{ color: 'success.main' }}>
                            Account registered successfully, please verify your Email before
                            logging-in
                        </Typography>
                    )}
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
                    {serverError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {"server error, please try again"}
                        </Typography>
                    )}

                    {errors && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {errors}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                        disabled={loading}
                    >
                        Login
                        {loading && (
                            <CircularProgress size={30} />
                        )}
                    </Button>
                    <br />
                    <small >
                        Don't have an account ? sign up <Link to="/signup">here</Link>
                    </small>
                </form>

                <small style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: "40px", color: "primary", flexWrap: "wrap", flexDirection: "column" }}>
                    Demo Credentials:&nbsp;
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: "3px", flexDirection: "row" }}>
                        <MailIcon color="primary" fontSize="small" />
                        candidate@gmail.com<br />
                        recruiter@gmail.com<br />
                    </div>
                    <div>
                        <sub><LockOpenIcon color="primary" fontSize="small" /></sub>password
                    </div>

                </small>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}
