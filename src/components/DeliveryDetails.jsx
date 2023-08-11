
const DeliveryDetails = () => (
	<section className="border mt-3 p-3">
		<div className="flex justify-between">
			<div>
				<div className="font-semibold">Delivery details</div>
				<div className="mt-2">
					{/* <div>Pay with card</div> */}
					<div>Name: Petar Kuzmanovski</div>
					<div>Address: 22 high street</div>
					<div>Phone: 074123456</div>
					<div>Email: petark@gmail.com</div>
				</div>
			</div>
			<button className="border p-2 px-4 h-fit bg-gray-200 font-semibold">Change</button>
		</div>

	</section>
);

export default DeliveryDetails;
