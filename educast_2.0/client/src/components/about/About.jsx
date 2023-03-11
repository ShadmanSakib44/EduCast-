import React from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Wrapper = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled(Box)`
  width: 50%;
  margin-right: 50px;
`;

const InfoContainer = styled(Box)`
  width: 50%;
`;

const GreenBackground = styled(Box)`
  background-color: #439936;
  padding: 10px;
  border-radius: 5px;
`;

const Text = styled(Typography)`
  color: #ffffff;
`;

const About = () => {
  const imageStyle = {
    width: '100%',
    height: 'auto',
  };

  return (
    <Box>
      <Wrapper>
        <ImageContainer>
          <img
            // src={require('/Users/shadmansakib/Downloads/MERN-Stack-Projects-master/Blog-Website/client/src/components/about/About us page-amico.svg').default}
            alt="About Us"
            style={imageStyle}
          />
        </ImageContainer>
        <InfoContainer>
          <Typography variant="h3">EDUCAST</Typography>
          <GreenBackground>
            <Text variant="h5">
              Welcome to Educast, a revolutionary platform that aims to revolutionize education through cutting-edge
              technology and innovative ideas. We believe that everyone should have access to high-quality education,
              regardless of their geographical location, socioeconomic status, or background. Our platform offers
              improved communication and collaboration between students and educators, making it easier for learners to
              access a wider range of educational resources. With Educast, students and educators from all around the
              world can connect with each other and share their resources.
              <br />
              If you are interested, you can view our project here.
              <Box component="span" style={{ marginLeft: 5 }}>
                <Link href="https://github.com/ShadmanSakib44" color="inherit" target="_blank">
                  <GitHub />
                </Link>
              </Box>
            </Text>
            <Text variant="h5">
              Need help with something? Reach out to us on
              <Box component="span" style={{ marginLeft: 5 }}>
                <Link href="https://www.instagram.com/shi_shi1826/" color="inherit" target="_blank">
                  <Instagram />
                </Link>
              </Box>
              or send us an Email
              <Link href="oishyfatemaakhand@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                <Email />
              </Link>
              .
            </Text>
          </GreenBackground>
        </InfoContainer>
      </Wrapper>
    </Box>
  );
};

export default About;
