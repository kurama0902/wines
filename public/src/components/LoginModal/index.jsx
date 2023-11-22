import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../redux/actions/authActions';
import { closeLoginModal } from '../../redux/actions/loginModalActions';
import { isShowLoginModal } from '../../redux/slices/loginModalSlice';

import './login-modal.css';
import { API } from '../../shared/API';

export const LoginModal = () => {
	const dispatch = useDispatch();
	const isShowModal = useSelector(isShowLoginModal);
	const authFormData = useRef({
		email: '',
		pass: '',
	});

	if (!isShowModal) return null;

	const onChangeInput = (event) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;

		authFormData.current[inputName] = inputValue;
	};

	const handleLoginUser = (user) => dispatch(saveUser(user));

	const handleClose = () => dispatch(closeLoginModal());

	const onSubmit = async (event) => {
		event.preventDefault();

		const { email } = authFormData.current;

		try {
			let result = await fetch(`${API}api/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(authFormData.current),
			});
			if (result.status === 200) {
				handleLoginUser({
					userName: 'Kurama',
					email,
				});
			}
		} catch (error) {
			console.log('Error -', error);
		}
	};

	return (
		<div className="login-modal-wrap">
			<div className="login-modal-bg" onClick={handleClose} />
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