import React from 'react'
import { Link , Outlet , useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import axios from "axios";


const Dashboard = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogOut = () => {
    axios.get('http://localhost:3000/auth/logout', { withCredentials: true })
      .then(result => {
        if(result.data.Status){
          localStorage.removeItem("valid")
          navigate('/adminlogin')
        }
      })
      .catch(err => console.error('Logout error:', err))
  }
  return (
    <div>
      <div>
        <div className='flex h-screen bg-gray-200'>
          <div className='w-60 bg-gray-900 text-white p-8 rounded'>
            <Link to="/dashboard" className='text-xl font-bold  text-amber-300 '> Management </Link>
            <ul className='my-5 space-y-4'>
              <li  className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faGauge} />
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li  className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faSliders} />
                <Link to="/dashboard/employee">Manage Employees</Link>
              </li>
              <li className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faStackOverflow} />
                <Link to="/dashboard/category">Category</Link>
              </li>
              <li className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faUser} />
                <Link to="/dashboard/profile">Profile</Link>
              </li>
              <li className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faRightToBracket} />
                <button onClick={handleLogOut} className='text-red-600 bg-none border-none cursor-pointer'>LogOut</button>
              </li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden shadow-xl">
            <header className="bg-blue-900 shadow-2xl py-4 px-6  ">
              <h4 className="text-2xl font-bold text-amber-50 flex justify-center items-center">
                Employee Management System
              </h4>
            </header>
            <main className="flex-1 overflow-y-auto p-6 shadow-xl">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard