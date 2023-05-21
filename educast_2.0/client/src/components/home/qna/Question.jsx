
import { styled, Box, Typography } from '@mui/material';
import ReadingGlassesImage from '../post/Blogging-rafiki.svg';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 350px;
  background: linear-gradient(180deg, #207531, #8ce6a1);
  & > img,
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Image = styled('img')({
  width: '60%',
  objectFit: 'cover',
  borderRadius: '10px 10px 0 0',
  height: 150
});

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
  color: #ffffff;
`;

const Question = ({ question }) => {
    const url = question.picture ? question.picture :  ReadingGlassesImage;
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <Image src={url} alt="question" />
            <Text>{question.categoriesq}</Text>
            <Heading>{addEllipsis(question.title, 20)}</Heading>
            <Text>Sender: {question.username}</Text>
            <Typography color={"#000000"} dangerouslySetInnerHTML={{ __html: addEllipsis(question.description, 100) }}></Typography>
        </Container>
    )
}

export default Question;