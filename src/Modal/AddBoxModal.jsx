import { Box, Modal, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsFillImageFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { ClipLoader } from 'react-spinners';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
export default function AddBoxModal({ handleAddBoxModal, addBoxModal,setUpdateData,updateData,singleInventryData,editMode,editInventry }) {
  const [getAllInventory, setGetAllInventory] = useState([]);
  const [selectedBox, setSelectedBox] = useState('');
  const [selectedBoxData, setSelectedBoxData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleGetAllInventory = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}inventory/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        // Filter out inventories where boxName is empty or undefined
        const filteredInventories = response?.data?.data?.inventoriesResponse?.filter(
          (inventory) => inventory?.boxName && inventory.boxName.trim() !== ""
        );
  
        setGetAllInventory(filteredInventories);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    handleGetAllInventory();
  }, []);

  const handleBoxChange = (event,data) => {
    console.log(data)
    setSelectedBoxData(data)
    setSelectedBox(event.target.value);
    setIsSelectOpen(false)
    setSearchTerm(''); 
  };

  const handleSelectBox = (data) => {
    setSelectedBoxData(data)
//  setIsSelectOpen(false)
  };
  const filteredInventory = getAllInventory?.filter(inventory =>
    inventory?.boxName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const [formData, setFormData] = useState({
    boxName: '',
    quantity: '',
    storageImg: null, 
  });
  useEffect(()=>{
    setFormData({
      boxName: '',
      quantity: '',
      storageImg: null,
    });
  },[updateData])
  const [updateType, setUpdateType] = useState('add'); // For Add or Subtract
  const [updateQuantity, setUpdateQuantity] = useState(''); // Quantity input for adding or subtracting
  const handleQuantityUpdate = () => {
   
  };

  useEffect(()=>{
    if(editMode){
    setFormData({
      boxName:singleInventryData?.boxName,
      quantity:singleInventryData?.quantity,
      storageImg:singleInventryData?.storageImg,
    })
  }
  },[singleInventryData,editMode])
  useEffect(()=>{
    if(editInventry){
    setFormData({
      boxName:selectedBoxData?.boxName,
      quantity:selectedBoxData?.quantity,
      storageImg:selectedBoxData?.storageImg,
    })
  }
  },[selectedBoxData,editInventry])
  console.log(selectedBoxData)
  const [btnLoader, setBtnLoader] = useState(false);
  const [imageName, setImageName] = useState(""); 


  const handleUpload = (event) => {
    setFormData({
      ...formData,
      storageImg: event.target.files[0], // Save the selected image file
    });
    setImageName(event.target.files[0].name); // Show the image name
  };

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateInventory = async () => {

    if(!formData?.boxName){
      toast.error("Box Name is required!")
      return;
    }
    if(updateQuantity > 0){
      toast.error("Quantity must be a positive Number!")
      return;
    }
    if(!formData?.quantity){
      toast.error("Quantity is required!")
      return;
    }
    if (!Number.isInteger(Number(formData.quantity)) || formData.quantity <= 0) {
      toast.error("Quantity must be a positive integer!");
      return;
    }
    setBtnLoader(true);
    const data = new FormData();
    data.append('boxName', formData?.boxName);
    data.append('quantity', formData?.quantity);
    if (formData.storageImg) {
      data.append('storageImg', formData.storageImg); // Attach image file
    }
 

    try {
      const response = await axios.post(`${apiBaseUrl}inventory/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
      handleCloseModal(); 
      setUpdateData(!updateData)
      setMachineImage(null)
      setImageName(null)
      setBtnLoader(false);
      setFormData({
        boxName: '',
        quantity: '',
        storageImg: null,
      });
      
      toast.success(response?.data?.message);
      if (response?.data?.status === true) {
      
        // setMachineImage(null)
        // setImageName(null)
        // // handleCloseModal(); 
        // setUpdateData(!updateData)
      }
    } catch (error) {
      setBtnLoader(false);
      // toast.error(error?.response?.data?.message);
    }
  };
  console.log(updateQuantity)
  const handleUpdateInventry = async () => {
  
    if (!formData?.boxName) {
        toast.error("Box Name is required!");
        return;
    }
    if (updateQuantity < 0) {
      toast.error("Quantity must be a positive number!");
      return;
    }
    
    if (formData?.quantity < 0) {
        toast.error("Quantity is required!");
        return;
    }
    if (!Number.isInteger(Number(formData.quantity)) || formData.quantity < 0) {
        toast.error("Quantity must be a non-negative integer!");
        return;
    }

    if (isNaN(updateQuantity)) {
        toast.error('Please enter a valid quantity!');
        return;
    }

    const currentQuantity = Number(formData.quantity);
    const newQuantity =
        updateType === 'add'
            ? currentQuantity + Number(updateQuantity)
            : currentQuantity - Number(updateQuantity);

    // Allow quantity to be zero, but not negative
    if (updateType === 'subtract' && newQuantity < 0) {
        toast.error('Please subtract less than the current quantity!');
        return; // Exit the function if the condition is met
    }

    const data = new FormData();
    data.append('boxName', formData?.boxName);
    data.append('quantity', newQuantity >= 0 ? newQuantity : 0); // Ensure quantity is at least 0

    // Attach image files if they exist
    if (formData.storageImg && imageName) {
        data.append('storageImg', formData.storageImg); // Attach storage image file
    }
    let id =editInventry? selectedBoxData?.id : singleInventryData?.id

    setBtnLoader(true);
    
    setTimeout(async () => {
        try {
            const response = await axios.post(
                `${apiBaseUrl}inventory/update/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
   setUpdateData(!updateData);
            handleCloseModal();
            // Check response status
          
                toast.success(response?.data?.message);
            
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setBtnLoader(false); // Ensure button loader is reset in both success and error cases
        }
    }, 100);
};



  let handleCloseModal = () => {
    handleAddBoxModal();
    setImageName(null); 
    setFormData({
      boxName: '',
      quantity: '',
      storageImg: "",
    });
    setSelectedBoxData("")
    setSelectedBox("")
    setUpdateQuantity("")
};


  return (
    <>
      <Modal open={addBoxModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: innerWidth > 430 ? "530px" : "430px",
            width: "95%",
            bgcolor: '#fff',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            maxHeight: "90vh",
            overflow: "scroll",
            boxShadow: 24,
            paddingTop: "20px"
          }}
        >
          <div className='flex justify-center flex-col items-center w-[100%]'>
            <div className='flex w-[100%]'>
              <div className='flex justify-center items-center w-[100%]'>
                <div className='flex w-[90%] justify-between items-center'>
                  <p className='text-[#3045A3] text-[16px] font-bold'>{editMode || editInventry ? "Update Box" :"Create Box"}</p>
                  <div className='flex justify-center items-center'>
                    <div onClick={handleCloseModal} className='flex cursor-pointer justify-center items-center'>
                      <IoClose className='text-[#3045A3] text-[25px] font-bold' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center flex-col mt-5 w-[100%]'>
            {editInventry &&    <label className='font-[500] w-[90%] text-[#4B5563] mb-1'>Select Box <span className='text-red-500 text-[20px] '></span></label>}
      {editInventry && (
        <div style={{ width: '90%', marginBottom: '20px' }}>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              width: '100%',
            }}
          >
            {/* Select box as a clickable div */}
            <div
              style={{
                height: "40px",
                border: '1px solid #ccc',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
              onClick={() => setIsSelectOpen(prev => !prev)} // Toggle dropdown
            >
              <span style={{ color: selectedBox ? 'black' : '#888' }}>
                {selectedBox || "Select Box"}
              </span>
              {/* Arrow icon */}
              <span style={{ marginLeft: 'auto' }}>▼</span>
            </div>

            {/* Dropdown list */}
   
            {isSelectOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  zIndex: 1,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {/* Search input inside dropdown */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    boxSizing: 'border-box',
                   
                    outline: 'none',
                    height: '40px',
                    color:"#000",
                    borderBottom:"1px solid #ccc"
                  }}
                />
                {filteredInventory.length === 0 && (
                  <div style={{ padding: '10px' }}>No options found</div>
                )}
                {filteredInventory.map((inventory) => (
                  <div
                    key={inventory.id}
                    onClick={() => handleBoxChange({ target: { value: inventory.boxName } }, inventory)}  // Pass both value and inventory
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      backgroundColor: selectedBox === inventory.boxName ? '#eee' : 'white',
                      color: 'black',
                    }}
                  >
                    {inventory?.boxName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
              <div className='flex justify-between items-center flex-wrap w-[90%]'>
                <div className='w-[48%] flex flex-col justify-start'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Box <span className='text-red-500 text-[20px] '>*</span></label>
                  <input
                    type='text'
                    name="boxName"
                    value={formData?.boxName}
                    onChange={handleChange}
                    className='w-[100%] h-[40px] outline-none pl-3 pr-3 text-black bg-[#F2F2F2] border-[#AEADAD] border rounded-md'
                  />
                </div>
                {(editMode || editInventry)&&
                <div className='w-[48%] flex flex-col justify-start'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Quantity  <span className='text-red-500 text-[20px] '>*</span></label>
                  <input
                    type='text'
                    name="quantity"
                    readOnly
                    value={formData?.quantity}
                    onChange={handleChange}
                    className='w-[100%] h-[40px] bg-[#F2F2F2] outline-none pl-3 pr-3 text-black border-[#AEADAD] border rounded-md'
                  />
                </div>
}
                  {(!editMode && !editInventry) &&
                <div className='w-[48%] flex flex-col justify-start'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Quantity  <span className='text-red-500 text-[20px] '>*</span></label>
                  <input
                    type='text'
                    name="quantity"
                   
                    value={formData?.quantity}
                    onChange={handleChange}
                    className='w-[100%] h-[40px] bg-[#F2F2F2] outline-none pl-3 pr-3 text-black border-[#AEADAD] border rounded-md'
                  />
                </div>
}
                  {(editMode || editInventry) &&
                  <>
                     <div className='flex gap-5 mt-3'>
                <label className='text-black flex justify-center items-cente '> 
                  <input
                    type='radio'
                    value='add'
                    checked={updateType === 'add'}
                    onChange={() => setUpdateType('add')}
                    className='mr-1'
                  />{' '}
                  Add
                </label>
                <label className='text-black flex justify-center items-center'>
                  <input
                    type='radio'
                    value='subtract'
                    checked={updateType === 'subtract'}
                    onChange={() => setUpdateType('subtract')}
                     className='mr-1'
                  />{' '}
                  Subtract
                </label>
              </div>
              <input
                type='number'
                value={updateQuantity}
                onChange={(e) => setUpdateQuantity(e.target.value)}
                className='w-[100%] h-[40px] outline-none pl-3 pr-3 text-black bg-[#F2F2F2] border-[#AEADAD] border rounded-md mt-2'
                placeholder='Enter quantity'
              />
              </>
                  }
              
                <div className='w-[48%] flex flex-col justify-start'>
                  <h1 className='font-[500] text-[#4B5563] mt-3 mb-1'>Product Image:</h1>
                  <div className='flex justify-center flex-col border items-center w-[100%] border-[#AEADAD]  h-[120px] rounded-lg bg-[#F4F4F4]'>
                    <BsFillImageFill className='text-[35px] text-black text-main' />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="upload-photos"
                      onChange={handleUpload}
                    />
                    <label
                      htmlFor="upload-photos"
                      className='flex justify-center text-black items-center font-bold w-[110px] text-[11px] mt-2 text-main h-[27px] cursor-pointer'
                    >
                      Upload Photos
                    </label>
                    {!imageName &&
                    <>
                    {singleInventryData?.storageImg && <p className='text-[12px] w-[90%] overflow-hidden text-gray-500 mt-1'>{singleInventryData?.storageImg}</p>}
                      {selectedBoxData?.storageImg && <p className='text-[12px] w-[90%] overflow-hidden text-gray-500 mt-1'>{selectedBoxData?.storageImg}</p>}
                    </>
                    }
                    {imageName && <p className='text-[12px] text-gray-500 w-[90%] overflow-hidden mt-1'>{imageName}</p>}
                  </div>
                </div>
          
             
  
              </div>
            </div>
            <div className='flex justify-center mb-5 mt-10 w-[90%]'>
            {(!editMode && !editInventry) &&
              <button
                onClick={handleCreateInventory}
                className='w-[100%] text-[15px] flex justify-center items-center text-[#ffff] font-[500] h-[40px] rounded-lg bg-[#3045A3]'>
                {btnLoader ? <ClipLoader color='#ffff' size={25} /> : "Create Box"}
              </button>
      }
                {(editMode && !editInventry) &&
              <button
                onClick={handleUpdateInventry}
                className='w-[100%] text-[15px] flex justify-center items-center text-[#ffff] font-[500] h-[40px] rounded-lg bg-[#3045A3]'>
                {btnLoader ? <ClipLoader color='#ffff' size={25} /> : "Update Box"}
              </button>
      } 
      {editInventry &&
        <button
        onClick={() => {
          if (!selectedBoxData) return;  // If selectedBoxData is empty, prevent the onClick action
          handleUpdateInventry();
        }}
        className={`w-[100%] text-[15px] flex justify-center items-center text-[#ffff] font-[500] h-[40px] rounded-lg ${!selectedBoxData ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3045A3]'}`}
      >
        {btnLoader ? <ClipLoader color='#ffff' size={25} /> : "Update Box"}
      </button>
} 
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
