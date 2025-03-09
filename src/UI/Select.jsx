import React, { forwardRef } from 'react';
import { cn } from '../lib/Utils.jsx';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(
  ({ className, label, error, fullWidth = false, options, onChange, ...props }, ref) => {
    const handleChange = (e) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth ? 'w-full' : '')}>
        {label && (
          <label className="text-sm font-medium text-black dark:text-white">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 text-white dark:text-white dark:placeholder-gray-400',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            onChange={handleChange}
            {...props}
          >
            {options.map((option, index) => (
              <option key={index} className="text-black-700 dark:text-white-700"  value={option}>
                
                {option.toUpperCase()}
                
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';