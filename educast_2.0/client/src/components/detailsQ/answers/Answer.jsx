import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Answer = ({ answer, setToggle }) => {

    const { account } = useContext(DataContext)
    
    const removeAnswer = async () => {
       await API.deleteAnswer(answer._id);
       setToggle(prev => !prev);
    }

    return (
        <Component>
            <Container>
                <Name>{answer.name}</Name>
                <StyledDate>{new Date(answer.date).toDateString()}</StyledDate>
                { answer.name === account.username && <DeleteIcon onClick={() => removeAnswer()} /> }
            </Container>
            <Typography>{answer.answers}</Typography>
        </Component>
    )
}

export default Answer;