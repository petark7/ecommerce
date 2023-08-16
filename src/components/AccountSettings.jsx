import Button from './Button';

const AccountSettings = () => (
	<section className="">
		<form className="flex flex-col gap-3 items-center w-full">
			<input type="text" placeholder="Name" className="input input-bordered w-full" />
			<input type="text" placeholder="Email" className="input input-bordered w-full" />
			<input type="text" placeholder="Phone number" className="input input-bordered w-full" />
			<Button label="Submit changes" />
		</form>
	</section>
);

export default AccountSettings;
