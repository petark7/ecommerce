const PaymentOptions = ({ setSelectedOption, formErrors }) => (
	<section className={`border mt-3 p-3 ${formErrors.paymentOptionError ? 'border-2 border-red-300' : 'border'}`}>
		<div className="font-semibold">Payment Options</div>
		<div className="mt-2">
			{/* <div>Pay with card</div> */}
			<div className="form-control">
				<label className="flex gap-2 cursor-pointer">
					<input
						type="radio" name="radio-10" className="radio checked:bg-red-400"
						onChange={() => {
							setSelectedOption('direct');
						}} />
					<span className="">Direct payment (pay on delivery)</span>
				</label>
			</div>
			{formErrors.paymentOptionError && <div className="text-red-500 mt-2">Please select a payment option.</div>}

		</div>
	</section>
);

export default PaymentOptions;
