import React, { useEffect, useState } from 'react'
import logo from "../../Images/Group 2085663688.png"
import { IoIosSearch, IoMdNotifications } from 'react-icons/io'
import Sidebar from '../../Components/Sidebar'
import AuditlogDataTable from '../../Components/AuditlogDataTable'
import NotificationModal from '../../Modal/NotificationModal'
import { GrUpdate } from 'react-icons/gr'
import AddBoxModal from '../../Modal/AddBoxModal'
import MobileSidebar from '../../Components/MobileSidebar'
import { RiMenu2Line } from 'react-icons/ri'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { ScaleLoader } from 'react-spinners'
import Header from '../../Components/Header'
import AddMachineModal from '../../Modal/AddMachineModal'
export default function AuditLog() {
    let [notifModal,setNotifModal]=useState(false)
    let [addBoxModal,setAddBoxModal]=useState(false)
    let [drawerOpen, setDrawerOpen] = useState(false); 
    let [searchQuery,setSearchQuery]=useState("")
    const [getAllAuditlog, setGetAllAuditlog] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const [updateNoti, setUpdateNoti] = useState(false);
    let [machineModal,setMachineModal]=useState(false)
    const [editMode, setEditMode] = useState(false);
    const [filteredAllAuditLog, setFilteredAllAuditLog] = useState([]);
    const [screenLoader, setScreenLoader] = useState(false);
    const [editInventry, setEditInventry] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const handleGetAllAuditlog = async () => {
        setScreenLoader(true);
        try {
          const response = await axios.get(`${apiBaseUrl}log/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response?.data?.status === true) {
            setGetAllAuditlog(response?.data?.data?.auditLogsResponse);
            setFilteredAllAuditLog(response?.data?.data?.auditLogsResponse); 
            setScreenLoader(false);
          }
        } catch (error) {
          setScreenLoader(false);
        }
      };
      useEffect(() => {
        handleGetAllAuditlog();
      }, [updateData]);
      let handleMachineModal=()=>{
        setMachineModal(!machineModal)
        setEditMode(false)
        setEditInventry(true)
      }
      useEffect(() => {
        setFilteredAllAuditLog(
            getAllAuditlog?.filter(emp => emp?.userName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }, [searchQuery, getAllAuditlog]);
    let screenWidth =window.innerWidth
    let toggleDrawer = (open) => {
      setDrawerOpen(open);
  };
    let handleAddBoxModal=()=>{
      setAddBoxModal(!addBoxModal)
      setEditMode(false)
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

<h1 className='font-[600] sm:text-[16px] text-[13px] mt-2 text-[#3045A3] flex items-center '> Total Items <span className='sm:ml-3 ml-1 text-[20px] sm:text-[20px]'>{getAllAuditlog?.length}</span></h1>
{screenLoader ? (
  <div className='flex justify-center items-center flex-col p-5 w-[100%] h-[400px] rounded-lg '>
    <ScaleLoader color='#3045A3' />
  </div>
) : getAllAuditlog?.length === 0 ? (
  <div className='flex justify-center items-center w-[100%] h-[75vh]'>
    <p className='text-[16px] text-[#B7B5B5]'>Empty!</p>
  </div>
) : (
  <>
<AuditlogDataTable filteredAllAuditLog={filteredAllAuditLog} setGetAllAuditlog={setGetAllAuditlog} setFilteredAllAuditLog={setFilteredAllAuditLog}/>
</>
)}
</div>
</div>
</div>
</div>
<AddMachineModal  editInventry={editInventry} addBoxModal={machineModal} handleAddBoxModal={handleMachineModal} updateData={updateData} setUpdateData={setUpdateData} editMode={editMode} />
<AddBoxModal editInventry={editInventry} addBoxModal={addBoxModal} handleAddBoxModal={handleAddBoxModal} updateData={updateData} setUpdateData={setUpdateData} editMode={editMode} />
<NotificationModal handleNotificationModal={handleNotificationModal} notifModal={notifModal} handleNotificationModalClose={handleNotificationModalClose} updateData={updateNoti}  />

</>
  )
}
