import { Box, Modal } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
export default function AddMemberModal({ handleAddMemberModal, addMemberModal,updateData,setUpdateData,editMode,singleEmployeData }) {
  const [btnLoader, setBtnLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  useEffect(()=>{
    setFormData({
      name: singleEmployeData?.name,
      email: singleEmployeData?.email
  })
  },[editMode,singleEmployeData])

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleCreateEmployee = async () => {
    // Validate password and confirm password match
    if (!formData.name) {
      toast.error("Name is required!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setBtnLoader(true);
    try {
      const response = await axios.post(`${apiBaseUrl}user/create`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response?.data?.status === true) {
        setBtnLoader(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        toast.success(response?.data?.message);
        setUpdateData(!updateData)
        handleAddMemberModal(); // Close the modal after success
      }
    } catch (error) {
      setBtnLoader(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleUpdateEmployee = async () => {
    setBtnLoader(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}user/update/${singleEmployeData?.id}`,{
       name:formData?.name,
       email:formData?.email
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      if (response?.data?.status === true) {
        setBtnLoader(false);
        setUpdateData(!updateData);
        toast.success(response?.data?.message);
          handleAddMemberModal();
      }
    } catch (error) {
      setBtnLoader(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <Modal open={addMemberModal} onClose={handleAddMemberModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: "530px",
            width: "90%",
            bgcolor: '#fff',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            maxHeight: "80vh",
            overflow: "scroll",
            boxShadow: 24,
            paddingTop: "20px"
          }}
        >
          <div className='flex justify-center flex-col items-center w-[100%]'>
            <div className='flex w-[100%]'>
              <div className='flex justify-center items-center w-[100%]'>
                <div className='flex w-[90%] justify-between items-center'>
                  <p className='text-[#3045A3] text-[16px] font-bold'>Add Employee</p>
                  <div className='flex justify-center items-center'>
                    <div onClick={handleAddMemberModal} className='flex cursor-pointer justify-center items-center'>
                      <IoClose className='text-[#3045A3] text-[25px] font-bold' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center flex-col mt-5 w-[100%]'>
              <div className='flex justify-between items-center flex-wrap w-[90%]'>
                <div className='w-[48%] flex flex-col justify-start'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Name</label>
                  <input
                    type='text'
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-[100%] h-[40px] outline-none pl-3 pr-3 text-black bg-[#F2F2F2] border-[#AEADAD] border rounded-md'
                  />
                </div>
                <div className='w-[48%] flex flex-col justify-start'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Email</label>
                  <input
                    type='email'
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-[100%] h-[40px] bg-[#F2F2F2] outline-none pl-3 pr-3 text-black border-[#AEADAD] border rounded-md'
                  />
                </div>
                               {!editMode && 
                <div className='w-[48%] flex flex-col justify-start mt-3'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className='w-[100%] h-[40px] bg-[#F2F2F2] outline-none pl-3 pr-10 text-black border-[#AEADAD] border rounded-md'
                    />
                    {/* Eye Icon */}
                    {showPassword ? (
                      <FaRegEyeSlash className='text-black ml-2 text-[22px] absolute right-3 cursor-pointer' onClick={() => setShowPassword(false)} />
                    ) : (
                      <MdOutlineRemoveRedEye className='text-black ml-2 text-[22px] absolute right-3 cursor-pointer' onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                </div>}

                {/* Confirm Password Input */}
                {!editMode && 
                <div className='w-[48%] flex flex-col justify-start mt-3'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Confirm Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className='w-[100%] h-[40px] bg-[#F2F2F2] outline-none pl-3 pr-10 text-black border-[#AEADAD] border rounded-md'
                    />
                    {/* Eye Icon */}
                    {showConfirmPassword ? (
                      <FaRegEyeSlash className='text-black ml-2 text-[22px] absolute right-3 cursor-pointer' onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                      <MdOutlineRemoveRedEye className='text-black ml-2 text-[22px] absolute right-3 cursor-pointer' onClick={() => setShowConfirmPassword(true)} />
                    )}
                  </div>
                </div>}
                

                {!editMode && 
                <button onClick={handleCreateEmployee} className='w-[100%] mt-5 rounded-lg h-[40px] bg-[#3045A3] text-white'>
                  {btnLoader ? <ClipLoader size={24} color='white' className='mt-[7px]' /> : "Add Employee"}
                </button>
                }
                {editMode && 
                  <button onClick={handleUpdateEmployee} className='w-[100%] mt-5 rounded-lg h-[40px] bg-[#3045A3] text-white'>
                    {btnLoader ? <ClipLoader size={24} color='white' className='mt-[7px]' /> : "Update Employee"}
                  </button>
                  }
              </div>
            </div>
          </div>
          <br />
        </Box>
      </Modal>

      
    </>
  );
}