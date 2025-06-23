import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  className = ''
}) => {
  const baseStyles = 'rounded px-4 py-2 font-semibold transition-all duration-200';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-600 text-gray-700 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  const combinedClasses = classNames(
    baseStyles,
    variants[variant],
    sizes[size],
    {
      'opacity-50 cursor-not-allowed': disabled || loading,
    },
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
