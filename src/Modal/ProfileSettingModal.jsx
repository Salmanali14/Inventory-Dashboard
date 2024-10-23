import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { IoClose, IoKey, IoKeyOutline } from 'react-icons/io5'
import { MdOutlineNotificationsOff } from 'react-icons/md'
import Toggle from '../Components/Toggle'
import { CiLogout } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import ChangePasswordModal from './ChangePasswordModal'
import axios from 'axios'
import ConfirmationModal from './ConfirmationModal'


export default function ProfileSettingModal({profileSetting,handleProfileSettingModal,handleProfileSettingModalClose}) {
  let nevigate =useNavigate()

  let [changePasswordModal,setChangePasswordModal]=useState(false)
  let [btnLoader,setBtnLoader]=useState(false)
  const [openModal, setOpenModal] = useState(false); 
  
  let handleChangePasswordModal =()=>{
    setChangePasswordModal(!changePasswordModal)
    handleProfileSettingModalClose();
  }

 let handleOpenModal=()=>{
  setOpenModal(true)
  }
  const role = localStorage.getItem("role");
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    setBtnLoader(true)
    try {
      const response = await axios.get(`${apiBaseUrl}logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === true) {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('notification');
        localStorage.removeItem('role');
        localStorage.removeItem('unreadNotificationsCount');
        nevigate("/")
        setBtnLoader(true)
      }
    
      // setLoading(false)
    } catch (error) {
      setBtnLoader(true)
    }
  };
  return (
   <>
   <Modal open={profileSetting} onClose={handleProfileSettingModalClose}>
   <Box
     sx={{
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       maxWidth:"530px",
       width: "90%",
       bgcolor: '#fff',
       color: "white",
       outline: "none",
       borderRadius: "10px",
     maxHeight:"80vh",
     overflow:"scroll",
       boxShadow: 24,
      paddingTop:"20px"
     }}
   >
     <div className='flex justify-center flex-col items-center w-[100%]'>
       <div className='flex w-[100%]'>
         <div className='flex justify-center items-center border-b pb-5 border-[#BEBEBE] w-[100%]'>
         <div className='flex w-[90%] justify-between items-center'>
           <p className='text-[#3045A3] text-[16px] font-bold'>Profile & Settings</p>
           <div className='flex justify-center items-center'>
           <div onClick={handleProfileSettingModalClose} className='flex cursor-pointer justify-center items-center '>
             <IoClose className='text-[#3045A3] text-[25px] font-bold' />
           </div>
           </div>
           </div>
         </div>
       </div>
       <div className='flex justify-center items-center flex-col  w-[100%]'>
       {role ==="admin" &&
        <div className='text-black w-[90%] flex justify-between items-center border-b pb-5 border-[#E1E1E1]'>
       <div className='flex justify-start items-center mt-5'>
<MdOutlineNotificationsOff className='text-[#3045A3] mr-2 text-[20px]'/> <h1 className='font-[500] text-[#3045A3]'>Turn Off Notifications</h1>
       </div>
        <Toggle/>
        </div>}
        <div onClick={handleChangePasswordModal} className='text-black w-[90%] cursor-pointer flex justify-between mt-5 items-center border-b pb-5 border-[#E1E1E1]'>
        <div className='flex justify-start items-center'>
 <IoKeyOutline className='text-[#3045A3] mr-2 text-[20px]'/> <h1 className='font-[500] text-[#3045A3]'>Change Password</h1>
        </div>
         </div>
         <div className='text-black w-[90%] cursor-pointer flex justify-between mt-5 items-center border-b pb-5 border-[#E1E1E1]'>
         <div onClick={handleOpenModal}  className='flex justify-start items-center'>
  <CiLogout className='text-[#3045A3] mr-2 text-[20px]'/> <h1 className='font-[500] text-[#3045A3]'>Logout</h1>
         </div>
          </div>
       </div>
     </div>
     <br></br>
   </Box>
 </Modal>
 <ConfirmationModal
 open={openModal}
 onClose={() => setOpenModal(false)}
 onSubmit={handleLogout}
 title="Are you sure you want to logout this account?"
 btnLoader={btnLoader}
/>
 <ChangePasswordModal changePasswordModal={changePasswordModal} handleChangePasswordModal={handleChangePasswordModal}/>
   </>
   
  )
}
