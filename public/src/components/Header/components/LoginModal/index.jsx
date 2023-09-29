import React, { useState } from 'react';

import './login-modal.css';

export const LoginModal = ({
	handleLoginAction,
	handleLoginBgClick,
}) => {
	const [inputs, setInputs] = useState({});

	const onChangeInput = (event) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;

		setInputs((prevState) => {
			return {
				...prevState,
				[inputName]: inputValue,
			};
		});
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			let result = await fetch('http://localhost:3010/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(inputs),
			});
			if (result.status === 200) {
				document.cookie = `user=${inputs.email}`;
				localStorage.setItem('auth', `user=${inputs.email}`);
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
