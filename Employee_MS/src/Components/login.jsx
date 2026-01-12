import React from "react";
import './style.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const Login = () => {

  const [values , setValues] = useState({
    email: '',
    password: ''
  })
  const [error , setError] = useState(null);
  const navigate = useNavigate();
  
 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sending login data:', values);
    axios.post("http://localhost:3000/auth/adminlogin", values, {
    withCredentials: true
})
    //axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        console.log('Login response:', result.data);
        if(result.data.loginStatus){
          localStorage.setItem("valid", true)
          navigate('/dashboard');
        }
        else{
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.error('Login error:', err);
      })
  }
  

  return (
    /* add the loginPage class so the background rules from style.css apply */
    <div className="loginPage flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-black/50 shadow-lg rounded-xl p-8 w-90 ">
        <div className="text-yellow-600 justify-center text-center ">
          {error && error}
        </div>
        <h2 className="text-2xl font-bold text-center text-red-900 mb-6">
          Login Page
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 font-medium mb-1 mx-1">
              Email
            </label>
            <input
              onChange={(e) => setValues({...values,email: e.target.value})}
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              className=" text-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-600 font-medium mb-1 mx-1"
            >
              Password
            </label>
            <input
              onChange={(e) => setValues({...values,password: e.target.value})}
              type="password"
              name="password"
              placeholder="Enter Password"
              className=" text-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition my-5"
          >
            Login
          </button>

          <div className=" flex flex-row ml-5 my-4">
            <input
              className="mr-2"
              type="checkbox"
              name="tick"
              id="tick"
            />
            <label
              htmlFor="tick"
              className="text-white "
            >
              Agree with Terms & Conditions ??
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
