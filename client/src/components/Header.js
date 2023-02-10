import React from 'react'
import "./header.css";
import Avatar from '@mui/material/Avatar';

const Header = () => {
  return (
    <>
        <header>
            <nav>
                <h1>EduCast</h1>
            
            <div className='avtar'>
            <Avatar style={{background:"#3bba9c"}}>H</Avatar>
            </div>
            </nav>
        </header>
    </>
  )
}

export default Header
