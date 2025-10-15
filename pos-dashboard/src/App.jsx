import React from "react";
import { Route, Routes } from "react-router-dom";
import RestaurantUI from "./components/EmployeeDash/Panel";
import History from "./components/EmployeeDash/History";
import Profile from "./components/EmployeeDash/Profile";
import Report from "./components/EmployeeDash/Reports";
import Order from "./components/EmployeeDash/Order";
import OrderPage from "./components/EmployeeDash/Order";
import Dashboard from "./components/ManagerDash/Dashboard";
import CustomerDetails from "./components/ManagerDash/CustomerDetails";
import EmployeeDetails from "./components/ManagerDash/EmployeeDetails";
import MenuPage from "./components/ManagerDash/Menu";
import ManagerReports from "./components/ManagerDash/ManagerReports";
import OrderHistory from "./components/ManagerDash/OrderHistory";
import First from "./components/FirstPage/first";
// import Login from "./components/Loginpage/login";


export default function App() {
  return (
    <Routes>
         <Route path="/" element={<First />} /> 

         {/* <Route path="/manager-login" element={<Login role="Manager" />} />
      <Route path="/employee-login" element={<Login role="Employee" />} /> */}

      <Route path="/employee-dashboard" element={<RestaurantUI />} />
      <Route path="/order" element={<OrderPage/>} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reports" element={<Report />} />
      <Route path="/manager-dash" element={<Dashboard/>} />
      <Route path="/manager-custdetails" element={<CustomerDetails/>} />
      <Route path="/manager-employeedetails" element={<EmployeeDetails/>} />
      <Route path="/manager-menu" element={<MenuPage/>} />
      <Route path="/manager-reports" element={<ManagerReports/>} />
      <Route path="/manager-orderhistory" element={<OrderHistory/>} />

    </Routes>
  );
}
