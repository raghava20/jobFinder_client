import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../redux/actions/authActions';
import PersonIcon from '@mui/icons-material/Person';

export default function Appbar() {

    const dispatch = useDispatch();
    const { authenticated, user: { account } } = useSelector(state => state.auth)

    const candidate = ['Jobs'];
    const candidateProfile = ['Applied Jobs', 'Logout'];

    const recruiter = ['Jobs'];
    const recruiterProfile = ['Post Job', 'My posts', 'Logout']

    const [user, setUser] = useState("")
    const [userProfile, setUserProfile] = useState("")
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        getDataFromDb()
    }, [account])

    const getDataFromDb = async () => {
        if (await account) {
            setUser(account.role)
            setUserProfile(account.role)
        }
    }

    let navigate = useNavigate()

    const endpointHandler = (endpoint) => {
        console.log(endpoint)
        if (endpoint.includes("Applied Jobs")) return navigate("/applied-jobs")
        else if (endpoint.includes("Jobs")) return navigate("/jobs")
        else if (endpoint.includes("Post Job")) return navigate("/post/create")
        else if (endpoint.includes("My posts")) return navigate("/post/me")
        else if (endpoint.includes("Logout")) return dispatch(logout(navigate))
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}                    >
                        JOB FINDER
                    </Typography>

                    {authenticated ?
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {(user === "recruiter" ? recruiter : candidate).map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => endpointHandler(page)}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        :
                        ""
                    }

                    {/* big screen */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        JOB FINDER
                    </Typography>
                    {authenticated ?
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {(user === "recruiter" ? recruiter : candidate).map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => {
                                        handleCloseNavMenu()
                                        endpointHandler(page)
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        :
                        ""
                    }

                    {/* authentication */}
                    {authenticated ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <PersonIcon color="secondary" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {(userProfile === "recruiter" ? recruiterProfile : candidateProfile).map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={() => endpointHandler(setting)}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        :
                        <>
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'flex' } }}>
                                <Button color="inherit" onClick={() => navigate("/login")} size="small" sx={{ mx: 1 }}>Login</Button>
                                <Button color="secondary" variant="outlined" onClick={() => navigate("/signup")} size="small">SignUp</Button>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: "flex-end" }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenUserMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={() => navigate("/login")}>Login</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={() => navigate("/signup")}>SignUp</Typography>
                                    </MenuItem>

                                </Menu>
                            </Box>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar >
    )
}
