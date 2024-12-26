import React, { ReactNode, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa';
import Image from 'next/image';
import PdfIcon from '@/assets/icons/pdf-icon.svg';
import { toast } from 'react-toastify';

interface ContractDropdownProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
  linkText?: string;
  pdfPath?: string;
}

const ContractDropdown = ({
  title,
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  linkText = 'Contract.pdf',
  pdfPath = '/pdfs/dd12-13_0.pdf',
}: ContractDropdownProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(pdfPath);
      if (!response.ok) throw new Error('Failed to fetch PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = linkText;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(`Error downloading PDF ${error}`);
    }
  };

  return (
    <div className="w-full border rounded-lg shadow-sm">
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition rounded-lg focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#35BB5F]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-[#1D1F2C] leading-4 ">
            {title}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <a
            className="text-[12px] font-semibold text-[#0168B4] underline"
            onClick={handleDownload}
          >
            {linkText}
          </a>
          <Image
            src={PdfIcon.src}
            alt="pdf-icon"
            width={24}
            height={24}
            className="mr-4"
          />
          {isOpen ? (
            <FaAngleUp className="h-5 w-5 text-gray-500" />
          ) : (
            <FaAngleDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          id="dropdown-content"
          className="p-4 border-t max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white"
          role="region"
          aria-labelledby="dropdown-button"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ContractDropdown;
