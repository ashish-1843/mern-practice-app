import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import '../auth.form.css'
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { loading, handleLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await handleLogin({ email, password });
            console.log(data);
            if (!data.user?.isVerified) {
                navigate('/verify-email');
                return;
            }
            toast.success("Login successfully!");
            setTimeout(() => {
                navigate('/dashboard');
            }, 0.0001);

        } catch (err) {
            toast.error(err.response?.data?.message)
        }

        finally {
            setIsLoading(false);
        }
    }

    if (loading) {
        return (
            <main className='auth-page'><h2>Loading...</h2></main>
        );
    }


    return (
        <main className='auth-page'>
            <div className='form-container'>
                <h1 className='text-green-600'>Login</h1>
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={(e) => { setEmail(e.target.value) }}
                        type='text' id='email' name='email' placeholder='Enter your email'
                        value={email}
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={(e) => { setPassword(e.target.value) }}
                        type={showPassword ? "text" : "password"} id='password' name='password' placeholder='Enter your password'
                        value={password}
                    />

                    <button className='pass-btn' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>

                <button className='btn primary-btn bg-green-500' onClick={handleSubmit}>
                    {isLoading ? "Logging into your account.." : "Login"}</button>


                <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login