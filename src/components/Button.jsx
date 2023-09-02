import React from 'react';

const Button = ({ width = 'w-full', label, handleClick, children, type, color='gray-700' }) => {
    const eventHandler = type === "submit" ? { onSubmit: handleClick } : { onClick: handleClick };

    return (
        <button
            type={type}
            className={`${width} p-5 px-8 mt-5 bg-${color} font-bold text-white active:scale-[0.98] rounded-md`}
            {...eventHandler}
        >
            {label}
            {children}
        </button>
    );
};

export default Button;
