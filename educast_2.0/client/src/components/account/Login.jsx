import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link,useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { color } from '@mui/system';
import eImage from '../image/ET.png';
import gImage from '../image/google.png';

import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {signupGoogle} from "../../redux/actions/auth";

const Component = styled(Box)`
width: 600px;
margin: auto;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
background-size: cover;
background-position: center;
background-color: #abd4b5

    
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0',
    
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #348c26;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const GoogleLoginButton = styled(Button)`
    text-transform: none;
    background: #797389;
    color: white;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: black;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const GoogleSignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: black;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};



const Login = ({ isUserAuthenticated }) => {    
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = eImage;
    const gimageURL = gImage;

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    // const dispatch = useDispatch();

    // function handleGoogleLoginSuccess(tokenResponse) {

    //     const accessToken = tokenResponse.access_token;

    //     dispatch(signinGoogle(accessToken,navigate))
    // }
    // const googleLogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    // function handleGoogleSignUpSuccess(tokenResponse) {

    //     const accessToken = tokenResponse.access_token;

    //     dispatch(signupGoogle(accessToken,navigate))
    // }

    // const googleSignUp = useGoogleSignUp({onSuccess: handleGoogleSignUpSuccess});

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Educast" style={{ width: '200px', height: '180px'}} />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField helperText="Please enter your username" id="demo-helper-text-misaligned"  value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField helperText="Please enter your password" id="demo-helper-text-misaligned" type="password" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <GoogleSignupButton><img src={gimageURL}></img>Sign In with Google</GoogleSignupButton>
                            <Text style={{ textAlign: 'center', color:'black' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            {/* <TextField type="text" variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' /> */}

                            <TextField helperText="Please enter your name" id="demo-helper-text-misaligned" onChange={(e) => onInputChange(e)} name='name' label="Enter Name"/>

                            <TextField helperText="Please enter your email" id="demo-helper-text-misaligned"  onChange={(e) => onInputChange(e)} name='username' label='Enter Email' />
                            {/* <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' /> */}
                            <TextField helperText="Please enter your password" id="demo-helper-text-misaligned" type="password"  onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />


                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <GoogleSignupButton><img src={gimageURL}></img>Sign Up with Google</GoogleSignupButton>
                            <Text style={{ textAlign: 'center',color:'black' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;

// onClick={() => googleSignUp()}