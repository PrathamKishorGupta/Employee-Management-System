import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://employee-management-system-mk0o.onrender.com/employee/detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogOut = () => {
    axios.get('https://employee-management-system-mk0o.onrender.com/employee/logout', { withCredentials: true })
      .then(result => {
        if(result.data.Status){
          localStorage.removeItem("valid")
          navigate('/')
        }
      })
      .catch(err => console.error('Logout error:', err))
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Employee Management System
        </h4>

        {/* Employee Image */}
        <div className="flex justify-center mb-7">
          <img
            src={`http://localhost:3000/Images/${employee.image}`}
            alt="Employee"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
          />
        </div>

        {/* Details */}
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl font-semibold text-gray-700">
            Name:{" "}
            <span className="font-normal text-gray-800">{employee.name}</span>
          </h3>
          <h3 className="text-xl font-semibold text-gray-700">
            Email:{" "}
            <span className="font-normal text-gray-800">{employee.email}</span>
          </h3>
          <h3 className="text-xl font-semibold text-gray-700">
            Salary:{" "}
            <span className="font-normal text-green-600">
              ${employee.salary}
            </span>
          </h3>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg shadow-md">
            Edit
          </button>

          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-lg shadow-md" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
