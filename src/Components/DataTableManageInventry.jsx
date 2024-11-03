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

export default function DataTableManageInventory({ sortOption,filteredAllInventory, setGetAllInventory,editMode,setEditMode,setUpdateData,updateData}) {
    const [viewOrder, setViewOrder] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const [openModal, setOpenModal] = useState(false); 
    const [btnLoader, setBtnLoader] = useState(false);
    const [inventryId, setInventryId] = useState(null);
    let [addBoxModal, setAddBoxModal] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false); 
    const [clickedImage, setClickedImage] = useState(null);
    let [addMachineModal, setMachineModal] = useState(false);
    const role = localStorage.getItem("role");
    const qrRef = useRef(null);
    let handleAddBoxModal = () => {
        setAddBoxModal(!addBoxModal);
        setEditMode(true);
        handleMenuClose();
        setSingleInventryData(singleInventryData);
    };

    let handleAddMachine = () => {
        setMachineModal(!addMachineModal);
        setEditMode(true);
        handleMenuClose();
        setSingleInventryData(singleInventryData);
    };
  const [singleInventryData, setSingleInventryData] = useState(null); 
  const confirmDelete = (data) => {
    setOpenModal(true);
    handleMenuClose(); 
  };

    const handleConfirmDelete = async () => {
      setBtnLoader(true);
      try {
        const response = await axios.delete(`${apiBaseUrl}inventory/delete/${singleInventryData?.id}`, {
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
            case 'boxName':
                return (a.boxName || '').localeCompare(b.boxName || '');
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

    // Date template for updated date
    const dateTemplate = (rowData) => {
        return <span>{rowData.updatedDate}</span>;
    };

    // Action buttons for each row
    const actionTemplate = (rowData) => {
        return (
            <div className='ml-3'>
                <IoMdMore onClick={(event) => handleMenuClick(event, rowData)}  className='text-[25px] cursor-pointer' />
            </div>
        );
    };


   
    // Serial number template
    const serialNumberTemplate = (rowData, { rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
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
    
    const handleDownloadQR = (id) => {
    setInventryId(id); 
    setTimeout(() => {
      if (qrRef.current) {
        html2canvas(qrRef.current).then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'QRCode.png';
          link.click();
        });
      }
    }, 100); 
  };
  const qrCodeTemplate = (rowData) => {
        return (
            <div className='flex justify-center'>
                <IoQrCodeSharp onClick={() => handleDownloadQR(rowData?.boxId)} className="text-[25px] cursor-pointer" />
            </div>
        );
    };

    const screenWidth =window.innerWidth
 const boxNameTemplate = (rowData) => {
    const maxLength = 15;
    const boxName = rowData.boxName || 'N/A'; // Default to 'N/A' if boxName is empty
    return boxName.length > maxLength ? `${boxName.substring(0, maxLength)}...` : boxName;
};
const machineTemplate = (rowData) => {
    const maxLength = 20;
    const machine = rowData.machine || 'N/A'; // Default to 'N/A' if machine is empty
    return machine.length > maxLength ? `${machine.substring(0, maxLength)}...` : machine;
};

    return (
        <>
        <div className=' w-[100%]   overflow-hidden'>
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
                        field="boxName"
                        header="Box"
                        body={boxNameTemplate}
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
                        header="Quantity"
                        style={{
                            width: '10%',
                            textAlign: 'center'
                        }}
                    />
                    <Column
                        field="machine"
                        body={machineTemplate}
                        header="Machine"
                        style={{
                            width: '15%',
                            textAlign: 'center'
                        }}
                    />
                    <Column
                        header="Machine Img"
                        body={(rowData) => imageTemplate(rowData, 'machineImg')}
                        style={{
                            width: '10%',
                            textAlign: 'center',
                        }}
                    />
                    <Column header="Updated By" body={updatedTemplate} style={{ width: '20%', textAlign: 'center' }} />
                    <Column
                        header="Qr Code"
                        body={qrCodeTemplate} 
                        style={{
                            width: '10%',
                            textAlign: 'center',
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
    <div  className='w-[100%] max-w-[300px] mt-[10000px]  rounded-2xl flex justify-center'>
   <QRCodeWithFrame   qrRef={qrRef} value={inventryId ? inventryId : ""} size={200} />
 </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleAddBoxModal()}>Edit Box</MenuItem>
                <MenuItem onClick={() => handleAddMachine()}>Edit Machine</MenuItem>
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
           <AddBoxModal editMode={editMode}  updateData={updateData} setUpdateData={setUpdateData} addBoxModal={addBoxModal} handleAddBoxModal={handleAddBoxModal} singleInventryData={singleInventryData} />
           <AddMachineModal editMode={editMode}  updateData={updateData} setUpdateData={setUpdateData} addBoxModal={addMachineModal} handleAddBoxModal={handleAddMachine} singleInventryData={singleInventryData} />
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
