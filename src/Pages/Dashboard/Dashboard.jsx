import React, { useEffect, useState } from 'react'
import logo from "../../Images/Group 2085663688.png"
import img from "../../Images/Rectangle 35.png"
import { IoIosArrowForward, IoIosSearch, IoMdNotifications } from 'react-icons/io'
import Sidebar from '../../Components/Sidebar'
import { LuUser2, LuUsers, LuUsers2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import NotificationModal from '../../Modal/NotificationModal'
import { GrUpdate } from 'react-icons/gr'
import AddBoxModal from '../../Modal/AddBoxModal'
import InventoryCard from '../../Components/InventoryCard'
import MobileSidebar from '../../Components/MobileSidebar'
import { RiMenu2Line } from 'react-icons/ri'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import Header from '../../Components/Header'
import AddMachineModal from '../../Modal/AddMachineModal'

export default function Dashboard() {
    let [notifModal,setNotifModal]=useState(false)
    let [profileSetting,setProfileSetting]=useState(false)
    let [addBoxModal,setAddBoxModal]=useState(false)
    let [machineModal,setMachineModal]=useState(false)
    let [drawerOpen, setDrawerOpen] = useState(false); 
    const [inventoryData, setInventoryData] = useState([]);
    const [screenLoader, setScreenLoader] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    let [searchQuery,setSearchQuery]=useState("")
    const [editMode, setEditMode] = useState(false);
    const [editInventry, setEditInventry] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const handleGetTopInventory = async () => {
        setScreenLoader(true);
        try {
          const response = await axios.get(`${apiBaseUrl}inventory/top-boxes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.status === true) {
            setInventoryData(response?.data?.data?.topBoxesResponse);
            setScreenLoader(false);
            setUpdateData(!updateData)
          }
        } catch (error) {
          setScreenLoader(false);
        }
      };
      useEffect(() => {
        handleGetTopInventory();
      }, []);
    let screenWidth =window.innerWidth
    let toggleDrawer = (open) => {
      setDrawerOpen(open);
  };
    let handleAddBoxModal=()=>{
      setAddBoxModal(!addBoxModal)
      setEditMode(false)
      setEditInventry(true)
    }
    let handleMachineModal=()=>{
      setMachineModal(!machineModal)
      setEditMode(false)
      setEditInventry(true)
    }

let nevigate = useNavigate();
    let handleNotificationModal=()=>{
      localStorage.setItem("unreadNotificationsCount",0);
      setUpdateData(!updateData)
        setNotifModal(true);
    }
    let handleNotificationModalClose=()=>{
      setNotifModal(false);
      localStorage.setItem("unreadNotificationsCount",0);
  }
    let handleProfileSettingModal=()=>{
        setProfileSetting(!profileSetting);
    }
    let handleNevViewMmember=()=>{
      nevigate("/viewmember")
  }

  // const [inventory, setInventory] = useState([]);

  // useEffect(() => {
  //   // Sort and get top 5 items low on inventory
  //   const sortedInventory = inventoryData
  //     .sort((a, b) => a.quantityLeft - b.quantityLeft)
  //     .slice(0, 5);
    
  //   setInventory(sortedInventory);
  // }, []);
  // console.log(inventoryData)

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
<div className='sm:w-[80%] w-[100%] pl-10 overflow-y-scroll  flex-col flex h-[75vh] pt-5  pr-10 '>
<div className='flex justify-start  flex-col w-[100%]'>
<p className='font-bold text-[17px] text-[#3045A3] mt-3'>Top 5 Boxes</p>
<div className="flex flex-wrap justify-start gap-4 ">
{screenLoader ? (
  <div className='flex justify-center items-center flex-col p-5 w-[100%] h-[400px] rounded-lg '>
    <ScaleLoader color='#3045A3' />
  </div>
) : inventoryData?.length === 0 ? (
  <div className='flex justify-center items-center w-[100%] h-[75vh]'>
    <p className='text-[16px] text-[#B7B5B5]'>Empty!</p>
  </div>
) : (
  <>
{inventoryData?.map((item) => (
  <InventoryCard
    key={item.id}
    imageUrl={item?.storageImg}
    boxName={item?.boxName}
    quantityLeft={item?.quantity}
  />
))}
       </>
)}
</div>
</div>
</div>
</div>
</div>
</div>

<AddBoxModal editInventry={editInventry} addBoxModal={addBoxModal} handleAddBoxModal={handleAddBoxModal} updateData={updateData} setUpdateData={setUpdateData} editMode={editMode} />
<AddMachineModal editInventry={editInventry} addBoxModal={machineModal} handleAddBoxModal={handleMachineModal} updateData={updateData} setUpdateData={setUpdateData} editMode={editMode} />

<NotificationModal handleNotificationModal={handleNotificationModal} notifModal={notifModal} handleNotificationModalClose={handleNotificationModalClose} updateData={updateData} />
</>
  )
}
