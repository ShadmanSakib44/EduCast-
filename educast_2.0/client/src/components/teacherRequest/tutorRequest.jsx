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

const TutorRequestButton = styled(Button)`
  text-transform: none;
  background: #348c26;
  color: #fff;
  height: 48px;
  border-radius: 24px; /* set the border-radius to half of the height */
  
`;

const TutorRequest = ({ isUserAuthenticated }) => {

  const imageURL = eImage;

  const user = JSON.parse(localStorage.getItem("userItem"));

  const id = user._id;

  console.log(id);

  const sendRequest = async(e) => {
    e.preventDefault();

    const res = axios.post(`http://localhost:8000/tutorRequest/${id}`
    ).then((response) => {
      console.log(response);
      const responseStatus = response.data.status;
      if (responseStatus == 201) {
        window.alert("Success!");
      }
      else {
        console.log(response);
      }
    });
    
  }

    return (
        <Component>
            
            <Box>
                <Image src={imageURL} alt="Educast" style={{ width: '200px', height: '180px'}} />
                
                <Wrapper>
                    <TutorRequestButton variant="contained" onClick={(e) => sendRequest(e)} >Apply For Tutor</TutorRequestButton>
                </Wrapper>
            </Box>
        </Component>
    )
}

export default TutorRequest;

