import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect } from 'react'
import axios from 'axios'

const Category = () => {

  const [category, setCategory] = useState([])

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

  return (
    <div className='px-5 mt-3 '>
      <div className='flex justify-center mb-5 font-bold'>
        <h3 className='text-3xl'> : Category List : </h3>
      </div>

      {/* Add Category Button */}
      <Link 
        to="/dashboard/add_category" 
        className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
      >
        Add Category
      </Link>

      {/* table */}
      <div className="mt-8 p-4 bg-white shadow-2xl rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-bold text-black-500 uppercase ">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {
        category.map((c, index) => (
          <tr key={index} className="hover:bg-gray-100 transition duration-150 ease-in-out">
            <td className="px-6 py-2 text-sm text-gray-900">
              {c.name}
            </td>
          </tr>
        ))
        }
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Category