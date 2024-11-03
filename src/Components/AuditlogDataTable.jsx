import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PaginatorStyles.css';
import { IoMdMore } from 'react-icons/io';
import img from "../Images/Rectangle 35.png"
import { Box, Menu, MenuItem, Modal } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { IoCloseCircleSharp } from 'react-icons/io5';
// Dummy image for storage and machine columns

export default function AuditlogDataTable(filteredAllAuditLog,setGetAllAuditlog) {
  const [anchorEl, setAnchorEl] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const [openModal, setOpenModal] = useState(false); 
  const [btnLoader, setBtnLoader] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false); 
  const [clickedImage, setClickedImage] = useState(null);
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
      <div className='ml-6'>
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
    }else if (rowData.status === 'storage') {
      buttonText = 'Storage Image';
      buttonColor = 'bg-black';
    }else if (rowData.status === 'machine') {
      buttonText = 'Machine Image';
      buttonColor = 'bg-black';
    }
  
    return (
      <button
        className={`w-[120px]  text-white ${buttonColor}`}
        style={{padding:'1px 5px',borderRadius:'4px'}}
      >
        {buttonText}
      </button>
    );
  };
  console.log(filteredAllAuditLog)

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
  
    return `${month}/${day}/${year}`; 
  };
  const imageTemplate = (rowData, field) => {
    return rowData[field] ? (
        <div className='flex justify-center items-center'>
            <img
                src={rowData[field]}
                alt="item"
                className="w-12 h-12 object-cover cursor-pointer"
                onClick={() => {
                    setClickedImage(rowData[field]);
                    setImageModalOpen(true);
                }}
            />
        </div>
    ) : (
        <span className="">N/A</span>
    );
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
          width: '13%', 
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
          width: '12%', 
          textAlign: 'center' // Center align header and cell text
        }} 
      />
      <Column 
        field="newQty" 
        header="Changed Qty" 
        style={{ 
          width: '12%', 
          textAlign: 'center' // Center align header and cell text
        }} 
      />
      <Column
      header="Storage Img"
      body={(rowData) => imageTemplate(rowData, 'storageImg')}
       style={{
          width: '12%',
          textAlign: 'center',
      }}
  />
  <Column
  header="Machine Img"
  body={(rowData) => imageTemplate(rowData, 'machineImg')}
  style={{
      width: '12%',
      textAlign: 'center',
  }}
/>
      <Column 
        header="Status" 
    body={statusTemplate}
        style={{ 
          width: '13%', 
          textAlign: 'center' // Center align header and cell text
        }} 
      />
      <Column 
      header="Date" 
      body={updatedTemplate}
      style={{ 
        width: '12%', 
        textAlign: 'center' // Center align header and cell text
      }} 
    />
    {role === "admin" &&
      <Column 
        header="Actions" 
        body={actionTemplate} 
        style={{ 
          width: '8%', 
        

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
    <Modal  open={imageModalOpen} onClose={() => setImageModalOpen(false)}>
    <Box           onClick={() => setImageModalOpen(false)}  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <IoCloseCircleSharp className='absolute top-2 right-2 text-[35px]'/>
        {clickedImage && (
            <img src={clickedImage} alt="Clicked Item" style={{ maxHeight: '90%', maxWidth: '90%' }} />
        )}
    </Box>
</Modal>
    </>
  );
}
