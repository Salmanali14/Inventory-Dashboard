import React, { useEffect } from 'react';
import { IoIosSearch, IoMdNotifications } from 'react-icons/io';
import { RiMenu2Line } from 'react-icons/ri';
import { GrUpdate } from 'react-icons/gr';
import MobileSidebar from './MobileSidebar'; 
import logo from '../Images/Group 2085663688.png';
import axios from 'axios';

const Header = ({ screenWidth, toggleDrawer, setDrawerOpen, drawerOpen, handleNotificationModal, handleAddBoxModal, setSearchQuery,handleMachineModal }) => {
    let pathName= window.location.pathname
    const role = localStorage.getItem("role");
   const  unreadNotificationsCount=localStorage.getItem("unreadNotificationsCount"); 
  return (
    <div className='flex justify-between flex-col items-center w-[100%] sm:h-[80px] min-h-[60px] border-b'>
      <div className='flex justify-between items-center w-[100%]'>
        {/* Logo or Menu Icon */}
        <div className='sm:w-[20%] flex justify-center items-center'>
          {screenWidth > 450 && <img src={logo} className='h-[80px]' alt="Logo" />}
          {screenWidth < 450 && (
            <RiMenu2Line
              className='text-[30px] text-[#3045A3]'
              onClick={() => toggleDrawer(true)}
            />
          )}
          {/* Mobile Sidebar */}
          <MobileSidebar 
            toggleDrawer={toggleDrawer} 
            setDrawerOpen={setDrawerOpen} 
            drawerOpen={drawerOpen} 
          />
        </div>

        {/* Search and Buttons */}
        <div className='w-[80%] sm:pl-10 pr-0 flex justify-center items-center'>
          <div className='flex items-center sm:justify-between justify-end sm:pr-10 w-[100%]'>
            {/* Search Bar (Visible only for screen width > 450) */}
            {pathName === "/dashboard" ?
              <div className='flex justify-center items-center sm:w-[37%] w-[10px] h-[50px] rounded-full'></div>
              :
<>
            {screenWidth > 450 && (
              <div className='flex justify-center items-center sm:w-[37%] w-[210px] border-[#3045A3] border h-[50px] rounded-full text-[#000]' style={{width:role ==="admin" ? "37%" :"58%"}}>
                <IoIosSearch className='text-[#3045A3] sm:text-[20px] text-[22px] mr-1' />
                <input
                  type='text'
                  placeholder='Search'
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='outline-none text-[14px] pr-2 sm:text-[16px] text-[#3045A3] bg-transparent border-none w-[70px] sm:w-[85%] placeholder-[#3045A3]'
                />
              </div>
            )}
            </>
          }
            
            {/* Notification Button */}
                 {role ==="admin" && screenWidth > 450  &&
            <button
              onClick={handleNotificationModal}
              className='flex justify-center relative items-center sm:w-[20%] w-[210px] h-[40px] sm:h-[50px] mr-2 sm:mr-0 sm:rounded-full rounded-full bg-colorinput bg-[white] border border-[#3045A3] sm:text-[15px] text-[12px] font-[500] text-[#3045A3]'
            >
              Notifications <IoMdNotifications className="text-[#3045A3] text-[20px] ml-3" />
              {unreadNotificationsCount != 0 &&
              <div className='absolute flex justify-center items-center text-white top-[-9px] right-[-5px] border w-[25px] text-[14px] h-[25px] bg-[#3045A3] rounded-full'>{unreadNotificationsCount}</div>
              }
            </button>
            }
            
            {/* Update Inventory Button */}
            <button
              onClick={handleMachineModal}
              className='flex justify-center items-center sm:w-[20%] w-[80%] sm:h-[50px] h-[40px] sm:rounded-full rounded-full bg-colorinput bg-[#3045A3] text-[white] sm:text-[15px] text-[12px]'
            >
              <GrUpdate className="text-[white] text-[16px] mr-3" />
              Update Machine
            </button>
              <button
              onClick={handleAddBoxModal}
              className='flex justify-center items-center sm:w-[20%] w-[80%] sm:ml-0 ml-2 sm:h-[50px] h-[40px] sm:rounded-full rounded-full bg-colorinput bg-[#3045A3] text-[white] sm:text-[15px] text-[12px]'
            >
              <GrUpdate className="text-[white] text-[16px] mr-3" />
              Update Box
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar for small screens (Visible only for screen width < 450) */}

      <div className='flex justify-between items-center mt-5 mb-2 w-[100%]'>
      {screenWidth < 450 && (
        <div className='flex justify-center items-center  w-[70%] border-[#3045A3] border h-[40px] rounded-full text-[#000]' style={{width :role ==="admin"? "70%":"100%" }}>
          <IoIosSearch className='text-[#3045A3] sm:text-[20px] text-[22px] mr-1' />
          <input
            type='text'
            placeholder='Search'
            onChange={(e) => setSearchQuery(e.target.value)}
            className='outline-none text-[14px] pr-2 sm:text-[16px] text-[#3045A3] bg-transparent border-none w-[90%] placeholder-[#3045A3]'
          />
        </div>
      )}
      {role === "admin" && screenWidth < 450 && (
        <button
          onClick={handleNotificationModal}
          className='flex justify-center relative items-center  ml-2 w-[110px] h-[40px] sm:h-[50px]  sm:mr-0 sm:rounded-full rounded-full bg-colorinput bg-[white] border border-[#3045A3] sm:text-[15px] text-[12px] font-[500] text-[#3045A3]'
        >
          Notifications <IoMdNotifications className="text-[#3045A3] text-[20px] ml-2" />
          {unreadNotificationsCount != 0 && (
            <div className='absolute flex justify-center items-center text-white top-[-9px] right-[-5px] border w-[25px] text-[14px] h-[25px] bg-[#3045A3] rounded-full'>
              {unreadNotificationsCount}
            </div>
          )}
        </button>
      )}
      </div>
    </div>
  );
};

export default Header;
