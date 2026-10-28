import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import '../auth.form.css'
import { Eye, EyeOff } from 'lucide-react';

const ResetPass = () => {

    const { loading, handleNewPassword, user } = useAuth();
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const email = user.email;
            await handleNewPassword({ email, newPassword });

            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.message)
        }

        finally {
            setIsLoading(false);
        }
    }

    if (loading) {
        return (<main className='auth-page'><p>Loading....</p></main>)
    }

    return (
        <main className='auth-page'>
            <div className='form-container'>
                <h1 className='text-green-600'>Set Your New Password</h1>
                <div className='input-group'>
                    <label htmlFor='password'>New Password</label>
                    <input
                        onChange={(e) => { setNewPassword(e.target.value) }}
                        type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='Enter your new password'
                        value={newPassword}
                    />
                    <button className='pass-btn' onClick={() => setShowPassword(!showPassword)}>{
                        showPassword ? <Eye size={20} /> : <EyeOff size={20} />
                    }</button>
                </div>

                <button className='btn primary-btn bg-green-500' onClick={handleSubmit}>
                    {isLoading ? "Changing..." : "Change Password"}</button>

            </div>
        </main>
    )
}

export default ResetPass