import React, { useState } from 'react';
import { UserSVG } from '../../../../shared/SVG/UserSVG';
import { Link } from 'react-router-dom';

import './user-popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, saveUser } from '../../../../redux/actions/authActions';
import { showLoginModal } from '../../../../redux/actions/loginModalActions';

export const UserPopup = () => {
	let [display, setDisplay] = useState(false);

	const dispatch = useDispatch();
	const { user, isShowLoginModal } = useSelector((state) => ({
		user: state.auth.user,
		isShowLoginModal: state.loginModal.show
	}));

	const isUserLogined = !!user;
	const loginLogoutText = user ? 'Log out' : 'Login';

	const handleUsersPopup = () => {
		setDisplay((prevState) => {
			return !prevState;
		});
	};

	const handleOpenLoginModal = () => {
		dispatch(showLoginModal())
	};

	const logout = () => dispatch(deleteUser());

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
							<button onClick={handleOpenLoginModal} className="login-btn">
								Login
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
};
