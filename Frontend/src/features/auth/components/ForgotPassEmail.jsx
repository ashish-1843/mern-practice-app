import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import '../auth.form.css'

const ForgotPassEmail = () => {

  const { loading, handleForgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleForgotPassword({ email });

      toast.success("OTP Send on your email!");
      setTimeout(() => {
        navigate('/verify-email');
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message)
    }

    finally {
      setIsLoading(false);
    }
  }

  if(loading){
    return (<main className='auth-page'><p>Loading....</p></main>)
  }

  return (
    <main className='auth-page'>
      <div className='form-container'>
        <h1 className='text-green-600'>Send OTP To Reset Your Password</h1>
        <div className='input-group'>
          <label htmlFor='email'>Email</label>
          <input
            onChange={(e) => { setEmail(e.target.value) }}
            type='text' id='email' name='email' placeholder='Enter your email'
            value={email}
          />
        </div>

        <button className='btn primary-btn bg-green-500' onClick={handleSubmit}>
          {isLoading ? "Sending..." : "Send OTP"}</button>


        <p>Remember your password? <Link to={'/login'}>Login</Link></p>
      </div>
    </main>
  )
}

export default ForgotPassEmail