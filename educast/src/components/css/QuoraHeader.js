import React from 'react';
import HomeIcon from '@material-ui/icons/Home';

function QuoraHeader() {
  return (
    <div className='qHeader'>
        <div className='qHeader-content'>
            <div className='qHeader__logo'>
                <img src='https://www.google.com/imgres?imgurl=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F129%2F414%2Fpng-clipart-computer-icons-question-and-answer-logo-diabetes.png&imgrefurl=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Dquestion%2BIcon&tbnid=PRcuXcPkXjWPmM&vet=12ahUKEwjF58uUlIr9AhWVg-YKHad3DL0QMygFegUIARDSAQ..i&docid=hhh8gLqypnfnXM&w=900&h=498&q=qna%20logo%20png&client=firefox-b-d&ved=2ahUKEwjF58uUlIr9AhWVg-YKHad3DL0QMygFegUIARDSAQ' alt='logo' />
                <div className='qHeader__icons'>
                    <div className='qHeader__icon'><HomeIcon/></div>
                    <div className='qHeader__icon'></div>
                    <div className='qHeader__icon'></div>
                    <div className='qHeader__icon'></div>
                    <div className='qHeader__icon'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuoraHeader
