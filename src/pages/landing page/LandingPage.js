import { Box, Button } from '@mui/material'
import React from 'react'
import { ReactComponent as LandingSVG } from "../../images/Landing.svg"
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    hero: {
        display: 'flex',
        width: "90%",
        margin: "auto",
        minHeight: "80vh",
        alignItems: "center",
        padding: "2rem",
        ["@media (max-width:1024px)"]: {
            flexDirection: "column",
            marginTop: "2rem",
            padding: "0.5rem",
        },
    }

}))

export default function LandingPage() {
    const classes = useStyles()
    let navigate = useNavigate()

    return (
        <Box className={classes.hero}>
            <div >
                Lorem ipsum dolor sit amet, consectetur adip
                Lorem ipsum dolor sit amet, consectetur adip
                Lorem ipsum dolor sit amet, consectetur adip
                Lorem ipsum dolor sit amet, consectetur adip
                Lorem ipsum dolor sit amet, consectetur adip
                Lorem ipsum dolor sit amet, consectetur adip
                <br />
                <Button variant="contained" sx={{ my: 6 }} onClick={() => navigate("/login")}>Search Now</Button>
            </div>
            <div style={{ width: '100%', height: '500px' }}>
                <LandingSVG style={{ width: '100%', height: '100%' }}></LandingSVG>
            </div>
        </Box>
    )
}
