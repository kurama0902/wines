import React, { useState } from 'react';

import './login-modal.css';

export const LoginModal = (display, setUserLogin, isUserLogined) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	return (
		<div className="login-modal-wrap">
			<div className="login-modal-bg" onClick={display.display.handleLoginBgClick}></div>
			<div className="login-modal">
				<h1>Login</h1>
				<form
					action=""
					className="login-form"
					onSubmit={async (e) => {
						e.preventDefault();
						try {
							let result = await fetch('http://localhost:3010/api/login', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									email: email,
									pass: password,
								}),
							});

							if (result.status === 200) {
								document.cookie = `user=${email}`;
								localStorage.setItem('auth', `user=${email}`);
								display.setUserLogin(true);
							}
						} catch (error) {
							console.log('Error -', error);
						}
					}}
				>
					<input
						onChange={(e) => setEmail(e.target.value)}
						className="email"
						placeholder="Please, enter your email.."
						type="email"
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						className="password"
						placeholder="Please, enter your password.."
						type="password"
					/>
					<input className="submit" type="submit" value={'Submit'} />
				</form>
			</div>
		</div>
	);
};
