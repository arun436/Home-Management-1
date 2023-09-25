import React, { useState } from 'react'
import './Login.css'
import emailicon from '../../assets/email.png'
import passwordicon from '../../assets/password.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



function Login() {
    const [values,setvalues]=useState({
        email:'',
        password:''
    })
    const [error,seterror]=useState('')
    const navigate=useNavigate()
    
    const handlesubmit=(event)=>{
  event.preventDefault();
  axios.post('http://localhost:8801/login',values)
  .then(res=>{
    if(res.data.Status=='Success'){
       let userdata=res.data.Result[0]
       localStorage.setItem('Id',userdata.Id)
       localStorage.setItem('AdminId',userdata.AdminId)
   navigate('/dashboard/home',{
    state:userdata
   })
    }
    else{
    seterror(res.data.ErrorMessage)
    }
  })
  .catch(err=>console.log(err))

    }

    return (
        <div className='container login-component'>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handlesubmit}>
            <div className='inputs'>
                {/* {action == 'Login' ? <div></div> :
                    <div className='input signup'>
                        <img src={personicon} alt='' />
                        <input type="text" placeholder='Name' />
                    </div>} */}

                <div className='input'>
                    <img src={emailicon} alt='' />
                    <input type="email" name='email' placeholder='Email Id' onChange={e=>setvalues({...values,email:e.target.value})}/>
                </div>
                <div className='input'>
                    <img src={passwordicon} alt='' />
                    <input type="password" name='password' placeholder='Password' onChange={e=>setvalues({...values,password:e.target.value})}/>
                </div>
            </div>
            <div className='error'>
                    {error && error}
                </div>
           <div className='forgot-password'><a href='#'>Forgot Password ?</a></div>
            <div className='submit-container'>
                <button type="submit" className='submit'>Login</button>
                <Link to="/register">Not a member? Register</Link>
            
            </div>
            </form>
        </div>
    )
}

export default Login
