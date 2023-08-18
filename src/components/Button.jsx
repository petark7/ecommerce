import React from 'react';

const Button = ({ label, handleClick, children }) => (
	<button
		type="submit"
		className="w-full border p-5 px-8 mt-5 bg-gray-700 font-bold text-white active:scale-[0.98]"
		onSubmit={() => {
			handleClick();
		}}
	>
		{label}
		{children}
	</button>
);

export default Button;
