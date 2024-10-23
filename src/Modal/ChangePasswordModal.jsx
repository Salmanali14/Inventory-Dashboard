import { Box, Modal } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

export default function ChangePasswordModal({ changePasswordModal, handleChangePasswordModal }) {
  const [btnLoader, setBtnLoader] = useState(false);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleChangePassword = async () => {
    setBtnLoader(true);
    try {
      const response = await axios.post(`${apiBaseUrl}changePassword`, {
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        setBtnLoader(false);
        toast.success(response?.data?.message);
        handleChangePasswordModal();
        setOldPassword(null);
        setNewPassword(null);
      }
    } catch (error) {
      setBtnLoader(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Modal open={changePasswordModal} onClose={handleChangePasswordModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: "450px",
            width: "90%",
            bgcolor: '#fff',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            maxHeight: "80vh",
            overflow: "scroll",
            boxShadow: 24,
            paddingTop: "20px",
          }}
        >
          <div className='flex justify-center flex-col items-center w-[100%]'>
            <div className='flex w-[100%]'>
              <div className='flex justify-center items-center border-b pb-5 border-[#BEBEBE] w-[100%]'>
                <div className='flex w-[90%] justify-between items-center'>
                  <p className='text-[#3045A3] text-[16px] font-bold'>Change Password</p>
                  <div className='flex justify-center items-center'>
                    <div onClick={handleChangePasswordModal} className='flex cursor-pointer justify-center items-center'>
                      <IoClose className='text-[#3045A3] text-[20px] font-bold' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-center items-center flex-col mt-5 w-[100%]'>
              <div className='text-black w-[90%] flex justify-between flex-wrap items-center'>
                <div className='flex justify-start flex-col w-[100%] relative'>
                  <label className='text-[#4B5563] mb-2 text-[15px]'>Old Password</label>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className='outline-none border border-[#AEADAD] bg-[#F2F2F2] w-[100%] pl-2 pr-10 rounded-lg h-[40px]'
                  />
                  {showPassword ? (
                    <FaRegEyeSlash className='text-black ml-2 text-[22px] absolute right-3 top-10  cursor-pointer' onClick={() => setShowPassword(false)} />
                  ) : (
                    <MdOutlineRemoveRedEye className='text-black ml-2 text-[22px] absolute right-3 top-10  cursor-pointer' onClick={() => setShowPassword(true)} />
                  )}
                </div>

                <div className='flex justify-start flex-col w-[100%] mt-5 relative'>
                  <label className='text-[#4B5563] mb-2 text-[15px]'>New Password</label>
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className='outline-none border border-[#AEADAD] bg-[#F2F2F2] w-[100%] pl-2 pr-10 rounded-lg h-[40px]' 
                  />
                  {showConfirmPassword ? (
                    <FaRegEyeSlash className='text-black ml-2 text-[22px] absolute right-3 top-10 cursor-pointer' onClick={() => setShowConfirmPassword(false)} />
                  ) : (
                    <MdOutlineRemoveRedEye className='text-black ml-2 text-[22px] absolute right-3 top-10  cursor-pointer' onClick={() => setShowConfirmPassword(true)} />
                  )}
                </div>

                <button onClick={handleChangePassword} className='w-[100%] mt-5 rounded-lg h-[40px] bg-[#3045A3] text-white'>
                  {btnLoader ? <ClipLoader size={24} color='white' className='mt-[7px]' /> : "Change Password"}
                </button>
              </div>
            </div>
          </div>
          <br />
        </Box>
      </Modal>
    </>
  );
}
