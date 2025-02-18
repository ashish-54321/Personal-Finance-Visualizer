import React from 'react';

export const Button = ({ children, onClick, className, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded bg-blue-600 text-white ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
