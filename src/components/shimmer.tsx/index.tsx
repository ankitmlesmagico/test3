// shimmer.tsx
import React from 'react';

interface ShimmerProps {
  width?: string;
  height?: string;
  className?: string;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width = '100%',
  height = '16px',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{
        width,
        height,
        background:
          'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
};

// Add this to your global CSS or styled-components
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;

export default Shimmer;
