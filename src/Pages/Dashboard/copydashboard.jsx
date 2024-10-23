import React, { useState } from 'react'
import logo from "../../Images/Group 2085663688.png"
import order from "../../Images/Vector (64).png"
import cus from "../../Images/Vector (65).png"
import promo from "../../Images/Vector (66).png"
import img from "../../Images/Rectangle 35.png"
import { IoIosArrowForward, IoIosSearch, IoMdNotifications } from 'react-icons/io'
import { GoPlus } from 'react-icons/go'
import { RiSettings5Fill } from 'react-icons/ri'
import Sidebar from '../../Components/Sidebar'
import { LuUser2, LuUsers, LuUsers2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import ProfileSettingModal from '../../Modal/ProfileSettingModal'
import NotificationModal from '../../Modal/NotificationModal'

// import NotificationModal from '../../Modal/NotificationModal'
// import ProfileSettingModal from '../../Modal/ProfileSettingModal'
// import Chart from '../../Components/Chart'
export default function Dashboard() {
    let [notifModal,setNotifModal]=useState(false)
    let [profileSetting,setProfileSetting]=useState(false)
let nevigate = useNavigate();
    let handleNotificationModal=()=>{
        setNotifModal(!notifModal);
    }
    let handleProfileSettingModal=()=>{
        setProfileSetting(!profileSetting);
    }
    let handleNevViewMmember=()=>{
      nevigate("/viewmember")
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
<div className='flex justify-between  w-[100%]'>
<div className='flex justify-center pl-3 w-[47%] border h-[140px]  flex-col border-[#3045A3] rounded-xl '>
<LuUser2 className='h-[25px] w-[25px] text-[#3045A3]'/>
<h1 className='font-[500] mt-2 text-[#3045A3]'>Total Boxes</h1>
<h1 className='font-bold text-[30px] text-[#3045A3]'>134k</h1>
</div>
<div className='flex justify-between pl-3 w-[47%] border h-[140px]  items-center border-[#3045A3] rounded-xl '>
<div>
<LuUsers2 className='h-[25px] w-[25px] text-[#3045A3]'/>
<h1 className='font-[500] mt-2 text-[#3045A3]'>Total Members</h1>
<h1 className='font-bold text-[30px] text-[#3045A3]'>54k</h1>
</div>
<button onClick={handleNevViewMmember} className='flex justify-center mr-3 items-center sm:w-[160px] w-[110px] h-[50px]  sm:rounded-full rounded-full bg-colorinput bg-[white] border border-[#3045A3] sm:text-[15px] text-[12px] font-[500] text-[#3045A3] ' >View Members <IoIosArrowForward className="text-[#3045A3] text-[20px] ml-2"/></button>
</div>
</div>
<div className='flex justify-start  flex-col w-[100%]'>
<p className='font-bold text-[17px] text-[#3045A3] mt-3'>Top 10 product</p>
<div className='flex justify-start items-center gap-5 w-[100%] flex-wrap'>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>
<div className='flex justify-center items-center flex-col mt-2 '>
<img src={img} className='w-[200px]' />
<p className='font-[600] mt-2 '>S32</p>
</div>

</div>
</div>
</div>
</div>
</div>
</div>

<ProfileSettingModal handleProfileSettingModal={handleProfileSettingModal} profileSetting={profileSetting}/>
<NotificationModal handleNotificationModal={handleNotificationModal} notifModal={notifModal} />
</>
  )
}
