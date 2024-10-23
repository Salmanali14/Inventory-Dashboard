import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PaginatorStyles.css';
import { IoMdMore } from 'react-icons/io';
import img from "../Images/Rectangle 35.png"
import { Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Modal/ConfirmationModal';
// Dummy image for storage and machine columns

export default function AuditlogDataTable(filteredAllAuditLog,setGetAllAuditlog) {
  const [anchorEl, setAnchorEl] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const [openModal, setOpenModal] = useState(false); 
  const [btnLoader, setBtnLoader] = useState(false);
const [singleAuditLogData, setSingleAuditLogData] = useState(null); 
const confirmDelete = (data) => {
  setOpenModal(true);
  handleMenuClose(); 
};

  const handleConfirmDelete = async () => {
    setBtnLoader(true);
    try {
      const response = await axios.delete(`${apiBaseUrl}log/delete/${singleAuditLogData}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        setOpenModal(false);
        
        filteredAllAuditLog?.setGetAllAuditlog((prevAudit) => {
          const udpatedLog = prevAudit.filter((cust) => cust.id !== singleAuditLogData);
          filteredAllAuditLog?.setGetAllAuditlog(udpatedLog); 
          return udpatedLog;
         
        })
        setBtnLoader(false);
      }
    } catch (error) {
      setBtnLoader(false);
   
    }
  };
 

  const handleMenuClick = (event,data) => {
        setSingleAuditLogData(data?.id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  // Action buttons for each row
  const actionTemplate = (rowData) => {
    return (
      <div className='ml-12'>
        <IoMdMore onClick={(event) => handleMenuClick(event, rowData)} className='text-[25px] cursor-pointer' />
        </div>
   
    );
  };
  const statusTemplate = (rowData) => {
    // Determine the button text and background color based on rowData.status
    let buttonText = '';
    let buttonColor = '';
  
    if (rowData.status === 'add') {
      buttonText = 'Add';
      buttonColor = 'bg-[#008000]';
    } else if (rowData.status === 'less') {
      buttonText = 'Subtract';
      buttonColor = 'bg-[red]';
    } else if (rowData.status === 'none') {
      buttonText = 'None';
      buttonColor = 'bg-black';
    }
  
    return (
      <button
        className={`w-[60px] text-white ${buttonColor}`}
      >
        {buttonText}
      </button>
    );
  };
  

  // Serial number template
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return <span>{rowIndex + 1}</span>;
  };
  const screenWidth =window.innerWidth
  const timestampToDate = (timestamp) => {

    timestamp = parseInt(timestamp) * 1000;
    
    const date = new Date(timestamp);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`; 
  };

const updatedTemplate = (rowData) => {
  
    return (
        <div className="text-center">
            <p className="text-sm text-gray-600">{timestampToDate(rowData?.createdAt)}</p>
        </div>
    );
};
const userNameTemplate = (rowData) => {
  const maxLength = 18;
  const userName = rowData.userName || ''; 
  return userName.length > maxLength ? `${userName.substring(0, maxLength)}...` : userName;
};
const boxNameTemplate = (rowData) => {
  const maxLength = 18;
  const boxName = rowData.boxName || ''; 
  return boxName.length > maxLength ? `${boxName.substring(0, maxLength)}...` : boxName;
};
const role = localStorage.getItem("role");
  return (

    <>
    <div className="card relative mt-10 overflow-y-scroll h-[60vh]">
    <DataTable
    value={filteredAllAuditLog?.filteredAllAuditLog?.slice().reverse()}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 20]}
      tableStyle={{ 
      minWidth:screenWidth>450 ? '100%' :"700px",
        marginBottom: '20px', 
        fontSize: '0.85rem',
        textAlign: 'center' 
      }}
    >
     
      <Column 
        field="userName" 
        header="Name" 
        body={userNameTemplate}
        style={{ 
          width: '15%', 
          textAlign: 'center' 
        }} 
      />
      <Column 
        field="boxName" 
        body={boxNameTemplate}
        header="Box" 
        style={{ 
          width: '10%', 
          textAlign: 'center' // Center align header and cell text
        }} 
      />
     
      <Column 
        field="prevQty" 
        header="Previous Qty" 
        style={{ 
          width: '10%', 
          textAlign: 'center' // Center align header and cell text
        }} 
      />
      <Column 
        field="newQty" 
        header="Changed Qty" 
        style={{ 
          width: '10%', 
          textAlign: 'center' // Center align header and cell text
        }} 
      />
   
      <Column 
        header="Status" 
    body={statusTemplate}
        style={{ 
          width: '10%', 
          textAlign: 'center' // Center align header and cell text
        }} 
      />
      <Column 
      header="Date" 
      body={updatedTemplate}
      style={{ 
        width: '10%', 
        textAlign: 'center' // Center align header and cell text
      }} 
    />
    {role === "admin" &&
      <Column 
        header="Actions" 
        body={actionTemplate} 
        style={{ 
          width: '10%', 
        

        }} 
      />
    }
    </DataTable>
 
  </div>
  
  <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>

  <MenuItem onClick={() =>confirmDelete() }>Delete</MenuItem>
</Menu>
     <ConfirmationModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onSubmit={handleConfirmDelete}
      title="Are you sure you want to delete this Audit log?"
      btnLoader={btnLoader}
    />
    </>
  );
}
