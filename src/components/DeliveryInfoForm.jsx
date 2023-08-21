import React from 'react';
import Button from './Button';

const DeliveryInfoForm = ({ handleChange, handleSubmit, currentData }) => {
	console.log(currentData);

	return (
		<form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>

			<label className="w-full block text-gray-500 text-sm font-bold" htmlFor="name">
				Name
			</label>

			<input
				required
				name="name"
				type="text"
				placeholder="John Doe"
				className="input input-bordered w-full"
				onChange={event => handleChange(event)}
			/>

			<label className="w-full block text-gray-500 text-sm font-bold" htmlFor="email">
				Email
			</label>
			<input
				required
				name="email"
				type="email"
				placeholder="johndoe@gmail.com"
				className="input input-bordered w-full"
				onChange={event => handleChange(event)}
			/>

			<label className="w-full block text-gray-500 text-sm font-bold" htmlFor="phone_number">
				Phone Numbers
			</label>
			<input
				required
				name="phone_number"
				type="text"
				placeholder="+389 756 412 13"
				className="input input-bordered w-full"
				onChange={event => handleChange(event)}
			/>

			<label className="w-full block text-gray-500 text-sm font-bold" htmlFor="address">
				Address
			</label>
			<input
				required
				name="address"
				type="text"
				placeholder="23 John's street"
				className="input input-bordered w-full"
				onChange={event => handleChange(event)}
			/>
			<Button submit label="Submit changes" />
		</form>
	);
};

export default DeliveryInfoForm;
