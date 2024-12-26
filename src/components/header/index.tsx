'use client';
import { logout } from '@/store/features/auth/authslice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { LogOut } from 'lucide-react';

interface DropdownProps {
  brandName: string;
}

const Header: React.FC<DropdownProps> = ({ brandName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());

    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // if you're storing JWT token

    // Clear sessionStorage if you're using it
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Redirect to login page
    router.push('/login');
  };

  return (
    <div
      className="w-full flex justify-end bg-white h-12 py-2 px-4"
      style={{ borderBottom: '1px solid #f7f7f7' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border  rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <div className="w-5 h-5 bg-blue-500 rounded-md flex items-center justify-center ">
          <span className="text-white text-sm font-medium">
            {brandName.charAt(0)}
          </span>
        </div>
        <span className="text-[#0F1828]  text-[14px] font-semibold">
          {brandName}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-8 mt-7 w-20 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
