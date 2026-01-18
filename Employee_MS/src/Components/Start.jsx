
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.Status) {
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate(`/employee_detail/${res.data.id}`);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className="loginPage min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-sm backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Login As
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Choose your role to continue
        </p>

        <div className="flex flex-col gap-5">
          {/* Admin Button */}
          <button
            onClick={() => navigate("/adminlogin")}
            className="w-full py-3 rounded-xl text-lg font-semibold text-white
              bg-linear-to-r from-emerald-500 to-emerald-600
              hover:from-emerald-600 hover:to-emerald-700
              hover:scale-[1.03] transition-all duration-300 shadow-lg"
          >
            Admin
          </button>

          {/* Employee Button */}
          <button
            onClick={() => navigate("/employee_login")}
            className="w-full py-3 rounded-xl text-lg font-semibold text-white
              bg-linear-to-r from-blue-500 to-blue-600
              hover:from-blue-600 hover:to-blue-700
              hover:scale-[1.03] transition-all duration-300 shadow-lg"
          >
            Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
