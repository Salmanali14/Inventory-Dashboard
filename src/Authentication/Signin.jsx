import React, { useState } from 'react'
import sigin from "../Images/login.jpg"
import logo from "../Images/Group 2085663688.png"
import { FaRegEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
export default function Signin() {
    let screenwidth =window.innerWidth
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [buttonLoader, setButtonLoader] = useState(false);
    const [password, setPassword] = useState('');
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    let neviagte =useNavigate()
    const validateEmail = (email) => {
      const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}(?:\.[a-zA-Z]{2,8})?$/;
    
      // Perform basic regex test
      if (!emailRegEx.test(email)) {
        return false;
      }
    
      // Additional invalid cases
      if (
        email.includes(" ") || // No spaces allowed
        email.startsWith(".") || // No leading dot
        email.endsWith(".") || // No trailing dot
        email.startsWith("@") || // No leading '@'
        email.endsWith("@") || // No trailing '@'
        email.includes("..") || // No multiple dots in a row
        email.indexOf("@") !== email.lastIndexOf("@") || // No multiple '@' symbols
        !email.includes(".") || // Must contain a dot after the '@'
        email.match(/[@.]{2,}/) // No multiple consecutive '@' or '.' characters
      ) {
        return false;
      }
    
      return true;
    };
    const handleSignIn = async () => {
      if (!email) {
        toast.error("Email is required.");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format.");
        return;
      }
      if (!password) {
        toast.error("Password is required.");
        return;
      }
      try {
        setButtonLoader(true);
        const response = await axios.post(`${apiBaseUrl}login`, {
          email: email,
          password: password,
        });
        toast.success("Sign in successful!");
      
        setButtonLoader(false);
        localStorage.setItem('id', response?.data?.data?.authResponse?.id ?? 0);
        localStorage.setItem('token', response?.data?.data?.authResponse?.authToken);
        localStorage.setItem('notification', response?.data?.data?.authResponse?.notification);
        localStorage.setItem('role', response?.data?.data?.authResponse?.role);

        setTimeout(() => {
          neviagte("/dashboard");
        }, 1000);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";
        toast.error(errorMessage);
        setButtonLoader(false);
    
      }
    };
  return (
 <>
 <div className='w-[100%] flex bg-white h-[100vh] border   justify-center items-center'>
 <div className='w-[95%] flex bg-white h-[90vh] border border-[#B7B7B7]  rounded-2xl  justify-center  items-center'>
 {screenwidth> 450 &&
    <div className='w-[45%] bg-customBlack h-[80vh] rounded-[20px] flex justify-center items-center'>
    <img className='w-[100%] h-[80vh] rounded-2xl object-cover' src={sigin}/>
    </div>
    }
 <div className='sm:w-[50%] w-[90%]  h-[80vh] rounded-[20px] flex justify-center flex-col items-center sm:pl-10'>
<img src={logo} className='h-[80px]'/>
<p className='text-[16px] mt-2 text-[#000] font-[500] '>Enter your Email or Password to Sign In</p>
<p className='font-[500] text-[14px] mt-5 sm:w-[80%] w-[100%]'>Enter your Email address</p>
<input className='  text-black outline-none	 bg-[#F8F8F9] rounded-lg h-[50px] mt-2 sm:w-[80%] w-[100%] p-5 ' type='email' placeholder='Email' autocomplete="off" onChange={(e) => setEmail(e.target.value)} />
<p className='font-[500] text-[14px] mt-5 sm:w-[80%] w-[100%]'>Password</p>
 <div className='bg-[#F8F8F9] flex items-center  rounded-lg h-[50px] sm:w-[80%] w-[100%] p-5 mt-2 mb-3'>
 <input  className=' bg-transparent w-[100%] h-[20px] outline-none	 text-black' type={showPassword ? 'password' : 'text'} placeholder='Password' autocomplete="off" onChange={(e) => setPassword(e.target.value)} />
 {showPassword ? (
  <FaRegEyeSlash className='text-black ml-2 text-[22px]' onClick={() => setShowPassword(false)} />
) : (
  <MdOutlineRemoveRedEye className='text-black ml-2 text-[22px]' onClick={() => setShowPassword(true)} />
)}</div>
<div className='sm:w-[80%] w-[100%] flex justify-between items-center '>
<p className='text-[#878EA1] text-[13px] mb-3'>Min. 8 character</p>
<Link to='/forgot' className='text-[#000] text-[14px] flex justify-end mb-3 '>Forgot Password?</Link>
</div>
<br />
 <button onClick={handleSignIn}  className='bg-[#3045A3] text-white rounded-lg h-[50px] text-[16px] sm:w-[80%] w-[100%] flex justify-center items-center mt-5 sm:mt-0' >{buttonLoader ?  <ClipLoader size={24} color='white' /> :"Sign In"} </button>
 </div>

 </div>
 </div>

 </>
  )
}
