import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {

  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sending category:', {name: category});
    axios.post('https://employee-management-system-mk0o.onrender.com/auth/add_category', {name: category}, { withCredentials: true })
      .then(result => {
        console.log('Add category response:', result.data);
        if(result.data.Status){
            alert('Category added successfully!');
            navigate('/dashboard/category')
        }
        else{
            alert('Error: ' + result.data.Error)
        }
      })
      .catch(err => {
        console.error('Add category error:', err);
        alert('Error: ' + err.message);
      })
  }

  return (
    <div className="flex justify-center items-start min-h-screen pt-10">
        <div className="  bg-white p-8 rounded-xl shadow-2xl border border-gray-200 m-5">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2"><strong>Category:</strong></label>
                    <input type="text" name='category' placeholder='Enter Category' value={category}
                     onChange={(e) => setCategory(e.target.value)} className="rounded border-2" />
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory
