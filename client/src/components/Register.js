import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import "./mix.css"

const Register = () => {


    const [passShow,setPassShow]=useState(false);
    const [cpassShow,setCPassShow]=useState(false);

  return (
    <>
     <section>
            <div className='form_data'>
                <div className='form_heading'>
                <h1>Sign Up</h1>
                <p>Sign Up to Educast to get additional help from <br/>
                one of the largest educational communities.</p>
            </div>
                <form>
                <div className='form_input'>
                        <label htmlFor='fname'>Name</label>
                        <input type="text" name='fname' id='fname' placeholder='Enter your Name'/>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name='email' id='email' placeholder='Enter your email address'/>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='password'>Password</label>
                        <div className='two'>
                        <input type={!passShow ? "password" : "text"} name='password' id='password' placeholder='Enter your password'/>
                        <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                            {!passShow ? "Show" : "Hide"}
                        </div>
                        </div>
                        
                    </div>

                    <div className='form_input'>
                        <label htmlFor='password'>Confirm Password</label>
                        <div className='two'>
                        <input type={!cpassShow ? "password" : "text"} name='cpassword' id='cpassword' placeholder='Confirm password'/>
                        <div className='showpass' onClick={()=>setCPassShow(!cpassShow)}>
                            {!cpassShow ? "Show" : "Hide"}
                        </div>
                        </div>
                        
                    </div>

                    <button className='btn'>Sign Up</button>
                    <p>Already have and account?<NavLink to="/"> Login</NavLink></p>
                </form>
            </div>
        </section>
    </>
  )
}

export default Register
