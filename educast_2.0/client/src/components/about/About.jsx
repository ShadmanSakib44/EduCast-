import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://wallpaper.dog/large/5556056.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
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

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3" color={'#ffffff'} >EDUCAST</Typography>
                <GreenBackground>
                    <Text variant="h5">
                        Welcome to Educast, a revolutionary platform that aims to revolutionize education through cutting-edge technology and innovative ideas. We believe that everyone should have access to high-quality education, regardless of their geographical location, socioeconomic status, or background.

                        Our platform offers improved communication and collaboration between students and educators, making it easier for learners to access a wider range of educational resources. With Educast, students and educators from all around the world can connect with each other and share their resources .
                        <br />
                        If you are interested, you can view our project here.
                        <Box component="span" style={{ marginLeft: 5 }}>
                            <Link href="https://github.com/ShadmanSakib44" color="inherit" target="_blank"><GitHub /></Link>
                        </Box>
                    </Text>
                    <Text variant="h5">
                        Need help with something ? Reach out to us on
                        <Box component="span" style={{ marginLeft: 5 }}>
                            <Link href="https://www.instagram.com/shi_shi1826/" color="inherit" target="_blank">
                                <Instagram />
                            </Link>
                        </Box>  
                            or send us an Email 
                            <Link href="oishyfatemaakhand@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                                <Email />
                            </Link>.
                    </Text>
                </GreenBackground>
            </Wrapper>
        </Box>
    )
}

export default About;
