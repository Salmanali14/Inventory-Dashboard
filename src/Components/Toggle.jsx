import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import { Switch } from "@mui/material";
import axios from 'axios';
import toast from 'react-hot-toast';

const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  height: 17,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    color: '#fff !important',
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff !important",
      background: "#3045A3",
      "& + .MuiSwitch-track": {
        backgroundColor: theme?.palette?.mode === "dark" ? "#3045A3" : "#3045A3",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 14,
    height: 13,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme?.palette?.mode === "light" ? "#3045A3" : "#3045A3",
    opacity: 1,
    transition: theme?.transitions?.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function Toggle() {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const notificationCheck = localStorage.getItem("notification");

    if (notificationCheck === "0") {
      setIsToggled(true); // Switch is ON
    } else if (notificationCheck === "1") {
      setIsToggled(false); // Switch is OFF
    }
  }, []);

  const handleToggleChange = async (event) => {
    const isChecked = event.target.checked;
    setIsToggled(isChecked);

    try {
      const response = await axios.post(`${apiBaseUrl}toggleNotification`, {
        id: id,
        notification: isChecked ? 0 : 1, // Store 0 for true, 1 for false
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        localStorage.setItem('notification', isChecked ? "0" : "1"); // Store as string
      }
    } catch (error) {
    
    }
  };

  return (
    <>
      <div>
        <IOSSwitch checked={isToggled} onChange={handleToggleChange} />
      </div>
    </>
  );
}

export default Toggle;
