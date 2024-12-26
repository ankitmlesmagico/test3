import React, { useState } from 'react';

interface StyleProps {
  container?: React.CSSProperties;
  input?: React.CSSProperties;
  icon?: React.CSSProperties;
  onFocusColor?: string;
}

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  defaultStyle?: StyleProps;
  className?: string;
}

const defaultStyles: StyleProps = {
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '273px',
    borderRadius: '6px',
    height: '40px',
    backgroundColor: '#FFF',
    border: '1px solid #ccc',
    padding: '0 10px',
    transition: 'border-color 0.3s ease',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontFamily: 'Lato, sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16px',
    padding: '8px',
  },
  icon: {
    color: '#858D9D',
    width: '16px',
    height: '16px',
    marginRight: '8px',
  },
};

const SearchBox: React.FC<SearchBarProps> = ({
  value,
  setValue,
  placeholder = 'Search Customer, Phone no, Email',
  icon,
  defaultStyle = {},
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const mergedStyles = {
    container: {
      ...defaultStyles.container,
      ...defaultStyle.container,
      borderColor: isFocused ? `${defaultStyle.onFocusColor || '#000'}` : '',
    },
    input: { ...defaultStyles.input, ...defaultStyle.input },
    icon: { ...defaultStyles.icon, ...defaultStyle.icon },
  };

  return (
    <div
      style={mergedStyles.container}
      className={className}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <span style={mergedStyles.icon}>
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        )}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={mergedStyles.input}
      />
    </div>
  );
};

export default SearchBox;
