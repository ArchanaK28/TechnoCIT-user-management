import React from 'react';

const Filter = ({ filterUserId, setFilterUserId, filterUserName, setFilterUserName }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="filterUserId" className="block text-gray-700 text-sm font-medium mb-2">
            Filter by User ID
          </label>
          <input
            id="filterUserId"
            type="text"
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter User ID"
          />
        </div>
        <div>
          <label htmlFor="filterUserName" className="block text-gray-700 text-sm font-medium mb-2">
            Filter by User Name
          </label>
          <input
            id="filterUserName"
            type="text"
            value={filterUserName}
            onChange={(e) => setFilterUserName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Username"
          />
        </div>
      </div>
    </div>
  );
};


export default Filter
