import React, { useRef, useState } from 'react';

import './login-modal.css';

export const LoginModal = ({
	handleLoginAction,
	handleLoginBgClick,
}) => {

	// const [inputs, setInputs] = useState({});
	const authFormData = useRef({
		email: '',
		pass: ''
	});

	const onChangeInput = (event) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;
		console.log(inputName + " | " + inputValue);

		authFormData.current[inputName] = inputValue;

		console.log(authFormData.current);
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			let result = await fetch('http://localhost:3010/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(authFormData.current),
			});
			if (result.status === 200) {
				localStorage.setItem('auth', `user=${authFormData.current.email}`);
				handleLoginAction();
			}
		} catch (error) {
			console.log('Error -', error);
		}
	};

	return (
		<div className="login-modal-wrap">
			<div className="login-modal-bg" onClick={handleLoginBgClick}></div>
			<div className="login-modal">
				<h1>Login</h1>
				<form onSubmit={onSubmit} className="login-form">
					<input
						onChange={onChangeInput}
						className="email"
						placeholder="Please, enter your email.."
						type="email"
						name="email"
					/>
					<input
						onChange={onChangeInput}
						className="password"
						placeholder="Please, enter your password.."
						type="password"
						name="pass"
					/>
					<input className="submit" type="submit" value={'Submit'} />
				</form>
			</div>
		</div>
	);
};
