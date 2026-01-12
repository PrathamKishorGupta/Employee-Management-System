import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";


const Start = () => {

  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
    .then(result => {
      if(result.data.Status){
        if(result.data.role === "admin") {
          navigate('/dashboard')
        }
        else{
          navigate('/employee_detail/'+result.data.id)
        }
      }
      else{
        navigate('/start')
      }
    })
    .catch(err => console.log(err))
  },[navigate])

  return (
    <div className="loginPage flex items-center justify-center min-h-screen from-gray-900 via-gray-800 to-gray-900 ">
      <div className=" shadow-2xl rounded-2xl p-10 w-80 border border-white/20 bg-gray-900">
        
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Login As
        </h2>

        <div className="flex flex-col gap-6">

          <button
            type="button"
            className="w-full py-3 rounded-xl text-lg font-semibold
            bg-emerald-600 text-white 
            hover:bg-emerald-700 hover:scale-105 transition-all duration-300"
            onClick = {() => {navigate('/adminlogin')}}
          >
            Admin
          </button>

          <button
            type="button"
            className="w-full py-3 rounded-xl text-lg font-semibold
            bg-blue-600 text-white 
            hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/employee_login')}
          >
            Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
