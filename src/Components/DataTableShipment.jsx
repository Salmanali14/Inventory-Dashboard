import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PaginatorStyles.css';
import { IoMdMore } from 'react-icons/io';
import img from "../Images/Rectangle 35.png";
import { Box, Menu, MenuItem, Modal } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Modal/ConfirmationModal';
import AddBoxModal from '../Modal/AddBoxModal';
import { IoCloseCircleSharp, IoQrCodeSharp } from 'react-icons/io5';
import html2canvas from 'html2canvas';
import QRCodeWithFrame from './QrCode';
import AddMachineModal from '../Modal/AddMachineModal';

export default function DataTableShipment({ sortOption,filteredAllInventory, setGetAllInventory,}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const [openModal, setOpenModal] = useState(false); 
    const [btnLoader, setBtnLoader] = useState(false);
    const role = localStorage.getItem("role");
    const [imageModalOpen, setImageModalOpen] = useState(false); 
    const [clickedImage, setClickedImage] = useState(null);


  const [singleInventryData, setSingleInventryData] = useState(null); 
  const confirmDelete = (data) => {
    setOpenModal(true);
    handleMenuClose(); 
  };
console.log(singleInventryData?.id)
    const handleConfirmDelete = async () => {
      setBtnLoader(true);
      try {
        const response = await axios.delete(`${apiBaseUrl}shipment/delete/${singleInventryData?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          setOpenModal(false);
          
          setGetAllInventory((prevInventry) => {
            const updateInventory = prevInventry.filter((cust) => cust.id !== singleInventryData?.id);
            setGetAllInventory(updateInventory); // Ensure filteredCustomer stays in sync
            return updateInventory;
          })
          setBtnLoader(false);
        }
      } catch (error) {
        setBtnLoader(false);
     
      }
    };
    const handleMenuClick = (event,data) => {
        setSingleInventryData(data);
        setAnchorEl(event.currentTarget);
        
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Sort the data based on the selected option
    const sortedData = [...filteredAllInventory].sort((a, b) => {
        switch (sortOption) {
            case 'quantity':
                return a.quantity - b.quantity;
            case 'machine':
                return (a.machine || '').localeCompare(b.machine || '');
            case 'category':
                return (a.category || '').localeCompare(b.category || '');
            case 'updatedDate':
            default:
                return new Date(b.updateAt) - new Date(a.updateAt);
        }
    });

    // Image column template
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


    // Action buttons for each row
    const actionTemplate = (rowData) => {
        return (
            <div className='flex justify-center items-center'>
                <IoMdMore onClick={(event) => handleMenuClick(event, rowData)}  className='text-[25px] cursor-pointer' />
            </div>
        );
    };



    const timestampToDate = (timestamp) => {

        timestamp = parseInt(timestamp) * 1000;
        
        const date = new Date(timestamp);
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${month}/${day}/${year}`; 
      };
      
    const updatedTemplate = (rowData) => {
        return (
            <div className="text-center">
                <p className="text-sm text-gray-800 font-medium">{rowData?.updatedBy}</p>
                <p className="text-sm text-gray-600">{timestampToDate(rowData?.updateAt)}</p>
            </div>
        );
    };
    


    const screenWidth =window.innerWidth
 const boxNameTemplate = (rowData) => {
    const maxLength = 15;
    const boxName = rowData.category || 'N/A'; // Default to 'N/A' if boxName is empty
    return boxName.length > maxLength ? `${boxName.substring(0, maxLength)}...` : boxName;
};

    return (
        <>
        <div className=' w-[100%]   overflow-hidden' >
            <div className="card relative mt-5 overflow-y-scroll h-[60vh]">
                <DataTable
                    value={sortedData}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[10, 20]}
                    tableStyle={{
                     minWidth:screenWidth>450 ? '100%' :"900px",
                        marginBottom: '20px',
                        fontSize: '0.85rem',
                        textAlign: 'center'
                    }}
                >
                    <Column
                        field="category"
                        header="Category"
                        body={boxNameTemplate}
                        style={{
                            width: '15%',
                            textAlign: 'center'
                        }}
                    />
                    <Column
                        field="quantity"
                        header="Quantity"
                        style={{
                            width: '15%',
                            textAlign: 'center'
                        }}
                    />
                   
                    <Column
                        header="Image"
                      body={(rowData) => imageTemplate(rowData, 'image')} 
                        style={{
                            width: '15%',
                            textAlign: 'center',
                            cursor:'pointer'
                        }}
                    />
                    <Column header="Updated By" body={updatedTemplate} style={{ width: '20%', textAlign: 'center' }} />
                   {role === "admin" &&
                    <Column
                        header="Actions"
                        body={actionTemplate}
                        style={{
                            width: '15%',
                        
                        }}
                    />
}
                </DataTable>
               
            </div>

            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
 {role === "admin" &&
              <MenuItem onClick={() => confirmDelete(singleInventryData)}>Delete</MenuItem>}
            </Menu>
              <ConfirmationModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onSubmit={handleConfirmDelete}
      title="Are you sure you want to delete this Inventory?"
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
