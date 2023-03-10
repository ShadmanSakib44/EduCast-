import { styled, Box, Typography } from '@mui/material';
import TypingImage from './Typing-bro.png';

const Image = styled(Box)`
  width: 100%;
  background: url(${TypingImage}) center/50%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

// const Heading = styled(Typography)`
//   font-size: 70px;
//   color: lightgreen;
//   line-height: 1;
//   font-weight: bold;
//   text-shadow: 2px 2px 0 #000000, -2px -2px 0 #000000, 2px -2px 0 #000000,
//     -2px 2px 0 #000000; /* Updated text-shadow */
// `;

const Heading = styled(Typography)`
  font-size: 100px;
  color: #ffffff;
  line-height: 1;
  font-weight: bold;
  text-shadow: 2px 2px 0 #000000, -2px -2px 0 #000000, 2px -2px 0 #000000,    -2px 2px 0 #000000; 
  // border: 5px solid black; /* Added border */
  background: linear-gradient(180deg, #207531, #40cf61);
  

`;



const SubHeading = styled(Typography)`
  font-size: 20px;
  color: lightgreen;
  font-weight: 600; /* Updated font-weight */
  text-shadow: 2px 2px 0 #000000, -2px -2px 0 #000000, 2px -2px 0 #000000,    -2px 2px 0 #000000;
  // text-shadow: 2px 2px 0 #000000, -2px -2px 0 #000000, 2px -2px 0 #000000,
  //   -2px 2px 0 #000000;
`;


const Banner = () => {
  return (
    <Image>
      <Heading>FORUM</Heading>
      <SubHeading>
        Post Or Search For Specific Topic Of Your Choice
      </SubHeading>
    </Image>
  );
};

export default Banner;
