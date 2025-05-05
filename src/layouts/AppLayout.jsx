import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaSearch, FaTachometerAlt, FaBars, FaTimes, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/authSlice';
import { toast } from 'sonner';
import { RiChatVoiceAiLine } from "react-icons/ri";
import { clearDocuments } from '../redux/slice/documentsSlice';



const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearDocuments())
    toast.success('Logged out successfully😀');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-purple-600 hover:bg-gray-100 focus:outline-none"
        >
          {isSidebarOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-16 flex items-center px-6 border-b cursor-pointer">
          <div className="flex items-center space-x-3 cursor-pointer">
            {/* <FaBookOpen className="h-8 w-8 text-purple-600 mr-2" /> */}
            <img
            src="https://i.ibb.co.com/GvpFCs5d/doctalk-logo.png"
            alt="DocTalk Logo"
            className="h-8 object-contain"
          />
            <span className="text-xl font-bold text-purple-600">DOCTALK</span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                <FaUser className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">{currentUser?.name}</div>
                <div className="text-xs text-gray-500">{currentUser?.email}</div>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <FaTachometerAlt className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <RiChatVoiceAiLine className="mr-3 h-5 w-5" />
              AI Chat
            </NavLink>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 w-full"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AppLayout;