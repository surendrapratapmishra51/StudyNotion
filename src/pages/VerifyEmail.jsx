import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from "react-otp-input"
import {signUp } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { sendOtp } from '../services/operations/authAPI'
import { FaArrowLeft } from "react-icons/fa6";



const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const {signupData, loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData){
            navigate("/signup")
        }
    },[signupData, navigate]);

    const handleOnSubmit = (e) =>  {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

        } = signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
  return (
    <div className='w-11/12 text-white flex items-center justify-center mt-[150px]'>
    {
    loading ?
    (<div>
        Loading...
    </div>):
    (<div className='w-[25%]'>
        <h1 className='text-xl font-semibold mb-2'>VerifyEmail</h1>
        <p className='text-sm text-richblack-300 mb-2'>A verification code has been sent to you. Enter the code below</p>

        <form onSubmit={handleOnSubmit} className='w-full gap-5'>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) =>< input {...props}
                    placeholder='-'
                    maxLength={1}
                    className='w-[30px] h-[30px] mx-1 text-center border border-richblack-600 rounded-md bg-richblack-800 text-white focus:outline-none focus:border-yellow-500 mt-3'
    
                />}
            />
            <button
            type='submit'
            className='bg-yellow-25 rounded-[8px] mt-4 w-full font-medium py-[6px] px-[10px] text-richblack-800'>
             VerifyEmail</button>
        </form>
        <div className=' flex flex-rown justify-between items-center mt-4 text-sm'>
       <div className=' '>
          <Link to="/login">
          <p className='flex justify-center items-center ml-0'> <FaArrowLeft />Back to Login</p>
          </Link>
     </div>
        <button onClick={() => dispatch(sendOtp(signupData.email))}>
            Resend it
        </button>
        </div>
    </div>)
    }
    </div>
  )
}

export default VerifyEmail