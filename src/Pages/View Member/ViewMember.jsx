import React, { useEffect, useState } from 'react'
import logo from "../../Images/Group 2085663688.png"
import { IoIosSearch, IoMdNotifications } from 'react-icons/io'
import Sidebar from '../../Components/Sidebar'
import { LuUser2, LuUsers, LuUsers2 } from 'react-icons/lu'
import { TbSettingsFilled } from 'react-icons/tb'
import DataTableMember from '../../Components/DataTableMember'
import AddMemberModal from '../../Modal/AddMemberModal'
import NotificationModal from '../../Modal/NotificationModal'
import AddBoxModal from '../../Modal/AddBoxModal'
import { GrUpdate } from 'react-icons/gr'
import { RiMenu2Line } from 'react-icons/ri'
import MobileSidebar from '../../Components/MobileSidebar'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import { Toaster } from 'react-hot-toast'
import Header from '../../Components/Header'
import AddMachineModal from '../../Modal/AddMachineModal'

export default function ViewMember() {
    let [notifModal,setNotifModal]=useState(false)
    let [profileSetting,setProfileSetting]=useState(false)
    let [addMemberModal,setAddMemberModal]=useState(false)
    let [addBoxModal,setAddBoxModal]=useState(false)
    let [drawerOpen, setDrawerOpen] = useState(false); 
    let [searchQuery,setSearchQuery]=useState("")
    let [machineModal,setMachineModal]=useState(false)
    const [getAllEmploye, setGetAllEmploye] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const [updateNoti, setUpdateNoti] = useState(false);
    const [filteredAllEmpolyee, setFilteredAllEmployee] = useState([]);
    const [screenLoader, setScreenLoader] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editInventry, setEditInventry] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    let screenWidth =window.innerWidth
    let toggleDrawer = (open) => {
      setDrawerOpen(open);
  };
    let handleAddBoxModal=()=>{
      setAddBoxModal(!addBoxModal)
      setEditInventry(true)
    }
    let handleNotificationModal=()=>{
      localStorage.setItem("unreadNotificationsCount",0);
      setUpdateNoti(!updateNoti)
        setNotifModal(true);
    }
    let handleNotificationModalClose=()=>{
      setNotifModal(false);
      localStorage.setItem("unreadNotificationsCount",0);
  }
    let handleAddMemberModal=()=>{
      setAddMemberModal(!addMemberModal);
      setEditMode(false)
  }
    let handleProfileSettingModal=()=>{
        setProfileSetting(!profileSetting);
    }
    const handleGetAllEmployee = async () => {
      setScreenLoader(true);
      try {
        const response = await axios.get(`${apiBaseUrl}user/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response?.data?.status === true) {
          setGetAllEmploye(response?.data?.data?.usersResponse);
          setFilteredAllEmployee(response?.data?.data?.usersResponse); 
          setScreenLoader(false);
          setUpdateNoti(!updateNoti)
        }
      } catch (error) {
        setScreenLoader(false);
      }
    };
  
    useEffect(() => {
      handleGetAllEmployee();
    }, [updateData]);
    useEffect(() => {
      // Update filteredCustomer based on searchQuery
      setFilteredAllEmployee(
        getAllEmploye?.filter(emp => emp?.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }, [searchQuery, getAllEmploye]);
  
    let handleMachineModal=()=>{
      setMachineModal(!machineModal)
      setEditMode(false)
      setEditInventry(true)
    }
  return (
<>
<div className='w-[100%] flex bg-white h-[100vh] border  justify-center  items-center'>
<div className='w-[95%] flex flex-col bg-white h-[95vh]  rounded-2xl    '>
<Header 
            screenWidth={screenWidth} 
            toggleDrawer={toggleDrawer} 
            drawerOpen={drawerOpen} 
            setDrawerOpen={setDrawerOpen} 
            handleNotificationModal={handleNotificationModal} 
            handleAddBoxModal={handleAddBoxModal} 
            setSearchQuery={setSearchQuery}
            handleMachineModal={handleMachineModal}
          />
<div className='flex justify-between items-center w-[100%]'>
{screenWidth> 450 &&
  <Sidebar/>
  }
<div className='sm:w-[80%] w-[100%] pl-3 pr-3 sm:pl-10 overflow-y-scroll  flex-col flex h-[75vh] pt-5  sm:pr-10 '>
<div className='w-[100%] flex justify-between items-center'>
<h1 className='font-[600] sm:text-[16px] text-[13px] mt-2 text-[#3045A3] flex items-center '><LuUsers2 className='h-[25px] w-[25px] text-[#3045A3]  mr-2'/> Total Employee <span className='sm:ml-3 ml-1 text-[20px] sm:text-[20px]'>{getAllEmploye?.length}</span></h1>
<button onClick={handleAddMemberModal} className='sm:w-[150px] w-[140px] h-[40px] text-[#fff] bg-[#3045A3] flex justify-center items-center rounded-full '><TbSettingsFilled className='text-[#fff] mr-2'/>Add Employee</button>
</div>
{screenLoader ? (
  <div className='flex justify-center items-center flex-col p-5 w-[100%] h-[400px] rounded-lg mt-5'>
    <ScaleLoader color='#3045A3' />
  </div>
) : getAllEmploye?.length === 0 ? (
  <div className='flex justify-center items-center w-[100%] h-[75vh]'>
    <p className='text-[16px] text-[#B7B5B5]'>Empty!</p>
  </div>
) : (
  <>
<DataTableMember getAllEmploye={filteredAllEmpolyee} setGetAllEmploye={setGetAllEmploye} editMode={editMode} setEditMode={setEditMode} updateData={updateData} setUpdateData={setUpdateData}/>
</>
)}
</div>
</div>
</div>
</div>
<AddMachineModal  editInventry={editInventry} addBoxModal={machineModal} handleAddBoxModal={handleMachineModal} updateData={updateData} setUpdateData={setUpdateData} editMode={editMode} />
<AddBoxModal editInventry={editInventry}  addBoxModal={addBoxModal} handleAddBoxModal={handleAddBoxModal} updateData={updateData} setUpdateData={setUpdateData}  />
<AddMemberModal updateData={updateData} setUpdateData={setUpdateData} handleAddMemberModal={handleAddMemberModal} addMemberModal={addMemberModal} editMode={editMode}/>
<NotificationModal handleNotificationModal={handleNotificationModal} notifModal={notifModal} updateData={updateNoti} handleNotificationModalClose={handleNotificationModalClose}/>

</>
  )
}
