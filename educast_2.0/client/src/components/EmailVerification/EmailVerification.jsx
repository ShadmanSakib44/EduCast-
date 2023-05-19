import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TextField, Box, Button, Typography, styled } from "@mui/material";
import eImage from "../image/ET.png";

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

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
  filter:
    "brightness(30%)" /* adjust this value to make the image darker or lighter */,
});

const Text = styled(Typography)`
  color: #878787;
  font-size: 50px;
`;

const EmailVerification = () => {
  const imageURL = eImage;

  let { email } = useParams();
  let { token } = useParams();
  const [isValidToken, setIsValidToken] = useState("");

  function verifyEmailToken(email, token) {
    const emailAndToken = {
      email: email,
      token: token,
    };
    axios
      .post("http://localhost:8000/verifyToken", emailAndToken)
      .then((response) => {
        const responseStatus = response.data.status;
        if (responseStatus == "okay") {
          setIsValidToken("set");
        }
      });
  }

  useEffect(() => {
    verifyEmailToken(email, token);
  }, []);

  return (
    <Component>
      <Box>
        <Image
          src={imageURL}
          alt="Educast"
          style={{ width: "200px", height: "180px" }}
        />
        {isValidToken == "set" ? (
          <Wrapper>
            <Text style={{ textAlign: "center", color: "black" }}>
              Email has been verified
            </Text>
          </Wrapper>
        ) : (
          <Wrapper>
            <Text style={{ textAlign: "center", color: "black" }}>
              Email has not been verified
            </Text>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default EmailVerification;
