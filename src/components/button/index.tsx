import React, { CSSProperties } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  customStyle?: React.CSSProperties;
  customColor?: string;
}

const sizes = {
  sm: {
    padding: '6px 12px',
    fontSize: '12px',
    height: '32px',
  },
  md: {
    padding: '8px 16px',
    fontSize: '14px',
    height: '40px',
  },
  lg: {
    padding: '12px 20px',
    fontSize: '16px',
    height: '48px',
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  customStyle,
  customColor,
  className,
  ...props
}) => {
  const primaryColor = customColor || '#003D86';

  const getButtonStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 500,
      cursor: isLoading || disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      width: fullWidth ? '100%' : 'auto',
      opacity: isLoading || disabled ? 0.6 : 1,
      ...sizes[size],
    };

    const variantStyles: React.CSSProperties =
      variant === 'solid'
        ? ({
            backgroundColor: primaryColor,
            color: '#FFFFFF',
            border: 'none',
            ':hover': {
              filter: 'brightness(85%)',
            },
          } as CSSProperties)
        : ({
            backgroundColor: 'transparent',
            color: primaryColor,
            ':hover': {
              backgroundColor: `${primaryColor}10`,
            },
          } as CSSProperties);
    return {
      ...baseStyle,
      ...variantStyles,
      ...customStyle,
    };
  };

  return (
    <div
      style={{
        display: 'inline-block',
      }}
    >
      <style>
        {disabled || isLoading
          ? ''
          : `
          .custom-button:hover {
            filter: brightness(85%);
          }
          
          .custom-button.outline:hover {
            background-color: ${primaryColor}15 !important;
          }
        `}
      </style>
      <button
        className={`custom-button ${variant === 'outline' ? 'outline' : ''} ${className || ''}`}
        style={getButtonStyles()}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    </div>
  );
};

export { Button };
export type { ButtonProps };
