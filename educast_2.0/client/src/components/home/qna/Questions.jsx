import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { API } from '../../../service/api';

import Question from './Question';

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => { 
      let response = await API.getAllQuestions();
      if (response.isSuccess) {
        setQuestions(response.data);
      }
    }
    fetchData();
  }, );

  return (
    <>
      {questions?.length ? (
        <Grid container spacing={2}>
          {questions.map((question) => (
            <Grid item key={question._id} lg={3} sm={4} xs={12}>
              <Link style={{textDecoration: 'none', color: 'inherit'}} to={`detailsQ/${question._id}`}>
                <Question question={question} />
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
          No data is available.
        </Box>
      )}
    </>
  )
}

export default Questions;
