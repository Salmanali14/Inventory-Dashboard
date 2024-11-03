import React, { useEffect, useState } from 'react';
import logo from "../../Images/Group 2085663688.png";
import { IoIosSearch, IoMdNotifications } from 'react-icons/io';
import Sidebar from '../../Components/Sidebar';
import DataTableManageInventory from '../../Components/DataTableManageInventry';
import AddBoxModal from '../../Modal/AddBoxModal';
import NotificationModal from '../../Modal/NotificationModal';
import { GrUpdate } from 'react-icons/gr';
import MobileSidebar from '../../Components/MobileSidebar';
import { RiMenu2Line } from 'react-icons/ri';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import Header from '../../Components/Header';
import AddMachineModal from '../../Modal/AddMachineModal';
import DataTableShipment from '../../Components/DataTableShipment';
import AddStockModal from '../../Modal/AddStockModal';

export default function Shipment() {
    let [notifModal, setNotifModal] = useState(false);
    let [addBoxModal, setAddBoxModal] = useState(false);
    let [addStockModal, setAddStockModal] = useState(false);

    let [sortOption, setSortOption] = useState('updatedDate');
    let [drawerOpen, setDrawerOpen] = useState(false); 
    let [searchQuery,setSearchQuery]=useState("")
    const [getAllInventory, setGetAllInventory] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const [updateNoti, setUpdateNoti] = useState(false);
    let [machineModal,setMachineModal]=useState(false)
    const [editInventry, setEditInventry] = useState(false);
    const [filteredAllInventory, setFilteredAllInventory] = useState([]);
    const [screenLoader, setScreenLoader] = useState(false);
    const [editMode, setEditMode] = useState(false);
    let screenWidth =window.innerWidth
    
    let toggleDrawer = (open) => {
      setDrawerOpen(open);
  };
    let handleStockModal = () => {
        setAddStockModal(!addStockModal);
    };

    let handleNotificationModal=()=>{
      localStorage.setItem("unreadNotificationsCount",0);
      setUpdateNoti(!updateNoti)
        setNotifModal(true);
    }
    let handleMachineModal=()=>{
      setMachineModal(!machineModal)
      setEditMode(false)
      setEditInventry(false)
    }
    let handleAddBoxModal = () => {
      setEditMode(false)
      setAddBoxModal(!addBoxModal);
      setEditInventry(false)
  };
    let handleMachineModalUpdate=()=>{
      setMachineModal(!machineModal)
      setEditMode(false)
      setEditInventry(true)
    }
    let handleUpdateBoxModal=()=>{
      setAddBoxModal(!addBoxModal)
      setEditMode(false)
      setEditInventry(true)
    }
    let handleNotificationModalClose=()=>{
      setNotifModal(false);
      localStorage.setItem("unreadNotificationsCount",0);
  }
    // Function to change sort option based on user's selection
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const handleGetAllInventory = async () => {
        setScreenLoader(true);
        try {
          const response = await axios.get(`${apiBaseUrl}shipment/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
   
          if (response?.data?.status === true) {
            setGetAllInventory(response?.data?.data?.shipmentsResponse);
            setFilteredAllInventory(response?.data?.data?.shipmentsResponse); 
            setScreenLoader(false);
          }
        } catch (error) {
          setScreenLoader(false);
        }
      };
      useEffect(() => {
        handleGetAllInventory();
      }, [updateData]);
    
      useEffect(() => {
        setFilteredAllInventory(
            getAllInventory?.filter(emp => emp?.category?.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }, [searchQuery, getAllInventory]);
 
      const role = localStorage.getItem("role");
  
    return (
        <>
            <div className='w-[100%] flex bg-white h-[100vh] border justify-center items-center'>
                <div className='w-[95%] flex flex-col bg-white h-[95vh] rounded-2xl'>
                <Header 
                screenWidth={screenWidth} 
                toggleDrawer={toggleDrawer} 
                drawerOpen={drawerOpen} 
                setDrawerOpen={setDrawerOpen} 
                handleNotificationModal={handleNotificationModal} 
                handleAddBoxModal={handleUpdateBoxModal} 
                setSearchQuery={setSearchQuery}
                handleMachineModal={handleMachineModalUpdate}
              />

                    <div className='flex justify-between items-center w-[100%]'>
                    {screenWidth> 450 &&
                        <Sidebar />
                    }
                        <div className='sm:w-[80%] w-[100%] pl-3 pr-3 sm:pl-10 overflow-y-scroll flex-col flex h-[75vh] pt-5 sm:pr-10'>
                            <div className='flex justify-between items-end w-[100%]'>
                            <h1 className='font-[600] sm:text-[16px] text-[13px] mt-2 text-[#3045A3] flex items-center '> Total Items <span className='sm:ml-3 ml-1 text-[20px] sm:text-[20px]'>{getAllInventory?.length}</span></h1>
                            <div className='flex justify-center items-center'>
                            {screenWidth >440  &&
                              <>
                            <button
                            onClick={handleStockModal}
                            className='flex justify-center items-center sm:w-[140px] w-[140px] h-[40px] sm:rounded-full rounded-full bg-colorinput bg-[#3045A3] text-[white] sm:text-[15px] text-[12px]'
                          >
                            Input Stock
                          </button>
                  
                          </>
                            }
                                <select 
                                    value={sortOption} 
                                    style={{outline:"none"}}
                                    onChange={handleSortChange} 
                                    className='w-[200px] h-[40px] bg-[#E9EBFF] text-[#3045A3] flex justify-center items-center ml-5 p-2 rounded'>
                                    <option value="updatedDate">Sort by Date</option>
                                    <option value="quantity">Sort by Quantity</option>
                                    <option value="category">Sort by Category</option>
                                </select>
                                </div>
                            </div>
                                {screenWidth < 440  &&
                                  <div className='flex mt-5 justify-end items-end w-[100%]'>
                         <button
                                onClick={handleStockModal}
                            className='flex justify-center items-center sm:w-[140px] w-[140px] h-[40px] sm:rounded-full rounded-full bg-colorinput bg-[#3045A3] text-[white] sm:text-[15px] text-[12px]'
                          >
                            Input Stock
                          </button>
                                  </div>
                                }
                            {screenLoader ? (
                                <div className='flex justify-center items-center flex-col p-5 w-[100%] h-[400px] rounded-lg mt-5'>
                                  <ScaleLoader color='#3045A3' />
                                </div>
                              ) : getAllInventory?.length === 0 ? (
                                <div className='flex justify-center items-center w-[100%] h-[75vh]'>
                                  <p className='text-[16px] text-[#B7B5B5]'>Empty!</p>
                                </div>
                              ) : (
                                <>
                            <DataTableShipment filteredAllInventory={filteredAllInventory} sortOption={sortOption}  setGetAllInventory={setGetAllInventory} editMode={editMode} setEditMode={setEditMode} updateData={updateData} setUpdateData={setUpdateData} />
                            </>
)}
                        </div>
                    </div>
                </div>
            </div>
            <AddMachineModal  editInventry={editInventry} addBoxModal={machineModal} handleAddBoxModal={handleMachineModal} updateData={updateData} setUpdateData={setUpdateData} editMode={editMode} />
            <AddStockModal handleStockModal={handleStockModal} addStockModal={addStockModal} updateData={updateData} setUpdateData={setUpdateData}  />
            <NotificationModal handleNotificationModal={handleNotificationModal} notifModal={notifModal} handleNotificationModalClose={handleNotificationModalClose} updateData={updateNoti}  />
            <AddBoxModal editInventry={editInventry} editMode={editMode} updateData={updateData} setUpdateData={setUpdateData} addBoxModal={addBoxModal} handleAddBoxModal={handleAddBoxModal} />
        </>
    );
}
