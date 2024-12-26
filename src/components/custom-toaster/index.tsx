import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Custom toast component
export const CustomErrorToast = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 min-w-[300px]">
    <div className="bg-red-500 p-1 rounded">
      {/* <X className="h-4 w-4 text-white" />
       */}{' '}
      X
    </div>
    <span className="text-sm text-gray-800">{message}</span>
  </div>
);

// Example usage component
const ToastDemo = () => {
  const showErrorToast = () => {
    toast(
      ({ closeToast }) => (
        <CustomErrorToast message="4 of the entered URLs are in incorrect format. Please ensure that the URLs entered are from an existing live listing." />
      ),
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
        },
      }
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={showErrorToast}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show Error Toast
      </button>
      <ToastContainer />
    </div>
  );
};

export default ToastDemo;
