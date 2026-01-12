import React from 'react'
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee , setEmployee] = useState({
    name : '',
    email : '',
    password : '',
    salary : '',
    address: '',
    category_id : '',
    image : ''
  })

  const [category, setCategory] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching categories...');
    axios.get('http://localhost:3000/auth/categories', { withCredentials: true })
      .then(result => {
        console.log('Categories response:', result.data);
        // Handle both array response and wrapped response
        const data = Array.isArray(result.data) ? result.data : result.data.Result || [];
        setCategory(data);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setCategory([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('salary', employee.salary);
    formData.append('address', employee.address);
    formData.append('category_id', employee.category_id);
    formData.append('image', employee.image);

    axios.post('http://localhost:3000/auth/add_employee', formData, { withCredentials: true })
    .then(result => {
        if(result.data.Status){
            navigate('/dashboard/employee')
        }
        else{
            alert('Error: ' + result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="flex justify-center items-start min-h-screen pt-10">
        
        <div className="w-2xl mx-auto bg-white p-8  shadow-xl border border-gray-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Add Employee</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="inputName" className="block text-sm font-medium text-gray-700 mb-2"><strong>Name:</strong></label>
                    <input type="text" id="inputName" placeholder='Enter Name' 
                     onChange={(e) => setEmployee({...employee, name: e.target.value})}
                     className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                </div>
                <div className="mb-6">
                    <label htmlFor="inputEmail" className="block text-sm font-medium text-gray-700 mb-2"><strong>Email:</strong></label>
                    <input type="text" id="inputEmail" placeholder='Enter Email'
                     onChange={(e) => setEmployee({...employee, email: e.target.value})}
                     className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                </div>
                <div className="mb-6">
                    <label htmlFor="inputPassword" className="block text-sm font-medium text-gray-700 mb-2"><strong>Password:</strong></label>
                    <input type="text" id="inputPassword" placeholder='Enter Password'
                     onChange={(e) => setEmployee({...employee, password: e.target.value})}
                     className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                </div>
                <div className="mb-6">
                    <label htmlFor="inputSalary" className="block text-sm font-medium text-gray-700 mb-2"><strong>Salary:</strong></label>
                    <input type="text" id="inputSalary" placeholder='Enter Salary'
                     onChange={(e) => setEmployee({...employee, salary: e.target.value})}
                     className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                </div>
                <div className="mb-6">
                    <label htmlFor="inputAddress" className="block text-sm font-medium text-gray-700 mb-2"><strong>Address:</strong></label>
                    <input type="text" id="inputAddress" placeholder='1234 Main St'
                     onChange={(e) => setEmployee({...employee, address: e.target.value})}
                     className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                </div>
                <div className="mb-6">
                    <label htmlFor="Category" className="block text-sm font-medium text-gray-700 mb-2"><strong>Category:</strong></label>
                    <select name="category" id="category"
                     onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
                        {category.map((c) => {
                            return <option value = {c.id}> {c.name} </option>
                        })}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="inputGroupFile" className="block text-sm font-medium text-gray-700 mb-2" name="image"><strong>*Select Image:</strong></label>
                    <input type="file" id="inputGroupFile" placeholder='Enter Name'
                     onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
                     className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add Employee</button>
            </form>
        </div>
    </div>
  )
}

export default AddEmployee