import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import './QrStyles.css'; // Import the CSS file
import { Box, Button, Modal, Typography } from '@mui/material';
import AddBoxModal from '../Modal/AddBoxModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import AddMachineModal from '../Modal/AddMachineModal';
import { IoClose } from 'react-icons/io5';

const Test = () => {
  const [data, setData] = useState(null); // Store the data from the API
  const [id, setId] = useState(null); // Store the scanned ID
  const [open, setOpen] = useState(false); 
  const [open2, setOpen2] = useState(false); 
  const [scanning, setScanning] = useState(true); // Control whether scanning is active
  const [editMode, setEditMode] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [selectInventry, setSelectInventry] = useState(false);
  const [alertModal, setAlertModal] = useState(false); // Alert modal for not found
  const [hasScannedSuccessfully, setHasScannedSuccessfully] = useState(false); // Flag to track successful scans
  const [isProcessing, setIsProcessing] = useState(false); // Flag to prevent multiple scans

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");

  // Function to fetch the inventory data based on the scanned ID
  const handleGetSingleInventory = async (boxId) => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    if (!boxId) {
      setAlertModal(true); 
      return;
    }

    // Set processing flag to true
    setIsProcessing(true);

    try {
      const response = await axios.get(`${apiBaseUrl}inventory/byBoxId/${boxId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        setData(response?.data?.data?.inventoryResponse);
        setAlertModal(false); // Close alert modal if successful
        setHasScannedSuccessfully(true); 
        setScanning(false); 
        setEditMode(true);
        handleOpen();
        
      } else {
        setAlertModal(true); // Open alert modal for not found
      }
    } catch (error) {
      console.error(error);
      setAlertModal(true); // Open alert modal for errors
    } finally {
      // Reset processing flag
      setIsProcessing(false);
    }
  };

  let handleSelectInventry =()=>{
    setSelectInventry(!selectInventry)
  }
  // Open modal
  const handleOpen = () => {
    setSelectInventry(true);
    setScanning(false); // Stop scanning when the modal opens
  };

  // Close modal and reset scanning
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setData(null);
    setId(null); // Reset the scanned ID
    setScanning(true); // Resume scanning
    setHasScannedSuccessfully(false);
    setEditMode(false);
    setSelectInventry(false)
  };

  // Handle alert modal open/close
  const handleAlertModalClose = () => {
    setSelectInventry(false)
    setAlertModal(false);
    setId(null); // Reset the scanned ID
    setScanning(true); // Resume scanning
  };

  return (
    <>
      <div className="qr-container">
        {scanning && !hasScannedSuccessfully && (
          <QrReader
            onResult={(result, error) => {
              if (!!result && !isProcessing) { // Check if not processing
                const scannedId = result?.text;
                if (scannedId !== id) { 
                  setId(scannedId); 
                  handleGetSingleInventory(scannedId); 
                }
              }
              if (!!error) {
                console.info(error);
              }
            }}
            className="qr-reader"
            constraints={{ facingMode: 'environment' }}
          />
        )}
      </div>

      <AddBoxModal
        addBoxModal={open}
        singleInventryData={data}
        handleAddBoxModal={handleClose}
        editMode={editMode}
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
      <AddMachineModal
      addBoxModal={open2}
      singleInventryData={data}
      handleAddBoxModal={handleClose}
      editMode={editMode}
      updateData={updateData}
      setUpdateData={setUpdateData}
    />
      <Modal open={alertModal} onClose={handleAlertModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: "450px",
            width: "240px",
            bgcolor: '#fff',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            maxHeight: "80vh",
            overflow: "scroll",
            boxShadow: 24,
            paddingTop: "20px"
          }}
        >
          <div className="flex justify-center items-center flex-col">
            <p className='font-bold text-black'>Error</p>
            <p className='font-500 text-black mt-1'>Invalid QR Code!</p>
            <button onClick={handleAlertModalClose} className='pt-1 pb-1 pl-7 pr-7 bg-[#3045A3] rounded-md mb-5 mt-2'>
              OK
            </button>
          </div>
        </Box>
      </Modal>
      <Modal open={selectInventry} onClose={handleSelectInventry}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: "450px",
          width: "240px",
          bgcolor: '#fff',
          color: "black",
          outline: "none",
          borderRadius: "10px",
          maxHeight: "80vh",
          overflow: "scroll",
          boxShadow: 24,
          paddingTop: "20px"
        }}
      >
        <div className="flex justify-center items-center flex-col ">
        <div onClick={handleClose} className='flex cursor-pointer absolute right-1 top-1 justify-center items-center'>
        <IoClose className='text-[#3045A3] text-[20px] font-bold' />
      </div>
          <div  className='font-bold  text-black'>
            Choose an Action
          </div>
          <button onClick={()=> setOpen(true)} className=' bg-[#3045A3] h-[35px] w-[70%] rounded-lg text-[12px] text-white mt-4'>
            Update Box
          </button>
          <button onClick={()=> setOpen2(true)} className='h-[35px] w-[70%] rounded-lg text-[12px] bg-[#3045A3] text-white mt-4 mb-6'>
            Update Machine
          </button>
        </div>
      </Box>
    </Modal>
    </>
  );
};

export default Test;
