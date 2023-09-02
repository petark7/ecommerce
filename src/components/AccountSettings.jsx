import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUser, selectUserData, updateAccountSettings } from '../redux/slices/userSlice';
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
		dispatch(updateAccountSettings({ userID: user.uid, data }));
	};

	useEffect(() => {
		setData({
			name: userData?.name,
			email: userData?.email,
			address: userData?.address,
			phone_number: userData?.phone_number
		})
	}, [userData])

	return (
		<section className="lg:mx-20 my-5 md:mx-10 mx-5 ">
			<div className="flex text-2xl mb-8 w-full justify-center">Change personal information</div>
			<DeliveryInfoForm 
			formData={data} 
			handleChange={handleChange} 
			handleSubmit={handleSubmit} 
			/>
		</section>
	);
};

AccountSettings.propTypes = {
	state: PropTypes.any
};

export default AccountSettings;
