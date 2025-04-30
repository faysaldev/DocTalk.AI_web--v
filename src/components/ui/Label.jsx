import React from 'react';
import { cn } from '../../utils/cn';

const Label = React.forwardRef(({ 
  className, 
  htmlFor, 
  children, 
  ...props 
}, ref) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-gray-700",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;