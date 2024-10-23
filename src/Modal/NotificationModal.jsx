import { Box, Modal } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5'
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { ScaleLoader } from 'react-spinners';
import ConfirmationModal from './ConfirmationModal';

export default function NotificationModal({notifModal,handleNotificationModal,handleNotificationModalClose,updateData}) {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  let [screenLoader,setScreenLoader]=useState(false)
  let [btnLoader,setBtnLoader]=useState(false)
  const [openModal, setOpenModal] = useState(false); 
  let [getNotifiction,setGetNotifiction]=useState([])
  const handleGetNotification = async () => {
    setScreenLoader(true)
    try {
      const response = await axios.get(`${apiBaseUrl}notification/list`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response?.data?.status === true) {
        const notifications = response?.data?.data?.notificationResponse;
        setGetNotifiction(notifications)
    localStorage.setItem("unreadNotificationsCount", notifications.filter(noti => noti.isRead === 0).length);
    setScreenLoader(false)
      }
    } catch (error) {
    setScreenLoader(false)

    }
  };

  useEffect(()=>{
    handleGetNotification();

  },[updateData])
  const handleConfirmDelete = async (id) => {
    setBtnLoader(true);
    try {
      const response = await axios.delete(`${apiBaseUrl}notification/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        setGetNotifiction((prevNotif) => {
          const updatedNotficition = prevNotif.filter((cust) => cust.id !== id);
          setGetNotifiction(updatedNotficition); 
          return updatedNotficition;
        })
        setBtnLoader(false);
      }
    } catch (error) {
      setBtnLoader(false);
   
    }
  };
  const handleNotificationRead = async () => {
   try {
     const response = await axios.get(`${apiBaseUrl}notification/read-all`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
   } catch (error) {

   }
 };
 let handleClose=()=>{
  handleGetNotification();
  handleNotificationModalClose();
  handleNotificationRead();
 }
 const confirmDelete = (data) => {
  setOpenModal(true);
};

  const handleConfirmDeleteAll = async () => {
    setBtnLoader(true);
    try {
      const response = await axios.get(`${apiBaseUrl}notification/delete-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        handleGetNotification();
        setOpenModal(false);
        setBtnLoader(false);
      }
    } catch (error) {
      setBtnLoader(false);
   
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp *1000); // Create a date object from the timestamp
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',  
      month: 'short', 
      year: 'numeric'
    });
  };
  return (
   <>
   <Modal open={notifModal} onClose={handleClose}>
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
         <div className='flex justify-center items-center border-b border-[#BEBEBE] w-[100%]'>
         <div className='flex w-[100%] justify-between p-[10px] pl-5 pr-5  items-center'>
           <p className='text-[#3045A3]  font-[600]'>Notifications</p>
           <div className='flex justify-center items-center'>
           {getNotifiction?.length != 0  &&
           <button onClick={confirmDelete} className='w-[150px] text-[14px] h-[35px] bg-[#E9E9E9] rounded-lg text-[#3045A3] mr-2 font-[500]'>Clear All</button>}
           <div onClick={handleClose} className='flex cursor-pointer justify-center items-center '>
             <IoClose className='text-[#3045A3] text-[25px] font-bold' />
           </div>
           </div>
           </div>
         </div>
       </div>
       {screenLoader ? (
        <div className='flex justify-center items-center flex-col p-5 w-[100%] h-[300px] rounded-lg mt-5'>
          <ScaleLoader color='#3045A3' />
        </div>
      ) : getNotifiction?.length === 0 ? (
        <div className='flex justify-center items-center w-[100%] h-[20vh]'>
          <p className='text-[16px] text-[#B7B5B5]'>Empty!</p>
        </div>
      ) : (
        <>
       <div className='flex justify-center items-center flex-col mt-5 w-[100%]'>
       {getNotifiction?.slice().reverse().map((noti) => (
         <div 
           key={noti?.id} 
           className='text-black w-[100%] border flex justify-between mt-1 mb-1 items-center p-[10px] pl-5 pr-5 border-[#E1E1E1]' 
           style={{
             background: noti?.isRead === 0 ? "#E9E9E9" : "",

           }}
         >
           <div className='flex flex-col'>
             <h1 className='font-[600] text-black'>{noti?.title}</h1>
              <h1 className='font-[400] text-black'>{noti?.body}</h1>
             <p className='text-[#5B5B5B] text-[14px] '>{formatDate(noti?.createdAt)}</p>

           </div>
           <RiDeleteBin6Fill 
             onClick={() => handleConfirmDelete(noti?.id)} 
             className='text-[#ff0000c3] text-[20px] cursor-pointer' 
           />
         </div>
       ))}
     </div>
         </>
          )}
     </div>
   
     <br></br>
   </Box>
 </Modal>
  <ConfirmationModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onSubmit={handleConfirmDeleteAll}
      title="Are you sure you want to delete this all Notifications?"
      btnLoader={btnLoader}
    />
   </>
  )
}
