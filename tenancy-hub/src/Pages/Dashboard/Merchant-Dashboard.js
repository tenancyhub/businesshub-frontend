import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddFormProduct from "../AddProductForm/AddFormProduct";
import "./Merchant.css";
import Notification from "./Notification/Notification";

const MerchantDashboard = () => {
  const activeStyle = {
    // background: "rgba(140, 145, 150, 1)",
  };
  const [sidebar, setSidebar] = useState("true");
  const [veiw, setVeiw] = useState("false");

  const toggleSideBar = () => {
    setVeiw(!veiw);
  };
  return (
    <div className="container-fluid">
      <div className={`${sidebar ? "sidebar" : "sidebar-show"} `}>
        <span onClick={toggleSideBar} className="closebtn">
          ☰
        </span>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-home">{""}</span> Home{" "}
        </NavLink>
        <NavLink to="/admin" onClick={toggleSideBar} activeStyle={activeStyle}>
          <span className="fas fa-envelope">{""}</span> Notification{" "}
        </NavLink>
        <NavLink to="/admin" onClick={toggleSideBar} activeStyle={activeStyle}>
          <span className="fas fa-plus-square">{""}</span> Products{" "}
        </NavLink>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-inbox">{""}</span> Orders{" "}
        </NavLink>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-user">{""}</span> Customers{" "}
        </NavLink>
        <NavLink to="/shop" activeStyle={activeStyle}>
          <span className="fas fa-store">{""}</span> Online-Store{" "}
        </NavLink>
        <NavLink to="/admin" activeStyle={activeStyle}>
          <span className="fas fa-user-cog">{""}</span> Setting{" "}
        </NavLink>
      </div>

      <div id="main" className={`${sidebar ? "main" : "main-full"} `}>
        <button className="openbtn" onClick={toggleSideBar}>
          ☰
        </button>

        <div className="container">
          {veiw && (
            <div>
              <AddFormProduct />
            </div>
          )}
          {veiw && (
            <div>
              <Notification />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
