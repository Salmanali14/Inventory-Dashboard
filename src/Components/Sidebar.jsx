import React, { useState } from 'react'
import dashboard from "../Images/Vector (86).png"
import Orders from "../Images/Vector (82).png"
import promotion from "../Images/Vector (72).png"
import report from "../Images/Vector (72).png"
import Branches from "../Images/Vector (72).png"
import wdash from "../Images/Vector (67).png"
import worder from "../Images/Vector (74).png"
import wpro from "../Images/Vector (69).png"
import wbran from "../Images/Vector (77).png"
import audit from "../Images/Group 2085663691.png"
import auditd from "../Images/Group 2085663691 (1).png"

import buring from "../Images/Vector (78).png"



import { useNavigate } from 'react-router-dom'
import { RiQrCodeFill, RiSettings5Fill } from 'react-icons/ri'
import ProfileSettingModal from '../Modal/ProfileSettingModal'
import { FaShippingFast, FaUserFriends } from 'react-icons/fa'


export default function Sidebar() {
    let pathName= window.location.pathname
    const role = localStorage.getItem("role");
    let nevigate =useNavigate()
    let [profileSetting,setProfileSetting]=useState(false)
    let hanldeNevDashboard =()=>{
        nevigate("/dashboard")
      }
      let hanldeNevInventry =()=>{
        nevigate("/manageinventry")
      }
      let hanldeNevUpdateInventry =()=>{
        nevigate("/updateinventry")
      }
      let hanldeNevBurnRate =()=>{
        nevigate("/burnratemonitring")
      }
      let hanldeNevauditlog =()=>{
        nevigate("/auditlog")
      }
      let hanldeNevSettings =()=>{
        nevigate("/settings")
      }
      
      let handleProfileSettingModal=()=>{
        setProfileSetting(true);
    }
    let handleProfileSettingModalClose=()=>{
      setProfileSetting(false);
  }
  let hanldeNevEmployee=()=>{
    nevigate("/viewmember")
  }
  let hanldeNevShipment=()=>{
    nevigate("/shipment")
  }
  let handleScanQrCode = () => nevigate("/qrscanner");
  return (
   <>
   <div className='w-[20%] h-[75vh] border-r flex  items-center flex-col'>
   {role ==="admin" &&
   <div onClick={hanldeNevDashboard} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] ' style={{background:(pathName === "/dashboard") ?"#3045A3":"#E9E9E9",color:(pathName === "/dashboard") ?"#fff":"#000"}}>
   {pathName === "/dashboard" ?
    <img src={wdash} className='h-[20px]'/>:
   <img src={dashboard} className='h-[20px]'/>}
   <h1 className='font-[500] text-[15px] ml-2 ' style={{color:pathName === "/dashboard"? "#fff":"#3045A3"}}>Dashboard</h1>
   </div>}
   {role ==="admin" &&
   <div onClick={hanldeNevEmployee} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] ' style={{background:(pathName === "/viewmember") ?"#3045A3":"#E9E9E9",color:(pathName === "/viewmember") ?"#fff":"#000"}}>
<FaUserFriends className='text-[20px]' style={{color:pathName === "/viewmember" ? "#fff" :"3045A3"}} />
   <h1 className='font-[500] text-[15px] ml-2 ' style={{color:pathName === "/viewmember"? "#fff":"#3045A3"}}>Employee</h1>
   </div>}
   <div onClick={hanldeNevInventry} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] bg-[#E9E9E9]' style={{background:(pathName === "/manageinventry") ?"#3045A3":"#E9E9E9",color:(pathName === "/manageinventry") ?"#fff":"#000"}}>
   {pathName === "/manageinventry" ?
    <img src={worder} className='h-[20px]'/>:
   <img src={Orders} className='h-[20px]'/>}
   <h1 className='font-[500] text-[15px] ml-2 ' style={{color:pathName === "/manageinventry"? "#fff":"#3045A3"}}>Manage Inventory </h1>
   </div>
   <div onClick={hanldeNevauditlog} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] bg-[#E9E9E9]'  style={{background:(pathName === "/auditlog") ?"#3045A3":"#E9E9E9",color:(pathName === "/auditlog") ?"#fff":"#000"}}>
   {pathName === "/auditlog" ?
   <img src={audit} className='h-[20px]'/>:
   <img src={auditd} className='h-[20px]'/>
   }
   <h1 className='font-[500] text-[15px] ml-2 text-[#3045A3]' style={{color:pathName === "/auditlog"? "#fff":"#3045A3"}}>Audit Log</h1>
   </div>
   {role ==="admin" &&
   <div onClick={hanldeNevBurnRate} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] bg-[#E9E9E9]'  style={{background:(pathName === "/burnratemonitring") ?"#3045A3":"#E9E9E9",color:(pathName === "/burnratemonitring") ?"#fff":"#000"}}>
   {pathName === "/burnratemonitring" ?
    <img src={wbran} className='h-[20px]'/>:
   <img src={buring} className='h-[20px]'/>
   }
   <h1 className='font-[500] text-[15px] ml-2 text-[#3045A3]' style={{color:pathName === "/burnratemonitring"? "#fff":"#3045A3"}}>Burn Rate Monitring</h1>
   </div>}
   {role ==="employee" &&
   <div onClick={handleScanQrCode} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] bg-[#E9E9E9]'  style={{background:(pathName === "/qrscanner") ?"#3045A3":"#E9E9E9",color:(pathName === "/qrscanner") ?"#fff":"#000"}}>
   <RiQrCodeFill className="text-[#3045A3] text-[20px]" style={{color:pathName === "/qrscanner" && "#fff"}} />
   <h1 className='font-[500] text-[15px] ml-2 text-[#3045A3]' style={{color:pathName === "/qrscanner"? "#fff":"#3045A3"}}>Scan QR Code</h1>
   </div>}
   <div onClick={hanldeNevShipment} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] bg-[#E9E9E9]'  style={{background:(pathName === "/shipment") ?"#3045A3":"#E9E9E9",color:(pathName === "/shipment") ?"#fff":"#000"}}>
   <FaShippingFast className='text-[20px]' style={{color:pathName === "/shipment" ? "#fff" :"3045A3"}} />
   <h1 className='font-[500] text-[15px] ml-2 text-[#3045A3]' style={{color:pathName === "/shipment"? "#fff":"#3045A3"}}>Shipment</h1>
   </div>
   <div onClick={handleProfileSettingModal} className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] bg-[#E9E9E9]'  >
   <RiSettings5Fill className="text-[#3045A3] text-[20px] "/>
   <h1 className='font-[500] text-[15px]  ml-2 text-[#3045A3]' >Profile & Settings</h1>
   </div>

   </div>
   <ProfileSettingModal handleProfileSettingModal={handleProfileSettingModal} profileSetting={profileSetting} handleProfileSettingModalClose={handleProfileSettingModalClose}/>
   </>
  )
}
