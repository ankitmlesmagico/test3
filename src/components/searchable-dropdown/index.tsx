import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

export interface Option {
  value: string;
  label: string;
}
interface CustomeStyle {
  mainContainerStyle: React.CSSProperties;
}

interface CustomDropdownProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: Option) => void;
  defaultValue?: Option;
  disabled?: boolean;
  className?: string;
  error?: string;
  value?: Option;
  showSearch?: boolean;
  customStyles?: CustomeStyle;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  placeholder = 'Select option',
  onChange = () => {},
  value,
  disabled = false,
  className = '',
  error,
  showSearch = false,
  customStyles,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option); // Trigger the external state update
    setSearchTerm('');
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case 'Space':
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`relative w-64 ${className} z-50`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="dropdown-list"
    >
      {/* Main button */}
      <button
        style={{ ...customStyles?.mainContainerStyle }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 h-[30px] text-left bg-white border rounded flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-blue-500
          ${disabled ? 'cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50'}
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        disabled={disabled}
        aria-label={placeholder}
      >
        <span
          className={`${value ? 'text-[#4D4D4D]' : 'text-gray-500'} truncate`}
        >
          {value ? value.label : placeholder}
        </span>
        <FaChevronDown
          className={`w-4 h-4 text-[#aaa] transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Error message */}
      {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}

      {/* Dropdown panel */}
      {isOpen && !disabled && (
        <div
          className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10"
          id="dropdown-list"
          role="listbox"
        >
          {/* Search input (conditionally rendered) */}
          {showSearch && (
            <div className="p-2 border-b">
              <div className="relative">
                <IoSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full h-[30px] pl-8 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:[#003D86]"
                  aria-label="Search dropdown options"
                />
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    value?.value === option.value
                      ? 'bg-blue-50 text-[#003D86]'
                      : 'text-gray-900'
                  }`}
                  role="option"
                  aria-selected={value?.value === option.value}
                  tabIndex={0}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
