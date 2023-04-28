import React, { useState, useEffect } from 'react';

import PasswordStrengthBar from 'react-password-strength-bar';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import eImage from '../image/ET.png';
import zxcvbn from 'zxcvbn';
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

const ForgotPassword = ({ isUserAuthenticated }) => {

  const imageURL = eImage;

  const {id,token} = useParams();

  const [password, setPassword] = useState("");

  const setVal = (e) => {
    setPassword(e.target.value);
  }

  const userValid = async() => {
    const res = axios.get(`http://localhost:8000/forgotpassword/${id}/${token}`,
    ).then((response) => {
      const responseStatus = response.data.status;
      if (responseStatus == 201) {
        console.log("User Valid") 
      }
    });
  }

  const sendPassword = async(e) => {
    e.preventDefault()

    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 3) {
      window.alert('Please choose a stronger password');
      return;
    }

    const res = axios.post(`http://localhost:8000/${id}/${token}`,{
      password
    }).then((response) => {
      console.log(response);
      const responseStatus = response.data.status;
      if (responseStatus == 201) {
        setPassword("");
        window.alert("Success!");
      }
      else {
        console.log(response);
        window.alert("Token expired");
      }
    });
  }

  useEffect(()=>{
    userValid()
  },[])

    return (
        <Component>
            
            <Box>
                <Image src={imageURL} alt="Educast" style={{ width: '200px', height: '180px'}} />
                
                <Wrapper>
                    <TextField helperText="Please enter your new password" id="demo-helper-text-misaligned" type="password" value={password} onChange={(e) => setVal(e)} name='password' label='Enter Password' />
                    {password && (
                      <PasswordStrengthBar
                          password={password}
                          minLength={6}
                          shortScoreWord="Short"
                          scoreWords={['Weak', 'Fair', 'Good', 'Strong', 'Secure']}
                          style={{
                              height: '10px', // change the height of the progress bar
                              borderRadius: '0', // remove rounded corners from the progress bar
                              backgroundColor: '#eee', // set background color for the progress bar
                              marginTop: '10px', // add margin to the top of the progress bar
                              border: 'none', // remove the border from the progress bar
                          }}
                          barColors={[
                              '#dc3545', // change color for score 0
                              '#ffc107', // change color for score 1
                              '#17a2b8', // change color for score 2
                              '#28a745', // change color for score 3
                              '#20c997', // change color for score 4
                          ]}
                          barWidth={80} // change the thickness of the colors
                      />
                    )}

                    <LoginButton variant="contained" onClick={(e) => sendPassword(e)} >Send</LoginButton>
                </Wrapper>
            </Box>
        </Component>
    )
}

export default ForgotPassword;

