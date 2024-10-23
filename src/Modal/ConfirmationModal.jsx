import React from 'react';
import { Modal, Box } from '@mui/material';
import { ClipLoader } from 'react-spinners';

const ConfirmationModal = ({ open, onClose, onSubmit, title, btnLoader }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',maxWidth:"430px",
        width: "90%", bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px'
      }}>
        <h2>{title}</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button onClick={onClose} className='w-[80px] mt-5 rounded-lg h-[35px] bg-[#000] mr-3 text-white'>
            No
          </button>
          <button onClick={onSubmit} className='w-[80px] mt-5 rounded-lg h-[35px] bg-[#3045A3] text-white'>
            {btnLoader ? <ClipLoader size={20} color='white' className='mt-[7px]' /> : "Yes"}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
