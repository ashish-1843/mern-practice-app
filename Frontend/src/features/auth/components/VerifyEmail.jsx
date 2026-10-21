import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import '../auth.form.css'

const VerifyEmail = () => {

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();


    const { err, loading, handleVerifyEmail } = useAuth();

    const handleChange = (index, value) => {
        const newCode = [...code];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();

        }
        else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const verificationCode = code.join("");
        try {
            await handleVerifyEmail({ otp: verificationCode });
            toast.success("Email verify successfully!");
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    }



    return (
        <main className='auth-page'>
            <div className='form-container'>
                <h1 className='text-green-600'>Verify Your Email</h1>
                <p>Enter the 6-digit code sent to your email address.</p>
                    <div className='otp-input'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength='6'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className=''
                            />
                        ))}
                    </div>
                    {err && <p className=''>{err}</p>}
                    <button className='btn primary-btn bg-green-500' onClick={handleSubmit}>
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
            </div>
        </main>
    )
}

export default VerifyEmail