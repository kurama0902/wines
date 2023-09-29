import React, { useState } from 'react';
import { UserSVG } from '../../../../shared/SVG/UserSVG';
import { LoginModal } from '../LoginModal';
import { Link } from 'react-router-dom';

import './user-popup.css';

export const UserPopup = () => {
	let [display, setDisplay] = useState(false);
	let [isUserLogined, setIsUserLogined] = useState(localStorage.getItem('auth'));
	let [loginModalDisplay, setLoginModalDisplay] = useState(false);

	const loginLogoutText = isUserLogined ? 'Log out' : 'Login'

	const handleUsersPopup = () => {
		setDisplay((prevState) => {
			return !prevState;
		});
	};

	const handleLoginBgClick = () => {
		setLoginModalDisplay((prevState) => !prevState);
	};

	const Logout = () => {
		document.cookie =
			'user=creepysimbaplay@gmail.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

		localStorage.removeItem('auth');
		setIsUserLogined(false);
	};

	const handleLoginAction = () => {
		setIsUserLogined(true);
		setLoginModalDisplay(false);
	}

	return (
		<>
			<div className="user-btn-wrap">
				<button className="user-btn" onClick={handleUsersPopup}>
					<UserSVG />
				</button>
				{display && (
					<>
						<div className="back" onClick={handleUsersPopup}></div>

						<div className="user-popup-wrap">
							<Link
								to="/user-page"
								className={`user-page-link ${loginLogoutText === 'Login' ? 'user-link-hide' : ''}`}
							>
								User's Page
							</Link>
							{isUserLogined && (
								<button onClick={Logout} className="login-btn">
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
				<LoginModal
					handleLoginBgClick={handleLoginBgClick}
					handleLoginAction={handleLoginAction}
				/>
			)}
		</>
	);
};
