import React from 'react';

const Button = ({ width, label, handleClick, children, submit }) => {
	if (submit) {
		return (
			<button
				type="submit"
				className={`${width ? width : 'w-full'} border p-5 px-8 mt-5 bg-gray-700 font-bold
				 text-white active:scale-[0.98]`}
				onSubmit={() => {
					handleClick();
				}}
			>
				{label}
				{children}
			</button>
		);
	}

	return (
		<button
			type="button"
			className={`${width ? width : 'w-full'} border p-5 px-8 mt-5 bg-gray-700 font-bold
			 text-white active:scale-[0.98]`}
			onClick={() => {
				handleClick();
			}}
		>
			{label}
			{children}
		</button>
	);
};

export default Button;
