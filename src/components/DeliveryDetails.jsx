import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/slices/UserSlice';

// TODO: VALUES ARE HARDCODED - IMPLEMENT WHEN USER SETTINGS IS IMPLEMENTED
const DeliveryDetails = () => {
	const userDetails = useSelector(selectUserData);
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
				<button className="border p-2 px-4 h-fit bg-gray-200 font-semibold">Change</button>
			</div>
		</section>
	);
};

export default DeliveryDetails;
