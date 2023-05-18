import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles'
// import memories from "../../images/memories-Logo.png";
import memoriaText from "../../images/memoriaText.png";
import memoriaLogo from "../../images/memories-Logo.png";
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as actionType from '../../constants/actionsTypes';
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))    //getting something from localStorage

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/auth');
        setUser(null);
    }
    useEffect(() => {   // use effect with useLocation is use to get user name in place of signin button after sign in immediately without page refresh..
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {   //logout in case of token expiry.
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriaText} alt='icon' height="50px" />
                <img
                    className={classes.image}
                    src={memoriaLogo}
                    alt="memories"
                    height="40px"
                ></img>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6" >
                            {user.result.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant="contained" color="primary">
                        SignIn
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar