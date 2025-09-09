import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";



const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) =>(
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }
  return (
    <div className='w-11/12 flex flex-row justify-center items-center mt-[100px]'>
        {
           
            loading ? (
                <div>
                    Loading....
                     
                </div>
                
            ) 
            :
            (
                <div className='text-white w-[25%]'>
                    <h1 className='text-xl font-semibold mb-1 '>Choose new Password</h1>
                    <p className='text-sm text-richblack-300 mb-2'>Almost done. Enter your new password and your all set</p>

                    <form className='flex flex-col justify-center'
                    onSubmit={handleOnSubmit}>
                        <label className='relative'>
                            <p className='text-sm'>New Password
                            <sup className='text-pink-50'>*</sup></p>
                            <input
                            required
                            type={showPassword ? "text" :"password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            placeholder='new password'

                            style={{
                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                          
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[8px] text-richblack-5 mb-2'></input>

                            <span onClick={() => setShowPassword((prev) => !prev)} className='absolute text-richblack-500 right-[10%] top-[25px]'>
                            {
                                showPassword ? <IoIosEyeOff/> : <IoMdEye />

                            }
                            </span>
                        </label>

                         <label className='relative'>
                            <p className='text-sm'>Confirm New Password
                            <sup className='text-pink-50'>*</sup></p>
                            <input
                            required
                            type={showConfirmPassword ? "text" :"password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'

                         style={{
                              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}

                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[8px] text-richblack-5 mb-10'></input>

                            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className='absolute text-richblack-500 right-[10%] top-[30px]'>
                            {
                                showConfirmPassword ? <IoIosEyeOff/> : <IoMdEye />

                            }
                            </span>
                        </label>

                        <button type='submit'
                        className='bg-yellow-25 text-richblack-700 font-medium rounded-[8px] py-[6px] px-[10px] max-w-maxContent'>
                            Reset Password
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

export default UpdatePassword