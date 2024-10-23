import React, { useEffect, useState } from 'react'
import logo from "../../Images/Group 2085663688.png"
import { IoIosSearch, IoMdNotifications } from 'react-icons/io'
import Sidebar from '../../Components/Sidebar'
import BurnratemonitringDataTable from '../../Components/BurnratemonitringDataTable'
import NotificationModal from '../../Modal/NotificationModal'
import AddBoxModal from '../../Modal/AddBoxModal'
import { GrUpdate } from 'react-icons/gr'
import { RiMenu2Line } from 'react-icons/ri'
import MobileSidebar from '../../Components/MobileSidebar'
import Header from '../../Components/Header'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import AddMachineModal from '../../Modal/AddMachineModal'

export default function BurnRateMonitring() {
    let [notifModal,setNotifModal]=useState(false)
    let [addBoxModal,setAddBoxModal]=useState(false)
    let [drawerOpen, setDrawerOpen] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    let [searchQuery,setSearchQuery]=useState("") 
    const [updateNoti, setUpdateNoti] = useState(false);
    const [getAllBurnRate, setGetAllBurnRate] = useState([]);
    const [filteredBurnRate, setFilteredBurnRate] = useState([])
    let [machineModal,setMachineModal]=useState(false);
    const [screenLoader, setScreenLoader] = useState(false);
    const [editInventry, setEditInventry] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const handleGetAllBurnRate = async () => {
        setScreenLoader(true);
        try {
          const response = await axios.get(`${apiBaseUrl}burnRate/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.status === true) {
            setGetAllBurnRate(response?.data?.data?.burnRatesResponse);
            setFilteredBurnRate(response?.data?.data?.burnRatesResponse); 
            setScreenLoader(false);
          }
        } catch (error) {
          setScreenLoader(false);
        }
      };
      useEffect(() => {
        handleGetAllBurnRate();
      }, [updateData]);
    
      useEffect(() => {
        setFilteredBurnRate(
          getAllBurnRate?.filter(emp => emp?.boxName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }, [searchQuery, getAllBurnRate]);
    let screenWidth =window.innerWidth
    let toggleDrawer = (open) => {
      setDrawerOpen(open);
  };
  let handleMachineModal=()=>{
    setMachineModal(!machineModal)
    setEditMode(false)
    setEditInventry(true)
  }
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
    <Sidebar />
}
<div className='sm:w-[80%] w-[100%] sm:pl-10 pl-3 pr-3 overflow-y-scroll  flex-col flex h-[75vh] pt-5  sm:pr-10 '>
<h1 className='font-[600] sm:text-[16px] text-[13px] mt-2 text-[#3045A3] flex items-center '> Total Items <span className='sm:ml-3 ml-1 text-[20px] sm:text-[20px]'>{getAllBurnRate?.length}</span></h1>
{screenLoader ? (
  <div className='flex justify-center items-center flex-col p-5 w-[100%] h-[400px] rounded-lg mt-5'>
    <ScaleLoader color='#3045A3' />
  </div>
) : getAllBurnRate?.length === 0 ? (
  <div className='flex justify-center items-center w-[100%] h-[75vh]'>
    <p className='text-[16px] text-[#B7B5B5]'>Empty!</p>
  </div>
) : (
  <>
  <AddMachineModal  editInventry={editInventry} addBoxModal={machineModal} handleAddBoxModal={handleMachineModal} updateData={updateData} setUpdateData={setUpdateData}  editMode={editMode} />
<BurnratemonitringDataTable filteredBurnRate={filteredBurnRate} setGetAllBurnRate={setGetAllBurnRate}/>
</>
)}
</div>
</div>
</div>
</div>

<AddBoxModal editInventry={editInventry} addBoxModal={addBoxModal} handleAddBoxModal={handleAddBoxModal} updateData={updateData} setUpdateData={setUpdateData} editMode={editMode}  />
<NotificationModal handleNotificationModal={handleNotificationModal} notifModal={notifModal} handleNotificationModalClose={handleNotificationModalClose} updateData={updateNoti}  />
</>
  )
}
