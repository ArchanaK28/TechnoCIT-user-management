import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { getUsersList, getUserProfile } from '../services/api';
import { isAuthenticated } from '../utils/authUtils';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import UserDetailsModal from '../components/UserDetailsModal';
import Filter from '../components/Filter';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [filterUserId, setFilterUserId] = useState('');
  const [filterUserName, setFilterUserName] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await getUsersList();
        console.log("Users API response:", response.data);
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users list');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleViewUser = async (userId) => {    
    setShowModal(true);
    setLoadingUser(true);
    try {
      const response = await getUserProfile(userId);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to fetch user details');
      setShowModal(false);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      name: 'User ID',
      selector: row => row.useridId || 'N/A',
      sortable: true,
    },
    {
      name: 'Username',
      selector: row => row.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => handleViewUser(row.useridId)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm hover:cursor-pointer"
          disabled={!row?.useridId}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    
    return users.filter(user => {
      
      const matchesId = filterUserId ? 
        (user?.useridId?.toString()?.toLowerCase()?.includes(filterUserId.toLowerCase()) ?? false) : true;
      
      const matchesName = filterUserName ? 
        (user?.name?.toLowerCase()?.includes(filterUserName.toLowerCase()) ?? false) : true;
      
      return matchesId && matchesName;
    });
  }, [users, filterUserId, filterUserName]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Users List</h1>
        
        {/* Filter Component */}
        <Filter 
          filterUserId={filterUserId}
          setFilterUserId={setFilterUserId}
          filterUserName={filterUserName}
          setFilterUserName={setFilterUserName}
        />
        
        {/* Data Table */}
        <div className="bg-white rounded-md shadow">
          {loading ? (
            <div className="p-10 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredUsers}
              pagination
              highlightOnHover
              responsive
              striped
              noDataComponent="No users found"
              progressPending={loading}
              progressComponent={<LoadingSpinner />}
            />
          )}
        </div>
      </div>
      
      {/* User Details Modal */}
      {showModal && (
        <UserDetailsModal
          user={selectedUser}
          loading={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
