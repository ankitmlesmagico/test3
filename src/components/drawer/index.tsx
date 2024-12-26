import React, { ReactNode, useEffect } from 'react';

interface DrawerProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}
const Drawer = ({ children, open, setOpen, className = '' }: DrawerProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, setOpen]);

  // Handle click outside
  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity z-40
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleBackdropClick}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 
          transition-transform duration-300 ease-in-out transform
          ${open ? 'translate-x-0' : 'translate-x-full'}
          ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
