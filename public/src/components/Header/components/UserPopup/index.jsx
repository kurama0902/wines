import React, { useState } from 'react';
import { UserSVG } from '../../../../shared/SVG/UserSVG';
import { Link } from 'react-router-dom';

import './user-popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../../redux/actions/authActions';
import { showLoginModal } from '../../../../redux/actions/loginModalActions';
import { showRegisterUserModal } from '../../../../redux/slices/registerUserModalSlice';

export const UserPopup = () => {
	let [display, setDisplay] = useState(false);

	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({
		user: state.auth.user,
	}));

	const isUserLogined = !!user;
	const loginLogoutText = user ? 'Log out' : 'Login';

	const handleUsersPopup = () => {
		setDisplay((prevState) => {
			return !prevState;
		});
	};

	const handleOpenLoginModal = () => {
		dispatch(showLoginModal());
	};

	const handleOpenRegisterUserModal = () => {
		dispatch(showRegisterUserModal());
	};

	const logout = async () => {
		await fetch('http://localhost:3010/api/logout', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: user.email
			})
		})
		dispatch(deleteUser())
		document.cookie = `auth=${user.email}; Max-Age=-1`
	}

	return (
		<div className="user-btn-wrap">
			<button className="user-btn" onClick={handleUsersPopup}>
				<UserSVG />
			</button>
			{display && (
				<>
					<div className="back" onClick={handleUsersPopup} />

					<div className="user-popup-wrap">
						<Link
							to="/user-page"
							className={`user-page-link ${loginLogoutText === 'Login' ? 'user-link-hide' : ''}`}
						>
							My Profile
						</Link>
						{isUserLogined && (
							<button onClick={logout} className="login-btn">
								Logout
							</button>
						)}
						{!isUserLogined && (
							<>
								<button onClick={handleOpenLoginModal} className="login-btn">
									Login
								</button>
								<button onClick={handleOpenRegisterUserModal} className="login-btn">
									Register user
								</button>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};
