import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../redux/actions/authActions';
import { closeRegisterUserModal, isShowRegisterUserModal } from '../../redux/slices/registerUserModalSlice';

import './login-modal.css';

export const RegisterUserModal = () => {
	const dispatch = useDispatch();
	const isShowModal = useSelector(isShowRegisterUserModal);
	const authFormData = useRef({
		email: '',
		pass: '',
		name: '',
		address: '',
		mobile: '',
	});

	if (!isShowModal) return null;

	const onChangeInput = (event) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;

		authFormData.current[inputName] = inputValue;
	};

	const handleLoginUser = (user) => dispatch(saveUser(user));

	const handleClose = () => dispatch(closeRegisterUserModal());

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			let result = await fetch('http://localhost:3010/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(authFormData.current),
			});
			if (result.status === 200) {
				handleLoginUser({
					...authFormData.current,
				});
				handleClose();
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
						placeholder="Please, enter your name.."
						type="text"
						name="name"
					/>
					<input
						onChange={onChangeInput}
						className="email"
						placeholder="Please, enter your address.."
						type="text"
						name="address"
					/>
					<input
						onChange={onChangeInput}
						className="email"
						placeholder="Please, enter your mobile.."
						type="text"
						name="mobile"
					/>
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
					<button className="submit" type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
