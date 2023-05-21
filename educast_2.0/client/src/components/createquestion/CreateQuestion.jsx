import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const initialQuestion = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date(),
};

const CreateQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [question, setQuestion] = useState(initialQuestion);
  const [file, setFile] = useState('');
  const { account } = useContext(DataContext);

  const url =
    question.picture ||
    'https://media.istockphoto.com/id/1406982606/vector/3d-chat-bubble-with-question-mark-white-speech-or-speak-bubble-faq-support-help-center.webp?s=2048x2048&w=is&k=20&c=cPMkO4ccScg8vVdUugmzuwCliS4UsAX_ZqUy31qdO9w=';
  const [content, setContent] = useState('');

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleTitleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const strippedData = data.replace(/(<([^>]+)>)/gi, ''); // remove HTML tags
    setQuestion({ ...question, description: strippedData });
  };
  

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);
  
        const response = await API.uploadFile(data);
        setQuestion({ ...question, picture: response.data });
      }
    };
    getImage();
    setQuestion({
      ...question,
      categories: location.search?.split('=')[1] || 'All',
      username: account.username,
    });
  }, [file]);
      
      
    

  const saveQuestion = async () => {
    if (question.title.trim() === '') {
      alert('Please enter a title.');
      return;
    }

    await API.createQuestion(question);
    navigate('/qna');
  };

return (
<Container>
<Image src={url} alt="question" />


  <StyledFormControl>
    <label htmlFor="fileInput">
      <Add fontSize="large" color="action" />
    </label>
    <input
      type="file"
      id="fileInput"
      style={{ display: 'none' }}
      onChange={(e) => setFile(e.target.files[0])}
    />
    <InputTextField
      onChange={handleTitleChange}
      name="title"
      placeholder="Title"
    />
    <Button onClick={saveQuestion} variant="contained" color="primary">
      send
    </Button>
  </StyledFormControl>

  <CKEditor
    editor={ClassicEditor}
    data={content}
    onReady={(editor) => {
      console.log('Editor is ready to use!', editor);
    }}
    onChange={handleEditorChange}
    onBlur={(event, editor) => {
      console.log('Blur.', editor);
    }}
    onFocus={(event, editor) => {
      console.log('Focus.', editor);
    }}
  />
</Container>
);
};


export default CreateQuestion;
