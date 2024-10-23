import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PaginatorStyles.css';
import { IoMdMore } from 'react-icons/io';
import img from "../Images/Rectangle 35.png"
import { Menu, MenuItem } from '@mui/material';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import ConfirmationModal from '../Modal/ConfirmationModal';
import axios from 'axios';
import toast from 'react-hot-toast';
// Dummy image for storage and machine columns

export default function BurnratemonitringDataTable(filteredBurnRate,setGetAllBurnRate) {
 
 const filteredBurnRates= filteredBurnRate?.filteredBurnRate
 const [anchorEl, setAnchorEl] = useState(null);
 const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
 const token = localStorage.getItem("token");
 const [openModal, setOpenModal] = useState(false); 
 const [btnLoader, setBtnLoader] = useState(false);
const [singleBurnRate, setSingleBurnRate] = useState(null); 
const confirmDelete = (data) => {
 setOpenModal(true);
 handleMenuClose(); 
};

 const handleConfirmDelete = async () => {
   setBtnLoader(true);
   try {
     const response = await axios.delete(`${apiBaseUrl}burnRate/delete/${singleBurnRate}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     if (response?.data?.status === true) {
       toast.success(response?.data?.message);
       setOpenModal(false);
       
       filteredBurnRate?.setGetAllBurnRate((prevBurn) => {
         const udpatedLog = prevBurn.filter((cust) => cust.id !== singleBurnRate);
         filteredBurnRate?.setGetAllBurnRate(udpatedLog); 
         return udpatedLog;
        
       })
       setBtnLoader(false);
     }
   } catch (error) {
     setBtnLoader(false);
  
   }
 };


 const handleMenuClick = (event,data) => {
  setSingleBurnRate(data?.id);
   setAnchorEl(event.currentTarget);
 };

 const handleMenuClose = () => {
   setAnchorEl(null);
 };
  // Dummy data for inventory


  // Image column template
 // Image column template
const imageTemplate = (rowData, field) => {
  return rowData[field] ? (
    <div className='flex justify-center items-center'>
      <img src={rowData[field]} alt="item" className="w-12 h-12 object-cover" />
    </div>
  ) : (
    <div className='flex justify-center items-center'>
      <span>{rowData.storageImg || "N/A"}</span> {/* Show item name or "N/A" if boxName is empty */}
    </div>
  );
};

  const boxNameTemplate = (rowData) => {
    const maxLength = 18;
    const boxName = rowData.boxName || 'N/A'; // Default to 'N/A' if boxName is empty
    return boxName.length > maxLength ? `${boxName.substring(0, maxLength)}...` : boxName;
};

  // Date template for updated dat
  // Action buttons for each row
  const actionTemplate = (rowData) => {
    return (
      <div className='ml-8'>
        <IoMdMore onClick={(event) => handleMenuClick(event, rowData)}  className='text-[25px] cursor-pointer' />
        </div>
   
    );
  };

  // Serial number template
 
  const screenWidth =window.innerWidth

  return (
    <>
    <div className="card relative mt-10 overflow-y-scroll h-[60vh]">
    <DataTable
      value={filteredBurnRates}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 20]}
      tableStyle={{ 
  minWidth:screenWidth>450 ? '100%' :"800px",
        marginBottom: '20px', 
        fontSize: '0.85rem',
        textAlign: 'center' 
      }}
    >
   
    
     
      <Column 
        field="boxName" 
        body={boxNameTemplate}
        header="Box" 
        style={{ 
          width: '15%', 
          textAlign: 'center' 
        }} 
      />
     <Column
          header="In Storage"
          body={(rowData) => imageTemplate(rowData, 'storageImg')}
          style={{
            width: '15%',
            textAlign: 'center',
          }}
        />
      <Column 
        field="quantity" 
        header="Total Quantity" 
        style={{ 
          width: '15%', 
          textAlign: 'center' 
        }} 
      />
      <Column 
      field="weekPercentageChange"  
      header="Burned Rate Weekly" 
      body={(rowData) => (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {rowData.weekPercentageChange >= 0 ? (
            <FaLongArrowAltUp style={{  color: 'green' }} /> 
          ) : (
            <FaLongArrowAltDown style={{  color: 'red' }} /> 
          )}
          {`${rowData.weekPercentageChange}%`}
        </span>
      )}
      style={{ 
        width: '20%', 
        textAlign: 'center' 
      }} 
    />
    <Column 
    field="monthPercentageChange"  
    header="Burned Rate Monthly" 
    body={(rowData) => (
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {rowData?.monthPercentageChange >= 0 ? (
          <FaLongArrowAltUp style={{ color: 'green' }} /> 
        ) : (
          <FaLongArrowAltDown style={{ color: 'red' }} /> 
        )}
        {`${rowData?.monthPercentageChange}%`}
      </span>
    )}
    style={{ 
      width: '20%', 
      textAlign: 'center' 
    }} 
  />
    
      <Column 
        header="Actions" 
        body={actionTemplate} 
        style={{ 
          width: '10%', 
         
    

        }} 
      />
    </DataTable>
    
  </div>
  
  <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem  onClick={() =>confirmDelete() }>Delete</MenuItem>
</Menu>
 <ConfirmationModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onSubmit={handleConfirmDelete}
      title="Are you sure you want to delete this burn rate?"
      btnLoader={btnLoader}
    />
    </>
  );
}
