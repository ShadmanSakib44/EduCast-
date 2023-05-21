import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Answer from './Answer';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    questionId: '',
    date: new Date(),
    answers: ''
}

const Answers = ({ question }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [answer, setAnswer] = useState(initialValue);
    const [answers, setAnswers] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllAnswers(question._id);
            if (response.isSuccess) {
                setAnswers(response.data);
            }
        }
        getData();
    }, [toggle, question]);

    const handleChange = (e) => {
        setAnswer({
            ...answer,
            name: account.username,
            questionId: question._id,
            answers: e.target.value
        });
    }

    const addAnswer = async() => {
        await API.newAnswer(answer);
        setAnswer(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="an you give the answer?"
                    onChange={(e) => handleChange(e)} 
                    value={answer.answers}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addAnswer(e)}
                >Answer</Button>             
            </Container>
            <Box>
                {
                    answers && answers.length > 0 && answers.map(answer => (
                        <Answer answer={answer} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Answers;