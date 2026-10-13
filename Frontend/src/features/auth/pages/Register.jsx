import { Link, useNavigate } from 'react-router'
import '../auth.form.css'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { Eye, EyeOff, User } from 'lucide-react';

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { loading, handleRegister } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await handleRegister({ username, email, password });
            toast.success("Registered successfully!");
            setTimeout(() => {
                navigate('/verify-email');
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.message);
        }  
        setIsLoading(false);

    }

    if (loading) {
        return (<main><h1>Loading......</h1></main>)
    }

    return (
        <main>
            <div className='form-container'>
                <h1 className='text-green-600'>Register</h1>

                <div className='input-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        onChange={(e) => { setUsername(e.target.value) }}
                        type='text' id='username' name='username' placeholder='Enter your username'
                        value={username}
                    />
                </div>

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

                    <button onClick={() => setShowPassword(!showPassword)} className='pass-btn'>
                        {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
                    </button>

                </div>

                <button onClick={handleSubmit} className='btn primary-btn bg-green-500' type="submit">
                    {isLoading ? "Creating.." : "Register"}
                </button>


                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register