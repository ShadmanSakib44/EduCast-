import React from 'react'
import "./mix.css";

const Login = () => {
  return (
    <>
        <section>
            <div className='form_data'>
                <div className='form_heading'>
                <h1>Welcome Back, Log In</h1>
                <p>Hi, We are glad you are back. Please login.</p>
            </div>
                <form>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name='email' id='email' placeholder='Enter your email address'/>
                    </div>
                    <div className='form_input'>
                        <label htmlFor='password'>Password</label>
                        <div className='two'>
                        <input type="password" name='email' id='password' placeholder='Enter your password'/>
                        <div className='showpass'>
                            Show
                        </div>
                        </div>
                        
                    </div>

                    <button className='btn'>Login</button>
                    <p>Don't have an account?Registration</p>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login

