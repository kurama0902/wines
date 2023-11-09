import React, { useState } from 'react';
import { UserSVG } from '../../../../shared/SVG/UserSVG';
import { LoginModal } from '../LoginModal';
import { Link } from 'react-router-dom';

import './user-popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, saveUser } from '../../../../redux/actions/authActions';

export const UserPopup = () => {
	let [display, setDisplay] = useState(false);
	let [loginModalDisplay, setLoginModalDisplay] = useState(false);

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

	const handleLoginBgClick = () => {
		setLoginModalDisplay((prevState) => !prevState);
	};

	const logout = () => dispatch(deleteUser());

	const loginUser = (user) => {
		dispatch(saveUser(user));
		setLoginModalDisplay(false);
	};

	return (
		<>
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
								<button onClick={handleLoginBgClick} className="login-btn">
									Login
								</button>
							)}
						</div>
					</>
				)}
			</div>
			{loginModalDisplay && (
				<LoginModal handleLoginBgClick={handleLoginBgClick} loginUser={loginUser} />
			)}
		</>
	);
};
