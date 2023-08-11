const PaymentOptions = () => (
	<section className="border mt-3 p-3">
		<div className="font-semibold">Payment Options</div>
		<div className="mt-2">
			{/* <div>Pay with card</div> */}
			<div className="form-control">
				<label className="flex gap-2 cursor-pointer">
					<input checked type="radio" name="radio-10" className="radio checked:bg-red-400" />
					<span className="">Direct payment (pay on delivery)</span>
				</label>
			</div>

		</div>
	</section>
);

export default PaymentOptions;
