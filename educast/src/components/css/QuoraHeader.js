import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlinedIcon';

function QuoraHeader() {
  return (
    <div className='qHeader' >
        <div className='qHeader-content'>
    <div className='qHeader__logo'>
        <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FTohhRbw_performance-appraisal-q-a-division-compass-question-q%2F&psig=AOvVaw2cc67Iya0z-vpsEg-CnzE5&ust=1676053581632000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNib4aWIif0CFQAAAAAdAAAAABAD' alt='logo'/>
        <div className='qHeader__icons'>
        <div className='qHeader__icon'>
            <HomeIcon />
            </div>
        <div className='qHeader__icon'><FeaturedPlayListOutlinedIcon /></div>
        <div className='qHeader__icon'></div>
        <div className='qHeader__icon'></div>
        <div className='qHeader__icon'></div>
        </div>
    </div>
</div>
</div>
  );
}

export default QuoraHeader;


