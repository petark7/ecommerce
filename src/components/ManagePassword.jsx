import React, { useState } from 'react';
import ShowToast from '../utils/toast';
import { updatePasswordFirebase } from '../firebase/utils';
import Button from './Button';

const ManagePassword = () => {
	const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;
	const [formData, setFormdata] = useState({
		newPassword: '',
		newPasswordConfirm: ''
	});

	const handleChange = event => {
		const value = event.target.value;
		const name = event.target.name;

		setFormdata({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (formData.newPassword === formData.newPasswordConfirm
			&&			passwordRegex.test(formData.newPassword)) {
			updatePasswordFirebase(formData.newPassword);
		} else {
			ShowToast('Passwords don\'t match or don\'t meet the requirements', {success: false});
		}
	};

	return (
		<section className="lg:mx-20 my-5 md:mx-10 mx-5 ">
			<form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>

				<div className="flex text-2xl mb-5 ">Change password</div>
				<div className="border-dashed border-2 border-red-300 p-3 flex mb-5 ">Password needs to have at least one
					special character and at least one uppercase character.
				</div>

				<label className="w-full block text-gray-500 text-sm font-bold" htmlFor="currentPassword">
					New password
				</label>
				<input
					required
					name="newPassword"
					id="newPassword"
					type="password"
					pattern={passwordRegex}
					className="input input-bordered w-full"
					onChange={event => handleChange(event)}
				/>

				<label className="w-full block text-gray-500 text-sm font-bold" htmlFor="newPasswordConfirm">
					Confirm new password
				</label>
				<input
					required
					name="newPasswordConfirm"
					id="newPasswordConfirm"
					type="password"
					pattern={passwordRegex}
					className="input input-bordered w-full"
					onChange={event => handleChange(event)}
				/>

				<Button type="submit" handleClick={handleSubmit} label="Submit changes" />
			</form>
		</section>
	);
};

export default ManagePassword;
