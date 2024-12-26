import React, { CSSProperties } from 'react';

interface PopupProps {
  children: React.ReactNode;
  style?: CSSProperties;
  status: boolean;
  onClose?: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, style, status, onClose }) => {
  const defaultStyle: CSSProperties = {
    display: 'flex',
    width: '660px',
    padding: '44px 46px 83.855px 46px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    background: '#FFF',
  };

  const mergedStyle: CSSProperties = { ...defaultStyle, ...style };

  if (!status) {
    return null;
  }

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      onClick={handleClose} // Close the popup when clicking the overlay
    >
      <div
        style={mergedStyle}
        className="relative"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the popup
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
