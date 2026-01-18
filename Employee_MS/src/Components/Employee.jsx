import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://employee-management-system-mk0o.onrender.com/auth/employee", { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("https://employee-management-system-mk0o.onrender.com/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload(); // reload krne ke liye
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3 ">
      <div className="flex justify-center mb-5 font-bold">
        <h3 className="text-3xl"> : Employee List : </h3>
      </div>

      {/* Add Category Button */}
      <Link
        to="/dashboard/add_employee"
        className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>

      {/* table */}
      <div className="hidden md:block mt-8 p-4 bg-white shadow-2xl rounded-lg overflow-hidden">
        <table className=" min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-black-500 uppercase ">
                Name
              </th>
              <th className="px-6 py-3 text-left font-bold text-black-500 uppercase ">
                Image
              </th>
              <th className="px-6 py-3 text-left font-bold text-black-500 uppercase ">
                Email
              </th>
              <th className="px-6 py-3 text-left font-bold text-black-500 uppercase ">
                Address
              </th>
              <th className="px-6 py-3 text-left font-bold text-black-500 uppercase ">
                Salary
              </th>
              <th className="px-6 py-3 text-left font-bold text-black-500 uppercase ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employee.map((c, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-2 text-sm text-gray-900">{c.name}</td>

                <td className="px-6 py-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border">
                    <img
                      src={`http://localhost:3000/Images/` + c.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td className="px-6 py-2 text-sm text-gray-900">{c.email}</td>
                <td className="px-6 py-2 text-sm text-gray-900">{c.address}</td>
                <td className="px-6 py-2 text-sm text-gray-900">{c.salary}</td>
                <td className="px-6 py-2 flex gap-2">
                  <Link
                    to={"/dashboard/edit_employee/" + c.id}
                    className="bg-blue-500 text-white px-3 py-1 rounded mt-4"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mt-4"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* CARD VIEW (mobile) */}
      <div className="md:hidden mt-8 space-y-4">
        {employee.map((c, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex gap-4"
          >
            <img
              {/* src={`https://employee-management-system-mk0o.onrender.com/Images/${c.image}`} */}
              src={`https://employee-management-system-mk0o.onrender.com/${c.image}`}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div className="flex-1 text-sm">
              <p className="font-bold">{c.name}</p>
              <p className="text-gray-600">{c.email}</p>
              <p className="text-gray-600">{c.address}</p>
              <p className="font-semibold">₹ {c.salary}</p>

              <div className="flex gap-2 mt-3">
                <Link
                  to={`/dashboard/edit_employee/${c.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
