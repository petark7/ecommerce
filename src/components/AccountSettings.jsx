import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfoFirestore } from '../firebase/utils';
import { selectUser, selectUserData, updateAccountSettings } from '../redux/slices/UserSlice';
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

	const handleSubmit = async () => {
		const userID = user.uid;
		dispatch(updateAccountSettings({ userID, data }));
	};

	return (
		<section className="lg:mx-20 my-5 md:mx-10 mx-5 ">
			<form className="flex flex-col gap-3 items-center w-full">
				<div className="flex text-2xl mb-5">Change personal information</div>
				<input
					name="name"
					type="text"
					placeholder="Name"
					className="input input-bordered w-full"
					onChange={event => handleChange(event)}
				/>
				<input
					name="email"
					type="text"
					placeholder="Email"
					className="input input-bordered w-full"
					onChange={event => handleChange(event)}
				/>
				<input
					name="phone_number"
					type="text"
					placeholder="Phone number"
					className="input input-bordered w-full"
					onChange={event => handleChange(event)}
				/>
				<input
					name="address"
					type="text"
					placeholder="Address"
					className="input input-bordered w-full"
					onChange={event => handleChange(event)}
				/>
				<Button handleClick={handleSubmit} label="Submit changes" />
			</form>
		</section>
	);
};

AccountSettings.propTypes = {
	state: PropTypes.any
};

export default AccountSettings;
