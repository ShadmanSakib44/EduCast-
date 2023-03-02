
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #ffffff;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3" color={"#ffffff"}>Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to us on
                    <Link href="https://www.instagram.com/codeforinterview/" color="#ffffff" target="_blank">
                        <Instagram/>
                    </Link>
                    or send us Email 
                    <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="#ffffff">
                        <Email />
                    </Link>. Or contact us at- 0123456678
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;
