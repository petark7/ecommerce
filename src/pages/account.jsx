import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ManagePassword from '../components/ManagePassword';
import AccountSettings from '../components/AccountSettings';
import ManageAddresses from '../components/ManageAddresses';
import OrderHistory from '../components/OrderHistory';

const Account = () => {
	const [activeButton, setActiveButton] = useState('action_settings');
	const { page } = useParams();
	const items = [
		{
			id: 'account_settings',
			label: 'Account Settings',
			action: () => {
				setActiveButton('account_settings');
			}
		},
		{
			id: 'manage_password',
			label: 'Manage Password',
			action: () => {
				setActiveButton('manage_password');
			}

		},
		{
			id: 'manage_addresses',
			label: 'Manage Addresses',
			action: () => {
				setActiveButton('manage_addresses');
			}
		},
		{
			id: 'order_history',
			label: 'Order History',
			action: () => {
				setActiveButton('order_history');
			}
		}
	];

	useEffect(() => {
		setActiveButton(page);
		console.log(page);
	}, [page]);

	return (
		<Layout>
			<section className="container mx-auto p-10">
				<div className="flex items-center justify-center ">
					<ul className="flex flex-col lg:flex-row gap-4 p-4 items-center py-6 w-full border rounded">
						{items.map(item => (
							<li
								key={item.id}
								id={item.id}
								className={`text-center w-full p-3 px-5 hover:bg-gray-200
                rounded transition duration-200 hover:cursor-pointer 
                ${activeButton === item.id && 'bg-red-200'}`}
								onClick={item.action}
							>
								<a>{item.label}</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<div className="border p-5">
						{activeButton === 'account_settings' && <AccountSettings />}

						{activeButton === 'manage_password' && <ManagePassword />}

						{activeButton === 'manage_addresses' && <ManageAddresses />}

						{activeButton === 'order_history' && <OrderHistory />}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Account;
