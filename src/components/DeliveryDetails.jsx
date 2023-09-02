import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserData, updateAccountSettings } from '../redux/slices/userSlice';
import Modal from './Modal';
import DeliveryInfoForm from './DeliveryInfoForm';

const DeliveryDetails = ({ formErrors }) => {
	const userDetails = useSelector(selectUserData);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
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
		dispatch(updateAccountSettings({ userID: user.uid, data }));
		setIsOpen(false);
	};

	const userDetailFields = (
		<>
			<div>Name: {userDetails?.name}</div>
			<div>Address: {userDetails?.address}</div>
			<div>Phone: {userDetails?.phone_number}</div>
			<div>Email: {userDetails?.email}</div>
		</>
	);

	return (
		<section className={`border rounded mt-3 p-3 ${formErrors.deliveryDetailsError ? 'border-2 border-red-300' : 'border'}`}>
			<div className="flex justify-between">
				<div>
					<div className="font-semibold">Delivery details</div>
					{userDetails ? userDetailFields : <div className="mt-2">No delivery details added. Add now.</div>}
					<div className="mt-2" />
				</div>
				<button
					type="button"
					className="border p-2 px-4 h-fit bg-gray-200 font-semibold rounded" 
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					Change
				</button>
				<Modal isOpen={isOpen} toggleModal={() => setIsOpen(!isOpen)}>
					<div className="w-full text-center text-2xl pb-10">Change delivery address</div>
					<DeliveryInfoForm 
					handleChange={handleChange} 
					handleSubmit={handleSubmit} 
					/>
				</Modal>
			</div>
			{formErrors.deliveryDetailsError && <div className="text-red-500 mt-2">There is an issue with the delivery details.</div>}
		</section>

	);
};

export default DeliveryDetails;
