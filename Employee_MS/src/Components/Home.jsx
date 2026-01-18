import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [adminRecords, setAdminRecords] = useState([]);
  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios
      .get("http://localhost:3000/auth/admin_records", {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.Status) {
          setAdminRecords(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };
  const adminCount = () => {
    axios
      .get("http://localhost:3000/auth/admin_count", { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      });
  };
  const employeeCount = () => {
    axios
      .get("http://localhost:3000/auth/employee_count", {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      });
  };
  const salaryCount = () => {
    axios
      .get("http://localhost:3000/auth/salary_count", { withCredentials: true })
      .then((result) => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salary);
        }
      });
  };

  return (
    <div
    //className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
    //style={{ backgroundImage: "url('/Images/Home_bg.jpg')" }}
    >
      <div className="flex flex-col sm:flex-row  gap-5 justify-center items-center mt-10">
        <div className="w-60 h-30 bg-white shadow-2xl rounded-lg m-5 p-5 flex flex-col border-red-600 border-2">
          <div className="font-bold text-center mb-2 text-xl">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="mt-2 m-5 text-black-950">
            <h5>
              Total:{" "}
              <span className="m-4 font-bold text-red-700">{adminTotal}</span>
            </h5>
          </div>
        </div>
        <div className="w-60 h-30 bg-white shadow-2xl rounded-lg m-5 p-5 flex flex-col  border-red-600 border-2">
          <div className="font-bold text-center mb-2 text-xl">
            <h4>Employees</h4>
          </div>
          <hr />
          <div className="mt-2 m-5 text-black-950">
            <h5>
              Total:{" "}
              <span className="m-4 font-bold text-red-700">
                {employeeTotal}
              </span>
            </h5>
          </div>
        </div>
        <div className="w-60 h-30 bg-white shadow-2xl rounded-lg m-5 p-5 flex flex-col border-red-600 border-2">
          <div className="font-bold text-center mb-2 text-xl">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="mt-2 m-5 text-black-950 flex flex-row items-center gap-3">
            <h5 className="font-medium">Total:</h5>
            <span className="font-bold text-red-700">${salaryTotal}</span>
          </div>
        </div>
      </div>
      <div className="m-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          List of Admins
        </h3>
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {adminRecords.map((a, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{a.email}</td>

                  <td className="px-6 py-4 flex gap-3">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
