import React from 'react';

function Contact() {
    const contactStyle = {
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      };
      

  const imageStyle = {
    width: '500px',
    height: 'auto',
    marginRight: '50px',
  };

  return (
    <div>
      <h2></h2>
      <div style={contactStyle}>
        {<img /*src={require('/Users/shadmansakib/Downloads/MERN-Stack-Projects-master/Blog-Website/client/src/components/contact/Contact us-amico.svg').default}*/ alt="Contact" style={imageStyle} /> }
        <div>
          <h3>Contact Information</h3>
          <p>Phone Number: 01608637421</p>
          <p>Email: shadmansakib20@iut-dhaka.edu</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
