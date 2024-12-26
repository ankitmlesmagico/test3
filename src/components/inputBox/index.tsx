import React, { ChangeEvent, useState } from 'react';

interface BaseProps {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  errorMessage?: string;
  endIcon?: React.ReactNode;
  onClickOfEndIcon?: () => void;
  customStyle?: {
    labelStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    errorMessageStyle?: React.CSSProperties;
    mainContainerStyle?: React.CSSProperties;
    iconInputContainerStyle?: React.CSSProperties;
  };
}

interface FormInputProps extends BaseProps {
  inputStyle?: React.CSSProperties;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
}

const baseContainerStyle: React.CSSProperties = {
  width: '100%',
};

const baseLabelStyle: React.CSSProperties = {
  display: 'block',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: '16px',
  textTransform: 'capitalize',
  marginBottom: '4px',
};

const baseInputStyle: React.CSSProperties = {
  border: '0px',
  flex: 1,
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  padding: '8px 12px',
};
const baseCombineContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #E0E2E7',
  borderRadius: '4px',
  gap: '8px',
  overflow: 'hidden',
  position: 'relative',
};

const errorMessageStyle: React.CSSProperties = {
  color: '#DC2626',
  fontSize: '12px',
  marginTop: '4px',
};
const iconContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  height: '100%',
  backgroundColor: 'inherit',
  position: 'absolute',
  right: '8px',
  cursor: 'pointer',
};

const InputBox: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  maxLength,
  onClickOfEndIcon,
  customStyle = {},
  required = false,
  type = 'text',
  errorMessage,
  endIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const combinedLabelStyle: React.CSSProperties = {
    ...baseLabelStyle,
    color: '#1d1f2c',
    ...customStyle?.labelStyle,
  };

  const combinedInputStyle: React.CSSProperties = {
    ...baseInputStyle,
    ...customStyle?.inputStyle,
  };
  const combinedContainerStyle: React.CSSProperties = {
    ...baseCombineContainerStyle,
    ...customStyle?.iconInputContainerStyle,
    borderColor: errorMessage ? '#DC2626' : isFocused ? '#3B82F6' : '#e2e8f0',
    boxShadow:
      isFocused && !errorMessage ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
    backgroundColor: errorMessage ? 'rgba(220, 38, 38, 0.05)' : 'transparent',
  };

  return (
    <div style={{ ...baseContainerStyle, ...customStyle?.mainContainerStyle }}>
      {label && (
        <label style={combinedLabelStyle}>
          {label}
          {required && (
            <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>
          )}
        </label>
      )}
      <div style={combinedContainerStyle}>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          type={type}
          style={combinedInputStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {endIcon && (
          <div style={iconContainerStyle} onClick={onClickOfEndIcon}>
            {endIcon}
          </div>
        )}
      </div>
      {errorMessage && (
        <div
          style={{ ...errorMessageStyle, ...customStyle?.errorMessageStyle }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export { InputBox };
export type { FormInputProps };
