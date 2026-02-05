import React from 'react'

const AdminCourses = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Courses Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase">Total Courses</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">6</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase">Student</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">245</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase">Pending Approvals</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">12</p>
          
        </div>
        
      </div>

      
    </div>
  );
};


    
export default AdminCourses
