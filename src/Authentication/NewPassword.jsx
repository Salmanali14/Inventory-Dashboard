import React, { useRef, useState } from 'react'
import sigin from "../Images/login.jpg"
import logo from "../Images/Group 2085663688.png"
import { FaRegEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { ClipLoader } from 'react-spinners'
import toast, { Toaster } from 'react-hot-toast'

export default function NewPassword() {
    const [showPassword, setShowPassword] = useState(true);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [newPassword, setPassword] = useState('');
    let nevigate =useNavigate()
    let screenwidth =window.innerWidth
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const inputRefs = useRef([]);
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.length > 1) {
          e.target.value = value[0];
        }
        if (value.length === 1 && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      };
    
      const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
          inputRefs.current[index - 1].focus();
          inputRefs.current[index - 1].value = '';
        }
      };

      const enteredOtp = inputRefs.current.map(input => input.value).join('');
      const email =localStorage.getItem("inventoryEmail")
    const handleSubmit = () => {
      const passwordRegEx = /^(?=.*[!@#$%^&*])(?=.{8,})/;
     
      if (!newPassword) {
        toast.warn("All field are required!");
        return;
      }
      if (!passwordRegEx.test(newPassword)) {
        toast.error("Password must be at least 8 characters long and include at least one special character!");
        return;
      }
  
      // Add your API call here to update the password
      setButtonLoader(true);
  
      axios.post(`${apiBaseUrl}reset-password`, {
          email: email,
          verification_code: enteredOtp,
          new_password: newPassword,
      })
        .then(response => {
        
       
              nevigate("/");
         
       
          localStorage.removeItem('inventoryEmail');
          setButtonLoader(false);
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'An error occurred.');
          setButtonLoader(false);
        })
        .finally(() => {
          setButtonLoader(false);
        });
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
<h1 className='font-[500] text-[#000] text-[16px] mt-5'>Reset Password</h1>
<p className='text-[16px] mt-2 text-[#000] '>Enter the otp to recover the password</p>
<div className='flex  gap-5 flex-wrap justify-center items-center'>
{[...Array(4)].map((_, index) => (
  <input
    key={index}
    type='number'
    className='outline-none pl-4 text-[30px] border rounded-xl w-[52px] h-[50px] bg-[#F3F3F3] text-[#BDBDBD] mt-6'
    onChange={(e) => handleInputChange(e, index)}
    onKeyDown={(e) => handleKeyDown(e, index)}
    ref={el => inputRefs.current[index] = el}
    style={{
      background: '#F3F3F3',
      color: '#000',

    }}
    maxLength={1}
  />
))}
</div>
<p className='font-[500] text-[14px] mt-5 sm:w-[80%] w-[100%]'>New Password</p>
 <div className='bg-[#F8F8F9] flex items-center  rounded-lg h-[50px] sm:w-[80%] w-[100%] p-5 mt-2 mb-3'>
 <input  className=' bg-transparent w-[100%] h-[20px] outline-none	 text-black' type={showPassword ? 'password' : 'text'} placeholder='New Password' autocomplete="off" onChange={(e) => setPassword(e.target.value)} />
 {showPassword ? (
  <FaRegEyeSlash className='text-black ml-2 text-[22px]' onClick={() => setShowPassword(false)} />
) : (
  <MdOutlineRemoveRedEye className='text-black ml-2 text-[22px]' onClick={() => setShowPassword(true)} />
)}</div>
<div className='sm:w-[80%] w-[100%] flex justify-between items-center '>

</div>
<br />
 <button onClick={handleSubmit}  className='bg-[#3045A3] text-white rounded-lg h-[50px] text-[16px] sm:w-[80%] w-[100%] flex justify-center items-center mt-5 sm:mt-0' >{buttonLoader ?  <ClipLoader size={24} color='white' /> :"Change Password"} </button>
 </div>

 </div>
 </div>

 </>
  )
}
