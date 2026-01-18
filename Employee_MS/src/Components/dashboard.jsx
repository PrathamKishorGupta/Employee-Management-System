import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useState } from "react";

import { CiMenuBurger } from "react-icons/ci";

const Dashboard = () => {
  
  const handleMenuClick = () => {
  setShowDashboard(false);
};


  const [showDashboard, setShowDashboard] = useState(false);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogOut = () => {
    axios
      .get("http://localhost:3000/auth/logout", { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/adminlogin");
        }
      })
      .catch((err) => console.error("Logout error:", err));
  };
  return (
    <div className="h-screen flex flex-col bg-gray-200">
      <header
        className="sticky top-0 z-50 flex items-center justify-between
        bg-linear-to-r from-blue-900 via-blue-800 to-blue-900
        shadow-xl px-6 py-4"
      >
        <button
          className="md:hidden text-amber-100 hover:text-amber-300"
          onClick={() => setShowDashboard(!showDashboard)}
        >
          <CiMenuBurger className="text-2xl" />
        </button>

        <h4 className="flex-1 text-center text-lg sm:text-2xl font-bold text-amber-100">
          Employee Management System
        </h4>

        <div className="hidden md:block w-6" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`${
            showDashboard ? "block" : "hidden"
          } md:block w-60 bg-gray-900 text-white p-6 overflow-y-auto`}
        >
          <Link to="/dashboard" className="text-xl font-bold text-amber-300">
            Management
          </Link>

          <ul className="mt-6 space-y-4">
            <li className="flex items-center gap-2 hover:text-amber-400">
              <FontAwesomeIcon icon={faGauge} />
              <Link to="/dashboard" onClick={handleMenuClick}>Dashboard</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-amber-400">
              <FontAwesomeIcon icon={faSliders} />
              <Link to="/dashboard/employee" onClick={handleMenuClick}>Manage Employees</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-amber-400">
              <FontAwesomeIcon icon={faStackOverflow} />
              <Link to="/dashboard/category" onClick={handleMenuClick}>Category</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-amber-400">
              <FontAwesomeIcon icon={faUser} />
              <Link to="/dashboard/profile" onClick={handleMenuClick}>Profile</Link>
            </li>

            <li className="flex items-center gap-2 text-red-500">
              <FontAwesomeIcon icon={faRightToBracket} />
              <button onClick={handleLogOut} >Logout</button>
            </li>
          </ul>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
