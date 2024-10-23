import React, { useState } from 'react'
import sigin from "../Images/login.jpg"
import logo from "../Images/Group 2085663688.png"

import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Forgot() {
    const [email, setEmail] = useState('');
    const [buttonLoader, setButtonLoader] = useState(false);
    let nevigate =useNavigate()
    let screenwidth=window.innerWidth
    let hanldeSignin =()=>{
      nevigate("/")
    }
 
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
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
    const handleForgotPassword = async () => {
    
      if (!email){
        toast.error("Email is required.");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format.");
        return;
      }
      try {
        setButtonLoader(true);
        const response = await axios.post(`${apiBaseUrl}forgot-password`, {
          email: email,
        });
     
        if (response?.data?.status === true) {
          localStorage.setItem('inventoryEmail', email);
          nevigate("/newpassword");

          setButtonLoader(false)
        } else {
      
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'An error occurred.');
        setButtonLoader(false)
      } finally {
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
<h1 className='font-[500] text-[#000] text-[16px] mt-5'>Forgot Password</h1>
<p className='text-[16px] mt-2 text-[#000] '>Enter the email to recover the password</p>
<p className='font-[500] text-[14px] mt-5 sm:w-[80%] w-[100%]'>Enter your Email address</p>
<input className='  text-black outline-none	 bg-[#F8F8F9] rounded-lg h-[50px] mt-2 sm:w-[80%] w-[100%] p-5 ' type='Enter your email here' placeholder='Email' autocomplete="off" onChange={(e) => setEmail(e.target.value)} />
<div className='sm:w-[80%] w-[100%] flex justify-between items-center '>
<p className='text-[16px] mt-2 text-[#878EA1]'>Remember your password?<span onClick={hanldeSignin} className='font-[500] cursor-pointer text-[#000]'>Try log in.</span></p>
</div>
<br />
 <button onClick={handleForgotPassword} className='bg-[#3045A3] text-white rounded-lg h-[50px] text-[16px] sm:w-[80%] w-[100%] flex justify-center items-center mt-5 sm:mt-0' >{buttonLoader ?  <ClipLoader size={24} color='white' /> :"Reset"} </button>
 </div>

 </div>
 </div>

 </>
  )
}
