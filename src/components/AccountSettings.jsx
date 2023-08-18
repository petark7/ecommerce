import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserData, updateAccountSettings } from '../redux/slices/userSlice';
import Button from './Button';

const AccountSettings = () => {
	const dispatch = useDispatch();
	const userData = useSelector(selectUserData);
	const [data, setData] = useState();
	const user = useSelector(selectUser);

	const handleChange = event => {
		const value = event.target.value;
		const name = event.target.name;

		setData({
			...data,
			[name]: value
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const userID = user.uid;
		dispatch(updateAccountSettings({ userID, data }));
	};

	return (
		<section className="lg:mx-20 my-5 md:mx-10 mx-5 ">
			<form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>
				<div className="flex text-2xl mb-5">Change personal information</div>

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
				<Button submit handleClick={handleSubmit} label="Submit changes" />
			</form>
		</section>
	);
};

AccountSettings.propTypes = {
	state: PropTypes.any
};

export default AccountSettings;
