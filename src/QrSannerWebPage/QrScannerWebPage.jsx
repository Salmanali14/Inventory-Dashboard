import React, { useState } from 'react'
import logo from "../Images/Group 2085663688.png"
import QrReader from './QrReader'
import "./QrStyles.css";
import Test from './QrReader';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { RiMenu2Line } from 'react-icons/ri';
import MobileSidebar from '../Components/MobileSidebar';
export default function QrScannerWebPage() {
    const [openQr, setOpenQr] = useState(false);
    let nevigate =useNavigate()
    let hanldeLogout =()=>{
      nevigate("/")
    }
    let [drawerOpen, setDrawerOpen] = useState(false); 
    let screenWidth =window.innerWidth
    let toggleDrawer = (open) => {
      setDrawerOpen(open);
  };
  return (
   <>
   <div className='w-[100%] flex justify-center items-center min-h-[100vh]'>
   <div className='flex items-center relative  max-w-[430px] min-h-[100vh] w-[100%] shadow-md flex-col'>
   {screenWidth< 450 &&
    <RiMenu2Line className='text-[30px] absolute left-2 top-5 text-[#3045A3]' onClick={() => toggleDrawer(true)}/>
  }
  <MobileSidebar 
  toggleDrawer={toggleDrawer} 
  setDrawerOpen={setDrawerOpen} 
  drawerOpen={drawerOpen} 
  />
   <img src={logo} className='h-[80px] w-[100px] mt-10' />
   <h1 className='font-[600] text-black mt-2'>Scan Qr Code</h1>
  <Test />



  
   </div>
   </div>
   </>
  )
}
