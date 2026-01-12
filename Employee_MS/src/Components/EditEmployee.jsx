import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  // fetch categories for the select dropdown
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/categories", { withCredentials: true })
      .then((result) => {
        // Accept either an array (old backend) or wrapped object { Status, Result }
        if (Array.isArray(result.data)) {
          setCategory(result.data);
        } else if (result.data && Array.isArray(result.data.Result)) {
          setCategory(result.data.Result);
        } else {
          // nothing to set — show friendly message
          console.warn('No categories returned', result.data);
          setCategory([]);
        }
        // server may return array or wrapped object
        // const data = res.data;
        // if (Array.isArray(data)) setCategory(data);
        // else if (data && Array.isArray(data.Result)) setCategory(data.Result);
        // else setCategory([]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        setEmployee((prev) => ({
          ...prev,
          name: result.data.Result.name || "",
          email: result.data.Result.email || "",
          address: result.data.Result.address || "",
          salary: result.data.Result.salary || "",
          category_id: result.data.Result.category_id || "",
        }));
        //---OR---
        // const emp = result.data && result.data.Result ? result.data.Result : null;
        // if (!emp) return;
        // setEmployee((prev) => ({
        //   ...prev,
        //   name: emp.name || "",
        //   email: emp.email || "",
        //   address: emp.address || "",
        //   salary: emp.salary || "",
        //   category_id: emp.category_id || "",
        // }));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3000/auth/edit_employee/" + id, employee, { withCredentials: true })
      .then((result) => {
        console.log(result.data);
        if (result.data && result.data.Status) {
          alert('Employee updated');
          navigate('/dashboard/employee');
        } else {
          alert('Update failed: ' + (result.data.Error || 'Unknown'));
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error updating employee: ' + err.message);
      });
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-10">
      <div className="w-2xl mx-auto bg-white p-8  shadow-xl border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Edit Employee
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="inputName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="inputEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <strong>Email:</strong>
            </label>
            <input
              type="text"
              id="inputEmail"
              placeholder="Enter Email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="inputSalary"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <strong>Salary:</strong>
            </label>
            <input
              type="text"
              id="inputSalary"
              placeholder="Enter Salary"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="inputAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <strong>Address:</strong>
            </label>
            <input
              type="text"
              id="inputAddress"
              placeholder="1234 Main St"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="Category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <strong>Category:</strong>
            </label>
            <select
              name="category"
              id="category"
              value={employee.category_id || ""}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return <option value={c.id}> {c.name} </option>;
              })}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
