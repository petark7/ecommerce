import { useEffect, useState } from 'react';
// Import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
// Import { loginUser } from '../firebase/utils';
import { login } from '../redux/slices/UserSlice';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const handleLogin = () => {
		try {
			dispatch(login({ email, password }));
			if (user.uid) {
				navigate('/');
			}
		} catch {
			// Handle error
		}
	};

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<Layout>
			<section className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col gap-7 items-center shadow-lg h-fit p-14 m-10">

					{/* descriptive text at top */}
					<div className="font-light text-4xl">Welcome!</div>
					<div className="text-lg text-center">Glad to see you here. Enter your credentials to login</div>

					{/* email, password and forgot password */}
					<form
						className="flex flex-col w-full gap-3"
						onSubmit={event => {
							event.preventDefault();
							handleLogin();
						}}
					>
						<input
							type="text"
							placeholder="Email"
							className="input input-bordered w-full"
							value={email}
							onChange={event => {
								setEmail(event.target.value);
							}}
						/>
						<input
							type="password"
							placeholder="Password"
							className="input input-bordered w-full"
							value={password}
							onChange={event => {
								setPassword(event.target.value);
							}}
						/>
						<div className="w-full text-end underline text-red-500 cursor-pointer">Forgot password?</div>
						{/* login buttons */}
						<button
							type="submit"
							className="w-full border bg-red-500 text-xl
					text-white py-4 font-semibold"
						>
							LOGIN
						</button>
					</form>
				</div>
			</section>
		</Layout>
	);
};

export default Login;
