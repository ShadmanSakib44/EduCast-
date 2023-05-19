import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import eImage from '../image/ET.png';
import './index1.css';
import axios from 'axios';

const Component = styled(Box)`
width: 1080px;
 height: 720px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
  background-size: cover;
  background-position: center;
  background-color: #abd4b5;
  
  margin-right: 80px; /* adjust this value to your liking */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
  
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0',
    filter: 'brightness(30%)' /* adjust this value to make the image darker or lighter */
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
  border-radius: 24px; /* set the border-radius to half of the height */
  
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: black;
  height: 48px;
  border-radius: 24px; /* set the border-radius to half of the height */
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

const ResetPassword = ({ isUserAuthenticated }) => {

  const imageURL = eImage;

  const [email, setEmail] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  }

  const sendLink = async(e) => {
    e.preventDefault()

    axios.post("http://localhost:8000/sendpasswordlink",{
      email
    }).then((res) => {
      console.log(res);
      const responseStatus = res.data.status;
      if (responseStatus == 201) {
        setEmail("");
        window.alert("Success!");
      }
      else {
        console.log(res)
      }
    });
  }

    return (
        <Component>
            
            <Box>
                <Image src={imageURL} alt="Educast" style={{ width: '200px', height: '180px'}} />
                <Wrapper>
                    <TextField helperText="Please enter your email" id="demo-helper-text-misaligned"  value={email} onChange={(e) => setVal(e)} name='email' label='Enter Email' />

                    <LoginButton variant="contained" onClick={(e) => sendLink(e)} >Send</LoginButton>
                </Wrapper>
            </Box>
        </Component>
    )
}

export default ResetPassword;