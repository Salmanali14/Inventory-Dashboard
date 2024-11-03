import React, { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Menu icon from MUI
import dashboard from "../Images/Vector (86).png";
import Orders from "../Images/Vector (82).png";
import wdash from "../Images/Vector (67).png";
import worder from "../Images/Vector (74).png";
import logo from "../Images/Group 2085663688.png"
import wbran from "../Images/Vector (77).png";
import audit from "../Images/Group 2085663691.png";
import auditd from "../Images/Group 2085663691 (1).png";
import buring from "../Images/Vector (78).png";
import { useNavigate } from 'react-router-dom';
import { RiQrCodeFill, RiSettings5Fill } from 'react-icons/ri';
import ProfileSettingModal from '../Modal/ProfileSettingModal';
import { FaShippingFast, FaUserFriends } from 'react-icons/fa';

export default function MobileSidebar({ drawerOpen, toggleDrawer }) {
  const role = localStorage.getItem("role");
  let pathName = window.location.pathname;
  let navigate = useNavigate();
  let [profileSetting, setProfileSetting] = useState(false);


  // Navigation handlers
  let hanldeNevDashboard = () => navigate("/dashboard");
  let hanldeNevEmployee = () => navigate("/viewmember");
  let hanldeNevInventry = () => navigate("/manageinventry");
  let hanldeNevBurnRate = () => navigate("/burnratemonitring");
  let hanldeNevauditlog = () => navigate("/auditlog");
  let hanldeNevSettings = () => navigate("/settings");
  let handleScanQrCode = () => navigate("/qrscanner");


  // Modal handlers
  let handleProfileSettingModal = () => setProfileSetting(true);
  let handleProfileSettingModalClose = () => setProfileSetting(false);
  let hanldeNevShipment=()=>{
    navigate("/shipment")
  }
  

  return (
    <>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{ sx: { width: 250 } }} // Set Drawer width to 200px
      >
        {/* Sidebar content */}
        <div className='w-[100%] h-[75vh] flex items-center flex-col'>
        <img src={logo} className='h-[80px]' />
        {role ==="admin" &&
          <div
            onClick={hanldeNevDashboard}
            className='flex justify-start cursor-pointer items-center mt-2 rounded-[24px] pl-5 w-[80%] h-[45px]'
            style={{ background: (pathName === "/dashboard") ? "#3045A3" : "#E9E9E9", color: (pathName === "/dashboard") ? "#fff" : "#000" }}
          >
            {pathName === "/dashboard" ? (
              <img src={wdash} className='h-[20px]' />
            ) : (
              <img src={dashboard} className='h-[20px]' />
            )}
            <h1 className='font-[500] text-[15px] ml-2' style={{ color: pathName === "/dashboard" ? "#fff" : "#3045A3" }}>
              Dashboard
            </h1>
          </div>
          }
          {role ==="admin" &&
          <div
            onClick={hanldeNevEmployee}
            className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px]'
            style={{ background: (pathName === "/viewmember") ? "#3045A3" : "#E9E9E9", color: (pathName === "/viewmember") ? "#fff" : "#000" }}
          >
            <FaUserFriends className='text-[20px]' style={{ color: pathName === "/viewmember" ? "#fff" : "3045A3" }} />
            <h1 className='font-[500] text-[15px] ml-2' style={{ color: pathName === "/viewmember" ? "#fff" : "#3045A3" }}>
              Employee
            </h1>
          </div>
          }
         {/*  More navigation options */}
          <div
            onClick={hanldeNevInventry}
            className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px]'
            style={{ background: (pathName === "/manageinventry") ? "#3045A3" : "#E9E9E9", color: (pathName === "/manageinventry") ? "#fff" : "#000" }}
          >
            {pathName === "/manageinventry" ? (
              <img src={worder} className='h-[20px]' />
            ) : (
              <img src={Orders} className='h-[20px]' />
            )}
            <h1 className='font-[500] text-[15px] ml-2' style={{ color: pathName === "/manageinventry" ? "#fff" : "#3045A3" }}>
              Manage Inventory
            </h1>
          </div>

          <div
            onClick={hanldeNevauditlog}
            className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px]'
            style={{ background: (pathName === "/auditlog") ? "#3045A3" : "#E9E9E9", color: (pathName === "/auditlog") ? "#fff" : "#000" }}
          >
            {pathName === "/auditlog" ? (
              <img src={audit} className='h-[20px]' />
            ) : (
              <img src={auditd} className='h-[20px]' />
            )}
            <h1 className='font-[500] text-[15px] ml-2' style={{ color: pathName === "/auditlog" ? "#fff" : "#3045A3" }}>
              Audit Log
            </h1>
          </div>
          {role ==="admin" &&
          <div
            onClick={hanldeNevBurnRate}
            className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px]'
            style={{ background: (pathName === "/burnratemonitring") ? "#3045A3" : "#E9E9E9", color: (pathName === "/burnratemonitring") ? "#fff" : "#000" }}
          >
            {pathName === "/burnratemonitring" ? (
              <img src={wbran} className='h-[20px]' />
            ) : (
              <img src={buring} className='h-[20px]' />
            )}
            <h1 className='font-[500] text-[15px] ml-2' style={{ color: pathName === "/burnratemonitring" ? "#fff" : "#3045A3" }}>
              Burn Rate Monitoring
            </h1>
          </div>
          }
          <div
          onClick={hanldeNevShipment}
          className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px]'
          style={{ background: (pathName === "/shipment") ? "#3045A3" : "#E9E9E9", color: (pathName === "/shipment") ? "#fff" : "#000" }}
        >
        <FaShippingFast className='text-[20px]' style={{color:pathName === "/shipment" ? "#fff" :"3045A3"}} />
          <h1 className='font-[500] text-[15px] ml-2' style={{ color: pathName === "/shipment" ? "#fff" : "#3045A3" }}>
            Shipment
          </h1>
        </div>
          {role ==="employee" &&
          <div
          onClick={handleScanQrCode}
          className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px]'
          style={{ background: (pathName === "/qrscanner") ? "#3045A3" : "#E9E9E9", color: (pathName === "/qrscanner") ? "#fff" : "#000" }}
        >
         <RiQrCodeFill className="text-[#3045A3] text-[20px]" style={{color:pathName === "/qrscanner" && "#fff"}} />
          <h1 className='font-[500] text-[15px] ml-2' style={{ color: pathName === "/qrscanner" ? "#fff" : "#3045A3" }}>
         Scan Qr Code
          </h1>
        </div>
          }
          
          <div
            onClick={handleProfileSettingModal}
            className='flex justify-start cursor-pointer items-center mt-5 rounded-[24px] pl-5 w-[80%] h-[45px] bg-[#E9E9E9]'
          >
            <RiSettings5Fill className="text-[#3045A3] text-[20px]" />
            <h1 className='font-[500] text-[15px] ml-2 text-[#3045A3]'>
              Profile & Settings
            </h1>
          </div>
        </div>
      </Drawer>

      {/* Profile Setting Modal */}
      <ProfileSettingModal
        handleProfileSettingModal={handleProfileSettingModal}
        profileSetting={profileSetting}
        handleProfileSettingModalClose={handleProfileSettingModalClose}
      />
    </>
  );
}
