import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../../shared/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'edit' | 'delete' | 'home';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, icon, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 transition-colors duration-200 rounded-lg',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 transition-colors duration-200 rounded-lg',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500 transition-colors duration-200 rounded-lg',
      success: 'text-white focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 rounded-full',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 transition-colors duration-200 rounded-lg',
      edit: 'bg-[#A3B899] text-white hover:bg-[#8FA886] focus:ring-[#A3B899] transition-all duration-200 shadow-md hover:shadow-lg rounded-full font-bold',
      delete: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-500 transition-all duration-200 shadow-md hover:shadow-lg rounded-full font-bold',
      home: 'bg-[#A3B899] text-white hover:bg-[#8FA886] focus:ring-[#A3B899] transition-all duration-200 shadow-md hover:shadow-lg rounded-full font-bold'
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    // 특별한 크기 조정 (edit, delete, home variant용)
    const getSizeClasses = () => {
      if (variant === 'edit' || variant === 'delete') {
        return 'px-5 py-2.5 text-sm'; // 조금 더 큰 compact 크기
      }
      if (variant === 'home') {
        return 'px-6 py-3 text-base'; // 일반 크기
      }
      return sizes[size];
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          getSizeClasses(),
          variant === 'success' && 'bg-[#A3B899] hover:bg-[#8FA886]',
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
