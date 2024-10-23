import { Box, Modal } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsFillImageFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { ClipLoader } from 'react-spinners';

export default function AddMachineModal({ handleAddBoxModal, addBoxModal,setUpdateData,updateData,singleInventryData,editMode,editInventry }) {
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
     
        const filteredInventories = response?.data?.data?.inventoriesResponse?.filter(
          (inventory) => inventory?.machine && inventory?.machine.trim() !== ""
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


  const filteredInventory = getAllInventory?.filter(inventory =>
    inventory?.boxName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  const [formData, setFormData] = useState({
    machine: '',
    machineImg: null, 
  });
  useEffect(()=>{
    if(editMode){
    setFormData({
      machine:singleInventryData?.machine,
      machineImg:singleInventryData?.machineImg,
    })
  }
  },[singleInventryData,editMode])

  useEffect(()=>{
    if(editInventry){
    setFormData({
      machine:selectedBoxData?.machine,
      machineImg:selectedBoxData?.machineImg,
    })
  }
  },[selectedBoxData,editInventry])
  const [btnLoader, setBtnLoader] = useState(false);
  const [machineImage, setMachineImage] = useState(""); 


  const handleUploadInMachine = (event) => {
    setFormData({
      ...formData,
      machineImg: event.target.files[0], // Save the selected image for machine
    });
    setMachineImage(event.target.files[0].name); 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateInventory = async () => {
    if(!formData?.machine){
      toast.error("Machine is required!")
      return;
    }
    setBtnLoader(true);
    const data = new FormData();
    data.append('machine', formData?.machine);
    if (formData.machineImg) {
      data.append('machineImg', formData.machineImg); // Attach in-machine image
    }

    try {
      const response = await axios.post(`${apiBaseUrl}inventory/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      handleCloseModal(); 
    
  
      setUpdateData(!updateData)
      setBtnLoader(false);
      setFormData({
        machine: '',
        machineImg: null,
      });
      // toast.success(response?.data?.message);
      if (response?.data?.status === true) {
       
      
      }
    } catch (error) {
      setBtnLoader(false);
      // toast.error(error?.response?.data?.message);
    }
  };
  const handleUpdateInventry = async () => {
    if(!formData?.machine){
      toast.error("Machine is required!")
      return;
    }
    const data = new FormData();
    data.append('machine', formData?.machine);
    if (formData.machineImg && machineImage) {
        data.append('machineImg', formData.machineImg); // Attach in-machine image
    }
    let id =editInventry? selectedBoxData?.id : singleInventryData?.id
    setBtnLoader(true);
    
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
   setUpdateData(!updateData)
       handleCloseModal(); 
                toast.success(response?.data?.message);
        if (response?.data?.status === true) {
            //  setUpdateData(!updateData)
   
            // handleCloseModal(); // Close the modal
        }
    } catch (error) {
        console.error(error); 
        toast.error(error?.response?.data?.message);
    } finally {
        setBtnLoader(false); // Ensure button loader is reset in both success and error cases
    }
};

  let handleCloseModal = () => {
    handleAddBoxModal();
    setMachineImage(null);
    setFormData({
      machine:"",
      machineImg:"",
    }) 
    setSelectedBoxData("")
    setSelectedBox("")
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
            maxWidth: innerWidth > 430 ? "400px" : "430px",
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
                  <p className='text-[#3045A3] text-[16px] font-bold'>{editMode || editInventry ? "Update Machine" :"Create Machine"}</p>
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
                    onClick={() => handleBoxChange({ target: { value: inventory?.machine } }, inventory)}  // Pass both value and inventory
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      backgroundColor: selectedBox === inventory?.machine ? '#eee' : 'white',
                      color: 'black',
                    }}
                  >
                    {inventory?.machine}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
              <div className='flex justify-between items-center flex-col w-[90%]'>
                   <div className='w-[100%] flex flex-col justify-start mt-3'>
                  <label className='font-[500] text-[#4B5563] mb-1'>Machine  <span className='text-red-500 text-[20px] '>*</span></label>
                  <input
                    type='text'
                    name="machine"
                    value={formData.machine}
                    onChange={handleChange}
                    className='w-[100%] h-[40px] outline-none pl-3 pr-3 text-black bg-[#F2F2F2] border-[#AEADAD] border rounded-md'
                  />
                </div>
                  
                <div className='w-[100%] flex flex-col justify-start'>
                  <h1 className='font-[500] text-[#4B5563] mt-3 mb-1'>In Machine:</h1>
                  <div className='flex justify-center flex-col border items-center w-[100%] border-[#AEADAD]  h-[120px] rounded-lg bg-[#F4F4F4]'>
                    <BsFillImageFill className='text-[35px] text-black text-main' />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="upload-photos-in-machine"
                      onChange={handleUploadInMachine}
                    />
                    <label
                      htmlFor="upload-photos-in-machine"
                      className='flex justify-center text-black items-center font-bold w-[110px] text-[11px] mt-2 text-main h-[27px] cursor-pointer'
                    >
                      Upload Photos
                    </label>
                     {!machineImage &&
                    <>
                    {singleInventryData?.machineImg && <p className='text-[12px] w-[90%] overflow-hidden text-gray-500 mt-1'>{singleInventryData?.machineImg}</p>}
                                        {selectedBoxData?.machineImg && <p className='text-[12px] w-[90%] overflow-hidden text-gray-500 mt-1'>{selectedBoxData?.machineImg}</p>}
                    </>
}
                    {machineImage && <p className='text-[12px] text-gray-500 mt-1 w-[90%] overflow-hidden'>{machineImage}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center mb-5 mt-10 w-[90%]'>
            {(!editMode && !editInventry) &&
              <button
                onClick={handleCreateInventory}
                className='w-[100%] text-[15px] flex justify-center items-center text-[#ffff] font-[500] h-[40px] rounded-lg bg-[#3045A3]'>
                {btnLoader ? <ClipLoader color='#ffff' size={25} /> : "Create Machine"}
              </button>
      }
                {(editMode && !editInventry) &&
              <button
                onClick={handleUpdateInventry}
                className='w-[100%] text-[15px] flex justify-center items-center text-[#ffff] font-[500] h-[40px] rounded-lg bg-[#3045A3]'>
                {btnLoader ? <ClipLoader color='#ffff' size={25} /> : "Update Machine"}
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
        {btnLoader ? <ClipLoader color='#ffff' size={25} /> : "Update Machine"}
      </button>
} 
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
