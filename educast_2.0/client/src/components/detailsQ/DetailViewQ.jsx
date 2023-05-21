import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';
import ReadingGlassesImage from '../details/Reading glasses-bro.svg';

// components
import Answers from './answers/Answers';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    color:'#000',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '60vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    color:#000000;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#000000',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailViewQ = () => {
    //const url = 'https://burst.shopifycdn.com/photos/person-holds-a-book-over-a-stack-and-turns-the-page.jpg?width=1200&format=pjpg&exif=1&iptc=1';
    const url = ReadingGlassesImage;
    const [question, setQuestion] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getQuestionById(id);
            if (response.isSuccess) {
                setQuestion(response.data);
            }
        }
        fetchData();
    }, []);

    const deleteQuestion = async () => {  
        await API.deleteQuestion(question._id);
        navigate('/qna')
    }

    return (
        <Container>
            <Image src={question.picture || url} alt="question" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === question.username && 
                    <>  
                        <Link to={`/updatequestion/${question._id}`}><EditIcon color="danger" /></Link>
                        <DeleteIcon onClick={() => deleteQuestion()} color="error" />
                    </>
                }
            </Box>
            <Heading>{question.title}</Heading>

            <Author>
                <Link to={`/detailsQ?username=${question.username}`} style={{ textDecoration: 'none', color: '#000000' }}>
                    <Typography>Sender: <span style={{fontWeight: 600}}>{question.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(question.createdDate).toDateString()}</Typography>
            </Author>

            <Typography color={"#000000"} dangerouslySetInnerHTML={{ __html: question.description }}></Typography>
            <Answers question={question} />
        </Container>
    )
}

export default DetailViewQ;