import PropTypes from 'prop-types';
import Button from './Button';

const DeliveryInfoForm = ({ handleChange, handleSubmit, formData }) => (
	<form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>

		<label className="w-full block text-gray-500 text-sm font-bold" htmlFor="name">
			Name
		</label>

		<input
			required
			value={formData?.name}
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
			value={formData?.email}
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
			value={formData?.phone_number}
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
			value={formData?.address}
			type="text"
			placeholder="23 John's street"
			className="input input-bordered w-full"
			onChange={event => handleChange(event)}
		/>
		<Button type="submit" label="Submit changes" />
	</form>
);

DeliveryInfoForm.propTypes = {
	formData: PropTypes.shape({
		address: PropTypes.string,
		email: PropTypes.string,
		name: PropTypes.string,
		phone_number: PropTypes.string
	}),
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func
};

export default DeliveryInfoForm;
