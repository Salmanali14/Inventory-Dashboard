import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import ManageInventry from './Pages/ManageInventry/ManageInventry';
import BurnRateMonitring from './Pages/Burn Rate Monitring/BurnRateMonitring';
import AuditLog from './Pages/Audit Log/AuditLog';
import Settings from './Pages/Settings/Settings';
import ViewMember from './Pages/View Member/ViewMember';
import Signin from './Authentication/Signin';
import Forgot from './Authentication/Forgot';
import NewPassword from './Authentication/NewPassword';
import QrScannerWebPage from './QrSannerWebPage/QrScannerWebPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const RequireAuth = ({ children, restrictedTo }) => {
    const currentUser = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    // If no user is found, redirect to the login page
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    // Check if the user is an employee and tries to access restricted routes
    if (role === "employee" && restrictedTo === "admin") {
      return <Navigate to="/manageinventry" />;
    }

    // Allow access to the page
    return children;
  };

  const RequireAuthhome = ({ children }) => {
    const currentUser = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    // If admin, redirect to the dashboard
    if (currentUser && role === "admin") {
      return <Navigate to="/dashboard" />;
    }

    // If employee, redirect to manage inventory page
    if (currentUser && role === "employee") {
      return <Navigate to="/manageinventry" />;
    }

    // If no user, render the children (login pages)
    return children;
  };

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<RequireAuthhome><Signin /></RequireAuthhome>} />
        <Route path="/forgot" element={<RequireAuthhome><Forgot /></RequireAuthhome>} />
        <Route path="/newpassword" element={<RequireAuthhome><NewPassword /></RequireAuthhome>} />

        {/* Admin-only pages */}
        <Route path="/dashboard" element={<RequireAuth restrictedTo="admin"><Dashboard /></RequireAuth>} />
        <Route path="/burnratemonitring" element={<RequireAuth restrictedTo="admin"><BurnRateMonitring /></RequireAuth>} />
        <Route path="/viewmember" element={<RequireAuth restrictedTo="admin"><ViewMember /></RequireAuth>} />

        {/* Common accessible pages */}
        <Route path="/manageinventry" element={<RequireAuth><ManageInventry /></RequireAuth>} />
        <Route path="/auditlog" element={<RequireAuth><AuditLog /></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
        <Route path="/qrscanner" element={<RequireAuth><QrScannerWebPage /></RequireAuth>} />
      </Routes>
    </Router>
    <Toaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      // Define default options
      className: '',
      duration: 5000,
      style: {
        background: '#363636',
        color: '#fff',
      },
  
      // Default options for specific types
      success: {
        duration: 3000,
        theme: {
          primary: 'green',
          secondary: 'black',
        },
      },
    }}
  />
    </>
  );
}

export default App;
