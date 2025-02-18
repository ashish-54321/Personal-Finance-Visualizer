import React from 'react';

export const Input = ({ type = "text", className, ...props }) => {
    return (
        <input
            type={type}
            className={`px-3 py-2 border rounded ${className}`}
            {...props}
        />
    );
};
