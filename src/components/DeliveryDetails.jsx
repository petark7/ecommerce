import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUser, selectUserData, updateAccountSettings } from '../redux/slices/userSlice';
import Modal from './Modal';
import DeliveryInfoForm from './DeliveryInfoForm';

// TODO: VALUES ARE HARDCODED - IMPLEMENT WHEN USER SETTINGS IS IMPLEMENTED
const DeliveryDetails = () => {
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
		const userID = user.uid;
		dispatch(updateAccountSettings({ userID, data }));
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
		<section className="border mt-3 p-3">
			<div className="flex justify-between">
				<div>
					<div className="font-semibold">Delivery details</div>
					{userDetails ? userDetailFields : <div className="mt-2">No delivery details added. Add now.</div>}
					<div className="mt-2" />
				</div>
				<button
					type="button"
					className="border p-2 px-4 h-fit bg-gray-200 font-semibold" onClick={() => {
						setIsOpen(!isOpen);
					}}
				>Change
				</button>
				<Modal isOpen={isOpen} toggleModal={() => setIsOpen(!isOpen)}>
					<div className="w-full text-center text-2xl pb-10">Change delivery address</div>
					<DeliveryInfoForm handleChange={handleChange} handleSubmit={handleSubmit} />
				</Modal>
			</div>
		</section>
	);
};

export default DeliveryDetails;
