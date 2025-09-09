import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { FaArrowLeft } from "react-icons/fa6";


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const {loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
  return (
    <div className='text-white w-11/12 flex items-center justify-center mt-[130px]'>
        {
            loading ? (
                <div>Loading</div>
            ) 
            :
            (
                <div className='w-[27%]'>
                <h1 className='text-xl font-semibold mb-1'>
                    {
                      !emailSent ? "Reset your Password" :"Check your Email"  
                    }
                </h1>
                <p className='text-sm text-richblack-200 mb-2'>
                    {
                        !emailSent ? 
                        "Have no fear. We’ll email you instructions to reset your password.If you dont have access to your email we can try account recovery"
                       :
                       `we have sent the reset code to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit} className='flex flex-col '>
                    {
                        !emailSent && (
                            <label>
                                <p className="mb-1 mt-3 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-pink-200">*</sup>
                                </p> 
                                <input
                                required
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your Email Address'
                                className='w-full rounded-sm mb-3'
                                ></input>
                            </label>
                        )
                    }
                    <button 
                    type='submit'
                    className='bg-yellow-50 rounded-[8px] mt-3 text-richblack-700 py-[6px] px-[10px] font-medium'>
                        {
                            !emailSent ? "Reset Password" : "Resend Email"
                        }
                    </button>

                    <div className='mt-4 flex text-sm'>
                        <Link to="/login">
                        <p className='flex justify-center items-center'> <FaArrowLeft />Back to Login</p>
                        </Link>
                    </div>
                </form>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword