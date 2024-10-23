import React, { useState } from 'react'
import logo from "../../Images/Group 2085663688.png"
import order from "../../Images/Vector (64).png"
import cus from "../../Images/Vector (65).png"
import promo from "../../Images/Vector (66).png"
import img from "../../Images/Rectangle 35.png"
import { IoIosSearch, IoMdNotifications } from 'react-icons/io'
import { GoPlus } from 'react-icons/go'
import { RiSettings5Fill } from 'react-icons/ri'
import Sidebar from '../../Components/Sidebar'
import { LuUser2, LuUsers, LuUsers2 } from 'react-icons/lu'

// import NotificationModal from '../../Modal/NotificationModal'
// import ProfileSettingModal from '../../Modal/ProfileSettingModal'
// import Chart from '../../Components/Chart'
export default function Settings() {
    let [notifModal,setNotifModal]=useState(false)
    let [profileSetting,setProfileSetting]=useState(false)

    let handleNotificationModal=()=>{
        setNotifModal(!notifModal);
    }
    let handleProfileSettingModal=()=>{
        setProfileSetting(!profileSetting);
    }
  return (
<>
<div className='w-[100%] flex bg-white h-[100vh] border  justify-center  items-center'>
<div className='w-[95%] flex flex-col bg-white h-[95vh]  rounded-2xl    '>
<div className='flex justify-between items-center w-[100%] h-[90px] border-b '>
<div className='w-[20%] flex justify-center items-center'>
<img src={logo} className='h-[80px]' />
</div>
<div className='w-[80%] pl-10 pr-0 flex justify-center items-center'>
<div className='flex items-center justify-between sm:pr-10 w-[100%] '>
<div className='flex justify-center items-center sm:w-[52%] w-[110px]   h-[50px]  rounded-md  text-[#000]  ' ></div>
<button onClick={handleNotificationModal} className='flex justify-center items-center sm:w-[20%] w-[110px] h-[50px]  sm:rounded-full rounded-full bg-colorinput bg-[white] border border-[#3045A3] sm:text-[15px] text-[12px] font-[500] text-[#3045A3] ' >Notifications <IoMdNotifications className="text-[#3045A3] text-[20px] ml-3"/></button>
<button onClick={handleProfileSettingModal} className='flex justify-center items-center sm:w-[25%] w-[110px] h-[50px]  sm:rounded-full rounded-full bg-colorinput bg-[#3045A3] text-[white] sm:text-[15px] text-[12px]  ' > <RiSettings5Fill className="text-[white] text-[20px] mr-3"/>Profile & Settings</button>

</div>
</div>
</div>
<div className='flex justify-between items-center w-[100%]'>
<Sidebar/>
<div className='w-[80%] pl-10 overflow-y-scroll  flex-col flex h-[75vh] pt-5  pr-10 '>

</div>
</div>
</div>
</div>


</>
  )
}
