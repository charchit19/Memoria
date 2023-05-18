import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { signin, signup } from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


const Auth = () => {
    const clientId = "747416914624-eriatkrs1i3oja2gb0kpekdv4qi20k5i.apps.googleusercontent.com"
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
        // console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
    }, [])

    const googleSuccess = async (res) => {
        const result = res?.profileObj;      // ?. use to avoid error if we don't have access to the rest object.
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google signIn was unsuccessful. Try again later.")
    }


    return (
        <Container component="main" maxwidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    {/* <VisibilityIcon /> */}
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'SignUp' : 'SignIn'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp &&
                            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                        {isSignUp ? 'SignUp' : 'SignIn'}
                    </Button>
                    <GoogleLogin
                        clientId={clientId}
                        render={(renderProps) => (                           //render means how we are going to show our button
                            <Button
                                className={classes.googleButton}
                                startIcon={<Icon />}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>


            </Paper>
        </Container>
    )
};

export default Auth;
