import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserData, updateAccountSettings } from '../redux/slices/userSlice';
import Button from './Button';
import DeliveryInfoForm from './DeliveryInfoForm';

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

	const handleSubmit = event => {
		event.preventDefault();
		const userID = user.uid;
		dispatch(updateAccountSettings({ userID, data }));
	};

	return (
		<section className="lg:mx-20 my-5 md:mx-10 mx-5 ">
			<div className="flex text-2xl mb-8 w-full justify-center">Change personal information</div>
			<DeliveryInfoForm handleChange={handleChange} handleSubmit={handleSubmit} />
		</section>
	);
};

AccountSettings.propTypes = {
	state: PropTypes.any
};

export default AccountSettings;
