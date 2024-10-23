import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PaginatorStyles.css'; 
import { IoMdMore } from 'react-icons/io';
import { Menu, MenuItem, Box, Modal, Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import AddMemberModal from '../Modal/AddMemberModal';
import { ClipLoader } from 'react-spinners';
import ConfirmationModal from '../Modal/ConfirmationModal';

export default function DataTableMember({ getAllEmploye, setGetAllEmploye, editMode, setEditMode, setUpdateData, updateData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteMemberId, setDeleteMemberId] = useState(null);
  const [singleEmployeData, setSingleEmployeData] = useState(null); 
  const [openModal, setOpenModal] = useState(false); 
  const [btnLoader, setBtnLoader] = useState(false);
  let [addMemberModal, setAddMemberModal] = useState(false);

  const handleAddMemberModal = (data) => {
    setSingleEmployeData(data); 
    setAddMemberModal(!addMemberModal);
    setEditMode(true);
    setAnchorEl(null); // Close the menu after selecting the action
  };

  const handleMenuClick = (event, rowData) => {
    setSingleEmployeData(rowData); // Store the selected row's data
    setAnchorEl(event.currentTarget); // Set anchor for the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const confirmDelete = (id) => {
    setDeleteMemberId(id);
    setOpenModal(true);
    handleMenuClose(); 
  };

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const handleConfirmDelete = async () => {
    setBtnLoader(true);
    try {
      const response = await axios.delete(`${apiBaseUrl}user/delete/${deleteMemberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        setOpenModal(false);
        
        setGetAllEmploye((prevEmpolye) => {
          const updateEmpoyee = prevEmpolye.filter((cust) => cust.id !== deleteMemberId);
          setGetAllEmploye(updateEmpoyee); // Ensure filteredCustomer stays in sync
          return updateEmpoyee;
        })
        setBtnLoader(false);
      }
    } catch (error) {
      setBtnLoader(false);
   
    }
  };
  const actionTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-between w-[70px]">
        <IoMdMore onClick={(event) => handleMenuClick(event, rowData)} className="ml-9 text-[25px]" />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleAddMemberModal(singleEmployeData)}>Edit</MenuItem>
          <MenuItem onClick={() => confirmDelete(singleEmployeData?.id)}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };

  const formatDate = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp * 1000);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return dateObj.toLocaleString('en-GB', options).replace(',', ' -');
  };

  const dateTemplate = (rowData) => <span>{formatDate(rowData.createDate)}</span>;

  const serialNumberTemplate = (rowData, { rowIndex }) => <span>{rowIndex + 1}</span>;

  const screenWidth = window.innerWidth;

  return (
    <>
      <div className="card relative mt-10 overflow-y-scroll h-[60vh] ">
        <DataTable 
          value={getAllEmploye} 
          paginator 
          rows={10} 
          rowsPerPageOptions={[10, 20]} 
          tableStyle={{ minWidth: screenWidth > 450 ? '100%' : '500px', marginBottom: "20px", fontSize: '0.85rem' }}
        >
          <Column field="name" header="Name" style={{ width: '25%', textAlign: 'center' }} />
          <Column field="email" header="Email" style={{ width: '30%', textAlign: 'center' }} />
          <Column field="createDate" header="Date" body={dateTemplate} style={{ width: '25%', textAlign: 'center' }} />
          <Column header="Actions" body={actionTemplate} style={{ width: '10%', textAlign: 'center' }} />
        </DataTable>
       
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onSubmit={handleConfirmDelete}
      title="Are you sure you want to delete this Employee?"
      btnLoader={btnLoader}
    />

      {/* Add/Edit Member Modal */}
      <AddMemberModal 
        singleEmployeData={singleEmployeData}  
        addMemberModal={addMemberModal} 
        handleAddMemberModal={handleAddMemberModal} 
        updateData={updateData} 
        setUpdateData={setUpdateData} 
        editMode={editMode} 
      />
    </>
  );
}
