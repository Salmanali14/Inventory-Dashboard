import { Box, Modal, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillImageFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';

export default function AddStockModal({ handleStockModal, addStockModal,setUpdateData,updateData }) {
  const [btnLoader, setBtnLoader] = useState(false);
  const [formData, setFormData] = useState({
    boxName: '',
    quantity: '',
    storageImg: null,
  });
  const [imageName, setImageName] = useState('');

  const handleUpload = (event) => {
    setFormData({
      ...formData,
      storageImg: event.target.files[0],
    });
    setImageName(event.target.files[0].name);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleCreateStock = async () => {
    if (!formData.boxName) {
      toast.error("Please select a category!");
      return;
    }
    if (!formData.quantity) {
      toast.error("Quantity is required!");
      return;
    }

    setBtnLoader(true);
    const data = new FormData();
    data.append('category', formData?.boxName);
    data.append('quantity', formData?.quantity);
    if (formData.storageImg) {
      data.append('image', formData.storageImg); // Attach in-machine image
    }
    try {
      const response = await axios.post(`${apiBaseUrl}shipment/create`, data , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response?.data?.status === true) {
        setBtnLoader(false);
        setFormData({
          boxName: '',
          quantity: '',
          storageImg: "",
        });
        toast.success(response?.data?.message);
        setUpdateData(!updateData); 
        setImageName('');
        handleStockModal(); // Close the modal after success
      }
    } catch (error) {
      setBtnLoader(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
console.log(formData.storageImg)
  const handleCloseModal = () => {
    handleStockModal();
    setImageName('');
    setFormData({
      boxName: '',
      quantity: '',
      storageImg: null,
    });
  };

  return (
    <Modal open={addStockModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '95%',
          maxWidth: '430px',
          bgcolor: '#fff',
          borderRadius: '10px',
          p: 3,
          boxShadow: 24,
        }}
      >
        <div className='flex justify-between items-center mb-4'>
          <p className='text-[#3045A3] text-[16px] font-bold'>Input Stock</p>
          <IoClose onClick={handleCloseModal} className='text-[#3045A3] text-[25px] cursor-pointer' />
        </div>

        <div className='flex flex-col mb-4'>
          <label className='font-[500] text-[#4B5563] mb-1'>Category</label>
          <select
            name="boxName"
            value={formData.boxName}
            onChange={handleChange}
            className='w-full h-[40px] border border-[#AEADAD] rounded-md px-2 bg-white'
          >
            <option value="" disabled>Select Category</option>
            <option value="Blind Box">Blind Box</option>
            <option value="Figurine">Figurine</option>
            <option value="Gachapon">Gachapon</option>
            <option value="Gundam">Gundam</option>
            <option value="Plushie">Plushie</option>
            <option value="Misc">Misc</option>
          </select>
        </div>

        <div className='flex flex-col mb-4'>
          <label className='font-[500] text-[#4B5563] mb-1'>Quantity</label>
          <TextField
            type='number'
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className='w-full'
            variant="outlined"
            size="small"
          />
        </div>

        <div className='flex flex-col '>
          <label className='font-[500] text-[#4B5563] mb-1'>Product Image</label>
          <div className='flex flex-col justify-center items-center border border-[#AEADAD] h-[120px] rounded-lg bg-[#F4F4F4]'>
            <BsFillImageFill className='text-[35px] text-black' />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload-photos"
              onChange={handleUpload}
            />
            <label
              htmlFor="upload-photos"
              className='flex justify-center items-center font-bold w-[110px] text-[11px] mt-2 cursor-pointer'
            >
              Upload Photos
            </label>
            {imageName && <p className='text-[12px] text-gray-500 mt-1'>{imageName}</p>}
          </div>
        </div>
        <button onClick={handleCreateStock} className='w-[100%] mt-5 rounded-lg h-[40px] bg-[#3045A3] text-white'>
          {btnLoader ? <ClipLoader size={24} color='white' className='mt-[7px]' /> : "Create Stock"}
        </button>
      </Box>
    </Modal>
  );
}
