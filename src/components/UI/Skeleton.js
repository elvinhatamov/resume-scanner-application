import React from 'react';

const Skeleton = ({ 
  variant = 'text', 
  width = '100%', 
  height = '20px',
  className = '',
  count = 1
}) => {
  const variants = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    card: 'h-48 rounded-lg',
  };

  const baseClasses = 'bg-gray-300 dark:bg-gray-700 animate-pulse';
  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  const skeletonStyle = {
    width,
    height: variant === 'card' ? undefined : height,
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={classes} style={skeletonStyle} />
        ))}
      </div>
    );
  }

  return <div className={classes} style={skeletonStyle} />;
};

export default Skeleton;
